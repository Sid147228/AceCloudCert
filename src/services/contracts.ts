import type { AttemptSummary, UserPlan } from '@/types';
export type { AuthService } from '@/features/auth/types';

export type ProgressService = {
  listAttempts: (userId: string) => Promise<readonly AttemptSummary[]>;
};

export type BillingService = {
  getPlan: (userId: string) => Promise<UserPlan>;
};

export type CertificateService = {
  listCertificateIds: (userId: string) => Promise<readonly string[]>;
};
