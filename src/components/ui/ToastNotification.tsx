import { StyleSheet, Text, View } from 'react-native';
import { theme } from '@/constants/theme';

type ToastNotificationProps = {
  message: string;
  title?: string;
  tone?: 'success' | 'info' | 'error';
};

export function ToastNotification({ message, title, tone = 'info' }: ToastNotificationProps) {
  return (
    <View style={[styles.toast, styles[tone]]}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    borderColor: theme.colors.danger
  },
  info: {
    borderColor: theme.colors.accentBlue
  },
  message: {
    color: theme.colors.textMuted,
    fontSize: 13,
    lineHeight: 19
  },
  success: {
    borderColor: theme.colors.success
  },
  title: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '900'
  },
  toast: {
    backgroundColor: theme.colors.surface,
    borderLeftWidth: 4,
    borderRadius: theme.radii.md,
    gap: 4,
    padding: theme.spacing.md
  }
});
