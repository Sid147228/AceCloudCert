import { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { InputField, PasswordField } from '@/components/forms';
import { PrimaryButton, SecondaryButton } from '@/components/ui';
import { useAuth } from '@/context';
import { theme } from '@/constants/theme';
import type { AuthUser, SignupFormValues } from '../types';
import { hasValidationErrors, validateSignup } from '../validation';
import { AuthFormCard } from './AuthFormCard';
import { AuthLinks } from './AuthLinks';
import { CheckboxField } from './CheckboxField';

type SignupFormProps = {
  onLogin: () => void;
  onPrivacy: () => void;
  onSignupComplete: (user: AuthUser) => void;
  onTerms: () => void;
};

export function SignupForm({ onLogin, onPrivacy, onSignupComplete, onTerms }: SignupFormProps) {
  const { clearError, errorMessage, pendingAction, signup } = useAuth();
  const [values, setValues] = useState<SignupFormValues>({
    acceptedTerms: false,
    confirmPassword: '',
    email: '',
    fullName: '',
    password: ''
  });
  const [errors, setErrors] = useState<ReturnType<typeof validateSignup>>({});
  const loading = pendingAction === 'signup';

  async function submit() {
    clearError();
    const nextErrors = validateSignup(values);
    setErrors(nextErrors);

    if (hasValidationErrors(nextErrors)) {
      return;
    }

    try {
      const user = await signup(values);
      onSignupComplete(user);
    } catch {
      return;
    }
  }

  return (
    <AuthFormCard
      badge="New learner"
      message={errorMessage}
      messageTone="error"
      subtitle="Create a local AceCloudCert account. Your session and profile will persist in local storage until you log out."
      title="Create your account"
      footer={
        <AuthLinks links={[{ label: 'Already have an account', onPress: onLogin }]}>
          <Text style={styles.legalText}>Review the legal routes before signing up.</Text>
          <SecondaryButton onPress={onTerms}>Terms and Conditions</SecondaryButton>
          <SecondaryButton onPress={onPrivacy}>Privacy Policy</SecondaryButton>
        </AuthLinks>
      }
    >
      <InputField
        autoComplete="name"
        disabled={loading}
        error={errors.fullName}
        label="Full name"
        onChangeText={(fullName) => setValues((current) => ({ ...current, fullName }))}
        value={values.fullName}
      />
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
      <PasswordField
        disabled={loading}
        error={errors.confirmPassword}
        label="Confirm password"
        onChangeText={(confirmPassword) => setValues((current) => ({ ...current, confirmPassword }))}
        value={values.confirmPassword}
      />
      <CheckboxField
        checked={values.acceptedTerms}
        disabled={loading}
        error={errors.acceptedTerms}
        label="I accept the Terms and Conditions and Privacy Policy"
        onChange={(acceptedTerms) => setValues((current) => ({ ...current, acceptedTerms }))}
      />
      <PrimaryButton disabled={loading} onPress={() => void submit()}>
        {loading ? 'Creating account...' : 'Create account'}
      </PrimaryButton>
    </AuthFormCard>
  );
}

const styles = StyleSheet.create({
  legalText: {
    color: theme.colors.textMuted,
    fontSize: 13,
    lineHeight: 19
  }
});
