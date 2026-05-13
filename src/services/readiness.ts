import type { ServiceReadinessItem } from '@/types';

export const serviceReadiness: readonly ServiceReadinessItem[] = [
  {
    name: 'Firebase Auth',
    purpose: 'Learner identity, password reset, email verification, and session persistence.',
    requiredConfiguration: ['EXPO_PUBLIC_FIREBASE_API_KEY', 'EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN', 'EXPO_PUBLIC_FIREBASE_PROJECT_ID']
  },
  {
    name: 'Firestore',
    purpose: 'Profiles, attempts, progress, certificates, question metadata, and entitlement records.',
    requiredConfiguration: ['Firestore security rules', 'Composite indexes for attempts and progress']
  },
  {
    name: 'Firebase Storage',
    purpose: 'Certificate exports and learner-owned downloadable assets.',
    requiredConfiguration: ['Storage rules scoped by authenticated user id']
  },
  {
    name: 'Stripe Billing',
    purpose: 'Checkout, customer portal, subscription lifecycle, and premium entitlement enforcement.',
    requiredConfiguration: ['STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET', 'Price ids for Silver and Gold']
  }
];
