import {
  APP_ROUTES,
  DESKTOP_SECONDARY_NAVIGATION,
  PRIMARY_NAVIGATION,
  PROTECTED_ROUTES,
  PUBLIC_ROUTES
} from '@/constants/routes';
import type { AppRoute } from '@/types';

export type RouteAccess = 'public' | 'protected';

export type RouteMeta = {
  access: RouteAccess;
  parent?: AppRoute;
  subtitle: string;
  title: string;
};

export type BreadcrumbItem = RouteMeta & {
  route: AppRoute;
};

export const ROUTE_META: Record<AppRoute, RouteMeta> = {
  [APP_ROUTES.landing]: {
    access: 'public',
    title: 'AceCloudCert',
    subtitle: 'Cloud certification preparation for modern teams and learners.'
  },
  [APP_ROUTES.login]: {
    access: 'public',
    parent: APP_ROUTES.landing,
    title: 'Login',
    subtitle: 'Access your learning workspace.'
  },
  [APP_ROUTES.signup]: {
    access: 'public',
    parent: APP_ROUTES.landing,
    title: 'Signup',
    subtitle: 'Create your AceCloudCert learner account.'
  },
  [APP_ROUTES.forgotPassword]: {
    access: 'public',
    parent: APP_ROUTES.login,
    title: 'Forgot Password',
    subtitle: 'Reset access to your account.'
  },
  [APP_ROUTES.emailVerification]: {
    access: 'public',
    parent: APP_ROUTES.signup,
    title: 'Verify Email',
    subtitle: 'Confirm your email address before opening protected learning routes.'
  },
  [APP_ROUTES.pricing]: {
    access: 'public',
    parent: APP_ROUTES.landing,
    title: 'Pricing',
    subtitle: 'Choose the plan that fits your certification goals.'
  },
  [APP_ROUTES.privacyPolicy]: {
    access: 'public',
    parent: APP_ROUTES.landing,
    title: 'Privacy Policy',
    subtitle: 'How AceCloudCert handles learner data.'
  },
  [APP_ROUTES.terms]: {
    access: 'public',
    parent: APP_ROUTES.landing,
    title: 'Terms and Conditions',
    subtitle: 'The terms for using AceCloudCert.'
  },
  [APP_ROUTES.cookiePolicy]: {
    access: 'public',
    parent: APP_ROUTES.landing,
    title: 'Cookie Policy',
    subtitle: 'How AceCloudCert uses essential local storage and consent preferences.'
  },
  [APP_ROUTES.dataHandling]: {
    access: 'public',
    parent: APP_ROUTES.landing,
    title: 'Data Handling Notice',
    subtitle: 'How learner data is stored now and how backend workflows will handle it later.'
  },
  [APP_ROUTES.dashboard]: {
    access: 'protected',
    title: 'Dashboard',
    subtitle: 'Your certification readiness command center.'
  },
  [APP_ROUTES.certifications]: {
    access: 'protected',
    parent: APP_ROUTES.dashboard,
    title: 'Certifications',
    subtitle: 'Browse available certification tracks.'
  },
  [APP_ROUTES.certificationDetail]: {
    access: 'protected',
    parent: APP_ROUTES.certifications,
    title: 'Certification Detail',
    subtitle: 'Track objectives, readiness, and available learning paths.'
  },
  [APP_ROUTES.tests]: {
    access: 'protected',
    parent: APP_ROUTES.dashboard,
    title: 'Tests',
    subtitle: 'Launch mocks, quizzes, and review flows.'
  },
  [APP_ROUTES.mockTest]: {
    access: 'protected',
    parent: APP_ROUTES.tests,
    title: 'Mock Test',
    subtitle: 'Full-length certification exam workspace.'
  },
  [APP_ROUTES.quiz]: {
    access: 'protected',
    parent: APP_ROUTES.tests,
    title: 'Quiz',
    subtitle: 'Short practice route for focused learning.'
  },
  [APP_ROUTES.testResult]: {
    access: 'protected',
    parent: APP_ROUTES.tests,
    title: 'Test Result',
    subtitle: 'Score summary and next-step routing.'
  },
  [APP_ROUTES.testReview]: {
    access: 'protected',
    parent: APP_ROUTES.testResult,
    title: 'Test Review',
    subtitle: 'Review answers and explanations after completion.'
  },
  [APP_ROUTES.knowledgeBase]: {
    access: 'protected',
    parent: APP_ROUTES.dashboard,
    title: 'Knowledge Base',
    subtitle: 'Study guides and certification topic notes.'
  },
  [APP_ROUTES.knowledgeTopicDetail]: {
    access: 'protected',
    parent: APP_ROUTES.knowledgeBase,
    title: 'Knowledge Topic Detail',
    subtitle: 'Focused study notes for one cloud topic.'
  },
  [APP_ROUTES.certificates]: {
    access: 'protected',
    parent: APP_ROUTES.dashboard,
    title: 'Certificates',
    subtitle: 'Generated achievements and verification records.'
  },
  [APP_ROUTES.certificateDetail]: {
    access: 'protected',
    parent: APP_ROUTES.certificates,
    title: 'Certificate Detail',
    subtitle: 'Certificate preview and sharing route.'
  },
  [APP_ROUTES.profile]: {
    access: 'protected',
    parent: APP_ROUTES.dashboard,
    title: 'Profile',
    subtitle: 'Account, history, and learner profile.'
  },
  [APP_ROUTES.editProfile]: {
    access: 'protected',
    parent: APP_ROUTES.profile,
    title: 'Edit Profile',
    subtitle: 'Update your learner name and active certification path.'
  },
  [APP_ROUTES.settings]: {
    access: 'protected',
    parent: APP_ROUTES.profile,
    title: 'Settings',
    subtitle: 'Account preferences, privacy, and security.'
  },
  [APP_ROUTES.changePassword]: {
    access: 'protected',
    parent: APP_ROUTES.settings,
    title: 'Change Password',
    subtitle: 'Update your local account password.'
  },
  [APP_ROUTES.learningHistory]: {
    access: 'protected',
    parent: APP_ROUTES.profile,
    title: 'Learning History',
    subtitle: 'Review recent tests, scores, and study activity.'
  },
  [APP_ROUTES.certificateHistory]: {
    access: 'protected',
    parent: APP_ROUTES.profile,
    title: 'Certificate History',
    subtitle: 'Review earned AceCloudCert certificates.'
  },
  [APP_ROUTES.deleteAccountRequest]: {
    access: 'protected',
    parent: APP_ROUTES.settings,
    title: 'Delete Account Request',
    subtitle: 'Start a future erasure workflow for your AceCloudCert account.'
  },
  [APP_ROUTES.subscription]: {
    access: 'protected',
    parent: APP_ROUTES.profile,
    title: 'Subscription',
    subtitle: 'Plan status, billing readiness, and entitlements.'
  },
  [APP_ROUTES.adminDashboard]: {
    access: 'protected',
    parent: APP_ROUTES.dashboard,
    title: 'Admin Dashboard',
    subtitle: 'Operational foundation for content and platform readiness.'
  }
};

export const ROUTE_LABELS: Record<AppRoute, string> = {
  [APP_ROUTES.landing]: 'Home',
  [APP_ROUTES.login]: 'Login',
  [APP_ROUTES.signup]: 'Signup',
  [APP_ROUTES.forgotPassword]: 'Forgot Password',
  [APP_ROUTES.emailVerification]: 'Verify Email',
  [APP_ROUTES.pricing]: 'Pricing',
  [APP_ROUTES.privacyPolicy]: 'Privacy',
  [APP_ROUTES.terms]: 'Terms',
  [APP_ROUTES.cookiePolicy]: 'Cookies',
  [APP_ROUTES.dataHandling]: 'Data Handling',
  [APP_ROUTES.dashboard]: 'Dashboard',
  [APP_ROUTES.certifications]: 'Certifications',
  [APP_ROUTES.certificationDetail]: 'Certification Detail',
  [APP_ROUTES.tests]: 'Tests',
  [APP_ROUTES.mockTest]: 'Mock Test',
  [APP_ROUTES.quiz]: 'Quiz',
  [APP_ROUTES.testResult]: 'Result',
  [APP_ROUTES.testReview]: 'Review',
  [APP_ROUTES.knowledgeBase]: 'Knowledge',
  [APP_ROUTES.knowledgeTopicDetail]: 'Topic Detail',
  [APP_ROUTES.certificates]: 'Certificates',
  [APP_ROUTES.certificateDetail]: 'Certificate Detail',
  [APP_ROUTES.profile]: 'Profile',
  [APP_ROUTES.editProfile]: 'Edit Profile',
  [APP_ROUTES.settings]: 'Settings',
  [APP_ROUTES.changePassword]: 'Change Password',
  [APP_ROUTES.learningHistory]: 'Learning History',
  [APP_ROUTES.certificateHistory]: 'Certificate History',
  [APP_ROUTES.deleteAccountRequest]: 'Delete Account',
  [APP_ROUTES.subscription]: 'Subscription',
  [APP_ROUTES.adminDashboard]: 'Admin'
};

const publicRouteSet = new Set<AppRoute>(PUBLIC_ROUTES);
const protectedRouteSet = new Set<AppRoute>(PROTECTED_ROUTES);
const navigationRouteSet = new Set<AppRoute>([...PRIMARY_NAVIGATION, ...DESKTOP_SECONDARY_NAVIGATION]);

export function isPublicRoute(route: AppRoute) {
  return publicRouteSet.has(route);
}

export function isProtectedRoute(route: AppRoute) {
  return protectedRouteSet.has(route);
}

export function getBreadcrumbs(route: AppRoute) {
  const breadcrumbs: BreadcrumbItem[] = [];
  let currentRoute: AppRoute | undefined = route;

  while (currentRoute) {
    const currentMeta: RouteMeta = ROUTE_META[currentRoute];
    breadcrumbs.unshift({ ...currentMeta, route: currentRoute });
    currentRoute = currentMeta.parent;
  }

  return breadcrumbs;
}

export function getNavigationRoute(route: AppRoute) {
  let currentRoute = route;

  while (!navigationRouteSet.has(currentRoute)) {
    const parent = ROUTE_META[currentRoute].parent;

    if (!parent) {
      return currentRoute;
    }

    currentRoute = parent;
  }

  return currentRoute;
}
