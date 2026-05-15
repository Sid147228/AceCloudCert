import type { TestAttempt } from '@/features/tests';
import type { CertificateHistoryItem, LearningHistoryItem, UserAccountProfile } from '@/features/profile';
import type { AuthUser, UserRole } from '@/features/auth';
import type { CertificateRecord, Certification, Question, UserPlan } from '@/types';

const FIRESTORE_SCHEMA_VERSION = 1;

export type FirestoreDocumentBase = {
  createdAt: string;
  id: string;
  schemaVersion: number;
  updatedAt: string;
};

export type FirestoreUserProfileDocument = FirestoreDocumentBase & {
  activeCertificationId: string;
  certificateHistory: readonly CertificateHistoryItem[];
  email: string;
  fullName: string;
  joinedAt: string;
  learningHistory: readonly LearningHistoryItem[];
  plan: UserPlan;
  role: UserRole;
  settings: UserAccountProfile['settings'];
  userId: string;
};

export type FirestoreCertificationDocument = FirestoreDocumentBase & Certification;
export type FirestoreQuestionDocument = FirestoreDocumentBase & Question;

export type FirestoreTestAttemptDocument = FirestoreDocumentBase &
  TestAttempt & {
    status: 'completed';
  };

export type FirestoreCertificateDocument = FirestoreDocumentBase & CertificateRecord;

export type FirestoreSubscriptionDocument = FirestoreDocumentBase & {
  checkoutMode: 'mock' | 'stripe';
  currentPlan: UserPlan;
  nextPlan?: UserPlan;
  plan: UserPlan;
  provider: 'mock' | 'stripe';
  status: 'mock-active' | 'active' | 'cancelled' | 'past_due';
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  userId: string;
};

export function toFirestoreUserProfile(profile: UserAccountProfile, role: UserRole = 'learner'): FirestoreUserProfileDocument {
  const now = new Date().toISOString();

  return {
    ...profile,
    createdAt: profile.joinedAt,
    id: profile.userId,
    role,
    schemaVersion: FIRESTORE_SCHEMA_VERSION,
    updatedAt: profile.updatedAt || now
  };
}

export function fromFirestoreUserProfile(
  id: string,
  document: Partial<FirestoreUserProfileDocument>,
  fallbackUser?: AuthUser
): UserAccountProfile {
  const now = new Date().toISOString();

  return {
    activeCertificationId: document.activeCertificationId ?? 'aws-ccp',
    certificateHistory: document.certificateHistory ?? [],
    email: document.email ?? fallbackUser?.email ?? '',
    fullName: document.fullName ?? fallbackUser?.fullName ?? 'AceCloudCert Learner',
    joinedAt: document.joinedAt ?? fallbackUser?.createdAt ?? document.createdAt ?? now,
    learningHistory: document.learningHistory ?? [],
    plan: document.plan ?? fallbackUser?.plan ?? 'Free',
    settings: document.settings ?? {
      emailNotifications: true,
      productUpdates: false,
      studyReminders: true
    },
    updatedAt: document.updatedAt ?? now,
    userId: document.userId ?? id
  };
}

export function toFirestoreTestAttempt(attempt: TestAttempt): FirestoreTestAttemptDocument {
  const now = new Date().toISOString();

  return {
    ...attempt,
    createdAt: attempt.completedAt,
    id: attempt.id,
    schemaVersion: FIRESTORE_SCHEMA_VERSION,
    status: 'completed',
    updatedAt: now
  };
}

export function fromFirestoreTestAttempt(id: string, document: Partial<FirestoreTestAttemptDocument>): TestAttempt {
  return {
    answers: document.answers ?? {},
    certificationId: document.certificationId ?? 'aws-ccp',
    completedAt: document.completedAt ?? document.createdAt ?? new Date().toISOString(),
    correctCount: document.correctCount ?? 0,
    domain: document.domain,
    domainBreakdown: document.domainBreakdown ?? [],
    durationMinutes: document.durationMinutes ?? 0,
    id: document.id ?? id,
    incorrectCount: document.incorrectCount ?? 0,
    mode: document.mode ?? 'quick-quiz',
    passed: document.passed ?? false,
    passMark: document.passMark ?? 70,
    questionIds: document.questionIds ?? [],
    scorePercent: document.scorePercent ?? 0,
    timeTakenSeconds: document.timeTakenSeconds ?? 0,
    unansweredCount: document.unansweredCount ?? 0,
    userId: document.userId ?? ''
  };
}

export function toFirestoreCertificate(certificate: CertificateRecord): FirestoreCertificateDocument {
  const now = new Date().toISOString();

  return {
    ...certificate,
    createdAt: certificate.issuedAt,
    id: certificate.id,
    schemaVersion: FIRESTORE_SCHEMA_VERSION,
    updatedAt: now
  };
}

export function fromFirestoreCertificate(id: string, document: Partial<FirestoreCertificateDocument>): CertificateRecord {
  return {
    certificateId: document.certificateId ?? id,
    certificationId: document.certificationId ?? 'aws-ccp',
    certificationName: document.certificationName ?? 'AWS Certified Cloud Practitioner',
    id: document.id ?? id,
    issuedAt: document.issuedAt ?? document.createdAt ?? new Date().toISOString(),
    score: document.score ?? 0,
    sourceAttemptId: document.sourceAttemptId,
    userId: document.userId ?? '',
    userName: document.userName ?? 'AceCloudCert Learner',
    verificationUrl: document.verificationUrl ?? ''
  };
}

export function fromFirestoreCertification(id: string, document: Partial<FirestoreCertificationDocument>): Certification {
  return {
    description: document.description ?? '',
    difficulty: document.difficulty ?? 'Beginner',
    domains: document.domains ?? [],
    estimatedStudyHours: document.estimatedStudyHours ?? 0,
    examCode: document.examCode ?? '',
    id: document.id ?? id,
    level: document.level ?? 'Foundational',
    name: document.name ?? 'Certification',
    planRequirement: document.planRequirement ?? 'Free',
    progress: document.progress ?? 0,
    provider: document.provider ?? 'AWS',
    questionCount: document.questionCount ?? 0,
    status: document.status ?? 'coming soon'
  };
}

export function fromFirestoreQuestion(id: string, document: Partial<FirestoreQuestionDocument>): Question {
  return {
    certificationId: document.certificationId ?? 'aws-ccp',
    correctOptionId: document.correctOptionId ?? 'a',
    createdAt: document.createdAt ?? new Date().toISOString(),
    difficulty: document.difficulty ?? 'easy',
    domain: document.domain ?? 'General',
    explanation: document.explanation ?? '',
    id: document.id ?? id,
    isPremium: document.isPremium ?? false,
    options: document.options ?? [],
    questionText: document.questionText ?? '',
    reference: document.reference ?? '',
    subDomain: document.subDomain ?? '',
    tags: document.tags ?? [],
    updatedAt: document.updatedAt ?? document.createdAt ?? new Date().toISOString()
  };
}

export function toFirestoreSubscription(
  userId: string,
  currentPlan: UserPlan,
  nextPlan: UserPlan,
  checkoutMode: 'mock' | 'stripe' = 'mock'
): FirestoreSubscriptionDocument {
  const now = new Date().toISOString();

  return {
    checkoutMode,
    createdAt: now,
    currentPlan,
    id: userId,
    nextPlan,
    plan: nextPlan,
    provider: checkoutMode,
    schemaVersion: FIRESTORE_SCHEMA_VERSION,
    status: checkoutMode === 'mock' ? 'mock-active' : 'active',
    updatedAt: now,
    userId
  };
}
