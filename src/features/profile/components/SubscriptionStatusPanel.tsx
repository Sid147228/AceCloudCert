import { StyleSheet, Text, View } from 'react-native';
import { AppCard } from '@/components/cards';
import { Badge, PrimaryButton, SecondaryButton } from '@/components/ui';
import { theme } from '@/constants/theme';
import { subscriptionPlans } from '@/data';
import { getDefaultPlanIdForTier } from '@/features/subscriptions';
import type { UserAccountProfile } from '../types';

type SubscriptionStatusPanelProps = {
  onBack: () => void;
  onPricing: () => void;
  profile: UserAccountProfile;
};

export function SubscriptionStatusPanel({ onBack, onPricing, profile }: SubscriptionStatusPanelProps) {
  const currentPlan =
    subscriptionPlans.find((plan) => plan.id === getDefaultPlanIdForTier(profile.plan)) ??
    (subscriptionPlans[0] as (typeof subscriptionPlans)[number]);

  return (
    <View style={styles.wrap}>
      <AppCard style={styles.card}>
        <View style={styles.row}>
          <Badge tone="success">Current plan</Badge>
          <Text style={styles.price}>{currentPlan?.priceLabel ?? 'GBP 0'}</Text>
        </View>
        <Text style={styles.cardTitle}>{profile.plan}</Text>
        <Text style={styles.copy}>Subscription state is tied to the authenticated profile and ready for Stripe entitlements.</Text>
        {(currentPlan?.features ?? []).map((feature) => (
          <Text key={feature} style={styles.copy}>
            - {feature}
          </Text>
        ))}
        <View style={styles.actions}>
          <PrimaryButton onPress={onPricing}>Compare plans</PrimaryButton>
          <SecondaryButton onPress={onBack}>Back to profile</SecondaryButton>
        </View>
      </AppCard>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm
  },
  card: {
    gap: theme.spacing.md
  },
  cardTitle: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 28
  },
  copy: {
    color: theme.colors.textMuted,
    fontSize: 14,
    lineHeight: 21
  },
  price: {
    color: theme.colors.primary,
    fontSize: 22,
    fontWeight: '900'
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    justifyContent: 'space-between'
  },
  wrap: {
    gap: theme.spacing.md
  }
});
