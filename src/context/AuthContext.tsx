import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type {
  AuthAction,
  AuthSession,
  AuthStatus,
  AuthUser,
  LoginCredentials,
  PasswordResetPayload,
  SignupPayload
} from '@/features/auth/types';
import { authService, getAuthErrorMessage } from '@/services';

type AuthContextValue = {
  clearError: () => void;
  errorMessage?: string;
  forgotPassword: (payload: PasswordResetPayload) => Promise<void>;
  isAuthenticated: boolean;
  isInitializing: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthUser>;
  logout: () => Promise<void>;
  pendingAction?: AuthAction;
  resendVerificationEmail: () => Promise<void>;
  session: AuthSession | null;
  signup: (payload: SignupPayload) => Promise<AuthUser>;
  status: AuthStatus;
  user: AuthUser | null;
  verifyEmail: () => Promise<AuthUser>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function resolveStatus(user: AuthUser | null): AuthStatus {
  if (!user) {
    return 'unauthenticated';
  }

  return user.emailVerified ? 'authenticated' : 'verification-required';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [pendingAction, setPendingAction] = useState<AuthAction | undefined>('initialize');
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const applySession = useCallback((nextSession: AuthSession | null) => {
    setSession(nextSession);
    setStatus(resolveStatus(nextSession?.user ?? null));
  }, []);

  const runAuthAction = useCallback(
    async <Result,>(action: AuthAction, task: () => Promise<Result>) => {
      setPendingAction(action);
      setErrorMessage(undefined);

      try {
        return await task();
      } catch (error) {
        const message = getAuthErrorMessage(error);
        setErrorMessage(message);
        throw error;
      } finally {
        setPendingAction(undefined);
      }
    },
    []
  );

  useEffect(() => {
    let active = true;

    void runAuthAction('initialize', async () => {
      const currentSession = await authService.getCurrentSession();

      if (active) {
        applySession(currentSession);
      }
    }).catch(() => {
      if (active) {
        applySession(null);
      }
    });

    return () => {
      active = false;
    };
  }, [applySession, runAuthAction]);

  const value = useMemo<AuthContextValue>(
    () => ({
      clearError: () => setErrorMessage(undefined),
      errorMessage,
      forgotPassword: async (payload) => {
        await runAuthAction('forgot-password', () => authService.requestPasswordReset(payload));
      },
      isAuthenticated: status === 'authenticated',
      isInitializing: status === 'loading',
      login: async (credentials) => {
        const result = await runAuthAction('login', () => authService.login(credentials));
        applySession(result.session);
        return result.user;
      },
      logout: async () => {
        await runAuthAction('logout', () => authService.logout());
        applySession(null);
      },
      pendingAction,
      resendVerificationEmail: async () => {
        if (!session?.user) {
          return;
        }

        await runAuthAction('resend-verification', () => authService.resendVerificationEmail(session.user.id));
      },
      session,
      signup: async (payload) => {
        const result = await runAuthAction('signup', () => authService.signup(payload));
        applySession(result.session);
        return result.user;
      },
      status,
      user: session?.user ?? null,
      verifyEmail: async () => {
        if (!session?.user) {
          throw new Error('No account is waiting for verification.');
        }

        const result = await runAuthAction('verify-email', () => authService.verifyEmail(session.user.id));
        applySession(result.session);
        return result.user;
      }
    }),
    [applySession, errorMessage, pendingAction, runAuthAction, session, status]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider.');
  }

  return context;
}
