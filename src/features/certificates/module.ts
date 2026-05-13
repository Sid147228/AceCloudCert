import { APP_ROUTES } from '@/constants/routes';
import { defineFeature } from '@/lib/featureModule';

export const certificatesFeature = defineFeature({
  id: 'certificates',
  name: 'Certificates',
  route: APP_ROUTES.certificates,
  summary: 'Certificate records, branded previews, export pipeline, verification ids, and share text.',
  status: 'foundation',
  ownerDomain: 'Achievements'
});
