import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '@/constants/theme';

type CheckboxFieldProps = {
  checked: boolean;
  disabled?: boolean;
  error?: string;
  label: string;
  onChange: (checked: boolean) => void;
};

export function CheckboxField({ checked, disabled = false, error, label, onChange }: CheckboxFieldProps) {
  return (
    <View style={styles.wrap}>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked, disabled }}
        disabled={disabled}
        onPress={() => onChange(!checked)}
        style={styles.row}
      >
        <View style={[styles.box, checked && styles.checkedBox, Boolean(error) && styles.errorBox, disabled && styles.disabled]}>
          {checked ? <Text style={styles.check}>✓</Text> : null}
        </View>
        <Text style={styles.label}>{label}</Text>
      </Pressable>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.sm,
    borderWidth: 1,
    height: 22,
    justifyContent: 'center',
    width: 22
  },
  check: {
    color: theme.colors.background,
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 18
  },
  checkedBox: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary
  },
  disabled: {
    opacity: 0.62
  },
  error: {
    color: theme.colors.danger,
    fontSize: 12,
    fontWeight: '800'
  },
  errorBox: {
    borderColor: theme.colors.danger
  },
  label: {
    color: theme.colors.text,
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 20
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.sm
  },
  wrap: {
    gap: theme.spacing.xs
  }
});
