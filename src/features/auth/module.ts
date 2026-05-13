import { APP_ROUTES } from '@/constants/routes';
import { defineFeature } from '@/lib/featureModule';

export const authFeature = defineFeature({
  id: 'auth',
  name: 'Authentication',
  route: APP_ROUTES.settings,
  summary: 'Account lifecycle, login, signup, password reset, and future Firebase Auth integration.',
  status: 'foundation',
  ownerDomain: 'Identity'
});
