import { StyleSheet, View } from 'react-native';
import { EmptyState } from '@/components/ui';
import { certifications } from '@/data';
import type { Certification, UserPlan } from '@/types';
import { theme } from '@/constants/theme';
import { filterCertifications } from '../helpers';
import type { CertificationFilters as Filters } from '../types';
import { CertificationCard } from './CertificationCard';
import { CertificationFilters } from './CertificationFilters';

type CertificationCatalogueProps = {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onOpenCertification: (certification: Certification) => void;
  onPrimaryAction: (certification: Certification) => void;
  plan: UserPlan;
};

export function CertificationCatalogue({
  filters,
  onFiltersChange,
  onOpenCertification,
  onPrimaryAction,
  plan
}: CertificationCatalogueProps) {
  const filteredCertifications = filterCertifications(certifications, filters);

  return (
    <View style={styles.wrap}>
      <CertificationFilters filters={filters} onChange={onFiltersChange} />
      {filteredCertifications.length === 0 ? (
        <EmptyState
          description="Adjust provider, level, or search terms to find a certification path."
          title="No certifications match your filters"
        />
      ) : (
        <View style={styles.grid}>
          {filteredCertifications.map((certification) => (
            <CertificationCard
              certification={certification}
              key={certification.id}
              onOpen={onOpenCertification}
              onPrimaryAction={onPrimaryAction}
              plan={plan}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md
  },
  wrap: {
    gap: theme.spacing.md
  }
});
