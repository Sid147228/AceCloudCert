import type { Question } from '@/types';

export type TestModeId = 'full-mock' | 'quick-quiz' | 'topic-quiz' | 'weak-area-practice';

export type TestModeConfig = {
  id: TestModeId;
  title: string;
  routeTitle: string;
  description: string;
  questionCount: number;
  durationMinutes: number;
  requiresDomain: boolean;
};

export type TestAnswer = {
  markedForReview: boolean;
  questionId: string;
  selectedOptionId?: string;
};

export type TestSession = {
  answers: Record<string, TestAnswer>;
  certificationId: string;
  currentIndex: number;
  domain?: string;
  durationMinutes: number;
  id: string;
  mode: TestModeId;
  passMark: number;
  questionIds: readonly string[];
  startedAt: string;
  updatedAt: string;
  userId: string;
};

export type DomainBreakdown = {
  correct: number;
  domain: string;
  scorePercent: number;
  total: number;
};

export type TestAttempt = {
  answers: Record<string, TestAnswer>;
  certificationId: string;
  completedAt: string;
  correctCount: number;
  domain?: string;
  domainBreakdown: readonly DomainBreakdown[];
  durationMinutes: number;
  id: string;
  incorrectCount: number;
  mode: TestModeId;
  passed: boolean;
  passMark: number;
  questionIds: readonly string[];
  scorePercent: number;
  timeTakenSeconds: number;
  unansweredCount: number;
  userId: string;
};

export type TestQuestionView = {
  answer: TestAnswer;
  index: number;
  question: Question;
};

export type StartTestInput = {
  certificationId: string;
  domain?: string;
  mode: TestModeId;
  userId: string;
};
