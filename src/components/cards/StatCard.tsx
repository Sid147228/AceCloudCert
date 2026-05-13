import { StyleSheet, Text } from 'react-native';
import { AppCard } from './AppCard';
import { theme } from '@/constants/theme';

type StatCardProps = {
  label: string;
  value: string | number;
};

export function StatCard({ label, value }: StatCardProps) {
  return (
    <AppCard style={styles.card}>
      <Text numberOfLines={2} style={styles.value}>{value}</Text>
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
