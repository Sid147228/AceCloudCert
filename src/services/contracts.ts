import type { AttemptSummary, UserPlan, UserProfile } from '@/types';

export type AuthService = {
  getCurrentUser: () => Promise<UserProfile | null>;
  signOut: () => Promise<void>;
};

export type ProgressService = {
  listAttempts: (userId: string) => Promise<readonly AttemptSummary[]>;
};

export type BillingService = {
  getPlan: (userId: string) => Promise<UserPlan>;
};

export type CertificateService = {
  listCertificateIds: (userId: string) => Promise<readonly string[]>;
};
