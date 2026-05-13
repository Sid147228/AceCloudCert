import { DEFAULT_USER_ID } from '@/constants/app';
import type {
  AuthErrorCode,
  AuthService,
  AuthSession,
  AuthUser,
  LoginCredentials,
  PasswordResetPayload,
  SignupPayload
} from '@/features/auth/types';
import { normalizeEmail } from '@/features/auth/validation';
import { storageService } from './storageService';

type LocalAuthRecord = AuthUser & {
  passwordDigest: string;
  verificationSentAt?: string;
  passwordResetRequestedAt?: string;
};

type LocalAuthStore = {
  users: readonly LocalAuthRecord[];
};

const AUTH_STORE_KEY = 'acecloudcert.auth.users.v1';
const AUTH_SESSION_KEY = 'acecloudcert.auth.session.v1';
const DEMO_EMAIL = 'learner@acecloudcert.com';
const DEMO_PASSWORD = 'password123';

let memorySession: AuthSession | null = null;

export class AuthServiceError extends Error {
  code: AuthErrorCode;

  constructor(code: AuthErrorCode, message: string) {
    super(message);
    this.code = code;
  }
}

function createPasswordDigest(email: string, password: string) {
  const source = `${normalizeEmail(email)}:${password}`;
  let hash = 5381;

  for (let index = 0; index < source.length; index += 1) {
    hash = (hash * 33) ^ source.charCodeAt(index);
  }

  return `local-${(hash >>> 0).toString(36)}`;
}

function createSession(user: AuthUser, rememberMe: boolean): AuthSession {
  return {
    createdAt: new Date().toISOString(),
    rememberMe,
    token: `local-session-${user.id}-${Date.now()}`,
    user
  };
}

function toPublicUser(record: LocalAuthRecord): AuthUser {
  const {
    passwordDigest: _passwordDigest,
    passwordResetRequestedAt: _passwordResetRequestedAt,
    verificationSentAt: _verificationSentAt,
    ...user
  } = record;
  return user;
}

async function loadStore(): Promise<LocalAuthStore> {
  const stored = await storageService.getJson<LocalAuthStore>(AUTH_STORE_KEY);
  const seeded = ensureDemoUser(stored ?? { users: [] });

  if (!stored || seeded.users.length !== stored.users.length) {
    await saveStore(seeded);
  }

  return seeded;
}

async function saveStore(store: LocalAuthStore) {
  await storageService.setJson(AUTH_STORE_KEY, store);
}

function ensureDemoUser(store: LocalAuthStore): LocalAuthStore {
  const normalizedDemoEmail = normalizeEmail(DEMO_EMAIL);

  if (store.users.some((user) => normalizeEmail(user.email) === normalizedDemoEmail)) {
    return store;
  }

  return {
    users: [
      ...store.users,
      {
        createdAt: new Date().toISOString(),
        email: DEMO_EMAIL,
        emailVerified: true,
        fullName: 'AceCloudCert Learner',
        id: DEFAULT_USER_ID,
        lastLoginAt: new Date().toISOString(),
        passwordDigest: createPasswordDigest(DEMO_EMAIL, DEMO_PASSWORD),
        plan: 'Free'
      }
    ]
  };
}

function findUserByEmail(store: LocalAuthStore, email: string) {
  const normalizedEmail = normalizeEmail(email);
  return store.users.find((user) => normalizeEmail(user.email) === normalizedEmail);
}

function findUserById(store: LocalAuthStore, userId: string) {
  return store.users.find((user) => user.id === userId);
}

async function persistSession(session: AuthSession) {
  memorySession = session;

  if (session.rememberMe) {
    await storageService.setJson(AUTH_SESSION_KEY, session);
    return;
  }

  await storageService.removeItem(AUTH_SESSION_KEY);
}

async function updateRecord(updatedRecord: LocalAuthRecord) {
  const store = await loadStore();
  const users = store.users.map((user) => (user.id === updatedRecord.id ? updatedRecord : user));

  await saveStore({ users });
  return updatedRecord;
}

export const authService: AuthService = {
  async getCurrentSession() {
    const storedSession = memorySession ?? (await storageService.getJson<AuthSession>(AUTH_SESSION_KEY));

    if (!storedSession) {
      return null;
    }

    const store = await loadStore();
    const record = findUserById(store, storedSession.user.id);

    if (!record) {
      await storageService.removeItem(AUTH_SESSION_KEY);
      memorySession = null;
      return null;
    }

    const refreshedSession = {
      ...storedSession,
      user: toPublicUser(record)
    };

    memorySession = refreshedSession;
    return refreshedSession;
  },

  async login(credentials: LoginCredentials) {
    const store = await loadStore();
    const record = findUserByEmail(store, credentials.email);

    if (!record || record.passwordDigest !== createPasswordDigest(credentials.email, credentials.password)) {
      throw new AuthServiceError('auth/invalid-credentials', 'Email or password is incorrect.');
    }

    const updatedRecord = await updateRecord({
      ...record,
      lastLoginAt: new Date().toISOString()
    });
    const user = toPublicUser(updatedRecord);
    const session = createSession(user, credentials.rememberMe);

    await persistSession(session);

    return { session, user };
  },

  async logout() {
    memorySession = null;
    await storageService.removeItem(AUTH_SESSION_KEY);
  },

  async requestPasswordReset(payload: PasswordResetPayload) {
    const store = await loadStore();
    const record = findUserByEmail(store, payload.email);

    if (!record) {
      return;
    }

    await updateRecord({
      ...record,
      passwordResetRequestedAt: new Date().toISOString()
    });
  },

  async resendVerificationEmail(userId: string) {
    const store = await loadStore();
    const record = findUserById(store, userId);

    if (!record) {
      throw new AuthServiceError('auth/user-not-found', 'We could not find that account.');
    }

    await updateRecord({
      ...record,
      verificationSentAt: new Date().toISOString()
    });
  },

  async signup(payload: SignupPayload) {
    const store = await loadStore();

    if (findUserByEmail(store, payload.email)) {
      throw new AuthServiceError('auth/email-already-in-use', 'An account already exists for this email.');
    }

    if (!payload.acceptedTerms) {
      throw new AuthServiceError('auth/terms-required', 'Terms acceptance is required.');
    }

    const normalizedEmail = normalizeEmail(payload.email);
    const now = new Date().toISOString();
    const record: LocalAuthRecord = {
      createdAt: now,
      email: normalizedEmail,
      emailVerified: false,
      fullName: payload.fullName.trim(),
      id: `local-user-${Date.now()}`,
      passwordDigest: createPasswordDigest(normalizedEmail, payload.password),
      plan: 'Free',
      verificationSentAt: now
    };

    await saveStore({ users: [...store.users, record] });

    const user = toPublicUser(record);
    const session = createSession(user, true);

    await persistSession(session);

    return { session, user };
  },

  async verifyEmail(userId: string) {
    const store = await loadStore();
    const record = findUserById(store, userId);

    if (!record) {
      throw new AuthServiceError('auth/user-not-found', 'We could not find that account.');
    }

    const updatedRecord = await updateRecord({
      ...record,
      emailVerified: true,
      lastLoginAt: new Date().toISOString()
    });
    const user = toPublicUser(updatedRecord);
    const session = createSession(user, true);

    await persistSession(session);

    return { session, user };
  }
};

export function getAuthErrorMessage(error: unknown) {
  if (error instanceof AuthServiceError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong. Please try again.';
}
