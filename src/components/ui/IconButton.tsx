import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { theme } from '@/constants/theme';

type IconButtonProps = {
  accessibilityLabel: string;
  children: ReactNode;
  disabled?: boolean;
  onPress?: () => void;
  tone?: 'default' | 'primary' | 'danger';
};

export function IconButton({ accessibilityLabel, children, disabled = false, onPress, tone = 'default' }: IconButtonProps) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        tone === 'primary' && styles.primary,
        tone === 'danger' && styles.danger,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed
      ]}
    >
      <Text style={[styles.icon, tone !== 'default' && styles.lightIcon]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.cardMuted,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    height: 42,
    justifyContent: 'center',
    width: 42
  },
  danger: {
    backgroundColor: theme.colors.danger,
    borderColor: theme.colors.danger
  },
  disabled: {
    opacity: 0.45
  },
  icon: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '900'
  },
  lightIcon: {
    color: theme.colors.background
  },
  pressed: {
    opacity: 0.78
  },
  primary: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary
  }
});
