import type { APP_ROUTES } from '@/constants/routes';

export type AppRoute = (typeof APP_ROUTES)[keyof typeof APP_ROUTES];

export type FeatureStatus = 'available' | 'foundation' | 'planned';

export type FeatureModule = {
  id: string;
  name: string;
  route: AppRoute;
  summary: string;
  status: FeatureStatus;
  ownerDomain: string;
};

export type UserPlan = 'Free' | 'Silver' | 'Gold';

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  plan: UserPlan;
};

export type CertificationProvider = 'AWS' | 'Microsoft Azure' | 'Google Cloud' | 'Salesforce' | 'Cisco';
export type CertificationLevel = 'Foundational' | 'Associate' | 'Administrator';
export type CertificationDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type CertificationStatus = 'active' | 'locked' | 'coming soon';

export type Certification = {
  id: string;
  provider: CertificationProvider;
  name: string;
  level: CertificationLevel;
  description: string;
  examCode: string;
  domains: readonly string[];
  questionCount: number;
  estimatedStudyHours: number;
  difficulty: CertificationDifficulty;
  progress: number;
  planRequirement: UserPlan;
  status: CertificationStatus;
};

export type QuestionDifficulty = 'easy' | 'medium' | 'hard';

export type Option = {
  id: string;
  text: string;
};

export type Question = {
  id: string;
  certificationId: string;
  domain: string;
  subDomain: string;
  difficulty: QuestionDifficulty;
  questionText: string;
  options: readonly Option[];
  correctOptionId: string;
  explanation: string;
  reference: string;
  tags: readonly string[];
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
};

export type KnowledgeTopic = {
  id: string;
  title: string;
  domain: string;
  summary: string;
  bullets: readonly string[];
};

export type SubscriptionPlan = {
  id: UserPlan;
  name: UserPlan;
  priceLabel: string;
  features: readonly string[];
};

export type LegalPage = {
  id: 'privacy' | 'terms' | 'cookies' | 'data-handling';
  title: string;
  summary: string;
};

export type AttemptSummary = {
  id: string;
  title: string;
  score: number;
  passed: boolean;
  completedAt: string;
};

export type ServiceReadinessItem = {
  name: string;
  purpose: string;
  requiredConfiguration: readonly string[];
};
