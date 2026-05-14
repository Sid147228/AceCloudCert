import { APP_ROUTES } from '@/constants/routes';
import { defineFeature } from '@/lib/featureModule';

export const adminFeature = defineFeature({
  id: 'admin',
  name: 'Admin',
  route: APP_ROUTES.adminDashboard,
  summary: 'Role-gated content operations for questions, topics, certification tracks, users, and analytics readiness.',
  status: 'foundation',
  ownerDomain: 'Operations'
});
