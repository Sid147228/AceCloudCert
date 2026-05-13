import { StyleSheet, Text, View } from 'react-native';
import { AppButton } from './AppButton';
import { theme } from '@/constants/theme';

type EmptyStateProps = {
  actionLabel?: string;
  description: string;
  onAction?: () => void;
  title: string;
};

export function EmptyState({ actionLabel, description, onAction, title }: EmptyStateProps) {
  return (
    <View style={styles.state}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {actionLabel && onAction ? <AppButton onPress={onAction}>{actionLabel}</AppButton> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
    color: theme.colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
    maxWidth: 520,
    textAlign: 'center'
  },
  state: {
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    gap: theme.spacing.md,
    justifyContent: 'center',
    minHeight: 180,
    padding: theme.spacing.xl
  },
  title: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center'
  }
});
