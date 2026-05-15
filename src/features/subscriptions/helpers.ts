import type { Certification, SubscriptionPlanId, UserPlan } from '@/types';
import type { TestModeId } from '@/features/tests';
import {
  getDefaultPlanIdForTier,
  getPlanTier,
  planEntitlements,
  type PlanEntitlement
} from './pricing';

export const PLAN_ORDER: readonly UserPlan[] = ['Free', 'Silver', 'Gold'] as const;

export type PremiumFeature =
  | 'advancedAnalytics'
  | 'allCertifications'
  | 'certificateDownload'
  | 'fullQuestionBank'
  | 'fullMockExam'
  | 'premiumKnowledgeBase'
  | 'unlimitedCertificates';

const premiumFeatureEntitlements: Record<PremiumFeature, PlanEntitlement> = {
  advancedAnalytics: 'advancedAnalytics',
  allCertifications: 'allCertifications',
  certificateDownload: 'certificateDownload',
  fullMockExam: 'fullMockExams',
  fullQuestionBank: 'fullQuestionBank',
  premiumKnowledgeBase: 'premiumKnowledgeBase',
  unlimitedCertificates: 'unlimitedCertificates'
};

export function getPlanRank(plan: UserPlan | SubscriptionPlanId) {
  return PLAN_ORDER.indexOf(getPlanTier(plan));
}

export function getEntitlementsForPlan(plan: UserPlan | SubscriptionPlanId): readonly PlanEntitlement[] {
  return planEntitlements[getPlanTier(plan)];
}

export function hasEntitlement(plan: UserPlan | SubscriptionPlanId, entitlement: PlanEntitlement) {
  return getEntitlementsForPlan(plan).includes(entitlement);
}

export function canUsePlan(currentPlan: UserPlan | SubscriptionPlanId, requiredPlan: UserPlan) {
  return getPlanRank(currentPlan) >= getPlanRank(requiredPlan);
}

export function getRequiredPlanForFeature(feature: PremiumFeature): UserPlan {
  if (feature === 'advancedAnalytics' || feature === 'allCertifications' || feature === 'premiumKnowledgeBase') {
    return 'Gold';
  }

  return 'Silver';
}

export function canAccessFeature(plan: UserPlan | SubscriptionPlanId, feature: PremiumFeature) {
  return hasEntitlement(plan, premiumFeatureEntitlements[feature]);
}

export function canStartTestMode(plan: UserPlan | SubscriptionPlanId, mode: TestModeId) {
  if (mode === 'full-mock') {
    return canAccessFeature(plan, 'fullMockExam');
  }

  return true;
}

export function canAccessCertification(plan: UserPlan | SubscriptionPlanId, certification: Certification) {
  if (certification.status === 'coming soon') {
    return false;
  }

  if (certification.planRequirement === 'Gold') {
    return canAccessFeature(plan, 'allCertifications');
  }

  if (certification.planRequirement === 'Silver') {
    return canAccessFeature(plan, 'fullQuestionBank');
  }

  return canUsePlan(plan, certification.planRequirement);
}

export function getEffectiveCertificationStatus(plan: UserPlan | SubscriptionPlanId, certification: Certification) {
  if (certification.status === 'coming soon') {
    return certification.status;
  }

  return canAccessCertification(plan, certification) ? 'active' : 'locked';
}

export function getPlanChangeVerb(currentPlan: UserPlan | SubscriptionPlanId, nextPlan: UserPlan | SubscriptionPlanId) {
  if (getPlanTier(currentPlan) === getPlanTier(nextPlan)) {
    return 'Current plan';
  }

  return getPlanRank(nextPlan) > getPlanRank(currentPlan) ? 'Upgrade' : 'Downgrade';
}

export function getRecommendedUpgradePlan(feature: PremiumFeature): SubscriptionPlanId {
  return getDefaultPlanIdForTier(getRequiredPlanForFeature(feature));
}
