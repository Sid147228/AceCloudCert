import { APP_ROUTES } from '@/constants/routes';
import { defineFeature } from '@/lib/featureModule';

export const knowledgeBaseFeature = defineFeature({
  id: 'knowledge-base',
  name: 'Knowledge Base',
  route: APP_ROUTES.knowledgeBase,
  summary: 'Study topics, domain notes, examples, related quizzes, and future premium material.',
  status: 'foundation',
  ownerDomain: 'Learning Content'
});
