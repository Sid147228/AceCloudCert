import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppCard } from '@/components/cards';
import { AppButton, PrimaryButton, SecondaryButton, ToastNotification } from '@/components/ui';
import { theme } from '@/constants/theme';
import { useUserProfile } from '@/context';
import type { AccountSettings, UserAccountProfile } from '../types';

export type AccountLegalLink = {
  description: string;
  label: string;
  onPress: () => void;
  tone?: 'default' | 'danger';
};

type AccountSettingsPanelProps = {
  legalLinks: readonly AccountLegalLink[];
  onChangePassword: () => void;
  onEditProfile: () => void;
  profile: UserAccountProfile;
};

type SettingKey = keyof AccountSettings;

const settingLabels: Record<SettingKey, string> = {
  emailNotifications: 'Email notifications',
  productUpdates: 'Product updates',
  studyReminders: 'Study reminders'
};

const settingDescriptions: Record<SettingKey, string> = {
  emailNotifications: 'Receive account, exam, and certificate emails.',
  productUpdates: 'Receive AceCloudCert product update messages.',
  studyReminders: 'Receive study prompts for your active certification.'
};

export function AccountSettingsPanel({ legalLinks, onChangePassword, onEditProfile, profile }: AccountSettingsPanelProps) {
  const { updateSettings } = useUserProfile();

  async function toggleSetting(key: SettingKey) {
    await updateSettings({ [key]: !profile.settings[key] });
  }

  return (
    <View style={styles.wrap}>
      <AppCard style={styles.card}>
        <Text style={styles.cardTitle}>Account management</Text>
        <Text style={styles.copy}>Control account preferences and security flows from one place.</Text>
        <View style={styles.actions}>
          <PrimaryButton onPress={onEditProfile}>Edit profile</PrimaryButton>
          <SecondaryButton onPress={onChangePassword}>Change password</SecondaryButton>
        </View>
      </AppCard>

      <AppCard style={styles.card}>
        <Text style={styles.cardTitle}>Privacy and compliance</Text>
        <Text style={styles.copy}>Review legal notices, data handling, cookie preferences, and account deletion requests.</Text>
        <View style={styles.legalLinks}>
          {legalLinks.map((link) => (
            <View
              key={link.label}
              style={[styles.legalRow, link.tone === 'danger' && styles.legalRowDanger]}
            >
              <View style={styles.settingCopy}>
                <Text style={[styles.settingTitle, link.tone === 'danger' && styles.dangerTitle]}>{link.label}</Text>
                <Text style={styles.copy}>{link.description}</Text>
              </View>
              {link.tone === 'danger' ? (
                <AppButton onPress={link.onPress} size="sm" variant="danger">
                  Open
                </AppButton>
              ) : (
                <SecondaryButton onPress={link.onPress} size="sm">
                  Open
                </SecondaryButton>
              )}
            </View>
          ))}
        </View>
      </AppCard>

      <AppCard style={styles.card}>
        <Text style={styles.cardTitle}>Communication preferences</Text>
        {Object.keys(settingLabels).map((key) => {
          const settingKey = key as SettingKey;
          const enabled = profile.settings[settingKey];

          return (
            <Pressable key={settingKey} onPress={() => void toggleSetting(settingKey)} style={styles.settingRow}>
              <View style={styles.settingCopy}>
                <Text style={styles.settingTitle}>{settingLabels[settingKey]}</Text>
                <Text style={styles.copy}>{settingDescriptions[settingKey]}</Text>
              </View>
              <Text style={[styles.toggle, enabled && styles.toggleEnabled]}>{enabled ? 'On' : 'Off'}</Text>
            </Pressable>
          );
        })}
      </AppCard>

      <ToastNotification
        message="Settings are saved locally through userService and can map directly to Firestore profile preferences later."
        title="Firestore-ready"
        tone="info"
      />
    </View>
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
    gap: theme.spacing.md
  },
  cardTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 22
  },
  copy: {
    color: theme.colors.textMuted,
    fontSize: 14,
    lineHeight: 21
  },
  dangerTitle: {
    color: theme.colors.danger
  },
  legalLinks: {
    gap: theme.spacing.sm
  },
  legalRow: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
    justifyContent: 'space-between',
    padding: theme.spacing.md
  },
  legalRowDanger: {
    borderColor: 'rgba(239, 68, 68, 0.5)'
  },
  settingCopy: {
    flex: 1,
    gap: theme.spacing.xs
  },
  settingRow: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
    justifyContent: 'space-between',
    padding: theme.spacing.md
  },
  settingTitle: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '900'
  },
  toggle: {
    backgroundColor: theme.colors.cardMuted,
    borderRadius: theme.radii.sm,
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: '900',
    overflow: 'hidden',
    paddingHorizontal: 12,
    paddingVertical: 7,
    textTransform: 'uppercase'
  },
  toggleEnabled: {
    backgroundColor: 'rgba(34, 197, 94, 0.16)',
    color: theme.colors.success
  },
  wrap: {
    gap: theme.spacing.md
  }
});
