import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppCard } from '@/components/cards';
import { Badge } from '@/components/ui';
import { theme } from '@/constants/theme';

type AuthFormCardProps = {
  badge: string;
  children: ReactNode;
  footer?: ReactNode;
  message?: string;
  messageTone?: 'error' | 'success' | 'info';
  subtitle: string;
  title: string;
};

export function AuthFormCard({
  badge,
  children,
  footer,
  message,
  messageTone = 'info',
  subtitle,
  title
}: AuthFormCardProps) {
  return (
    <View style={styles.wrap}>
      <AppCard style={styles.card}>
        <Badge tone="info">{badge}</Badge>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        {message ? <Text style={[styles.message, styles[messageTone]]}>{message}</Text> : null}
        <View style={styles.fields}>{children}</View>
        {footer ? <View style={styles.footer}>{footer}</View> : null}
      </AppCard>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: theme.spacing.md
  },
  error: {
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderColor: 'rgba(239, 68, 68, 0.32)',
    color: theme.colors.danger
  },
  fields: {
    gap: theme.spacing.md
  },
  footer: {
    gap: theme.spacing.sm
  },
  header: {
    gap: theme.spacing.xs
  },
  info: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    borderColor: 'rgba(56, 189, 248, 0.32)',
    color: theme.colors.accentBlue
  },
  message: {
    borderRadius: theme.radii.md,
    borderWidth: 1,
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 19,
    padding: theme.spacing.sm
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontSize: 14,
    lineHeight: 21
  },
  success: {
    backgroundColor: 'rgba(34, 197, 94, 0.12)',
    borderColor: 'rgba(34, 197, 94, 0.32)',
    color: theme.colors.success
  },
  title: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 28
  },
  wrap: {
    alignSelf: 'center',
    maxWidth: 560,
    width: '100%'
  }
});
