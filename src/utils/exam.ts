import type { Question } from '@/types';

export function countQuestionsByDomain(questions: readonly Question[]): Record<string, number> {
  return questions.reduce<Record<string, number>>((domains, question) => {
    domains[question.domain] = (domains[question.domain] ?? 0) + 1;
    return domains;
  }, {});
}

export function calculateReadinessScore(questionCount: number, completedAttempts: number): number {
  if (questionCount === 0) return 0;
  return Math.min(100, 35 + completedAttempts * 12 + Math.min(questionCount, 60) / 2);
}
