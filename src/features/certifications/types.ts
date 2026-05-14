import type { CertificationLevel, CertificationProvider } from '@/types';

export type CertificationProviderFilter = CertificationProvider | 'All';
export type CertificationLevelFilter = CertificationLevel | 'All';

export type CertificationFilters = {
  level: CertificationLevelFilter;
  provider: CertificationProviderFilter;
  search: string;
};
