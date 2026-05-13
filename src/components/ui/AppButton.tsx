import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { theme } from '@/constants/theme';

type AppButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
};

export function AppButton({ children, disabled = false, onPress, variant = 'primary' }: AppButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === 'secondary' && styles.secondary,
        variant === 'ghost' && styles.ghost,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed
      ]}
    >
      <Text style={[styles.label, variant !== 'primary' && styles.lightLabel]}>{children}</Text>
    </Pressable>
  );
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
  lightLabel: {
    color: theme.colors.text
  },
  pressed: {
    opacity: 0.78
  },
  secondary: {
    backgroundColor: theme.colors.cardMuted,
    borderColor: theme.colors.border
  }
});
