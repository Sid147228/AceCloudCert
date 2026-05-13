import type {
  FieldErrors,
  ForgotPasswordFormValues,
  LoginFormValues,
  SignupFormValues
} from './types';

export type LoginField = keyof LoginFormValues;
export type SignupField = keyof SignupFormValues;
export type ForgotPasswordField = keyof ForgotPasswordFormValues;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function validateEmail(email: string) {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return 'Email is required.';
  }

  if (!emailPattern.test(normalizedEmail)) {
    return 'Enter a valid email address.';
  }

  return undefined;
}

export function validatePassword(password: string) {
  if (!password) {
    return 'Password is required.';
  }

  if (password.length < 8) {
    return 'Password must be at least 8 characters.';
  }

  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    return 'Password must include letters and numbers.';
  }

  return undefined;
}

export function validateLogin(values: LoginFormValues): FieldErrors<LoginField> {
  const errors: FieldErrors<LoginField> = {};
  const emailError = validateEmail(values.email);
  const passwordError = values.password ? undefined : 'Password is required.';

  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;

  return errors;
}

export function validateSignup(values: SignupFormValues): FieldErrors<SignupField> {
  const errors: FieldErrors<SignupField> = {};
  const fullName = values.fullName.trim();
  const emailError = validateEmail(values.email);
  const passwordError = validatePassword(values.password);

  if (!fullName) {
    errors.fullName = 'Full name is required.';
  } else if (fullName.length < 2) {
    errors.fullName = 'Enter your full name.';
  }

  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm your password.';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  if (!values.acceptedTerms) {
    errors.acceptedTerms = 'You must accept the terms before creating an account.';
  }

  return errors;
}

export function validateForgotPassword(values: ForgotPasswordFormValues): FieldErrors<ForgotPasswordField> {
  const errors: FieldErrors<ForgotPasswordField> = {};
  const emailError = validateEmail(values.email);

  if (emailError) errors.email = emailError;

  return errors;
}

export function hasValidationErrors(errors: FieldErrors<string>) {
  return Object.values(errors).some(Boolean);
}
