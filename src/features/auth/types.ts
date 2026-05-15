import type { UserPlan } from '@/types';

export type AuthStatus = 'loading' | 'unauthenticated' | 'verification-required' | 'authenticated';
export type UserRole = 'learner' | 'admin';

export type AuthAction =
  | 'initialize'
  | 'login'
  | 'signup'
  | 'forgot-password'
  | 'resend-verification'
  | 'verify-email'
  | 'change-password'
  | 'logout';

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  emailVerified: boolean;
  plan: UserPlan;
  role: UserRole;
  createdAt: string;
  lastLoginAt?: string;
};

export type AuthSession = {
  token: string;
  user: AuthUser;
  rememberMe: boolean;
  createdAt: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type SignupPayload = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
};

export type PasswordResetPayload = {
  email: string;
};

export type ChangePasswordPayload = {
  userId: string;
  currentPassword: string;
  newPassword: string;
};

export type AuthResult = {
  session: AuthSession;
  user: AuthUser;
};

export type AuthErrorCode =
  | 'auth/email-already-in-use'
  | 'auth/invalid-credentials'
  | 'auth/invalid-email'
  | 'auth/email-not-verified'
  | 'auth/firebase-not-configured'
  | 'auth/not-initialized'
  | 'auth/terms-required'
  | 'auth/user-not-found'
  | 'auth/weak-password';

export type AuthService = {
  changePassword: (payload: ChangePasswordPayload) => Promise<void>;
  getCurrentSession: () => Promise<AuthSession | null>;
  login: (credentials: LoginCredentials) => Promise<AuthResult>;
  logout: () => Promise<void>;
  requestPasswordReset: (payload: PasswordResetPayload) => Promise<void>;
  resendVerificationEmail: (userId: string) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<AuthResult>;
  verifyEmail: (userId: string) => Promise<AuthResult>;
};

export type FieldErrors<Field extends string> = Partial<Record<Field, string>>;

export type LoginFormValues = LoginCredentials;
export type SignupFormValues = SignupPayload;
export type ForgotPasswordFormValues = PasswordResetPayload;
