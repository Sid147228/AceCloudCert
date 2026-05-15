import { DEFAULT_CERTIFICATION_ID } from '@/constants/app';
import { doc, getDoc, setDoc } from 'firebase/firestore';
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
import { FIRESTORE_COLLECTIONS, getFirebaseFirestoreInstance, isFirebaseBackendEnabled } from './firebase';
import { wrapFirebaseError } from './firebaseError';
import { fromFirestoreUserProfile, toFirestoreUserProfile } from './firestoreModels';
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

function getUserProfileReference(userId: string) {
  const db = getFirebaseFirestoreInstance();
  return db ? doc(db, FIRESTORE_COLLECTIONS.users, userId) : null;
}

async function getFirestoreProfile(userId: string, fallbackUser?: AuthUser) {
  const reference = getUserProfileReference(userId);

  if (!reference) {
    return null;
  }

  const snapshot = await getDoc(reference);
  return snapshot.exists() ? fromFirestoreUserProfile(userId, snapshot.data(), fallbackUser) : null;
}

async function saveFirestoreProfile(profile: UserAccountProfile, role: AuthUser['role'] = 'learner') {
  const reference = getUserProfileReference(profile.userId);

  if (!reference) {
    return null;
  }

  const updatedProfile = {
    ...profile,
    updatedAt: new Date().toISOString()
  };

  await setDoc(reference, toFirestoreUserProfile(updatedProfile, role), { merge: true });
  return updatedProfile;
}

export const userService: UserService = {
  async addCertificateHistoryItem(userId: string, item: CertificateHistoryItem) {
    if (isFirebaseBackendEnabled()) {
      try {
        const profile = await getFirestoreProfile(userId);

        if (!profile) {
          throw new Error('Profile was not found for this Firebase user.');
        }

        return (await saveFirestoreProfile({
          ...profile,
          certificateHistory: [item, ...profile.certificateHistory.filter((historyItem) => historyItem.id !== item.id)]
        })) as UserAccountProfile;
      } catch (error) {
        wrapFirebaseError('Add Firestore certificate history item', error);
      }
    }

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
    if (isFirebaseBackendEnabled()) {
      try {
        const profile = await getFirestoreProfile(userId);

        if (!profile) {
          throw new Error('Profile was not found for this Firebase user.');
        }

        return (await saveFirestoreProfile({
          ...profile,
          learningHistory: [item, ...profile.learningHistory.filter((historyItem) => historyItem.id !== item.id)].slice(0, 50)
        })) as UserAccountProfile;
      } catch (error) {
        wrapFirebaseError('Add Firestore learning history item', error);
      }
    }

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
    if (isFirebaseBackendEnabled()) {
      try {
        const existingProfile = await getFirestoreProfile(user.id, user);

        if (existingProfile) {
          const mergedProfile = mergeAuthFields(existingProfile, user);

          if (existingProfile.email !== mergedProfile.email) {
            return (await saveFirestoreProfile(mergedProfile, user.role)) as UserAccountProfile;
          }

          return existingProfile;
        }

        const profile = createDefaultProfile(user);
        return (await saveFirestoreProfile(profile, user.role)) as UserAccountProfile;
      } catch (error) {
        wrapFirebaseError('Load Firestore user profile', error);
      }
    }

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
    if (isFirebaseBackendEnabled()) {
      try {
        return await getFirestoreProfile(userId);
      } catch (error) {
        wrapFirebaseError('Load Firestore user profile by id', error);
      }
    }

    const store = await loadStore();
    return store.profiles.find((storedProfile) => storedProfile.userId === userId) ?? null;
  },

  async saveProfile(profile: UserAccountProfile) {
    if (isFirebaseBackendEnabled()) {
      try {
        return (await saveFirestoreProfile(profile)) as UserAccountProfile;
      } catch (error) {
        wrapFirebaseError('Save Firestore user profile', error);
      }
    }

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
    if (isFirebaseBackendEnabled()) {
      try {
        const profile = await getFirestoreProfile(userId);

        if (!profile) {
          throw new Error('Profile was not found for this Firebase user.');
        }

        return (await saveFirestoreProfile({
          ...profile,
          activeCertificationId: input.activeCertificationId,
          fullName: input.fullName.trim()
        })) as UserAccountProfile;
      } catch (error) {
        wrapFirebaseError('Update Firestore user profile', error);
      }
    }

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
    if (isFirebaseBackendEnabled()) {
      try {
        const profile = await getFirestoreProfile(userId);

        if (!profile) {
          throw new Error('Profile was not found for this Firebase user.');
        }

        return (await saveFirestoreProfile({
          ...profile,
          plan
        })) as UserAccountProfile;
      } catch (error) {
        wrapFirebaseError('Update Firestore user plan', error);
      }
    }

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
    if (isFirebaseBackendEnabled()) {
      try {
        const profile = await getFirestoreProfile(userId);

        if (!profile) {
          throw new Error('Profile was not found for this Firebase user.');
        }

        return (await saveFirestoreProfile({
          ...profile,
          settings: {
            ...profile.settings,
            ...input
          }
        })) as UserAccountProfile;
      } catch (error) {
        wrapFirebaseError('Update Firestore account settings', error);
      }
    }

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
