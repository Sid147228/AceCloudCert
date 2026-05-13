import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { theme } from '@/constants/theme';

type AppButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  onPress?: () => void;
  size?: 'sm' | 'md';
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
};

export function AppButton({ children, disabled = false, onPress, size = 'md', variant = 'primary' }: AppButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        size === 'sm' && styles.small,
        variant === 'secondary' && styles.secondary,
        variant === 'ghost' && styles.ghost,
        variant === 'danger' && styles.danger,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed
      ]}
    >
      <Text style={[styles.label, variant !== 'primary' && styles.lightLabel, variant === 'danger' && styles.dangerLabel]}>
        {children}
      </Text>
    </Pressable>
  );
}

export function PrimaryButton(props: Omit<AppButtonProps, 'variant'>) {
  return <AppButton {...props} variant="primary" />;
}

export function SecondaryButton(props: Omit<AppButtonProps, 'variant'>) {
  return <AppButton {...props} variant="secondary" />;
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  disabled: {
    opacity: 0.45
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: 'transparent'
  },
  label: {
    color: theme.colors.background,
    fontSize: 14,
    fontWeight: '900'
  },
  danger: {
    backgroundColor: theme.colors.danger,
    borderColor: theme.colors.danger
  },
  dangerLabel: {
    color: theme.colors.text
  },
  lightLabel: {
    color: theme.colors.text
  },
  pressed: {
    opacity: 0.78
  },
  secondary: {
    backgroundColor: theme.colors.cardMuted,
    borderColor: theme.colors.border
  },
  small: {
    minHeight: 36,
    paddingHorizontal: 12,
    paddingVertical: 8
  }
});
