import { useState } from 'react';
import { InputField } from '@/components/forms';
import { PrimaryButton } from '@/components/ui';
import { useAuth } from '@/context';
import type { ForgotPasswordFormValues } from '../types';
import { hasValidationErrors, validateForgotPassword } from '../validation';
import { AuthFormCard } from './AuthFormCard';
import { AuthLinks } from './AuthLinks';

type ForgotPasswordFormProps = {
  onBackToLogin: () => void;
};

export function ForgotPasswordForm({ onBackToLogin }: ForgotPasswordFormProps) {
  const { clearError, errorMessage, forgotPassword, pendingAction } = useAuth();
  const [values, setValues] = useState<ForgotPasswordFormValues>({ email: '' });
  const [errors, setErrors] = useState<ReturnType<typeof validateForgotPassword>>({});
  const [successMessage, setSuccessMessage] = useState<string | undefined>();
  const loading = pendingAction === 'forgot-password';

  async function submit() {
    clearError();
    setSuccessMessage(undefined);
    const nextErrors = validateForgotPassword(values);
    setErrors(nextErrors);

    if (hasValidationErrors(nextErrors)) {
      return;
    }

    try {
      await forgotPassword(values);
      setSuccessMessage('If an account exists for this email, a reset instruction has been recorded locally.');
    } catch {
      return;
    }
  }

  return (
    <AuthFormCard
      badge="Account recovery"
      message={errorMessage ?? successMessage}
      messageTone={errorMessage ? 'error' : successMessage ? 'success' : 'info'}
      subtitle="Enter your email to trigger the password reset route. Firebase will replace this local flow later."
      title="Reset your password"
      footer={<AuthLinks links={[{ label: 'Back to login', onPress: onBackToLogin }]} />}
    >
      <InputField
        autoComplete="email"
        disabled={loading}
        error={errors.email}
        label="Email"
        onChangeText={(email) => setValues({ email })}
        value={values.email}
      />
      <PrimaryButton disabled={loading} onPress={() => void submit()}>
        {loading ? 'Sending reset...' : 'Send reset link'}
      </PrimaryButton>
    </AuthFormCard>
  );
}
