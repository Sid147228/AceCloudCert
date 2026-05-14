import { DEFAULT_CERTIFICATION_ID } from '@/constants/app';
import type { AuthUser } from '@/features/auth';
import type {
  AccountSettings,
  CertificateHistoryItem,
  LearningHistoryItem,
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

function createDefaultProfile(user: AuthUser): UserAccountProfile {
  const joinedAt = user.createdAt;

  return {
    activeCertificationId: DEFAULT_CERTIFICATION_ID,
    certificateHistory: [],
    email: user.email,
    fullName: user.fullName,
    joinedAt,
    learningHistory: [],
    plan: user.plan,
    settings: defaultSettings,
    updatedAt: new Date().toISOString(),
    userId: user.id
  };
}

function mergeAuthFields(profile: UserAccountProfile, user: AuthUser): UserAccountProfile {
  return {
    ...profile,
    email: user.email
  };
}

export const userService: UserService = {
  async addCertificateHistoryItem(userId: string, item: CertificateHistoryItem) {
    const store = await loadStore();
    const profile = store.profiles.find((storedProfile) => storedProfile.userId === userId);

    if (!profile) {
      throw new Error('Profile was not found for this user.');
    }

    return userService.saveProfile({
      ...profile,
      certificateHistory: [item, ...profile.certificateHistory.filter((historyItem) => historyItem.id !== item.id)]
    });
  },

  async addLearningHistoryItem(userId: string, item: LearningHistoryItem) {
    const store = await loadStore();
    const profile = store.profiles.find((storedProfile) => storedProfile.userId === userId);

    if (!profile) {
      throw new Error('Profile was not found for this user.');
    }

    return userService.saveProfile({
      ...profile,
      learningHistory: [item, ...profile.learningHistory.filter((historyItem) => historyItem.id !== item.id)].slice(0, 50)
    });
  },

  async getProfile(user: AuthUser) {
    const store = await loadStore();
    const storedProfile = store.profiles.find((profile) => profile.userId === user.id);

    if (storedProfile) {
      const mergedProfile = mergeAuthFields(storedProfile, user);

      if (storedProfile.email !== mergedProfile.email) {
        await userService.saveProfile(mergedProfile);
      }

      return mergedProfile;
    }

    const profile = createDefaultProfile(user);
    await saveStore({ profiles: [...store.profiles, profile] });
    return profile;
  },

  async getProfileById(userId: string) {
    const store = await loadStore();
    return store.profiles.find((storedProfile) => storedProfile.userId === userId) ?? null;
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

  async updatePlan(userId: string, plan) {
    const store = await loadStore();
    const profile = store.profiles.find((storedProfile) => storedProfile.userId === userId);

    if (!profile) {
      throw new Error('Profile was not found for this user.');
    }

    return userService.saveProfile({
      ...profile,
      plan
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
