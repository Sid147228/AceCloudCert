import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '@/constants/theme';

export type SelectOption = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  label: string;
  onChange: (value: string) => void;
  options: readonly SelectOption[];
  value: string;
};

export function SelectField({ label, onChange, options, value }: SelectFieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.options}>
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <Pressable
              key={option.value}
              onPress={() => onChange(option.value)}
              style={[styles.option, selected && styles.selectedOption]}
            >
              <Text style={[styles.optionText, selected && styles.selectedText]}>{option.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: theme.spacing.xs
  },
  label: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: '800'
  },
  option: {
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 9
  },
  optionText: {
    color: theme.colors.textMuted,
    fontSize: 13,
    fontWeight: '800'
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs
  },
  selectedOption: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary
  },
  selectedText: {
    color: theme.colors.background
  }
});
