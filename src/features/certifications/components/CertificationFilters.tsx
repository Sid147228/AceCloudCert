import { StyleSheet, View } from 'react-native';
import { InputField, SelectField } from '@/components/forms';
import { theme } from '@/constants/theme';
import type { CertificationLevel, CertificationProvider } from '@/types';
import type { CertificationFilters as Filters } from '../types';

const providerOptions: readonly { label: string; value: CertificationProvider | 'All' }[] = [
  { label: 'All providers', value: 'All' },
  { label: 'AWS', value: 'AWS' },
  { label: 'Microsoft Azure', value: 'Microsoft Azure' },
  { label: 'Google Cloud', value: 'Google Cloud' },
  { label: 'Salesforce', value: 'Salesforce' },
  { label: 'Cisco', value: 'Cisco' }
];

const levelOptions: readonly { label: string; value: CertificationLevel | 'All' }[] = [
  { label: 'All levels', value: 'All' },
  { label: 'Foundational', value: 'Foundational' },
  { label: 'Associate', value: 'Associate' },
  { label: 'Administrator', value: 'Administrator' }
];

type CertificationFiltersProps = {
  filters: Filters;
  onChange: (filters: Filters) => void;
};

export function CertificationFilters({ filters, onChange }: CertificationFiltersProps) {
  return (
    <View style={styles.wrap}>
      <InputField
        label="Search certifications"
        onChangeText={(search) => onChange({ ...filters, search })}
        placeholder="Search provider, exam code, domain, or certification"
        value={filters.search}
      />
      <View style={styles.filterGrid}>
        <SelectField
          label="Provider"
          onChange={(provider) => onChange({ ...filters, provider: provider as Filters['provider'] })}
          options={providerOptions}
          value={filters.provider}
        />
        <SelectField
          label="Level"
          onChange={(level) => onChange({ ...filters, level: level as Filters['level'] })}
          options={levelOptions}
          value={filters.level}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md
  },
  wrap: {
    gap: theme.spacing.md
  }
});
