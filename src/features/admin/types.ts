import type { UserRole } from '@/features/auth';
import type { AppRoute, CertificationStatus, QuestionDifficulty, UserPlan } from '@/types';

export type AdminPermission =
  | 'content:read'
  | 'content:write'
  | 'questions:read'
  | 'questions:write'
  | 'users:read'
  | 'analytics:read';

export type AdminRouteGuard = {
  allowed: boolean;
  reason?: string;
  route: AppRoute;
};

export type AdminDashboardMetric = {
  label: string;
  value: string | number;
};

export type AdminCertificationRow = {
  id: string;
  provider: string;
  name: string;
  examCode: string;
  status: CertificationStatus;
  planRequirement: UserPlan;
  domainCount: number;
  questionCount: number;
  topicCount: number;
};

export type AdminQuestionRow = {
  id: string;
  certificationId: string;
  domain: string;
  subDomain: string;
  difficulty: QuestionDifficulty;
  isPremium: boolean;
  reference: string;
  optionCount: number;
};

export type AdminKnowledgeTopicRow = {
  id: string;
  certificationId: string;
  title: string;
  category: string;
  estimatedReadingMinutes: number;
  relatedQuestionCount: number;
};

export type AdminUserRow = {
  id: string;
  fullName: string;
  email: string;
  plan: UserPlan;
  role: UserRole;
  status: 'mock' | 'backend pending';
  lastActiveLabel: string;
};

export type AdminAnalyticsRow = {
  id: string;
  name: string;
  status: 'local ready' | 'backend pending';
  description: string;
};

export type AdminSnapshot = {
  analyticsRows: readonly AdminAnalyticsRow[];
  certificationRows: readonly AdminCertificationRow[];
  knowledgeTopicRows: readonly AdminKnowledgeTopicRow[];
  metrics: readonly AdminDashboardMetric[];
  questionRows: readonly AdminQuestionRow[];
  userRows: readonly AdminUserRow[];
};
