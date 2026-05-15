import { questionBank } from '@/data/questions';
import { canAccessFeature } from '@/features/subscriptions';
import type { Question, QuestionDifficulty, UserPlan } from '@/types';

export function getQuestionsByCertification(
  certificationId: string,
  questions: readonly Question[] = questionBank
): readonly Question[] {
  return questions.filter((question) => question.certificationId === certificationId);
}

export function getQuestionsByDomain(domain: string, questions: readonly Question[] = questionBank): readonly Question[] {
  return questions.filter((question) => question.domain === domain);
}

export function getQuestionsByDifficulty(
  difficulty: QuestionDifficulty,
  questions: readonly Question[] = questionBank
): readonly Question[] {
  return questions.filter((question) => question.difficulty === difficulty);
}

export function getQuestionsByPlan(plan: UserPlan, questions: readonly Question[] = questionBank): readonly Question[] {
  if (canAccessFeature(plan, 'fullQuestionBank')) {
    return questions;
  }

  return questions.filter((question) => !question.isPremium);
}

export function getQuestionById(questionId: string, questions: readonly Question[] = questionBank): Question | undefined {
  return questions.find((question) => question.id === questionId);
}

export function getCorrectOption(question: Question) {
  return question.options.find((option) => option.id === question.correctOptionId);
}
