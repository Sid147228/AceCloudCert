import { adminFeature } from './admin/module';
import { authFeature } from './auth/module';
import { certificatesFeature } from './certificates/module';
import { certificationsFeature } from './certifications/module';
import { dashboardFeature } from './dashboard/module';
import { knowledgeBaseFeature } from './knowledge-base/module';
import { legalFeature } from './legal/module';
import { profileFeature } from './profile/module';
import { questionsFeature } from './questions/module';
import { subscriptionsFeature } from './subscriptions/module';
import { testsFeature } from './tests/module';

export const featureModules = [
  dashboardFeature,
  authFeature,
  certificationsFeature,
  testsFeature,
  questionsFeature,
  knowledgeBaseFeature,
  certificatesFeature,
  subscriptionsFeature,
  profileFeature,
  adminFeature,
  legalFeature
] as const;

export const featureRouteLabels = Object.fromEntries(
  featureModules.map((feature) => [feature.route, feature.name])
) as Record<(typeof featureModules)[number]['route'], string>;
