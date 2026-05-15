import type { SubscriptionPlan, SubscriptionPlanId, UserPlan } from '@/types';

export type PlanEntitlement =
  | 'limitedQuestions'
  | 'limitedQuizzes'
  | 'basicProgress'
  | 'fullQuestionBank'
  | 'fullMockExams'
  | 'certificates'
  | 'certificateDownload'
  | 'progressTracking'
  | 'advancedAnalytics'
  | 'allCertifications'
  | 'premiumKnowledgeBase'
  | 'unlimitedCertificates'
  | 'futureAiTutor';

export const STRIPE_CHECKOUT_API_PATH = '/api/stripe/checkout-session';

export const subscriptionPlans: readonly SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    tier: 'Free',
    interval: 'free',
    description: 'Starter access for learners validating the platform before committing to a certification path.',
    priceLabel: 'GBP 0',
    ctaLabel: 'Use Free',
    features: ['Limited questions', 'Limited quizzes', 'Basic progress'],
    limitations: ['No full mock exams', 'No certificate download', 'Premium certifications locked']
  },
  {
    id: 'silver-monthly',
    name: 'Silver Monthly',
    tier: 'Silver',
    interval: 'monthly',
    description: 'Monthly AWS Cloud Practitioner prep with the full question bank, mock exams, and certificates.',
    priceLabel: 'GBP 9.99/mo',
    ctaLabel: 'Upgrade monthly',
    features: ['Full AWS question bank', 'Full mock exams', 'Certificates', 'Progress tracking'],
    limitations: ['Advanced analytics reserved for Gold', 'Non-AWS certification access limited'],
    stripePriceEnvKey: 'STRIPE_PRICE_SILVER_MONTHLY',
    stripePriceLookupKey: 'acecloudcert_silver_monthly'
  },
  {
    id: 'silver-yearly',
    name: 'Silver Yearly',
    tier: 'Silver',
    interval: 'yearly',
    description: 'Annual Silver access for focused AWS learners who want a lower effective monthly cost.',
    priceLabel: 'GBP 99/year',
    ctaLabel: 'Upgrade yearly',
    features: ['Everything in Silver Monthly', 'Two months included compared with monthly billing', 'Certificate access'],
    limitations: ['Advanced analytics reserved for Gold', 'Non-AWS certification access limited'],
    stripePriceEnvKey: 'STRIPE_PRICE_SILVER_YEARLY',
    stripePriceLookupKey: 'acecloudcert_silver_yearly'
  },
  {
    id: 'gold-monthly',
    name: 'Gold Monthly',
    tier: 'Gold',
    interval: 'monthly',
    description: 'Monthly multi-certification plan for learners preparing across cloud and technology paths.',
    priceLabel: 'GBP 19.99/mo',
    ctaLabel: 'Upgrade monthly',
    features: ['All certifications', 'Advanced analytics', 'Premium knowledge base', 'Unlimited certificates'],
    limitations: ['Future AI tutor access is planned'],
    stripePriceEnvKey: 'STRIPE_PRICE_GOLD_MONTHLY',
    stripePriceLookupKey: 'acecloudcert_gold_monthly'
  },
  {
    id: 'gold-yearly',
    name: 'Gold Yearly',
    tier: 'Gold',
    interval: 'yearly',
    description: 'Annual premium access for serious learners who want all certification tracks and analytics.',
    priceLabel: 'GBP 199/year',
    ctaLabel: 'Upgrade yearly',
    features: [
      'Everything in Gold Monthly',
      'All certifications',
      'Advanced analytics',
      'Premium knowledge base',
      'Unlimited certificates',
      'Future AI tutor access'
    ],
    limitations: [],
    stripePriceEnvKey: 'STRIPE_PRICE_GOLD_YEARLY',
    stripePriceLookupKey: 'acecloudcert_gold_yearly'
  }
];

const fallbackSubscriptionPlan = subscriptionPlans[0] as SubscriptionPlan;

export const planEntitlements: Record<UserPlan, readonly PlanEntitlement[]> = {
  Free: ['limitedQuestions', 'limitedQuizzes', 'basicProgress'],
  Silver: [
    'fullQuestionBank',
    'fullMockExams',
    'certificates',
    'certificateDownload',
    'progressTracking'
  ],
  Gold: [
    'fullQuestionBank',
    'fullMockExams',
    'certificates',
    'certificateDownload',
    'progressTracking',
    'advancedAnalytics',
    'allCertifications',
    'premiumKnowledgeBase',
    'unlimitedCertificates',
    'futureAiTutor'
  ]
};

export function getSubscriptionPlan(planId: SubscriptionPlanId) {
  return subscriptionPlans.find((plan) => plan.id === planId) ?? fallbackSubscriptionPlan;
}

export function getDefaultPlanIdForTier(tier: UserPlan): SubscriptionPlanId {
  if (tier === 'Gold') {
    return 'gold-monthly';
  }

  if (tier === 'Silver') {
    return 'silver-monthly';
  }

  return 'free';
}

export function getPlanTier(planOrId: UserPlan | SubscriptionPlanId): UserPlan {
  if (planOrId === 'Free' || planOrId === 'Silver' || planOrId === 'Gold') {
    return planOrId;
  }

  return getSubscriptionPlan(planOrId).tier;
}
