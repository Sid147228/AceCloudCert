import type { UserPlan } from '@/types';

export type LearningHistoryItem = {
  id: string;
  certificationId: string;
  title: string;
  mode: 'Mock Test' | 'Quiz' | 'Study Session';
  score: number;
  completedAt: string;
  durationMinutes: number;
  passed: boolean;
};

export type CertificateHistoryItem = {
  id: string;
  certificationId: string;
  certificationName: string;
  score: number;
  issuedAt: string;
  certificateId: string;
};

export type AccountSettings = {
  emailNotifications: boolean;
  productUpdates: boolean;
  studyReminders: boolean;
};

export type UserAccountProfile = {
  userId: string;
  fullName: string;
  email: string;
  plan: UserPlan;
  activeCertificationId: string;
  joinedAt: string;
  learningHistory: readonly LearningHistoryItem[];
  certificateHistory: readonly CertificateHistoryItem[];
  settings: AccountSettings;
  updatedAt: string;
};

export type ProfileStats = {
  testsCompleted: number;
  averageScore: number;
  certificatesEarned: number;
};

export type UpdateUserProfileInput = {
  activeCertificationId: string;
  fullName: string;
};

export type UpdateAccountSettingsInput = Partial<AccountSettings>;

export type ChangePasswordFormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
