import type { SubscriptionPlan } from '@/types';

export const subscriptionPlans: readonly SubscriptionPlan[] = [
  {
    id: 'Free',
    name: 'Free',
    description: 'Starter access for learners validating the platform before committing to a certification path.',
    priceLabel: 'GBP 0',
    ctaLabel: 'Downgrade to Free',
    features: ['Limited questions', 'Limited quizzes', 'Basic progress'],
    limitations: ['No full mock exams', 'No certificate download', 'Premium certifications locked']
  },
  {
    id: 'Silver',
    name: 'Silver',
    description: 'Best for AWS Cloud Practitioner learners who want the complete practice and certificate workflow.',
    priceLabel: 'GBP 9.99/mo',
    ctaLabel: 'Upgrade to Silver',
    features: ['Full AWS question bank', 'Full mock exams', 'Certificates', 'Progress tracking'],
    limitations: ['Advanced analytics reserved for Gold', 'Non-AWS certification access limited'],
    stripePriceLookupKey: 'acecloudcert_silver_monthly'
  },
  {
    id: 'Gold',
    name: 'Gold',
    description: 'Premium multi-certification plan for serious learners preparing across cloud and technology paths.',
    priceLabel: 'GBP 19.99/mo',
    ctaLabel: 'Upgrade to Gold',
    features: [
      'All certifications',
      'Advanced analytics',
      'Premium knowledge base',
      'Unlimited certificates',
      'Future AI tutor access'
    ],
    limitations: [],
    stripePriceLookupKey: 'acecloudcert_gold_monthly'
  }
];
