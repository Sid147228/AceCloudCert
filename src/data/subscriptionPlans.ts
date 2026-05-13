import type { SubscriptionPlan } from '@/types';

export const subscriptionPlans: readonly SubscriptionPlan[] = [
  {
    id: 'Free',
    name: 'Free',
    priceLabel: 'GBP 0',
    features: ['Limited question bank', 'Basic quizzes', 'Basic progress tracking']
  },
  {
    id: 'Silver',
    name: 'Silver',
    priceLabel: 'GBP 9.99/mo',
    features: ['Full AWS CCP bank', 'Mock exams', 'Progress tracking', 'Certificate access']
  },
  {
    id: 'Gold',
    name: 'Gold',
    priceLabel: 'GBP 19.99/mo',
    features: ['Everything in Silver', 'Advanced analytics', 'All certifications', 'Premium study material']
  }
];
