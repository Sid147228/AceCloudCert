import { APP_ROUTES } from '@/constants/routes';
import { defineFeature } from '@/lib/featureModule';

export const certificationsFeature = defineFeature({
  id: 'certifications',
  name: 'Certifications',
  route: APP_ROUTES.certifications,
  summary: 'Catalogue, provider taxonomy, levels, certification progress, and future unlock states.',
  status: 'foundation',
  ownerDomain: 'Content Catalogue'
});
