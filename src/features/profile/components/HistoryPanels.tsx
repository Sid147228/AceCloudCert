import { StyleSheet, Text, View } from 'react-native';
import { AppCard } from '@/components/cards';
import { Badge, EmptyState, PrimaryButton } from '@/components/ui';
import { theme } from '@/constants/theme';
import { formatPercent } from '@/utils';
import { formatDate } from '../helpers';
import type { UserAccountProfile } from '../types';

type HistoryPanelProps = {
  onBack: () => void;
  profile: UserAccountProfile;
};

export function LearningHistoryPanel({ onBack, profile }: HistoryPanelProps) {
  return (
    <View style={styles.wrap}>
      {profile.learningHistory.map((item) => (
        <AppCard key={item.id} style={styles.card}>
          <View style={styles.row}>
            <Badge tone={item.passed ? 'success' : 'danger'}>{item.mode}</Badge>
            <Text style={styles.date}>{formatDate(item.completedAt)}</Text>
          </View>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <View style={styles.metrics}>
            <Text style={styles.copy}>Score: {formatPercent(item.score)}</Text>
            <Text style={styles.copy}>Duration: {item.durationMinutes}m</Text>
          </View>
        </AppCard>
      ))}
      <PrimaryButton onPress={onBack}>Back to profile</PrimaryButton>
    </View>
  );
}

export function CertificateHistoryPanel({ onBack, profile }: HistoryPanelProps) {
  if (profile.certificateHistory.length === 0) {
    return (
      <EmptyState
        actionLabel="Back to profile"
        description="Passed mock exams and quizzes will appear here after certificate generation."
        onAction={onBack}
        title="No certificate records yet"
      />
    );
  }

  return (
    <View style={styles.wrap}>
      {profile.certificateHistory.map((certificate) => (
        <AppCard key={certificate.id} style={styles.card}>
          <View style={styles.row}>
            <Badge tone="success">Certificate</Badge>
            <Text style={styles.date}>{formatDate(certificate.issuedAt)}</Text>
          </View>
          <Text style={styles.cardTitle}>{certificate.certificationName}</Text>
          <Text style={styles.copy}>Score: {formatPercent(certificate.score)}</Text>
          <Text style={styles.copy}>Certificate ID: {certificate.certificateId}</Text>
        </AppCard>
      ))}
      <PrimaryButton onPress={onBack}>Back to profile</PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: theme.spacing.sm
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
  date: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  metrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md
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
