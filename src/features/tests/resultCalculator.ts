import type { DomainPerformance, ResultInsights, ScoreTrendPoint, TestAnalytics, TestAttempt } from './types';

export const EMPTY_TEST_ANALYTICS: TestAnalytics = {
  averageScore: 0,
  domainPerformance: [],
  passRate: 0,
  recentAttempts: [],
  recommendedNextAction: 'Start a mock exam to establish your first analytics baseline.',
  scoreTrend: [],
  studyStreak: 0,
  testsCompleted: 0
};

export function calculateResultInsights(attempt: TestAttempt): ResultInsights {
  const totalQuestions = attempt.questionIds.length;
  const answeredCount = Math.max(0, totalQuestions - attempt.unansweredCount);
  const domainPerformance = attempt.domainBreakdown.map((domain) => ({
    ...domain,
    attempts: 1
  }));
  const strongestDomain = getStrongestDomain(domainPerformance);
  const weakestDomain = getWeakestDomain(domainPerformance);

  return {
    answeredCount,
    recommendedNextAction: getResultRecommendation(attempt, weakestDomain),
    strongestDomain,
    totalQuestions,
    weakestDomain
  };
}

export function calculateTestAnalytics(attempts: readonly TestAttempt[]): TestAnalytics {
  if (attempts.length === 0) {
    return EMPTY_TEST_ANALYTICS;
  }

  const sortedAttempts = sortAttemptsByCompletedAt(attempts);
  const recentAttempts = sortedAttempts.slice(0, 5);
  const averageScore = Math.round(sortedAttempts.reduce((total, attempt) => total + attempt.scorePercent, 0) / sortedAttempts.length);
  const passedCount = sortedAttempts.filter((attempt) => attempt.passed).length;
  const passRate = Math.round((passedCount / sortedAttempts.length) * 100);
  const domainPerformance = calculateDomainPerformance(sortedAttempts);
  const strongestDomain = getStrongestDomain(domainPerformance);
  const weakestDomain = getWeakestDomain(domainPerformance);

  return {
    averageScore,
    domainPerformance,
    passRate,
    recentAttempts,
    recommendedNextAction: getAnalyticsRecommendation(averageScore, passRate, weakestDomain),
    scoreTrend: calculateScoreTrend(sortedAttempts),
    strongestDomain,
    studyStreak: calculateStudyStreak(sortedAttempts),
    testsCompleted: sortedAttempts.length,
    weakestDomain
  };
}

export function calculateDomainPerformance(attempts: readonly TestAttempt[]): readonly DomainPerformance[] {
  const domainMap = new Map<string, { attempts: Set<string>; correct: number; total: number }>();

  attempts.forEach((attempt) => {
    attempt.domainBreakdown.forEach((domain) => {
      const current = domainMap.get(domain.domain) ?? { attempts: new Set<string>(), correct: 0, total: 0 };
      current.attempts.add(attempt.id);
      current.correct += domain.correct;
      current.total += domain.total;
      domainMap.set(domain.domain, current);
    });
  });

  return Array.from(domainMap.entries())
    .map(([domain, value]) => ({
      attempts: value.attempts.size,
      correct: value.correct,
      domain,
      scorePercent: value.total === 0 ? 0 : Math.round((value.correct / value.total) * 100),
      total: value.total
    }))
    .sort((a, b) => a.scorePercent - b.scorePercent || a.domain.localeCompare(b.domain));
}

export function calculateScoreTrend(attempts: readonly TestAttempt[]): readonly ScoreTrendPoint[] {
  return [...attempts]
    .sort((a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime())
    .slice(-7)
    .map((attempt, index) => ({
      attemptId: attempt.id,
      completedAt: attempt.completedAt,
      label: `A${index + 1}`,
      passed: attempt.passed,
      scorePercent: attempt.scorePercent
    }));
}

function calculateStudyStreak(attempts: readonly TestAttempt[]): number {
  const completedDays = new Set(attempts.map((attempt) => toDayKey(new Date(attempt.completedAt))));
  const latestAttempt = sortAttemptsByCompletedAt(attempts)[0];

  if (!latestAttempt) {
    return 0;
  }

  let cursor = startOfDay(new Date(latestAttempt.completedAt));
  let streak = 0;

  while (completedDays.has(toDayKey(cursor))) {
    streak += 1;
    cursor = new Date(cursor.getTime() - 24 * 60 * 60 * 1000);
  }

  return streak;
}

function getResultRecommendation(attempt: TestAttempt, weakestDomain?: DomainPerformance) {
  if (attempt.unansweredCount > 0) {
    return `Retry this mode and prioritize answering every question. ${attempt.unansweredCount} unanswered item${attempt.unansweredCount === 1 ? '' : 's'} lowered this score.`;
  }

  if (!attempt.passed && weakestDomain) {
    return `Practice ${weakestDomain.domain} next, then retake the same mode once that domain is above ${attempt.passMark}%.`;
  }

  if (!attempt.passed) {
    return 'Review explanations for missed questions, then run a weak area practice session before retrying.';
  }

  if (weakestDomain && weakestDomain.scorePercent < 80) {
    return `You passed. Strengthen ${weakestDomain.domain} to push your readiness beyond the pass threshold.`;
  }

  return 'Excellent result. Move to another full mock exam to confirm consistency before generating a certificate.';
}

function getAnalyticsRecommendation(averageScore: number, passRate: number, weakestDomain?: DomainPerformance) {
  if (averageScore === 0) {
    return 'Review recent attempts and answer every question before submitting to build a stronger baseline.';
  }

  if (averageScore < 70 && weakestDomain) {
    return `Focus on ${weakestDomain.domain}; it is currently your lowest scoring domain.`;
  }

  if (passRate < 70) {
    return 'Run weak area practice until your pass rate is consistently above 70%.';
  }

  if (weakestDomain && weakestDomain.scorePercent < 80) {
    return `Keep passing, but schedule a focused topic quiz for ${weakestDomain.domain}.`;
  }

  return 'Maintain momentum with a full mock exam and review only the questions you mark for review.';
}

function getStrongestDomain(domains: readonly DomainPerformance[]): DomainPerformance | undefined {
  return [...domains].sort((a, b) => b.scorePercent - a.scorePercent || b.total - a.total)[0];
}

function getWeakestDomain(domains: readonly DomainPerformance[]): DomainPerformance | undefined {
  return [...domains].sort((a, b) => a.scorePercent - b.scorePercent || b.total - a.total)[0];
}

function sortAttemptsByCompletedAt(attempts: readonly TestAttempt[]): readonly TestAttempt[] {
  return [...attempts].sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function toDayKey(date: Date) {
  return startOfDay(date).toISOString().slice(0, 10);
}
