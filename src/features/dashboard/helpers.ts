import { DEFAULT_CERTIFICATION_ID, PASS_MARK_PERCENT } from '@/constants/app';
import type { TestAnalytics } from '@/features/tests';
import type { UserAccountProfile } from '@/features/profile';
import type { Certification, KnowledgeTopic } from '@/types';
import { clamp } from '@/utils';

export type DashboardOverview = {
  activeCertification: Certification;
  certificatesEarned: number;
  completedStudyTopics: number;
  progressPercent: number;
  recommendedLesson?: KnowledgeTopic;
  totalStudyTopics: number;
  weakAreas: TestAnalytics['domainPerformance'];
};

type DashboardOverviewInput = {
  analytics: TestAnalytics;
  certifications: readonly Certification[];
  knowledgeTopics: readonly KnowledgeTopic[];
  profile: UserAccountProfile;
};

export function buildDashboardOverview({
  analytics,
  certifications,
  knowledgeTopics,
  profile
}: DashboardOverviewInput): DashboardOverview {
  const activeCertification =
    certifications.find((certification) => certification.id === profile.activeCertificationId) ??
    certifications.find((certification) => certification.id === DEFAULT_CERTIFICATION_ID) ??
    certifications[0];

  if (!activeCertification) {
    throw new Error('Dashboard requires at least one certification.');
  }

  const activeTopics = knowledgeTopics.filter((topic) => topic.certificationId === activeCertification.id);
  const completedStudyTopics = getCompletedStudyTopicCount(profile, activeTopics);
  const certificatesEarned = profile.certificateHistory.filter(
    (certificate) => certificate.certificationId === activeCertification.id
  ).length;

  return {
    activeCertification,
    certificatesEarned,
    completedStudyTopics,
    progressPercent: calculateLearningProgress({
      analytics,
      certificatesEarned,
      completedStudyTopics,
      totalStudyTopics: activeTopics.length
    }),
    recommendedLesson: getRecommendedLesson(analytics, activeTopics, profile),
    totalStudyTopics: activeTopics.length,
    weakAreas: getWeakAreas(analytics)
  };
}

function calculateLearningProgress({
  analytics,
  certificatesEarned,
  completedStudyTopics,
  totalStudyTopics
}: {
  analytics: TestAnalytics;
  certificatesEarned: number;
  completedStudyTopics: number;
  totalStudyTopics: number;
}) {
  const topicProgress = totalStudyTopics === 0 ? 0 : (completedStudyTopics / totalStudyTopics) * 30;
  const attemptProgress = Math.min(25, analytics.testsCompleted * 5);
  const scoreProgress = analytics.averageScore === 0 ? 0 : (analytics.averageScore / 100) * 35;
  const certificateProgress = certificatesEarned > 0 ? 10 : 0;

  return Math.round(clamp(topicProgress + attemptProgress + scoreProgress + certificateProgress));
}

function getCompletedStudyTopicCount(profile: UserAccountProfile, topics: readonly KnowledgeTopic[]) {
  return getCompletedStudyTopicIds(profile, topics).size;
}

function getCompletedStudyTopicIds(profile: UserAccountProfile, topics: readonly KnowledgeTopic[]) {
  const completedTopicIds = new Set<string>();
  const studySessions = profile.learningHistory.filter(
    (item) => item.certificationId === profile.activeCertificationId && item.mode === 'Study Session'
  );

  topics.forEach((topic) => {
    const normalizedTopicTitle = normalizeText(topic.title);
    const hasCompletedTopic = studySessions.some((item) => {
      const normalizedHistoryTitle = normalizeText(item.title);
      return item.id.includes(topic.id) || normalizedHistoryTitle.includes(normalizedTopicTitle);
    });

    if (hasCompletedTopic) {
      completedTopicIds.add(topic.id);
    }
  });

  return completedTopicIds;
}

function getRecommendedLesson(
  analytics: TestAnalytics,
  topics: readonly KnowledgeTopic[],
  profile: UserAccountProfile
) {
  const weakestDomain = analytics.weakestDomain?.domain;
  const completedTopicIds = getCompletedStudyTopicIds(profile, topics);

  if (weakestDomain) {
    const weaknessTopic = topics.find((topic) => topic.category === weakestDomain);

    if (weaknessTopic) {
      return weaknessTopic;
    }
  }

  return topics.find((topic) => !completedTopicIds.has(topic.id)) ?? topics[0];
}

function getWeakAreas(analytics: TestAnalytics) {
  return analytics.domainPerformance
    .filter((domain) => domain.total > 0 && domain.scorePercent < PASS_MARK_PERCENT)
    .slice(0, 3);
}

function normalizeText(value: string) {
  return value.trim().toLowerCase();
}
