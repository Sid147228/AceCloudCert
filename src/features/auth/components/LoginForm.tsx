import { useState } from 'react';
import { InputField, PasswordField } from '@/components/forms';
import { PrimaryButton } from '@/components/ui';
import { useAuth } from '@/context';
import type { AuthUser, LoginFormValues } from '../types';
import { hasValidationErrors, validateLogin } from '../validation';
import { AuthFormCard } from './AuthFormCard';
import { AuthLinks } from './AuthLinks';
import { CheckboxField } from './CheckboxField';

type LoginFormProps = {
  onForgotPassword: () => void;
  onLoginComplete: (user: AuthUser) => void;
  onSignup: () => void;
};

export function LoginForm({ onForgotPassword, onLoginComplete, onSignup }: LoginFormProps) {
  const { clearError, errorMessage, login, pendingAction } = useAuth();
  const [values, setValues] = useState<LoginFormValues>({
    email: 'learner@acecloudcert.com',
    password: 'password123',
    rememberMe: true
  });
  const [errors, setErrors] = useState<ReturnType<typeof validateLogin>>({});
  const loading = pendingAction === 'login';

  async function submit() {
    clearError();
    const nextErrors = validateLogin(values);
    setErrors(nextErrors);

    if (hasValidationErrors(nextErrors)) {
      return;
    }

    try {
      const user = await login(values);
      onLoginComplete(user);
    } catch {
      return;
    }
  }

  return (
    <AuthFormCard
      badge="Secure access"
      message={errorMessage}
      messageTone="error"
      subtitle="Use your AceCloudCert account to continue learning. The local demo account is prefilled for development."
      title="Login to your workspace"
      footer={
        <AuthLinks
          links={[
            { label: 'Create account', onPress: onSignup },
            { label: 'Forgot password', onPress: onForgotPassword }
          ]}
        />
      }
    >
      <InputField
        autoComplete="email"
        disabled={loading}
        error={errors.email}
        label="Email"
        onChangeText={(email) => setValues((current) => ({ ...current, email }))}
        value={values.email}
      />
      <PasswordField
        disabled={loading}
        error={errors.password}
        label="Password"
        onChangeText={(password) => setValues((current) => ({ ...current, password }))}
        value={values.password}
      />
      <CheckboxField
        checked={values.rememberMe}
        disabled={loading}
        label="Remember me on this device"
        onChange={(rememberMe) => setValues((current) => ({ ...current, rememberMe }))}
      />
      <PrimaryButton disabled={loading} onPress={() => void submit()}>
        {loading ? 'Logging in...' : 'Login'}
      </PrimaryButton>
    </AuthFormCard>
  );
}
