import { APP_ROUTES } from '@/constants/routes';
import { defineFeature } from '@/lib/featureModule';

export const dashboardFeature = defineFeature({
  id: 'dashboard',
  name: 'Dashboard',
  route: APP_ROUTES.dashboard,
  summary: 'Learner overview for active certification, recent scores, streaks, and next best actions.',
  status: 'available',
  ownerDomain: 'Learner Experience'
});
