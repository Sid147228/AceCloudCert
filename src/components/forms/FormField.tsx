import { StyleSheet, Text, TextInput, View } from 'react-native';
import { theme } from '@/constants/theme';

type FormFieldProps = {
  label: string;
  onChangeText: (value: string) => void;
  secureTextEntry?: boolean;
  value: string;
};

export function FormField({ label, onChangeText, secureTextEntry = false, value }: FormFieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        onChangeText={onChangeText}
        placeholder={label}
        placeholderTextColor={theme.colors.textMuted}
        secureTextEntry={secureTextEntry}
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
