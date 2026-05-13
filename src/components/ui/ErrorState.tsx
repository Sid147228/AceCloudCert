import { StyleSheet, Text, View } from 'react-native';
import { AppButton } from './AppButton';
import { theme } from '@/constants/theme';

type ErrorStateProps = {
  message: string;
  onRetry?: () => void;
  title?: string;
};

export function ErrorState({ message, onRetry, title = 'Something went wrong' }: ErrorStateProps) {
  return (
    <View style={styles.state}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry ? <AppButton onPress={onRetry} variant="secondary">Try again</AppButton> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    color: theme.colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
    maxWidth: 520,
    textAlign: 'center'
  },
  state: {
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    borderColor: theme.colors.danger,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    gap: theme.spacing.md,
    justifyContent: 'center',
    minHeight: 180,
    padding: theme.spacing.xl
  },
  title: {
    color: theme.colors.danger,
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center'
  }
});
