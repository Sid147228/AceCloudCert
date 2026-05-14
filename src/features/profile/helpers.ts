import { certifications } from '@/data';
import type { ProfileStats, UserAccountProfile } from './types';

export function getActiveCertificationTitle(profile: UserAccountProfile) {
  return certifications.find((certification) => certification.id === profile.activeCertificationId)?.title ?? 'Not selected';
}

export function getProfileStats(profile: UserAccountProfile): ProfileStats {
  const completedTests = profile.learningHistory.filter((item) => item.mode !== 'Study Session');
  const averageScore =
    completedTests.length === 0
      ? 0
      : Math.round(completedTests.reduce((total, item) => total + item.score, 0) / completedTests.length);

  return {
    averageScore,
    certificatesEarned: profile.certificateHistory.length,
    testsCompleted: completedTests.length
  };
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(new Date(value));
}
