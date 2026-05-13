export const APP_ROUTES = {
  dashboard: 'dashboard',
  auth: 'auth',
  certifications: 'certifications',
  tests: 'tests',
  questions: 'questions',
  knowledgeBase: 'knowledge-base',
  certificates: 'certificates',
  subscriptions: 'subscriptions',
  profile: 'profile',
  admin: 'admin',
  legal: 'legal'
} as const;

export const PRIMARY_NAVIGATION = [
  APP_ROUTES.dashboard,
  APP_ROUTES.knowledgeBase,
  APP_ROUTES.tests,
  APP_ROUTES.certificates,
  APP_ROUTES.profile
] as const;
