import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { theme } from '@/constants/theme';

type PasswordFieldProps = {
  label: string;
  onChangeText: (value: string) => void;
  value: string;
};

export function PasswordField({ label, onChangeText, value }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.passwordRow}>
        <TextInput
          onChangeText={onChangeText}
          placeholder={label}
          placeholderTextColor={theme.colors.textMuted}
          secureTextEntry={!visible}
          style={styles.passwordInput}
          value={value}
        />
        <Pressable onPress={() => setVisible((current) => !current)} style={styles.toggle}>
          <Text style={styles.toggleText}>{visible ? 'Hide' : 'Show'}</Text>
        </Pressable>
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
  passwordInput: {
    color: theme.colors.text,
    flex: 1,
    fontSize: 15,
    minHeight: 48,
    paddingHorizontal: 14
  },
  passwordRow: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    flexDirection: 'row'
  },
  toggle: {
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  toggleText: {
    color: theme.colors.accentBlue,
    fontSize: 13,
    fontWeight: '900'
  }
});
