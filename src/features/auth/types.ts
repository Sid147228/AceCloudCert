import type { UserPlan } from '@/types';

export type AuthStatus = 'loading' | 'unauthenticated' | 'verification-required' | 'authenticated';

export type AuthAction =
  | 'initialize'
  | 'login'
  | 'signup'
  | 'forgot-password'
  | 'resend-verification'
  | 'verify-email'
  | 'logout';

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  emailVerified: boolean;
  plan: UserPlan;
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

export type AuthResult = {
  session: AuthSession;
  user: AuthUser;
};

export type AuthErrorCode =
  | 'auth/email-already-in-use'
  | 'auth/invalid-credentials'
  | 'auth/invalid-email'
  | 'auth/not-initialized'
  | 'auth/terms-required'
  | 'auth/user-not-found'
  | 'auth/weak-password';

export type AuthService = {
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
