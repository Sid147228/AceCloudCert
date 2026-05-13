import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '@/constants/theme';
import type { FeatureModule } from '@/types';

type FeatureCardProps = {
  feature: FeatureModule;
  onPress: () => void;
};

export function FeatureCard({ feature, onPress }: FeatureCardProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.header}>
        <Text style={styles.title}>{feature.name}</Text>
        <Text style={[styles.status, feature.status === 'planned' && styles.planned]}>{feature.status}</Text>
      </View>
      <Text style={styles.summary}>{feature.summary}</Text>
      <Text style={styles.domain}>{feature.ownerDomain}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    flexBasis: 230,
    flexGrow: 1,
    gap: theme.spacing.sm,
    padding: theme.spacing.md
  },
  domain: {
    color: theme.colors.primarySoft,
    fontSize: 12,
    fontWeight: '800'
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.sm,
    justifyContent: 'space-between'
  },
  planned: {
    color: theme.colors.textMuted
  },
  pressed: {
    opacity: 0.78
  },
  status: {
    color: theme.colors.success,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  summary: {
    color: theme.colors.textMuted,
    fontSize: 14,
    lineHeight: 21
  },
  title: {
    color: theme.colors.text,
    flex: 1,
    fontSize: 16,
    fontWeight: '900'
  }
});
