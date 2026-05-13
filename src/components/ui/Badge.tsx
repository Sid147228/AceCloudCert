import type { ReactNode } from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from '@/constants/theme';

type BadgeProps = {
  children: ReactNode;
  tone?: 'primary' | 'success' | 'info' | 'neutral' | 'danger';
};

export function Badge({ children, tone = 'primary' }: BadgeProps) {
  return <Text style={[styles.badge, styles[tone]]}>{children}</Text>;
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: theme.radii.sm,
    fontSize: 12,
    fontWeight: '900',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 5,
    textTransform: 'uppercase'
  },
  danger: {
    backgroundColor: 'rgba(239, 68, 68, 0.16)',
    color: theme.colors.danger
  },
  info: {
    backgroundColor: 'rgba(56, 189, 248, 0.16)',
    color: theme.colors.accentBlue
  },
  neutral: {
    backgroundColor: theme.colors.cardMuted,
    color: theme.colors.textMuted
  },
  primary: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.background
  },
  success: {
    backgroundColor: 'rgba(34, 197, 94, 0.16)',
    color: theme.colors.success
  }
});
