export const APP_ROUTES = {
  landing: 'landing',
  login: 'login',
  signup: 'signup',
  forgotPassword: 'forgot-password',
  emailVerification: 'email-verification',
  pricing: 'pricing',
  privacyPolicy: 'privacy-policy',
  terms: 'terms-and-conditions',
  dashboard: 'dashboard',
  certifications: 'certifications',
  certificationDetail: 'certification-detail',
  tests: 'tests',
  mockTest: 'mock-test',
  quiz: 'quiz',
  testResult: 'test-result',
  testReview: 'test-review',
  knowledgeBase: 'knowledge-base',
  knowledgeTopicDetail: 'knowledge-topic-detail',
  certificates: 'certificates',
  certificateDetail: 'certificate-detail',
  profile: 'profile',
  settings: 'settings',
  subscription: 'subscription',
  adminDashboard: 'admin-dashboard'
} as const;

export const PUBLIC_ROUTES = [
  APP_ROUTES.landing,
  APP_ROUTES.login,
  APP_ROUTES.signup,
  APP_ROUTES.forgotPassword,
  APP_ROUTES.emailVerification,
  APP_ROUTES.pricing,
  APP_ROUTES.privacyPolicy,
  APP_ROUTES.terms
] as const;

export const PROTECTED_ROUTES = [
  APP_ROUTES.dashboard,
  APP_ROUTES.certifications,
  APP_ROUTES.certificationDetail,
  APP_ROUTES.tests,
  APP_ROUTES.mockTest,
  APP_ROUTES.quiz,
  APP_ROUTES.testResult,
  APP_ROUTES.testReview,
  APP_ROUTES.knowledgeBase,
  APP_ROUTES.knowledgeTopicDetail,
  APP_ROUTES.certificates,
  APP_ROUTES.certificateDetail,
  APP_ROUTES.profile,
  APP_ROUTES.settings,
  APP_ROUTES.subscription,
  APP_ROUTES.adminDashboard
] as const;

export const PRIMARY_NAVIGATION = [
  APP_ROUTES.dashboard,
  APP_ROUTES.certifications,
  APP_ROUTES.tests,
  APP_ROUTES.knowledgeBase,
  APP_ROUTES.certificates,
  APP_ROUTES.profile
] as const;

export const MOBILE_NAVIGATION = [
  APP_ROUTES.dashboard,
  APP_ROUTES.certifications,
  APP_ROUTES.tests,
  APP_ROUTES.knowledgeBase,
  APP_ROUTES.profile
] as const;

export const DESKTOP_SECONDARY_NAVIGATION = [
  APP_ROUTES.subscription,
  APP_ROUTES.settings,
  APP_ROUTES.adminDashboard
] as const;

export const PUBLIC_NAVIGATION = [
  APP_ROUTES.landing,
  APP_ROUTES.pricing,
  APP_ROUTES.privacyPolicy,
  APP_ROUTES.terms
] as const;
