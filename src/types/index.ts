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
export type SubscriptionPlanId = 'free' | 'silver-monthly' | 'silver-yearly' | 'gold-monthly' | 'gold-yearly';
export type SubscriptionInterval = 'free' | 'monthly' | 'yearly';
export type SubscriptionStatus =
  | 'free'
  | 'mock-active'
  | 'checkout-pending'
  | 'trialing'
  | 'active'
  | 'past_due'
  | 'cancelled'
  | 'incomplete';

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
  certificationId: string;
  title: string;
  category: string;
  estimatedReadingMinutes: number;
  summary: string;
  fullExplanation: readonly string[];
  keyPoints: readonly string[];
  practicalExample: string;
  relatedQuestionIds: readonly string[];
};

export type SubscriptionPlan = {
  id: SubscriptionPlanId;
  name: string;
  tier: UserPlan;
  interval: SubscriptionInterval;
  description: string;
  priceLabel: string;
  ctaLabel: string;
  features: readonly string[];
  limitations: readonly string[];
  stripePriceLookupKey?: string;
  stripePriceEnvKey?: string;
};

export type CertificateRecord = {
  id: string;
  userId: string;
  userName: string;
  certificationId: string;
  certificationName: string;
  score: number;
  issuedAt: string;
  certificateId: string;
  verificationUrl: string;
  sourceAttemptId?: string;
};

export type LegalPageSection = {
  title: string;
  body: readonly string[];
  bullets?: readonly string[];
};

export type LegalPage = {
  id: 'privacy' | 'terms' | 'cookies' | 'data-handling' | 'delete-account';
  title: string;
  summary: string;
  lastUpdated: string;
  sections: readonly LegalPageSection[];
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
