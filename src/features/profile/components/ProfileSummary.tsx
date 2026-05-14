import { StyleSheet, Text, View } from 'react-native';
import { AppCard, StatCard } from '@/components/cards';
import { Badge, PrimaryButton, SecondaryButton } from '@/components/ui';
import { theme } from '@/constants/theme';
import { formatPercent } from '@/utils';
import { formatDate, getActiveCertificationTitle, getProfileStats } from '../helpers';
import type { UserAccountProfile } from '../types';

type ProfileSummaryProps = {
  onCertificates: () => void;
  onEdit: () => void;
  onHistory: () => void;
  onSettings: () => void;
  onSubscription: () => void;
  profile: UserAccountProfile;
};

export function ProfileSummary({
  onCertificates,
  onEdit,
  onHistory,
  onSettings,
  onSubscription,
  profile
}: ProfileSummaryProps) {
  const stats = getProfileStats(profile);
  const activeCertification = getActiveCertificationTitle(profile);

  return (
    <View style={styles.wrap}>
      <AppCard style={styles.hero}>
        <View style={styles.row}>
          <View style={styles.identity}>
            <Badge tone="primary">Learner profile</Badge>
            <Text style={styles.name}>{profile.fullName}</Text>
            <Text style={styles.email}>{profile.email}</Text>
          </View>
          <View style={styles.planWrap}>
            <Text style={styles.label}>Current plan</Text>
            <Text style={styles.plan}>{profile.plan}</Text>
          </View>
        </View>
        <Text style={styles.copy}>Active certification: {activeCertification}</Text>
        <Text style={styles.copy}>Joined: {formatDate(profile.joinedAt)}</Text>
        <View style={styles.actions}>
          <PrimaryButton onPress={onEdit}>Edit profile</PrimaryButton>
          <SecondaryButton onPress={onSettings}>Account settings</SecondaryButton>
          <SecondaryButton onPress={onSubscription}>Subscription status</SecondaryButton>
        </View>
      </AppCard>

      <View style={styles.metricGrid}>
        <StatCard label="Tests completed" value={stats.testsCompleted} />
        <StatCard label="Average score" value={formatPercent(stats.averageScore)} />
        <StatCard label="Certificates earned" value={stats.certificatesEarned} />
        <StatCard label="Active certification" value={activeCertification} />
      </View>

      <View style={styles.cardGrid}>
        <AppCard style={styles.actionCard}>
          <Text style={styles.cardTitle}>Learning history</Text>
          <Text style={styles.copy}>Review completed tests, quizzes, scores, and study activity.</Text>
          <PrimaryButton onPress={onHistory}>Open learning history</PrimaryButton>
        </AppCard>
        <AppCard style={styles.actionCard}>
          <Text style={styles.cardTitle}>Certificate history</Text>
          <Text style={styles.copy}>View earned certificate records, verification IDs, and share-ready previews.</Text>
          <PrimaryButton onPress={onCertificates}>Open certificates</PrimaryButton>
        </AppCard>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actionCard: {
    flexBasis: 260,
    flexGrow: 1
  },
  actions: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md
  },
  cardTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 22
  },
  copy: {
    color: theme.colors.textMuted,
    fontSize: 14,
    lineHeight: 21
  },
  email: {
    color: theme.colors.textMuted,
    fontSize: 14,
    lineHeight: 21
  },
  hero: {
    gap: theme.spacing.md,
    padding: theme.spacing.xl
  },
  identity: {
    flex: 1,
    gap: theme.spacing.xs,
    minWidth: 240
  },
  label: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md
  },
  name: {
    color: theme.colors.text,
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 36
  },
  plan: {
    color: theme.colors.primary,
    fontSize: 22,
    fontWeight: '900'
  },
  planWrap: {
    alignItems: 'flex-start',
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    gap: theme.spacing.xs,
    padding: theme.spacing.md
  },
  row: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
    justifyContent: 'space-between'
  },
  wrap: {
    gap: theme.spacing.md
  }
});
