import { StyleSheet, Text, View } from 'react-native';
import { AppCard } from '@/components/cards';
import { Badge, PrimaryButton, ProgressBar, SecondaryButton } from '@/components/ui';
import { theme } from '@/constants/theme';
import type { Certification, UserPlan } from '@/types';
import { formatCount, formatPercent } from '@/utils';
import { getEffectiveCertificationStatus } from '@/features/subscriptions';
import { getCertificationCtaLabel, getCertificationStatusTone } from '../helpers';

type CertificationCardProps = {
  certification: Certification;
  onOpen: (certification: Certification) => void;
  onPrimaryAction: (certification: Certification) => void;
  plan: UserPlan;
};

export function CertificationCard({ certification, onOpen, onPrimaryAction, plan }: CertificationCardProps) {
  const effectiveStatus = getEffectiveCertificationStatus(plan, certification);

  return (
    <AppCard style={styles.card}>
      <View style={styles.row}>
        <Badge>{certification.provider}</Badge>
        <Badge tone={getCertificationStatusTone(effectiveStatus)}>{effectiveStatus}</Badge>
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>{certification.name}</Text>
        <Text style={styles.description}>{certification.description}</Text>
      </View>
      <View style={styles.metaGrid}>
        <Meta label="Exam" value={certification.examCode} />
        <Meta label="Level" value={certification.level} />
        <Meta label="Difficulty" value={certification.difficulty} />
        <Meta label="Plan" value={certification.planRequirement} />
      </View>
      <View style={styles.row}>
        <Text style={styles.copy}>{formatCount(certification.questionCount, 'question')}</Text>
        <Text style={styles.copy}>{certification.estimatedStudyHours} study hours</Text>
      </View>
      <View style={styles.progressWrap}>
        <View style={styles.row}>
          <Text style={styles.copy}>Progress</Text>
          <Text style={styles.progressText}>{formatPercent(certification.progress)}</Text>
        </View>
        <ProgressBar value={certification.progress} />
      </View>
      <View style={styles.actions}>
        <PrimaryButton onPress={() => onPrimaryAction(certification)}>{getCertificationCtaLabel(certification, plan)}</PrimaryButton>
        <SecondaryButton onPress={() => onOpen(certification)}>View detail</SecondaryButton>
      </View>
    </AppCard>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.meta}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Text style={styles.metaValue}>{value}</Text>
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
    flexBasis: 320,
    flexGrow: 1,
    gap: theme.spacing.md
  },
  copy: {
    color: theme.colors.textMuted,
    fontSize: 13,
    lineHeight: 19
  },
  description: {
    color: theme.colors.textMuted,
    fontSize: 14,
    lineHeight: 21
  },
  header: {
    gap: theme.spacing.xs
  },
  meta: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    flexBasis: 130,
    flexGrow: 1,
    gap: 4,
    padding: theme.spacing.sm
  },
  metaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs
  },
  metaLabel: {
    color: theme.colors.textMuted,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  metaValue: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: '900'
  },
  progressText: {
    color: theme.colors.primary,
    fontSize: 13,
    fontWeight: '900'
  },
  progressWrap: {
    gap: theme.spacing.xs
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    justifyContent: 'space-between'
  },
  title: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 24
  }
});
