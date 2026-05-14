import { StyleSheet, Text, View } from 'react-native';
import { AppCard, StatCard } from '@/components/cards';
import { Badge, PrimaryButton, ProgressBar, SecondaryButton, ToastNotification } from '@/components/ui';
import { DEFAULT_CERTIFICATION_ID } from '@/constants/app';
import { theme } from '@/constants/theme';
import type { Certification, UserPlan } from '@/types';
import { formatCount, formatPercent } from '@/utils';
import { canStartTestMode, getEffectiveCertificationStatus } from '@/features/subscriptions';
import { getCertificationCtaLabel, getCertificationStatusTone } from '../helpers';

type CertificationDetailProps = {
  certification: Certification;
  onBack: () => void;
  onMockTest: () => void;
  onPrimaryAction: (certification: Certification) => void;
  onStartLearning: () => void;
  plan: UserPlan;
};

export function CertificationDetail({
  certification,
  onBack,
  onMockTest,
  onPrimaryAction,
  onStartLearning,
  plan
}: CertificationDetailProps) {
  const effectiveStatus = getEffectiveCertificationStatus(plan, certification);
  const contentAvailable = certification.id === DEFAULT_CERTIFICATION_ID;
  const active = effectiveStatus === 'active' && contentAvailable;
  const locked = effectiveStatus === 'locked';
  const canStartMock = active && canStartTestMode(plan, 'full-mock');

  return (
    <View style={styles.wrap}>
      <AppCard style={styles.hero}>
        <View style={styles.row}>
          <View style={styles.titleBlock}>
            <View style={styles.badges}>
              <Badge>{certification.provider}</Badge>
              <Badge tone={getCertificationStatusTone(effectiveStatus)}>{effectiveStatus}</Badge>
              <Badge tone="info">{certification.examCode}</Badge>
            </View>
            <Text style={styles.title}>{certification.name}</Text>
            <Text style={styles.description}>{certification.description}</Text>
          </View>
          <View style={styles.planBox}>
            <Text style={styles.planLabel}>Plan requirement</Text>
            <Text style={styles.plan}>{certification.planRequirement}</Text>
          </View>
        </View>
        <View style={styles.progressWrap}>
          <View style={styles.row}>
            <Text style={styles.copy}>Progress</Text>
            <Text style={styles.progressText}>{formatPercent(certification.progress)}</Text>
          </View>
          <ProgressBar value={certification.progress} />
        </View>
        {locked ? (
          <ToastNotification
            message={`This certification is available on the ${certification.planRequirement} plan. Upgrade to unlock learning paths and mock tests.`}
            title="Plan upgrade required"
            tone="info"
          />
        ) : null}
        {certification.status === 'coming soon' ? (
          <ToastNotification
            message="This certification path is mapped into the catalogue and will be released in a future content wave."
            title="Coming soon"
            tone="info"
          />
        ) : null}
        {effectiveStatus === 'active' && !contentAvailable ? (
          <ToastNotification
            message="Your plan unlocks this certification route, but full learning content for this path is scheduled for a future content wave."
            title="Roadmap content"
            tone="info"
          />
        ) : null}
        <View style={styles.actions}>
          <PrimaryButton onPress={() => onPrimaryAction(certification)}>{getCertificationCtaLabel(certification, plan)}</PrimaryButton>
          <SecondaryButton disabled={!canStartMock} onPress={canStartMock ? onMockTest : undefined}>
            {canStartMock ? 'Start mock test' : 'Mock exam requires Silver'}
          </SecondaryButton>
          <SecondaryButton disabled={!active} onPress={active ? onStartLearning : undefined}>
            Continue learning
          </SecondaryButton>
          <SecondaryButton onPress={onBack}>Back to catalogue</SecondaryButton>
        </View>
      </AppCard>

      <View style={styles.metricGrid}>
        <StatCard label="Level" value={certification.level} />
        <StatCard label="Difficulty" value={certification.difficulty} />
        <StatCard label="Question count" value={formatCount(certification.questionCount, 'question')} />
        <StatCard label="Study estimate" value={`${certification.estimatedStudyHours}h`} />
      </View>

      <AppCard style={styles.card}>
        <Text style={styles.cardTitle}>Exam domains</Text>
        <View style={styles.domainGrid}>
          {certification.domains.map((domain) => (
            <View key={domain} style={styles.domainPill}>
              <Text style={styles.domainText}>{domain}</Text>
            </View>
          ))}
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
  badges: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs
  },
  card: {
    gap: theme.spacing.md
  },
  cardTitle: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 24
  },
  copy: {
    color: theme.colors.textMuted,
    fontSize: 14,
    lineHeight: 21
  },
  description: {
    color: theme.colors.textMuted,
    fontSize: 15,
    lineHeight: 23,
    maxWidth: 820
  },
  domainGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm
  },
  domainPill: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm
  },
  domainText: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: '800'
  },
  hero: {
    gap: theme.spacing.md,
    padding: theme.spacing.xl
  },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md
  },
  plan: {
    color: theme.colors.primary,
    fontSize: 22,
    fontWeight: '900'
  },
  planBox: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    gap: theme.spacing.xs,
    padding: theme.spacing.md
  },
  planLabel: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  progressText: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '900'
  },
  progressWrap: {
    gap: theme.spacing.xs
  },
  row: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
    justifyContent: 'space-between'
  },
  title: {
    color: theme.colors.text,
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 36
  },
  titleBlock: {
    flex: 1,
    gap: theme.spacing.sm,
    minWidth: 260
  },
  wrap: {
    gap: theme.spacing.md
  }
});
