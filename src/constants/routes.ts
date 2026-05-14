export const APP_ROUTES = {
  landing: 'landing',
  login: 'login',
  signup: 'signup',
  forgotPassword: 'forgot-password',
  emailVerification: 'email-verification',
  pricing: 'pricing',
  privacyPolicy: 'privacy-policy',
  terms: 'terms-and-conditions',
  cookiePolicy: 'cookie-policy',
  dataHandling: 'data-handling-notice',
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
  editProfile: 'edit-profile',
  settings: 'settings',
  changePassword: 'change-password',
  learningHistory: 'learning-history',
  certificateHistory: 'certificate-history',
  deleteAccountRequest: 'delete-account-request',
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
  APP_ROUTES.terms,
  APP_ROUTES.cookiePolicy,
  APP_ROUTES.dataHandling
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
  APP_ROUTES.editProfile,
  APP_ROUTES.settings,
  APP_ROUTES.changePassword,
  APP_ROUTES.learningHistory,
  APP_ROUTES.certificateHistory,
  APP_ROUTES.deleteAccountRequest,
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
  APP_ROUTES.terms,
  APP_ROUTES.cookiePolicy,
  APP_ROUTES.dataHandling
] as const;
