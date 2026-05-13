import { StyleSheet, Text, TextInput, View } from 'react-native';
import { theme } from '@/constants/theme';

export type InputFieldProps = {
  label: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  value: string;
};

export function InputField({ label, onChangeText, placeholder = label, value }: InputFieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        autoCapitalize="none"
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        style={styles.input}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  label: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: '800'
  }
});
