import { APP_ROUTES } from '@/constants/routes';
import { defineFeature } from '@/lib/featureModule';

export const testsFeature = defineFeature({
  id: 'tests',
  name: 'Tests',
  route: APP_ROUTES.tests,
  summary: 'Mock exams, quick quizzes, topic tests, scoring, answer review, and attempt persistence.',
  status: 'foundation',
  ownerDomain: 'Exam Engine'
});
