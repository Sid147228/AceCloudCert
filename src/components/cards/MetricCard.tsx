import { StyleSheet, Text } from 'react-native';
import { theme } from '@/constants/theme';
import { AppCard } from './AppCard';

type MetricCardProps = {
  label: string;
  value: string | number;
};

export function MetricCard({ label, value }: MetricCardProps) {
  return (
    <AppCard style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    flexBasis: 180,
    flexGrow: 1
  },
  label: {
    color: theme.colors.textMuted,
    fontSize: 14
  },
  value: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: '900'
  }
});
