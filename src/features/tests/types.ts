import type { Question, UserPlan } from '@/types';

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

export type DomainPerformance = DomainBreakdown & {
  attempts: number;
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

export type ScoreTrendPoint = {
  attemptId: string;
  completedAt: string;
  label: string;
  passed: boolean;
  scorePercent: number;
};

export type ResultInsights = {
  answeredCount: number;
  recommendedNextAction: string;
  strongestDomain?: DomainPerformance;
  totalQuestions: number;
  weakestDomain?: DomainPerformance;
};

export type TestAnalytics = {
  averageScore: number;
  domainPerformance: readonly DomainPerformance[];
  passRate: number;
  recentAttempts: readonly TestAttempt[];
  recommendedNextAction: string;
  scoreTrend: readonly ScoreTrendPoint[];
  strongestDomain?: DomainPerformance;
  studyStreak: number;
  testsCompleted: number;
  weakestDomain?: DomainPerformance;
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
  plan?: UserPlan;
  userId: string;
};
