import { APP_ROUTES } from '@/constants/routes';
import { defineFeature } from '@/lib/featureModule';

export const legalFeature = defineFeature({
  id: 'legal',
  name: 'Legal',
  route: APP_ROUTES.legal,
  summary: 'Privacy, terms, cookie policy, data handling notices, and consent record architecture.',
  status: 'foundation',
  ownerDomain: 'Compliance'
});
