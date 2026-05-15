import type { ServiceReadinessItem } from '@/types';

export const serviceReadiness: readonly ServiceReadinessItem[] = [
  {
    name: 'Firebase Auth',
    purpose: 'Learner identity, password reset, email verification, and session persistence.',
    requiredConfiguration: [
      'EXPO_PUBLIC_BACKEND_MODE=firebase',
      'EXPO_PUBLIC_FIREBASE_API_KEY',
      'EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN',
      'EXPO_PUBLIC_FIREBASE_PROJECT_ID',
      'EXPO_PUBLIC_FIREBASE_APP_ID'
    ]
  },
  {
    name: 'Firestore',
    purpose: 'Profiles, attempts, progress, certificates, question metadata, and entitlement records.',
    requiredConfiguration: [
      'Collections: users, certifications, questions, testAttempts, certificates, subscriptions',
      'Firestore security rules',
      'Composite indexes for attempts and certificates'
    ]
  },
  {
    name: 'Firebase Storage',
    purpose: 'Certificate exports and learner-owned downloadable assets.',
    requiredConfiguration: ['EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET', 'Storage rules scoped by authenticated user id']
  },
  {
    name: 'Stripe Billing',
    purpose: 'Checkout, customer portal, subscription lifecycle, and premium entitlement enforcement.',
    requiredConfiguration: [
      'Server-only STRIPE_SECRET_KEY',
      'Server-only STRIPE_WEBHOOK_SECRET',
      'Stripe price ids for Silver Monthly, Silver Yearly, Gold Monthly, and Gold Yearly',
      'Webhook handler for checkout and subscription lifecycle events'
    ]
  },
  {
    name: 'Admin RBAC',
    purpose: 'Role claims, admin-only content operations, user lookup, and cross-user analytics.',
    requiredConfiguration: ['Custom admin claims', 'Firestore admin rules', 'Audit log collection']
  }
];
