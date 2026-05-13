import type { KeyboardTypeOptions } from 'react-native';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { theme } from '@/constants/theme';

export type InputFieldProps = {
  autoComplete?: 'email' | 'name' | 'off';
  disabled?: boolean;
  error?: string;
  keyboardType?: KeyboardTypeOptions;
  label: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  value: string;
};

export function InputField({
  autoComplete,
  disabled = false,
  error,
  keyboardType = 'default',
  label,
  onChangeText,
  placeholder = label,
  value
}: InputFieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        autoCapitalize="none"
        autoComplete={autoComplete}
        editable={!disabled}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        style={[styles.input, Boolean(error) && styles.inputError, disabled && styles.disabled]}
        value={value}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.62
  },
  error: {
    color: theme.colors.danger,
    fontSize: 12,
    fontWeight: '800'
  },
  field: {
    gap: theme.spacing.xs
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    color: theme.colors.text,
    fontSize: 15,
    minHeight: 48,
    paddingHorizontal: 14
  },
  inputError: {
    borderColor: theme.colors.danger
  },
  label: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: '800'
  }
});
