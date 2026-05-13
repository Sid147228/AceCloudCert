import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '@/constants/theme';
import { Badge } from '@/components/ui';
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
        <Badge tone={feature.status === 'available' ? 'success' : feature.status === 'planned' ? 'neutral' : 'info'}>
          {feature.status}
        </Badge>
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
    padding: theme.spacing.md,
    ...theme.shadows.card
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
  pressed: {
    opacity: 0.78
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
