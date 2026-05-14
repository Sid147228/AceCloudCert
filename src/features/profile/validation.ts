import { validatePassword } from '@/features/auth';
import type { ChangePasswordFormValues } from './types';

export type ProfileFieldErrors = Partial<Record<'fullName' | 'activeCertificationId', string>>;
export type ChangePasswordFieldErrors = Partial<Record<keyof ChangePasswordFormValues, string>>;

export function validateProfileForm(fullName: string, activeCertificationId: string): ProfileFieldErrors {
  const errors: ProfileFieldErrors = {};

  if (!fullName.trim()) {
    errors.fullName = 'Full name is required.';
  } else if (fullName.trim().length < 2) {
    errors.fullName = 'Enter your full name.';
  }

  if (!activeCertificationId) {
    errors.activeCertificationId = 'Choose an active certification.';
  }

  return errors;
}

export function validateChangePassword(values: ChangePasswordFormValues): ChangePasswordFieldErrors {
  const errors: ChangePasswordFieldErrors = {};
  const passwordError = validatePassword(values.newPassword);

  if (!values.currentPassword) {
    errors.currentPassword = 'Current password is required.';
  }

  if (passwordError) {
    errors.newPassword = passwordError;
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm your new password.';
  } else if (values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = 'New passwords do not match.';
  }

  return errors;
}

export function hasProfileValidationErrors(errors: ProfileFieldErrors | ChangePasswordFieldErrors) {
  return Object.values(errors).some(Boolean);
}
