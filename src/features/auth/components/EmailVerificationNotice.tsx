import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PrimaryButton, SecondaryButton } from '@/components/ui';
import { useAuth } from '@/context';
import { theme } from '@/constants/theme';
import type { AuthUser } from '../types';
import { AuthFormCard } from './AuthFormCard';

type EmailVerificationNoticeProps = {
  onBackToSignup: () => void;
  onLogoutComplete: () => void;
  onVerified: (user: AuthUser) => void;
};

export function EmailVerificationNotice({ onBackToSignup, onLogoutComplete, onVerified }: EmailVerificationNoticeProps) {
  const { errorMessage, logout, pendingAction, resendVerificationEmail, user, verifyEmail } = useAuth();
  const [successMessage, setSuccessMessage] = useState<string | undefined>();
  const verifying = pendingAction === 'verify-email';
  const resending = pendingAction === 'resend-verification';
  const signingOut = pendingAction === 'logout';

  async function verify() {
    setSuccessMessage(undefined);
    try {
      const verifiedUser = await verifyEmail();
      onVerified(verifiedUser);
    } catch {
      return;
    }
  }

  async function resend() {
    setSuccessMessage(undefined);
    try {
      await resendVerificationEmail();
      setSuccessMessage('A new verification event has been recorded locally.');
    } catch {
      return;
    }
  }

  async function signOut() {
    try {
      await logout();
      onLogoutComplete();
    } catch {
      return;
    }
  }

  return (
    <AuthFormCard
      badge="Email verification"
      message={errorMessage ?? successMessage}
      messageTone={errorMessage ? 'error' : successMessage ? 'success' : 'info'}
      subtitle="Your account exists locally. Verify the email address before entering protected learning routes."
      title="Check your email"
    >
      <View style={styles.notice}>
        <Text style={styles.label}>Verification pending for</Text>
        <Text style={styles.email}>{user?.email ?? 'your email address'}</Text>
        <Text style={styles.copy}>
          For the local mock service, use the button below to mark the email as verified. Firebase Auth can later replace
          this with real email action links without changing the screen contract.
        </Text>
      </View>
      <PrimaryButton disabled={verifying || signingOut} onPress={() => void verify()}>
        {verifying ? 'Verifying...' : 'I have verified my email'}
      </PrimaryButton>
      <View style={styles.actions}>
        <SecondaryButton disabled={resending || signingOut} onPress={() => void resend()}>
          {resending ? 'Resending...' : 'Resend verification'}
        </SecondaryButton>
        <SecondaryButton disabled={signingOut} onPress={() => void signOut()}>
          {signingOut ? 'Signing out...' : 'Logout'}
        </SecondaryButton>
        <SecondaryButton disabled={signingOut} onPress={onBackToSignup}>
          Back to signup
        </SecondaryButton>
      </View>
    </AuthFormCard>
  );
}

const styles = StyleSheet.create({
  actions: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm
  },
  copy: {
    color: theme.colors.textMuted,
    fontSize: 14,
    lineHeight: 21
  },
  email: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '900'
  },
  label: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  notice: {
    gap: theme.spacing.xs
  }
});
