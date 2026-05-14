import { DEFAULT_CERTIFICATION_ID } from '@/constants/app';
import { certifications } from '@/data';
import type { AuthUser } from '@/features/auth';
import type {
  AccountSettings,
  UpdateAccountSettingsInput,
  UpdateUserProfileInput,
  UserAccountProfile
} from '@/features/profile';
import type { UserService } from './contracts';
import { storageService } from './storageService';

type UserProfileStore = {
  profiles: readonly UserAccountProfile[];
};

const USER_PROFILE_STORE_KEY = 'acecloudcert.userProfiles.v1';

const defaultSettings: AccountSettings = {
  emailNotifications: true,
  productUpdates: false,
  studyReminders: true
};

async function loadStore(): Promise<UserProfileStore> {
  return (await storageService.getJson<UserProfileStore>(USER_PROFILE_STORE_KEY)) ?? { profiles: [] };
}

async function saveStore(store: UserProfileStore) {
  await storageService.setJson(USER_PROFILE_STORE_KEY, store);
}

function getCertificationTitle(certificationId: string) {
  return certifications.find((certification) => certification.id === certificationId)?.name ?? 'AWS Certified Cloud Practitioner';
}

function createDefaultProfile(user: AuthUser): UserAccountProfile {
  const joinedAt = user.createdAt;
  const certificationName = getCertificationTitle(DEFAULT_CERTIFICATION_ID);

  return {
    activeCertificationId: DEFAULT_CERTIFICATION_ID,
    certificateHistory: [
      {
        certificateId: 'ACC-AWS-CCP-SAMPLE',
        certificationId: DEFAULT_CERTIFICATION_ID,
        certificationName,
        id: 'certificate-aws-ccp-sample',
        issuedAt: joinedAt,
        score: 82
      }
    ],
    email: user.email,
    fullName: user.fullName,
    joinedAt,
    learningHistory: [
      {
        certificationId: DEFAULT_CERTIFICATION_ID,
        completedAt: joinedAt,
        durationMinutes: 71,
        id: 'attempt-aws-ccp-mock-1',
        mode: 'Mock Test',
        passed: true,
        score: 82,
        title: `${certificationName} mock exam`
      },
      {
        certificationId: DEFAULT_CERTIFICATION_ID,
        completedAt: joinedAt,
        durationMinutes: 18,
        id: 'attempt-aws-ccp-quiz-1',
        mode: 'Quiz',
        passed: true,
        score: 76,
        title: 'Cloud concepts quiz'
      },
      {
        certificationId: DEFAULT_CERTIFICATION_ID,
        completedAt: joinedAt,
        durationMinutes: 24,
        id: 'study-iam-basics',
        mode: 'Study Session',
        passed: true,
        score: 100,
        title: 'IAM basics study session'
      }
    ],
    plan: user.plan,
    settings: defaultSettings,
    updatedAt: new Date().toISOString(),
    userId: user.id
  };
}

function mergeAuthFields(profile: UserAccountProfile, user: AuthUser): UserAccountProfile {
  return {
    ...profile,
    email: user.email,
    plan: user.plan
  };
}

export const userService: UserService = {
  async getProfile(user: AuthUser) {
    const store = await loadStore();
    const storedProfile = store.profiles.find((profile) => profile.userId === user.id);

    if (storedProfile) {
      const mergedProfile = mergeAuthFields(storedProfile, user);

      if (storedProfile.email !== mergedProfile.email || storedProfile.plan !== mergedProfile.plan) {
        await userService.saveProfile(mergedProfile);
      }

      return mergedProfile;
    }

    const profile = createDefaultProfile(user);
    await saveStore({ profiles: [...store.profiles, profile] });
    return profile;
  },

  async saveProfile(profile: UserAccountProfile) {
    const store = await loadStore();
    const nextProfiles = [
      ...store.profiles.filter((storedProfile) => storedProfile.userId !== profile.userId),
      {
        ...profile,
        updatedAt: new Date().toISOString()
      }
    ];

    await saveStore({ profiles: nextProfiles });
    return nextProfiles.find((storedProfile) => storedProfile.userId === profile.userId) ?? profile;
  },

  async updateProfile(userId: string, input: UpdateUserProfileInput) {
    const store = await loadStore();
    const profile = store.profiles.find((storedProfile) => storedProfile.userId === userId);

    if (!profile) {
      throw new Error('Profile was not found for this user.');
    }

    return userService.saveProfile({
      ...profile,
      activeCertificationId: input.activeCertificationId,
      fullName: input.fullName.trim()
    });
  },

  async updateSettings(userId: string, input: UpdateAccountSettingsInput) {
    const store = await loadStore();
    const profile = store.profiles.find((storedProfile) => storedProfile.userId === userId);

    if (!profile) {
      throw new Error('Profile was not found for this user.');
    }

    return userService.saveProfile({
      ...profile,
      settings: {
        ...profile.settings,
        ...input
      }
    });
  }
};
