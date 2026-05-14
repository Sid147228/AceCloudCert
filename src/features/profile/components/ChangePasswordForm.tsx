import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppCard } from '@/components/cards';
import { PasswordField } from '@/components/forms';
import { PrimaryButton, SecondaryButton, ToastNotification } from '@/components/ui';
import { useAuth } from '@/context';
import { theme } from '@/constants/theme';
import type { ChangePasswordFormValues } from '../types';
import { hasProfileValidationErrors, validateChangePassword } from '../validation';

type ChangePasswordFormProps = {
  onCancel: () => void;
};

const initialValues: ChangePasswordFormValues = {
  confirmPassword: '',
  currentPassword: '',
  newPassword: ''
};

export function ChangePasswordForm({ onCancel }: ChangePasswordFormProps) {
  const { changePassword, errorMessage, pendingAction } = useAuth();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ReturnType<typeof validateChangePassword>>({});
  const [successMessage, setSuccessMessage] = useState<string | undefined>();
  const saving = pendingAction === 'change-password';

  async function save() {
    const nextErrors = validateChangePassword(values);
    setErrors(nextErrors);
    setSuccessMessage(undefined);

    if (hasProfileValidationErrors(nextErrors)) {
      return;
    }

    try {
      await changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword
      });
      setValues(initialValues);
      setSuccessMessage('Password changed locally.');
    } catch {
      return;
    }
  }

  return (
    <AppCard style={styles.card}>
      {errorMessage ? <ToastNotification message={errorMessage} title="Password update failed" tone="error" /> : null}
      {successMessage ? <ToastNotification message={successMessage} title="Saved" tone="success" /> : null}
      <PasswordField
        disabled={saving}
        error={errors.currentPassword}
        label="Current password"
        onChangeText={(currentPassword) => setValues((current) => ({ ...current, currentPassword }))}
        value={values.currentPassword}
      />
      <PasswordField
        disabled={saving}
        error={errors.newPassword}
        label="New password"
        onChangeText={(newPassword) => setValues((current) => ({ ...current, newPassword }))}
        value={values.newPassword}
      />
      <PasswordField
        disabled={saving}
        error={errors.confirmPassword}
        label="Confirm new password"
        onChangeText={(confirmPassword) => setValues((current) => ({ ...current, confirmPassword }))}
        value={values.confirmPassword}
      />
      <View style={styles.actions}>
        <PrimaryButton disabled={saving} onPress={() => void save()}>
          {saving ? 'Updating...' : 'Change password'}
        </PrimaryButton>
        <SecondaryButton disabled={saving} onPress={onCancel}>
          Back to settings
        </SecondaryButton>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  actions: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm
  },
  card: {
    alignSelf: 'flex-start',
    gap: theme.spacing.md,
    maxWidth: 680,
    width: '100%'
  }
});
