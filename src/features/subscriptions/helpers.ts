import type { Certification, UserPlan } from '@/types';
import type { TestModeId } from '@/features/tests';

export const PLAN_ORDER: readonly UserPlan[] = ['Free', 'Silver', 'Gold'] as const;

export type PremiumFeature =
  | 'advancedAnalytics'
  | 'allCertifications'
  | 'certificateDownload'
  | 'fullMockExam'
  | 'premiumKnowledgeBase'
  | 'unlimitedCertificates';

export function getPlanRank(plan: UserPlan) {
  return PLAN_ORDER.indexOf(plan);
}

export function canUsePlan(currentPlan: UserPlan, requiredPlan: UserPlan) {
  return getPlanRank(currentPlan) >= getPlanRank(requiredPlan);
}

export function getRequiredPlanForFeature(feature: PremiumFeature): UserPlan {
  if (feature === 'advancedAnalytics' || feature === 'allCertifications' || feature === 'premiumKnowledgeBase') {
    return 'Gold';
  }

  return 'Silver';
}

export function canAccessFeature(plan: UserPlan, feature: PremiumFeature) {
  return canUsePlan(plan, getRequiredPlanForFeature(feature));
}

export function canStartTestMode(plan: UserPlan, mode: TestModeId) {
  if (mode === 'full-mock') {
    return canAccessFeature(plan, 'fullMockExam');
  }

  return true;
}

export function canAccessCertification(plan: UserPlan, certification: Certification) {
  if (certification.status === 'coming soon') {
    return false;
  }

  return canUsePlan(plan, certification.planRequirement);
}

export function getEffectiveCertificationStatus(plan: UserPlan, certification: Certification) {
  if (certification.status === 'coming soon') {
    return certification.status;
  }

  return canAccessCertification(plan, certification) ? 'active' : 'locked';
}

export function getPlanChangeVerb(currentPlan: UserPlan, nextPlan: UserPlan) {
  if (currentPlan === nextPlan) {
    return 'Current plan';
  }

  return getPlanRank(nextPlan) > getPlanRank(currentPlan) ? 'Upgrade' : 'Downgrade';
}

export function getRecommendedUpgradePlan(feature: PremiumFeature): UserPlan {
  return getRequiredPlanForFeature(feature);
}
