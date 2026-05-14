import { DEFAULT_CERTIFICATION_ID, PASS_MARK_PERCENT } from '@/constants/app';
import { questionBank } from '@/data';
import type { Question } from '@/types';
import type { DomainBreakdown, StartTestInput, TestAnswer, TestAttempt, TestModeConfig, TestModeId, TestQuestionView, TestSession } from './types';

const FULL_MOCK_MODE_CONFIG: TestModeConfig = {
  id: 'full-mock',
  title: 'Full Mock Exam',
  routeTitle: 'AWS CCP full mock exam',
  description: '65-question timed simulation using the full AWS Cloud Practitioner question bank.',
  durationMinutes: 90,
  questionCount: 65,
  requiresDomain: false
};

export const TEST_MODE_CONFIGS: readonly TestModeConfig[] = [
  FULL_MOCK_MODE_CONFIG,
  {
    id: 'quick-quiz',
    title: 'Quick Quiz',
    routeTitle: 'Quick AWS CCP quiz',
    description: '20-question mixed practice session for fast review and confidence building.',
    durationMinutes: 25,
    questionCount: 20,
    requiresDomain: false
  },
  {
    id: 'topic-quiz',
    title: 'Topic-wise Quiz',
    routeTitle: 'Topic-wise quiz',
    description: 'Focused quiz configured by AWS CCP domain.',
    durationMinutes: 20,
    questionCount: 10,
    requiresDomain: true
  },
  {
    id: 'weak-area-practice',
    title: 'Weak Area Practice',
    routeTitle: 'Weak area practice',
    description: 'Adaptive practice using domains with the lowest recent scores.',
    durationMinutes: 25,
    questionCount: 20,
    requiresDomain: false
  }
] as const;

export function getTestModeConfig(mode: TestModeId): TestModeConfig {
  return TEST_MODE_CONFIGS.find((config) => config.id === mode) ?? FULL_MOCK_MODE_CONFIG;
}

export function createTestSession(input: StartTestInput, attempts: readonly TestAttempt[] = []): TestSession {
  const config = getTestModeConfig(input.mode);
  const questions = selectQuestionsForMode(input, config, attempts);
  const now = new Date().toISOString();

  return {
    answers: Object.fromEntries(
      questions.map((question) => [
        question.id,
        {
          markedForReview: false,
          questionId: question.id
        }
      ])
    ),
    certificationId: input.certificationId,
    currentIndex: 0,
    domain: input.domain,
    durationMinutes: config.durationMinutes,
    id: `session-${input.mode}-${Date.now()}`,
    mode: input.mode,
    passMark: PASS_MARK_PERCENT,
    questionIds: questions.map((question) => question.id),
    startedAt: now,
    updatedAt: now,
    userId: input.userId
  };
}

export function getSessionQuestions(session: TestSession, questions: readonly Question[] = questionBank): readonly Question[] {
  return session.questionIds
    .map((questionId) => questions.find((question) => question.id === questionId))
    .filter((question): question is Question => Boolean(question));
}

export function getCurrentQuestionView(session: TestSession, questions: readonly Question[] = questionBank): TestQuestionView | null {
  const sessionQuestions = getSessionQuestions(session, questions);
  const question = sessionQuestions[session.currentIndex];

  if (!question) {
    return null;
  }

  return {
    answer: session.answers[question.id] ?? { markedForReview: false, questionId: question.id },
    index: session.currentIndex,
    question
  };
}

export function answerQuestion(session: TestSession, questionId: string, selectedOptionId: string): TestSession {
  return updateSession(session, {
    answers: {
      ...session.answers,
      [questionId]: {
        ...(session.answers[questionId] ?? { markedForReview: false, questionId }),
        questionId,
        selectedOptionId
      }
    }
  });
}

export function toggleQuestionReview(session: TestSession, questionId: string): TestSession {
  const currentAnswer = session.answers[questionId] ?? { markedForReview: false, questionId };

  return updateSession(session, {
    answers: {
      ...session.answers,
      [questionId]: {
        ...currentAnswer,
        markedForReview: !currentAnswer.markedForReview
      }
    }
  });
}

export function goToQuestion(session: TestSession, index: number): TestSession {
  return updateSession(session, {
    currentIndex: Math.max(0, Math.min(index, session.questionIds.length - 1))
  });
}

export function getElapsedSeconds(session: TestSession, now = Date.now()): number {
  return Math.max(0, Math.floor((now - new Date(session.startedAt).getTime()) / 1000));
}

export function getRemainingSeconds(session: TestSession, now = Date.now()): number {
  return Math.max(0, session.durationMinutes * 60 - getElapsedSeconds(session, now));
}

export function isTimeExpired(session: TestSession, now = Date.now()): boolean {
  return getRemainingSeconds(session, now) <= 0;
}

export function submitTestSession(session: TestSession, questions: readonly Question[] = questionBank, now = new Date()): TestAttempt {
  const sessionQuestions = getSessionQuestions(session, questions);
  const domainMap = new Map<string, { correct: number; total: number }>();
  let correctCount = 0;
  let unansweredCount = 0;

  sessionQuestions.forEach((question) => {
    const answer = session.answers[question.id];
    const correct = answer?.selectedOptionId === question.correctOptionId;

    if (!answer?.selectedOptionId) {
      unansweredCount += 1;
    }

    if (correct) {
      correctCount += 1;
    }

    const existingDomain = domainMap.get(question.domain) ?? { correct: 0, total: 0 };
    domainMap.set(question.domain, {
      correct: existingDomain.correct + (correct ? 1 : 0),
      total: existingDomain.total + 1
    });
  });

  const totalQuestions = sessionQuestions.length;
  const scorePercent = totalQuestions === 0 ? 0 : Math.round((correctCount / totalQuestions) * 100);
  const timeTakenSeconds = getElapsedSeconds(session, now.getTime());
  const domainBreakdown: readonly DomainBreakdown[] = Array.from(domainMap.entries())
    .map(([domain, value]) => ({
      correct: value.correct,
      domain,
      scorePercent: value.total === 0 ? 0 : Math.round((value.correct / value.total) * 100),
      total: value.total
    }))
    .sort((a, b) => a.domain.localeCompare(b.domain));

  return {
    answers: session.answers,
    certificationId: session.certificationId,
    completedAt: now.toISOString(),
    correctCount,
    domain: session.domain,
    domainBreakdown,
    durationMinutes: session.durationMinutes,
    id: `attempt-${session.mode}-${now.getTime()}`,
    incorrectCount: Math.max(0, totalQuestions - correctCount - unansweredCount),
    mode: session.mode,
    passed: scorePercent >= session.passMark,
    passMark: session.passMark,
    questionIds: session.questionIds,
    scorePercent,
    timeTakenSeconds,
    unansweredCount,
    userId: session.userId
  };
}

export function getAnsweredCount(session: TestSession): number {
  return Object.values(session.answers).filter((answer) => Boolean(answer.selectedOptionId)).length;
}

export function getMarkedForReviewCount(session: TestSession): number {
  return Object.values(session.answers).filter((answer) => answer.markedForReview).length;
}

export function getUnansweredCount(session: TestSession): number {
  return Math.max(0, session.questionIds.length - getAnsweredCount(session));
}

export function getModeTitle(mode: TestModeId): string {
  return getTestModeConfig(mode).title;
}

function selectQuestionsForMode(
  input: StartTestInput,
  config: TestModeConfig,
  attempts: readonly TestAttempt[]
): readonly Question[] {
  const availableQuestions = questionBank.filter((question) => question.certificationId === input.certificationId);

  if (input.mode === 'topic-quiz') {
    return rotateAndTake(
      availableQuestions.filter((question) => question.domain === input.domain),
      config.questionCount
    );
  }

  if (input.mode === 'weak-area-practice') {
    const weakDomains = getWeakDomains(attempts);
    const weakQuestions = availableQuestions.filter((question) => weakDomains.includes(question.domain));
    const fallbackQuestions = availableQuestions.filter((question) => question.difficulty !== 'easy');

    return rotateAndTake(weakQuestions.length > 0 ? weakQuestions : fallbackQuestions, config.questionCount);
  }

  return rotateAndTake(availableQuestions, config.questionCount);
}

function getWeakDomains(attempts: readonly TestAttempt[]): readonly string[] {
  const domainScores = new Map<string, { correct: number; total: number }>();

  attempts.slice(0, 5).forEach((attempt) => {
    attempt.domainBreakdown.forEach((domain) => {
      const current = domainScores.get(domain.domain) ?? { correct: 0, total: 0 };
      domainScores.set(domain.domain, {
        correct: current.correct + domain.correct,
        total: current.total + domain.total
      });
    });
  });

  return Array.from(domainScores.entries())
    .filter(([, value]) => value.total > 0)
    .map(([domain, value]) => ({
      domain,
      scorePercent: Math.round((value.correct / value.total) * 100)
    }))
    .sort((a, b) => a.scorePercent - b.scorePercent)
    .slice(0, 3)
    .map((entry) => entry.domain);
}

function rotateAndTake(questions: readonly Question[], count: number): readonly Question[] {
  if (questions.length <= count) {
    return questions;
  }

  const offset = Date.now() % questions.length;
  const rotated = [...questions.slice(offset), ...questions.slice(0, offset)];
  return rotated.slice(0, count);
}

function updateSession(session: TestSession, updates: Partial<TestSession>): TestSession {
  return {
    ...session,
    ...updates,
    updatedAt: new Date().toISOString()
  };
}

export const DEFAULT_TEST_START_INPUT: StartTestInput = {
  certificationId: DEFAULT_CERTIFICATION_ID,
  mode: 'quick-quiz',
  userId: 'local-learner'
};
