import { APP_ROUTES } from '@/constants/routes';
import { defineFeature } from '@/lib/featureModule';

export const questionsFeature = defineFeature({
  id: 'questions',
  name: 'Question Bank',
  route: APP_ROUTES.questions,
  summary: 'Typed question model, domains, difficulty, explanations, versioning, and admin review workflow.',
  status: 'foundation',
  ownerDomain: 'Content Quality'
});
