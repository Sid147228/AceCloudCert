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
  addCertificateHistoryItem: (userId: string, item: CertificateHistoryItem) => Promise<UserAccountProfile>;
  addLearningHistoryItem: (userId: string, item: LearningHistoryItem) => Promise<UserAccountProfile>;
  saveProfile: (profile: UserAccountProfile) => Promise<UserAccountProfile>;
  updateProfile: (userId: string, input: UpdateUserProfileInput) => Promise<UserAccountProfile>;
  updateSettings: (userId: string, input: UpdateAccountSettingsInput) => Promise<UserAccountProfile>;
};

export type ProgressService = {
  listAttempts: (userId: string) => Promise<readonly AttemptSummary[]>;
};

export type BillingService = {
  getPlan: (userId: string) => Promise<UserPlan>;
};

export type CertificateService = {
  getCertificate: (id: string) => Promise<CertificateRecord | null>;
  getCertificateForAttempt: (userId: string, attemptId: string) => Promise<CertificateRecord | null>;
  listCertificates: (userId: string) => Promise<readonly CertificateRecord[]>;
  saveCertificate: (certificate: CertificateRecord) => Promise<CertificateRecord>;
};
