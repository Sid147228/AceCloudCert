import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppCard } from '@/components/cards';
import { InputField, SelectField } from '@/components/forms';
import { PrimaryButton, SecondaryButton, ToastNotification } from '@/components/ui';
import { theme } from '@/constants/theme';
import { certifications } from '@/data';
import { useUserProfile } from '@/context';
import type { UserAccountProfile } from '../types';
import { hasProfileValidationErrors, validateProfileForm } from '../validation';

type EditProfileFormProps = {
  onCancel: () => void;
  onSaved: (profile: UserAccountProfile) => void;
  profile: UserAccountProfile;
};

export function EditProfileForm({ onCancel, onSaved, profile }: EditProfileFormProps) {
  const { updateProfile } = useUserProfile();
  const [fullName, setFullName] = useState(profile.fullName);
  const [activeCertificationId, setActiveCertificationId] = useState(profile.activeCertificationId);
  const [errors, setErrors] = useState<ReturnType<typeof validateProfileForm>>({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | undefined>();

  async function save() {
    const nextErrors = validateProfileForm(fullName, activeCertificationId);
    setErrors(nextErrors);
    setMessage(undefined);

    if (hasProfileValidationErrors(nextErrors)) {
      return;
    }

    setSaving(true);

    try {
      const updatedProfile = await updateProfile({ activeCertificationId, fullName });
      setMessage('Profile changes saved locally.');
      onSaved(updatedProfile);
    } finally {
      setSaving(false);
    }
  }

  return (
    <AppCard style={styles.card}>
      {message ? <ToastNotification message={message} title="Saved" tone="success" /> : null}
      <InputField
        disabled={saving}
        error={errors.fullName}
        label="Full name"
        onChangeText={setFullName}
        value={fullName}
      />
      <View style={styles.field}>
        <SelectField
          label="Active certification"
          onChange={setActiveCertificationId}
          options={certifications.map((certification) => ({
            label: certification.title,
            value: certification.id
          }))}
          value={activeCertificationId}
        />
        {errors.activeCertificationId ? <Text style={styles.error}>{errors.activeCertificationId}</Text> : null}
      </View>
      <View style={styles.actions}>
        <PrimaryButton disabled={saving} onPress={() => void save()}>
          {saving ? 'Saving...' : 'Save changes'}
        </PrimaryButton>
        <SecondaryButton disabled={saving} onPress={onCancel}>
          Cancel
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
  },
  error: {
    color: theme.colors.danger,
    fontSize: 12,
    fontWeight: '800'
  },
  field: {
    gap: theme.spacing.xs
  }
});
