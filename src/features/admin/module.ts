import { APP_ROUTES } from '@/constants/routes';
import { defineFeature } from '@/lib/featureModule';

export const adminFeature = defineFeature({
  id: 'admin',
  name: 'Admin',
  route: APP_ROUTES.admin,
  summary: 'Future content operations for questions, topics, certification tracks, and publishing workflow.',
  status: 'planned',
  ownerDomain: 'Operations'
});
