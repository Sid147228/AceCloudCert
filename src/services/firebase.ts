import type { FirebaseApp, FirebaseOptions } from 'firebase/app';
import { getApp, getApps, initializeApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

export const FIRESTORE_COLLECTIONS = {
  users: 'users',
  certifications: 'certifications',
  questions: 'questions',
  testAttempts: 'testAttempts',
  certificates: 'certificates',
  subscriptions: 'subscriptions'
} as const;

export type FirestoreCollectionName = (typeof FIRESTORE_COLLECTIONS)[keyof typeof FIRESTORE_COLLECTIONS];
export type BackendMode = 'firebase' | 'mock';

export type FirebaseBackendStatus = {
  configured: boolean;
  missingEnv: readonly string[];
  mode: BackendMode;
  reason: string;
};

const firebaseEnv = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET
};

const requiredFirebaseEnv = [
  'EXPO_PUBLIC_FIREBASE_API_KEY',
  'EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'EXPO_PUBLIC_FIREBASE_PROJECT_ID',
  'EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'EXPO_PUBLIC_FIREBASE_APP_ID'
] as const;

let firebaseApp: FirebaseApp | null = null;
let firebaseAuth: Auth | null = null;
let firebaseDb: Firestore | null = null;

function getMissingFirebaseEnv() {
  const envByName: Record<(typeof requiredFirebaseEnv)[number], string | undefined> = {
    EXPO_PUBLIC_FIREBASE_API_KEY: firebaseEnv.apiKey,
    EXPO_PUBLIC_FIREBASE_APP_ID: firebaseEnv.appId,
    EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN: firebaseEnv.authDomain,
    EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: firebaseEnv.messagingSenderId,
    EXPO_PUBLIC_FIREBASE_PROJECT_ID: firebaseEnv.projectId,
    EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET: firebaseEnv.storageBucket
  };

  return requiredFirebaseEnv.filter((name) => !envByName[name]);
}

function buildFirebaseOptions(): FirebaseOptions {
  return {
    apiKey: firebaseEnv.apiKey,
    appId: firebaseEnv.appId,
    authDomain: firebaseEnv.authDomain,
    measurementId: firebaseEnv.measurementId,
    messagingSenderId: firebaseEnv.messagingSenderId,
    projectId: firebaseEnv.projectId,
    storageBucket: firebaseEnv.storageBucket
  };
}

export function getFirebaseBackendStatus(): FirebaseBackendStatus {
  const missingEnv = getMissingFirebaseEnv();
  const configured = missingEnv.length === 0;
  const requestedMode = process.env.EXPO_PUBLIC_BACKEND_MODE;

  if (requestedMode === 'firebase' && configured) {
    return {
      configured,
      missingEnv,
      mode: 'firebase',
      reason: 'Firebase backend mode is enabled.'
    };
  }

  if (requestedMode === 'firebase') {
    return {
      configured,
      missingEnv,
      mode: 'mock',
      reason: `Firebase backend mode was requested but is missing: ${missingEnv.join(', ')}.`
    };
  }

  return {
    configured,
    missingEnv,
    mode: 'mock',
    reason: 'Mock backend mode is active. Set EXPO_PUBLIC_BACKEND_MODE=firebase and provide Firebase env vars to enable Firestore.'
  };
}

export function isFirebaseBackendEnabled() {
  return getFirebaseBackendStatus().mode === 'firebase';
}

export function getFirebaseAppInstance() {
  if (!isFirebaseBackendEnabled()) {
    return null;
  }

  if (firebaseApp) {
    return firebaseApp;
  }

  firebaseApp = getApps().length > 0 ? getApp() : initializeApp(buildFirebaseOptions());
  return firebaseApp;
}

export function getFirebaseAuthInstance() {
  const app = getFirebaseAppInstance();

  if (!app) {
    return null;
  }

  firebaseAuth = firebaseAuth ?? getAuth(app);
  return firebaseAuth;
}

export function getFirebaseFirestoreInstance() {
  const app = getFirebaseAppInstance();

  if (!app) {
    return null;
  }

  firebaseDb = firebaseDb ?? getFirestore(app);
  return firebaseDb;
}
