import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { LearningHistoryItem, UpdateAccountSettingsInput, UpdateUserProfileInput, UserAccountProfile } from '@/features/profile';
import { userService } from '@/services';
import { useAuth } from './AuthContext';

type UserProfileContextValue = {
  errorMessage?: string;
  isProfileLoading: boolean;
  addLearningHistoryItem: (item: LearningHistoryItem) => Promise<UserAccountProfile>;
  profile: UserAccountProfile | null;
  refreshProfile: () => Promise<void>;
  updateProfile: (input: UpdateUserProfileInput) => Promise<UserAccountProfile>;
  updateSettings: (input: UpdateAccountSettingsInput) => Promise<UserAccountProfile>;
};

const UserProfileContext = createContext<UserProfileContextValue | undefined>(undefined);

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  const [profile, setProfile] = useState<UserAccountProfile | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const refreshProfile = useCallback(async () => {
    if (!isAuthenticated || !user) {
      setProfile(null);
      return;
    }

    setIsProfileLoading(true);
    setErrorMessage(undefined);

    try {
      const loadedProfile = await userService.getProfile(user);
      setProfile(loadedProfile);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to load profile.');
    } finally {
      setIsProfileLoading(false);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    void refreshProfile();
  }, [refreshProfile]);

  const value = useMemo<UserProfileContextValue>(
    () => ({
      addLearningHistoryItem: async (item) => {
        if (!profile) {
          throw new Error('Profile is not loaded.');
        }

        setErrorMessage(undefined);
        const updatedProfile = await userService.addLearningHistoryItem(profile.userId, item);
        setProfile(updatedProfile);
        return updatedProfile;
      },
      errorMessage,
      isProfileLoading,
      profile,
      refreshProfile,
      updateProfile: async (input) => {
        if (!profile) {
          throw new Error('Profile is not loaded.');
        }

        setErrorMessage(undefined);
        const updatedProfile = await userService.updateProfile(profile.userId, input);
        setProfile(updatedProfile);
        return updatedProfile;
      },
      updateSettings: async (input) => {
        if (!profile) {
          throw new Error('Profile is not loaded.');
        }

        setErrorMessage(undefined);
        const updatedProfile = await userService.updateSettings(profile.userId, input);
        setProfile(updatedProfile);
        return updatedProfile;
      }
    }),
    [errorMessage, isProfileLoading, profile, refreshProfile]
  );

  return <UserProfileContext.Provider value={value}>{children}</UserProfileContext.Provider>;
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);

  if (!context) {
    throw new Error('useUserProfile must be used within UserProfileProvider.');
  }

  return context;
}
