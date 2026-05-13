import { APP_ROUTES } from '@/constants/routes';
import { defineFeature } from '@/lib/featureModule';

export const subscriptionsFeature = defineFeature({
  id: 'subscriptions',
  name: 'Subscriptions',
  route: APP_ROUTES.subscription,
  summary: 'Free, Silver, and Gold entitlements with Stripe checkout and webhook readiness.',
  status: 'foundation',
  ownerDomain: 'Billing'
});
