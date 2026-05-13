import { APP_ROUTES } from '@/constants/routes';
import { defineFeature } from '@/lib/featureModule';

export const authFeature = defineFeature({
  id: 'auth',
  name: 'Authentication',
  route: APP_ROUTES.auth,
  summary: 'Account lifecycle, login, signup, password reset, and future Firebase Auth integration.',
  status: 'foundation',
  ownerDomain: 'Identity'
});
