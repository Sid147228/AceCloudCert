import { DEFAULT_USER_ID } from '@/constants/app';
import { ADMIN_MOCK_MODE_STORAGE_KEY, LOCAL_MOCK_ADMIN_EMAIL, LOCAL_MOCK_ADMIN_PASSWORD } from '@/constants/admin';
import type { User as FirebaseUser } from 'firebase/auth';
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  getIdTokenResult,
  onAuthStateChanged,
  reauthenticateWithCredential,
  reload,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateProfile as updateFirebaseProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type {
  AuthErrorCode,
  AuthService,
  AuthSession,
  AuthUser,
  ChangePasswordPayload,
  LoginCredentials,
  PasswordResetPayload,
  SignupPayload
} from '@/features/auth/types';
import { normalizeEmail } from '@/features/auth/validation';
import { FIRESTORE_COLLECTIONS, getFirebaseAuthInstance, getFirebaseFirestoreInstance, isFirebaseBackendEnabled } from './firebase';
import { wrapFirebaseError } from './firebaseError';
import { fromFirestoreUserProfile, toFirestoreUserProfile } from './firestoreModels';
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

async function resolveFirebaseUser(): Promise<FirebaseUser | null> {
  const auth = getFirebaseAuthInstance();

  if (!auth) {
    return null;
  }

  if (auth.currentUser) {
    return auth.currentUser;
  }

  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      unsubscribe();
      resolve(null);
    }, 1500);

    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        clearTimeout(timeout);
        unsubscribe();
        resolve(user);
      },
      () => {
        clearTimeout(timeout);
        unsubscribe();
        resolve(null);
      }
    );
  });
}

async function getFirebaseRole(user: FirebaseUser): Promise<AuthUser['role']> {
  try {
    const token = await getIdTokenResult(user);
    return token.claims.role === 'admin' || token.claims.admin === true ? 'admin' : 'learner';
  } catch {
    return 'learner';
  }
}

async function toAuthUserFromFirebase(user: FirebaseUser, fallbackFullName?: string): Promise<AuthUser> {
  const db = getFirebaseFirestoreInstance();
  const role = await getFirebaseRole(user);
  const email = user.email ?? '';
  const createdAt = user.metadata.creationTime ? new Date(user.metadata.creationTime).toISOString() : new Date().toISOString();
  const lastLoginAt = user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).toISOString() : undefined;
  const fallbackAuthUser: AuthUser = {
    createdAt,
    email,
    emailVerified: user.emailVerified,
    fullName: fallbackFullName?.trim() || user.displayName || email.split('@')[0] || 'AceCloudCert Learner',
    id: user.uid,
    lastLoginAt,
    plan: 'Free',
    role
  };

  if (!db) {
    return fallbackAuthUser;
  }

  try {
    const snapshot = await getDoc(doc(db, FIRESTORE_COLLECTIONS.users, user.uid));

    if (!snapshot.exists()) {
      return fallbackAuthUser;
    }

    const profile = fromFirestoreUserProfile(user.uid, snapshot.data(), fallbackAuthUser);

    return {
      ...fallbackAuthUser,
      fullName: profile.fullName,
      plan: profile.plan
    };
  } catch {
    return fallbackAuthUser;
  }
}

async function upsertFirebaseUserProfile(user: FirebaseUser, fallbackFullName?: string) {
  const db = getFirebaseFirestoreInstance();

  if (!db) {
    return;
  }

  const authUser = await toAuthUserFromFirebase(user, fallbackFullName);
  const reference = doc(db, FIRESTORE_COLLECTIONS.users, user.uid);
  const snapshot = await getDoc(reference);
  const profile = snapshot.exists()
    ? fromFirestoreUserProfile(user.uid, snapshot.data(), authUser)
    : fromFirestoreUserProfile(user.uid, {}, authUser);

  await setDoc(reference, toFirestoreUserProfile(profile, authUser.role), { merge: true });
}

function ensureFirebaseAuth() {
  const auth = getFirebaseAuthInstance();

  if (!auth) {
    throw new AuthServiceError('auth/firebase-not-configured', 'Firebase Auth is not configured. Mock auth is being used instead.');
  }

  return auth;
}

function toPublicUser(record: LocalAuthRecord): AuthUser {
  const {
    passwordDigest: _passwordDigest,
    passwordResetRequestedAt: _passwordResetRequestedAt,
    verificationSentAt: _verificationSentAt,
    ...user
  } = record;
  return {
    ...user,
    role: user.role ?? 'learner'
  };
}

async function loadStore(): Promise<LocalAuthStore> {
  const stored = await storageService.getJson<LocalAuthStore>(AUTH_STORE_KEY);
  const seeded = await ensureMockAdminUser(ensureDemoUser(stored ?? { users: [] }));

  if (!stored || JSON.stringify(seeded.users) !== JSON.stringify(stored.users)) {
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
        plan: 'Free',
        role: 'learner'
      }
    ]
  };
}

function isLocalhostRuntime() {
  try {
    const hostname = globalThis.location?.hostname;
    return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
  } catch {
    return false;
  }
}

async function ensureMockAdminUser(store: LocalAuthStore): Promise<LocalAuthStore> {
  const mockAdminEnabled = isLocalhostRuntime() || (await storageService.getItem(ADMIN_MOCK_MODE_STORAGE_KEY)) === 'true';

  if (!mockAdminEnabled) {
    return store;
  }

  const normalizedAdminEmail = normalizeEmail(LOCAL_MOCK_ADMIN_EMAIL);

  if (store.users.some((user) => normalizeEmail(user.email) === normalizedAdminEmail)) {
    return {
      users: store.users.map((user) =>
        normalizeEmail(user.email) === normalizedAdminEmail
          ? {
              ...user,
              emailVerified: true,
              plan: 'Gold',
              role: 'admin'
            }
          : user
      )
    };
  }

  return {
    users: [
      ...store.users,
      {
        createdAt: new Date().toISOString(),
        email: LOCAL_MOCK_ADMIN_EMAIL,
        emailVerified: true,
        fullName: 'AceCloudCert Admin',
        id: 'local-admin-user',
        lastLoginAt: new Date().toISOString(),
        passwordDigest: createPasswordDigest(LOCAL_MOCK_ADMIN_EMAIL, LOCAL_MOCK_ADMIN_PASSWORD),
        plan: 'Gold',
        role: 'admin'
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
  async changePassword(payload: ChangePasswordPayload) {
    if (isFirebaseBackendEnabled()) {
      try {
        const user = await resolveFirebaseUser();

        if (!user || user.uid !== payload.userId || !user.email) {
          throw new AuthServiceError('auth/user-not-found', 'We could not find the signed-in Firebase account.');
        }

        await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, payload.currentPassword));
        await updatePassword(user, payload.newPassword);
        return;
      } catch (error) {
        wrapFirebaseError('Change Firebase password', error);
      }
    }

    const store = await loadStore();
    const record = findUserById(store, payload.userId);

    if (!record) {
      throw new AuthServiceError('auth/user-not-found', 'We could not find that account.');
    }

    if (record.passwordDigest !== createPasswordDigest(record.email, payload.currentPassword)) {
      throw new AuthServiceError('auth/invalid-credentials', 'Current password is incorrect.');
    }

    await updateRecord({
      ...record,
      passwordDigest: createPasswordDigest(record.email, payload.newPassword)
    });
  },

  async getCurrentSession() {
    if (isFirebaseBackendEnabled()) {
      try {
        const user = await resolveFirebaseUser();

        if (!user) {
          memorySession = null;
          return null;
        }

        await upsertFirebaseUserProfile(user);
        const authUser = await toAuthUserFromFirebase(user);
        const session = createSession(authUser, true);

        memorySession = session;
        return session;
      } catch (error) {
        wrapFirebaseError('Restore Firebase session', error);
      }
    }

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
    if (isFirebaseBackendEnabled()) {
      try {
        const auth = ensureFirebaseAuth();
        const result = await signInWithEmailAndPassword(auth, normalizeEmail(credentials.email), credentials.password);
        await upsertFirebaseUserProfile(result.user);
        const user = await toAuthUserFromFirebase(result.user);
        const session = createSession(user, credentials.rememberMe);

        memorySession = session;
        return { session, user };
      } catch (error) {
        wrapFirebaseError('Firebase login', error);
      }
    }

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
    if (isFirebaseBackendEnabled()) {
      try {
        const auth = ensureFirebaseAuth();
        await signOut(auth);
      } catch (error) {
        wrapFirebaseError('Firebase logout', error);
      }
    }

    memorySession = null;
    await storageService.removeItem(AUTH_SESSION_KEY);
  },

  async requestPasswordReset(payload: PasswordResetPayload) {
    if (isFirebaseBackendEnabled()) {
      try {
        const auth = ensureFirebaseAuth();
        await sendPasswordResetEmail(auth, normalizeEmail(payload.email));
        return;
      } catch (error) {
        wrapFirebaseError('Send Firebase password reset email', error);
      }
    }

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
    if (isFirebaseBackendEnabled()) {
      try {
        const user = await resolveFirebaseUser();

        if (!user || user.uid !== userId) {
          throw new AuthServiceError('auth/user-not-found', 'We could not find the signed-in Firebase account.');
        }

        await sendEmailVerification(user);
        return;
      } catch (error) {
        wrapFirebaseError('Resend Firebase verification email', error);
      }
    }

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
    if (isFirebaseBackendEnabled()) {
      try {
        if (!payload.acceptedTerms) {
          throw new AuthServiceError('auth/terms-required', 'Terms acceptance is required.');
        }

        const auth = ensureFirebaseAuth();
        const result = await createUserWithEmailAndPassword(auth, normalizeEmail(payload.email), payload.password);
        await updateFirebaseProfile(result.user, { displayName: payload.fullName.trim() });
        await sendEmailVerification(result.user);
        await upsertFirebaseUserProfile(result.user, payload.fullName);

        const user = await toAuthUserFromFirebase(result.user, payload.fullName);
        const session = createSession(user, true);

        memorySession = session;
        return { session, user };
      } catch (error) {
        wrapFirebaseError('Firebase signup', error);
      }
    }

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
      role: 'learner',
      verificationSentAt: now
    };

    await saveStore({ users: [...store.users, record] });

    const user = toPublicUser(record);
    const session = createSession(user, true);

    await persistSession(session);

    return { session, user };
  },

  async verifyEmail(userId: string) {
    if (isFirebaseBackendEnabled()) {
      try {
        const user = await resolveFirebaseUser();

        if (!user || user.uid !== userId) {
          throw new AuthServiceError('auth/user-not-found', 'We could not find the signed-in Firebase account.');
        }

        await reload(user);

        if (!user.emailVerified) {
          throw new AuthServiceError(
            'auth/email-not-verified',
            'Your Firebase email address is not verified yet. Open the verification link from your inbox, then try again.'
          );
        }

        await upsertFirebaseUserProfile(user);
        const authUser = await toAuthUserFromFirebase(user);
        const session = createSession(authUser, true);

        memorySession = session;
        return { session, user: authUser };
      } catch (error) {
        wrapFirebaseError('Verify Firebase email', error);
      }
    }

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
