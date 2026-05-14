import type { Certification } from '@/types';
import type { CertificationFilters } from './types';

export function getCertificationStatusTone(status: Certification['status']) {
  if (status === 'active') return 'success';
  if (status === 'locked') return 'danger';
  return 'neutral';
}

export function getCertificationCtaLabel(certification: Certification) {
  if (certification.status === 'active') {
    return 'Start learning';
  }

  if (certification.status === 'locked') {
    return `Upgrade to ${certification.planRequirement}`;
  }

  return 'View roadmap';
}

export function filterCertifications(certifications: readonly Certification[], filters: CertificationFilters) {
  const normalizedSearch = filters.search.trim().toLowerCase();

  return certifications.filter((certification) => {
    const matchesProvider = filters.provider === 'All' || certification.provider === filters.provider;
    const matchesLevel = filters.level === 'All' || certification.level === filters.level;
    const searchableText = [
      certification.name,
      certification.provider,
      certification.level,
      certification.examCode,
      certification.description,
      certification.domains.join(' ')
    ]
      .join(' ')
      .toLowerCase();
    const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch);

    return matchesProvider && matchesLevel && matchesSearch;
  });
}
