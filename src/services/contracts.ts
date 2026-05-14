import type { AttemptSummary, CertificateRecord, UserPlan } from '@/types';
import type { AuthUser } from '@/features/auth';
import type {
  CertificateHistoryItem,
  LearningHistoryItem,
  UpdateAccountSettingsInput,
  UpdateUserProfileInput,
  UserAccountProfile
} from '@/features/profile';
export type { AuthService } from '@/features/auth/types';

export type UserService = {
  getProfile: (user: AuthUser) => Promise<UserAccountProfile>;
  getProfileById: (userId: string) => Promise<UserAccountProfile | null>;
  addCertificateHistoryItem: (userId: string, item: CertificateHistoryItem) => Promise<UserAccountProfile>;
  addLearningHistoryItem: (userId: string, item: LearningHistoryItem) => Promise<UserAccountProfile>;
  saveProfile: (profile: UserAccountProfile) => Promise<UserAccountProfile>;
  updatePlan: (userId: string, plan: UserPlan) => Promise<UserAccountProfile>;
  updateProfile: (userId: string, input: UpdateUserProfileInput) => Promise<UserAccountProfile>;
  updateSettings: (userId: string, input: UpdateAccountSettingsInput) => Promise<UserAccountProfile>;
};

export type ProgressService = {
  listAttempts: (userId: string) => Promise<readonly AttemptSummary[]>;
};

export type BillingService = {
  getPlan: (userId: string) => Promise<UserPlan>;
  previewPlanChange: (userId: string, nextPlan: UserPlan) => Promise<SubscriptionChangePreview>;
  updatePlan: (userId: string, nextPlan: UserPlan) => Promise<SubscriptionChangeResult>;
};

export type CertificateService = {
  getCertificate: (id: string) => Promise<CertificateRecord | null>;
  getCertificateForAttempt: (userId: string, attemptId: string) => Promise<CertificateRecord | null>;
  listCertificates: (userId: string) => Promise<readonly CertificateRecord[]>;
  saveCertificate: (certificate: CertificateRecord) => Promise<CertificateRecord>;
};

export type SubscriptionChangePreview = {
  checkoutMode: 'mock';
  currentPlan: UserPlan;
  nextPlan: UserPlan;
  stripeReady: boolean;
  summary: string;
};

export type SubscriptionChangeResult = SubscriptionChangePreview & {
  profile: UserAccountProfile;
  updatedAt: string;
};
