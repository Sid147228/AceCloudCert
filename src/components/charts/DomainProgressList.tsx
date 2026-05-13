import { StyleSheet, Text, View } from 'react-native';
import { theme } from '@/constants/theme';
import { ProgressBar } from '@/components/ui';
import { formatCount } from '@/utils/format';

type DomainProgressListProps = {
  domainCounts: Record<string, number>;
};

export function DomainProgressList({ domainCounts }: DomainProgressListProps) {
  const domains = Object.entries(domainCounts);
  const max = Math.max(...domains.map(([, count]) => count), 1);

  return (
    <View style={styles.list}>
      {domains.map(([domain, count]) => (
        <View key={domain} style={styles.row}>
          <View style={styles.header}>
            <Text style={styles.domain}>{domain}</Text>
            <Text style={styles.count}>{formatCount(count, 'question')}</Text>
          </View>
          <ProgressBar value={(count / max) * 100} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  count: {
    color: theme.colors.textMuted,
    fontSize: 12
  },
  domain: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '800'
  },
  header: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    justifyContent: 'space-between'
  },
  list: {
    gap: theme.spacing.md
  },
  row: {
    gap: theme.spacing.xs
  }
});
