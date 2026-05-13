import { APP_ROUTES } from '@/constants/routes';
import { defineFeature } from '@/lib/featureModule';

export const profileFeature = defineFeature({
  id: 'profile',
  name: 'Profile',
  route: APP_ROUTES.profile,
  summary: 'Learner profile, plan state, score history, certificate history, settings, and logout.',
  status: 'foundation',
  ownerDomain: 'Account'
});
