import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppCard, FeatureCard, StatCard } from '@/components/cards';
import { DomainProgressList } from '@/components/charts';
import { AppShell, SectionHeader } from '@/components/layout';
import { Badge, EmptyState, LoadingState, PrimaryButton, ProgressBar, SecondaryButton, Table, Tabs, ToastNotification } from '@/components/ui';
import type { TableColumn } from '@/components/ui';
import { APP_NAME, DEFAULT_CERTIFICATION_ID, PASS_MARK_PERCENT } from '@/constants/app';
import { APP_ROUTES } from '@/constants/routes';
import { theme } from '@/constants/theme';
import { AuthProvider, UserProfileProvider, useAuth, useUserProfile } from '@/context';
import { certifications, knowledgeTopics, legalPages, questionBank, subscriptionPlans } from '@/data';
import { EmailVerificationNotice, ForgotPasswordForm, LoginForm, SignupForm } from '@/features/auth/components';
import type { AuthUser } from '@/features/auth';
import {
  AccountSettingsPanel,
  CertificateHistoryPanel,
  ChangePasswordForm,
  EditProfileForm,
  LearningHistoryPanel,
  ProfileSummary,
  SubscriptionStatusPanel
} from '@/features/profile/components';
import { getActiveCertificationTitle, getProfileStats } from '@/features/profile';
import type { UserAccountProfile } from '@/features/profile';
import { ROUTE_LABELS, ROUTE_META, getBreadcrumbs, getNavigationRoute, isProtectedRoute } from '@/app/navigation';
import { featureModules } from '@/features';
import { useAppNavigation } from '@/hooks';
import { getAvailableFeatures } from '@/lib';
import { serviceReadiness } from '@/services';
import type { AppRoute, LegalPage, ServiceReadinessItem, UserProfile } from '@/types';
import { calculateReadinessScore, countQuestionsByDomain, formatCount, formatPercent } from '@/utils';

const authEntryRoutes = new Set<AppRoute>([APP_ROUTES.login, APP_ROUTES.signup, APP_ROUTES.forgotPassword]);

const serviceColumns: readonly TableColumn<ServiceReadinessItem>[] = [
  {
    key: 'name',
    minWidth: 180,
    render: (row) => <Text style={styles.tableText}>{row.name}</Text>,
    title: 'Service'
  },
  {
    key: 'purpose',
    minWidth: 340,
    render: (row) => <Text style={styles.tableMuted}>{row.purpose}</Text>,
    title: 'Purpose'
  },
  {
    key: 'configuration',
    minWidth: 320,
    render: (row) => <Text style={styles.tableMuted}>{row.requiredConfiguration.join(', ')}</Text>,
    title: 'Required configuration'
  }
];

export default function AceCloudCertApp() {
  return (
    <AuthProvider>
      <UserProfileProvider>
        <AceCloudCertRoutes />
      </UserProfileProvider>
    </AuthProvider>
  );
}

function AceCloudCertRoutes() {
  const { activeRoute, navigate: setActiveRoute } = useAppNavigation(APP_ROUTES.landing);
  const { isAuthenticated, isInitializing, logout, status, user } = useAuth();
  const { isProfileLoading, profile } = useUserProfile();
  const [redirectAfterLogin, setRedirectAfterLogin] = useState<AppRoute>(APP_ROUTES.dashboard);
  const [activeTestTab, setActiveTestTab] = useState('overview');

  const domainCounts = useMemo(() => countQuestionsByDomain(questionBank), []);
  const availableFeatures = useMemo(() => getAvailableFeatures(featureModules), []);
  const userProfile = profile ? toUserProfile(profile) : null;
  const activeMenuRoute =
    isAuthenticated && !isProtectedRoute(activeRoute) ? getAuthenticatedPublicMenuRoute(activeRoute) : getNavigationRoute(activeRoute);

  function navigate(route: AppRoute) {
    if (!isAuthenticated && isProtectedRoute(route)) {
      setRedirectAfterLogin(route);
      setActiveRoute(status === 'verification-required' ? APP_ROUTES.emailVerification : APP_ROUTES.login);
      return;
    }

    if (isAuthenticated && (authEntryRoutes.has(route) || route === APP_ROUTES.emailVerification)) {
      setActiveRoute(APP_ROUTES.dashboard);
      return;
    }

    setActiveRoute(route);
  }

  function completeAuthFlow(authUser: AuthUser) {
    setActiveRoute(authUser.emailVerified ? redirectAfterLogin : APP_ROUTES.emailVerification);
  }

  function completeVerification() {
    setActiveRoute(redirectAfterLogin);
  }

  function handleLogout() {
    void logout().finally(() => {
      setRedirectAfterLogin(APP_ROUTES.dashboard);
      setActiveRoute(APP_ROUTES.landing);
    });
  }

  function showProtectedFallback() {
    return <LoadingState message={isProfileLoading ? 'Loading your account profile...' : 'Preparing your secure workspace...'} />;
  }

  if (isInitializing) {
    return (
      <AppShell
        activeMenuRoute={APP_ROUTES.landing}
        activeRoute={APP_ROUTES.landing}
        isAuthenticated={false}
        navigate={navigate}
        onLogout={handleLogout}
        routeLabels={ROUTE_LABELS}
      >
        <LoadingState message="Restoring your AceCloudCert session..." />
      </AppShell>
    );
  }

  function resetAfterLogout() {
    setRedirectAfterLogin(APP_ROUTES.dashboard);
    setActiveRoute(APP_ROUTES.landing);
  }

  return (
    <AppShell
      activeMenuRoute={activeMenuRoute}
      activeRoute={activeRoute}
      isAuthenticated={isAuthenticated}
      navigate={navigate}
      onLogout={handleLogout}
      routeLabels={ROUTE_LABELS}
    >
      {activeRoute !== APP_ROUTES.landing ? <RouteHeading navigate={navigate} route={activeRoute} /> : null}
      {activeRoute === APP_ROUTES.landing ? (
        <LandingPage isAuthenticated={isAuthenticated} navigate={navigate} />
      ) : activeRoute === APP_ROUTES.login ? (
        <LoginForm
          onForgotPassword={() => navigate(APP_ROUTES.forgotPassword)}
          onLoginComplete={completeAuthFlow}
          onSignup={() => navigate(APP_ROUTES.signup)}
        />
      ) : activeRoute === APP_ROUTES.signup ? (
        <SignupForm
          onLogin={() => navigate(APP_ROUTES.login)}
          onPrivacy={() => navigate(APP_ROUTES.privacyPolicy)}
          onSignupComplete={completeAuthFlow}
          onTerms={() => navigate(APP_ROUTES.terms)}
        />
      ) : activeRoute === APP_ROUTES.forgotPassword ? (
        <ForgotPasswordForm onBackToLogin={() => navigate(APP_ROUTES.login)} />
      ) : activeRoute === APP_ROUTES.emailVerification ? (
        <EmailVerificationNotice
          onBackToSignup={() => navigate(APP_ROUTES.signup)}
          onLogoutComplete={resetAfterLogout}
          onVerified={completeVerification}
        />
      ) : activeRoute === APP_ROUTES.pricing ? (
        <PricingPage isAuthenticated={isAuthenticated} navigate={navigate} />
      ) : activeRoute === APP_ROUTES.privacyPolicy ? (
        <LegalPageContent legalPageId="privacy" />
      ) : activeRoute === APP_ROUTES.terms ? (
        <LegalPageContent legalPageId="terms" />
      ) : activeRoute === APP_ROUTES.dashboard ? (
        profile ? (
          <DashboardPage availableFeatureCount={availableFeatures.length} domainCounts={domainCounts} navigate={navigate} profile={profile} />
        ) : (
          showProtectedFallback()
        )
      ) : activeRoute === APP_ROUTES.certifications ? (
        <CertificationsPage navigate={navigate} />
      ) : activeRoute === APP_ROUTES.certificationDetail ? (
        <CertificationDetailPage navigate={navigate} />
      ) : activeRoute === APP_ROUTES.tests ? (
        <TestsPage activeTab={activeTestTab} domainCounts={domainCounts} navigate={navigate} setActiveTab={setActiveTestTab} />
      ) : activeRoute === APP_ROUTES.mockTest ? (
        <MockTestPage navigate={navigate} />
      ) : activeRoute === APP_ROUTES.quiz ? (
        <QuizPage navigate={navigate} />
      ) : activeRoute === APP_ROUTES.testResult ? (
        <TestResultPage navigate={navigate} />
      ) : activeRoute === APP_ROUTES.testReview ? (
        <TestReviewPage navigate={navigate} />
      ) : activeRoute === APP_ROUTES.knowledgeBase ? (
        <KnowledgeBasePage navigate={navigate} />
      ) : activeRoute === APP_ROUTES.knowledgeTopicDetail ? (
        <KnowledgeTopicDetailPage navigate={navigate} />
      ) : activeRoute === APP_ROUTES.certificates ? (
        profile ? <CertificatesPage navigate={navigate} profile={profile} /> : showProtectedFallback()
      ) : activeRoute === APP_ROUTES.certificateDetail ? (
        userProfile ? <CertificateDetailPage navigate={navigate} user={userProfile} /> : showProtectedFallback()
      ) : activeRoute === APP_ROUTES.profile ? (
        profile ? <ProfilePage navigate={navigate} onLogout={handleLogout} profile={profile} /> : showProtectedFallback()
      ) : activeRoute === APP_ROUTES.editProfile ? (
        profile ? <EditProfilePage navigate={navigate} profile={profile} /> : showProtectedFallback()
      ) : activeRoute === APP_ROUTES.settings ? (
        profile ? <SettingsPage navigate={navigate} profile={profile} /> : showProtectedFallback()
      ) : activeRoute === APP_ROUTES.changePassword ? (
        <ChangePasswordPage navigate={navigate} />
      ) : activeRoute === APP_ROUTES.learningHistory ? (
        profile ? <LearningHistoryPage navigate={navigate} profile={profile} /> : showProtectedFallback()
      ) : activeRoute === APP_ROUTES.certificateHistory ? (
        profile ? <CertificateHistoryPage navigate={navigate} profile={profile} /> : showProtectedFallback()
      ) : activeRoute === APP_ROUTES.subscription ? (
        profile ? <SubscriptionPage navigate={navigate} profile={profile} /> : showProtectedFallback()
      ) : (
        <AdminDashboardPage navigate={navigate} />
      )}
    </AppShell>
  );
}

type NavigationProps = {
  navigate: (route: AppRoute) => void;
};

function RouteHeading({ navigate, route }: NavigationProps & { route: AppRoute }) {
  const breadcrumbs = getBreadcrumbs(route);
  const routeMeta = ROUTE_META[route];

  return (
    <View style={styles.routeHeading}>
      <View style={styles.breadcrumbs}>
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <View key={breadcrumb.route} style={styles.breadcrumbItem}>
              <Pressable disabled={isLast} onPress={() => navigate(breadcrumb.route)}>
                <Text style={[styles.breadcrumbText, isLast && styles.activeBreadcrumbText]}>{breadcrumb.title}</Text>
              </Pressable>
              {!isLast ? <Text style={styles.breadcrumbSeparator}>/</Text> : null}
            </View>
          );
        })}
      </View>
      <SectionHeader subtitle={routeMeta.subtitle} title={routeMeta.title} />
    </View>
  );
}

function getAuthenticatedPublicMenuRoute(route: AppRoute) {
  if (route === APP_ROUTES.pricing) {
    return APP_ROUTES.subscription;
  }

  if (route === APP_ROUTES.privacyPolicy || route === APP_ROUTES.terms) {
    return APP_ROUTES.settings;
  }

  return APP_ROUTES.dashboard;
}

function toUserProfile(profile: UserAccountProfile): UserProfile {
  return {
    email: profile.email,
    id: profile.userId,
    name: profile.fullName,
    plan: profile.plan
  };
}

function LandingPage({ isAuthenticated, navigate }: NavigationProps & { isAuthenticated: boolean }) {
  return (
    <>
      <View style={styles.landingHero}>
        <Badge tone="primary">Enterprise cloud certification platform</Badge>
        <Text style={styles.heroTitle}>{APP_NAME}</Text>
        <Text style={styles.heroCopy}>
          A mobile-first learning workspace for mock exams, topic quizzes, study paths, progress tracking, certificates,
          subscriptions, and future Firebase and Stripe integrations.
        </Text>
        <View style={styles.actions}>
          <PrimaryButton onPress={() => navigate(isAuthenticated ? APP_ROUTES.dashboard : APP_ROUTES.signup)}>
            {isAuthenticated ? 'Open dashboard' : 'Start learning'}
          </PrimaryButton>
          <SecondaryButton onPress={() => navigate(APP_ROUTES.pricing)}>View pricing</SecondaryButton>
          <SecondaryButton onPress={() => navigate(isAuthenticated ? APP_ROUTES.tests : APP_ROUTES.login)}>
            {isAuthenticated ? 'Start mock test' : 'Login'}
          </SecondaryButton>
        </View>
      </View>

      <View style={styles.metricGrid}>
        <StatCard label="Primary path" value="AWS CCP" />
        <StatCard label="Exam pass mark" value={formatPercent(PASS_MARK_PERCENT)} />
        <StatCard label="Question domains" value={Object.keys(countQuestionsByDomain(questionBank)).length} />
      </View>

      <View style={styles.cardGrid}>
        <RouteCard
          badge="Learn"
          copy="Topic-led study paths for cloud concepts, AWS infrastructure, IAM, billing, and support."
          onPress={() => navigate(isAuthenticated ? APP_ROUTES.knowledgeBase : APP_ROUTES.login)}
          title="Knowledge base"
        />
        <RouteCard
          badge="Practice"
          copy="Dedicated routes for mock exams, quick quizzes, results, and answer review."
          onPress={() => navigate(isAuthenticated ? APP_ROUTES.tests : APP_ROUTES.login)}
          title="Test engine"
        />
        <RouteCard
          badge="Proof"
          copy="Certificate history and certificate detail routes are ready for the achievement module."
          onPress={() => navigate(isAuthenticated ? APP_ROUTES.certificates : APP_ROUTES.login)}
          title="Certificates"
        />
      </View>
    </>
  );
}

function PricingPage({ isAuthenticated, navigate }: NavigationProps & { isAuthenticated: boolean }) {
  return (
    <Section
      eyebrow="Plans"
      subtitle="Public pricing routes connect to signup for guests and subscription management for authenticated learners."
      title="Pricing built for self-paced certification prep"
    >
      <View style={styles.cardGrid}>
        {subscriptionPlans.map((plan) => (
          <AppCard key={plan.id} style={styles.flexCard}>
            <View style={styles.row}>
              <Text style={styles.cardTitle}>{plan.name}</Text>
              {plan.id === 'Free' ? <Badge tone="success">Starter</Badge> : <Badge tone="primary">Upgrade</Badge>}
            </View>
            <Text style={styles.price}>{plan.priceLabel}</Text>
            {plan.features.map((feature) => (
              <Text key={feature} style={styles.copy}>
                - {feature}
              </Text>
            ))}
            <PrimaryButton onPress={() => navigate(isAuthenticated ? APP_ROUTES.subscription : APP_ROUTES.signup)}>
              {isAuthenticated ? 'Manage plan' : 'Choose plan'}
            </PrimaryButton>
          </AppCard>
        ))}
      </View>
    </Section>
  );
}

function LegalPageContent({ legalPageId }: { legalPageId: LegalPage['id'] }) {
  const legalPage = legalPages.find((page) => page.id === legalPageId);

  return (
    <Section
      eyebrow="Compliance"
      subtitle={legalPage?.summary ?? 'Compliance route for learner trust and platform governance.'}
      title={legalPage?.title ?? 'Legal Notice'}
    >
      <AppCard>
        <Text style={styles.copy}>
          AceCloudCert separates public legal pages from authenticated product routes so privacy, terms, cookie consent,
          and data handling notices can be linked from signup, settings, and the footer without route duplication.
        </Text>
        <Text style={styles.copy}>
          This page is ready for final legal copy, version history, consent capture, and future export or deletion request
          workflows.
        </Text>
      </AppCard>
    </Section>
  );
}

function DashboardPage({
  availableFeatureCount,
  domainCounts,
  navigate,
  profile
}: NavigationProps & {
  availableFeatureCount: number;
  domainCounts: Record<string, number>;
  profile: UserAccountProfile;
}) {
  const readiness = calculateReadinessScore(questionBank.length, 0);
  const activeCertificationTitle = getActiveCertificationTitle(profile);
  const stats = getProfileStats(profile);

  return (
    <>
      <AppCard style={styles.hero}>
        <SectionHeader
          eyebrow="Protected route"
          subtitle="This dashboard is the authenticated app entry point with working navigation into every major product area."
          title={`Welcome, ${profile.fullName}`}
        />
        <ToastNotification message="Navigation and layout architecture are wired. Feature logic comes next." title="Workspace ready" tone="success" />
        <View style={styles.actions}>
          <PrimaryButton onPress={() => navigate(APP_ROUTES.mockTest)}>Start mock test</PrimaryButton>
          <SecondaryButton onPress={() => navigate(APP_ROUTES.knowledgeBase)}>Continue learning</SecondaryButton>
          <SecondaryButton onPress={() => navigate(APP_ROUTES.subscription)}>Upgrade plan</SecondaryButton>
        </View>
      </AppCard>

      <View style={styles.metricGrid}>
        <StatCard label="Active path" value={activeCertificationTitle} />
        <StatCard label="Tests completed" value={stats.testsCompleted} />
        <StatCard label="Average score" value={formatPercent(stats.averageScore)} />
        <StatCard label="Readiness baseline" value={formatPercent(readiness)} />
      </View>

      <Section eyebrow="Quick actions" title="Route map">
        <View style={styles.metricGrid}>
          <StatCard label="Feature modules" value={availableFeatureCount} />
          <StatCard label="Domains mapped" value={Object.keys(domainCounts).length} />
        </View>
        <View style={styles.cardGrid}>
          {featureModules.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} onPress={() => navigate(feature.route)} />
          ))}
        </View>
      </Section>
    </>
  );
}

function CertificationsPage({ navigate }: NavigationProps) {
  return (
    <Section eyebrow="Catalogue" subtitle="Certification cards route into the certification detail layout." title="Certification catalogue">
      <View style={styles.cardGrid}>
        {certifications.map((certification) => (
          <AppCard key={certification.id} style={styles.flexCard}>
            <View style={styles.row}>
              <Badge>{certification.provider}</Badge>
              <Badge tone={certification.status === 'active' ? 'success' : 'neutral'}>{certification.status}</Badge>
            </View>
            <Text style={styles.cardTitle}>{certification.title}</Text>
            <Text style={styles.copy}>{certification.difficulty}</Text>
            <Text style={styles.copy}>{formatCount(certification.questionCount, 'question')}</Text>
            <ProgressBar value={certification.progress} />
            <PrimaryButton onPress={() => navigate(APP_ROUTES.certificationDetail)}>
              {certification.status === 'active' ? 'Open path' : 'View roadmap'}
            </PrimaryButton>
          </AppCard>
        ))}
      </View>
    </Section>
  );
}

function CertificationDetailPage({ navigate }: NavigationProps) {
  return (
    <Section
      eyebrow="AWS Certified Cloud Practitioner"
      subtitle="Detail route for objectives, progress, available tests, and linked study topics."
      title="Certification detail layout"
    >
      <View style={styles.metricGrid}>
        <StatCard label="Question bank" value={formatCount(questionBank.length, 'question')} />
        <StatCard label="Pass target" value={formatPercent(PASS_MARK_PERCENT)} />
        <StatCard label="Progress" value="64%" />
      </View>
      <AppCard>
        <DomainProgressList domainCounts={countQuestionsByDomain(questionBank)} />
      </AppCard>
      <View style={styles.actions}>
        <PrimaryButton onPress={() => navigate(APP_ROUTES.mockTest)}>Start mock test</PrimaryButton>
        <SecondaryButton onPress={() => navigate(APP_ROUTES.quiz)}>Start quiz</SecondaryButton>
        <SecondaryButton onPress={() => navigate(APP_ROUTES.knowledgeTopicDetail)}>Open study topic</SecondaryButton>
      </View>
    </Section>
  );
}

function TestsPage({
  activeTab,
  domainCounts,
  navigate,
  setActiveTab
}: NavigationProps & {
  activeTab: string;
  domainCounts: Record<string, number>;
  setActiveTab: (value: string) => void;
}) {
  return (
    <Section eyebrow="Exam engine" subtitle="Test engine routes are separated for mock tests, quizzes, results, and reviews." title="Tests">
      <Tabs
        activeId={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: 'overview', label: 'Overview' },
          { id: 'domains', label: 'Domains' }
        ]}
      />
      {activeTab === 'domains' ? (
        <AppCard>
          <DomainProgressList domainCounts={domainCounts} />
        </AppCard>
      ) : (
        <View style={styles.cardGrid}>
          <RouteCard badge="Mock" copy="Full exam route with timer, progress, and submit navigation shell." onPress={() => navigate(APP_ROUTES.mockTest)} title="Mock test" />
          <RouteCard badge="Quiz" copy="Focused topic quiz route for short practice sessions." onPress={() => navigate(APP_ROUTES.quiz)} title="Quick quiz" />
          <RouteCard badge="Results" copy="Score summary and next-step layout." onPress={() => navigate(APP_ROUTES.testResult)} title="Latest result" />
          <RouteCard badge="Review" copy="Answer review route with explanations." onPress={() => navigate(APP_ROUTES.testReview)} title="Answer review" />
        </View>
      )}
    </Section>
  );
}

function MockTestPage({ navigate }: NavigationProps) {
  return (
    <Section eyebrow="Mock exam" subtitle="Layout-only exam route prepared for the test engine implementation." title="AWS CCP mock test">
      <AppCard style={styles.examCard}>
        <View style={styles.row}>
          <Badge tone="info">Question 1 of 65</Badge>
          <Text style={styles.copy}>Timer placeholder: 89:42</Text>
        </View>
        <ProgressBar value={12} />
        <Text style={styles.cardTitle}>Which AWS benefit helps customers avoid large upfront infrastructure purchases?</Text>
        {['Elastic capacity', 'Capital expense reduction', 'Pay-as-you-go pricing', 'Dedicated hardware ownership'].map((option) => (
          <AppCard key={option} style={styles.optionCard}>
            <Text style={styles.copy}>{option}</Text>
          </AppCard>
        ))}
        <View style={styles.actions}>
          <SecondaryButton onPress={() => navigate(APP_ROUTES.tests)}>Exit test</SecondaryButton>
          <SecondaryButton onPress={() => navigate(APP_ROUTES.quiz)}>Switch to quiz</SecondaryButton>
          <PrimaryButton onPress={() => navigate(APP_ROUTES.testResult)}>Submit test</PrimaryButton>
        </View>
      </AppCard>
    </Section>
  );
}

function QuizPage({ navigate }: NavigationProps) {
  return (
    <Section eyebrow="Topic quiz" subtitle="Short-form quiz layout route for the upcoming topic quiz engine." title="Cloud concepts quiz">
      <AppCard style={styles.examCard}>
        <Badge tone="info">Quick quiz</Badge>
        <Text style={styles.cardTitle}>What does AWS Cloud elasticity allow a workload to do?</Text>
        <Text style={styles.copy}>Select an answer, move through the quiz, and land on the same result route used by mocks.</Text>
        <View style={styles.actions}>
          <SecondaryButton onPress={() => navigate(APP_ROUTES.tests)}>Back to tests</SecondaryButton>
          <PrimaryButton onPress={() => navigate(APP_ROUTES.testResult)}>Finish quiz</PrimaryButton>
        </View>
      </AppCard>
    </Section>
  );
}

function TestResultPage({ navigate }: NavigationProps) {
  return (
    <Section eyebrow="Result" subtitle="Result route for scores, pass state, domain breakdown, review, and certificate access." title="Latest test result">
      <View style={styles.metricGrid}>
        <StatCard label="Score" value="82%" />
        <StatCard label="Correct" value="53" />
        <StatCard label="Incorrect" value="12" />
        <StatCard label="Time taken" value="71m" />
      </View>
      <ToastNotification message="This learner passed the mock route and can open the certificate detail layout." title="Passed" tone="success" />
      <View style={styles.actions}>
        <PrimaryButton onPress={() => navigate(APP_ROUTES.testReview)}>Review answers</PrimaryButton>
        <SecondaryButton onPress={() => navigate(APP_ROUTES.certificateDetail)}>Open certificate</SecondaryButton>
        <SecondaryButton onPress={() => navigate(APP_ROUTES.mockTest)}>Retry test</SecondaryButton>
      </View>
    </Section>
  );
}

function TestReviewPage({ navigate }: NavigationProps) {
  return (
    <Section eyebrow="Review" subtitle="Review route for answer explanations after a completed attempt." title="Answer review">
      <View style={styles.cardGrid}>
        {questionBank.slice(0, 4).map((question, index) => (
          <AppCard key={question.id} style={styles.flexCard}>
            <Badge tone={index % 2 === 0 ? 'success' : 'danger'}>{index % 2 === 0 ? 'Correct' : 'Review'}</Badge>
            <Text style={styles.cardTitle}>{question.prompt}</Text>
            <Text style={styles.copy}>{question.explanation}</Text>
          </AppCard>
        ))}
      </View>
      <View style={styles.actions}>
        <PrimaryButton onPress={() => navigate(APP_ROUTES.testResult)}>Back to result</PrimaryButton>
        <SecondaryButton onPress={() => navigate(APP_ROUTES.tests)}>All tests</SecondaryButton>
      </View>
    </Section>
  );
}

function KnowledgeBasePage({ navigate }: NavigationProps) {
  return (
    <Section eyebrow="Study" subtitle="Knowledge cards route to the topic detail layout." title="Knowledge base">
      <View style={styles.cardGrid}>
        {knowledgeTopics.map((topic) => (
          <AppCard key={topic.id} style={styles.flexCard}>
            <Badge tone="info">{topic.domain}</Badge>
            <Text style={styles.cardTitle}>{topic.title}</Text>
            <Text style={styles.copy}>{topic.summary}</Text>
            <PrimaryButton onPress={() => navigate(APP_ROUTES.knowledgeTopicDetail)}>Open topic</PrimaryButton>
          </AppCard>
        ))}
      </View>
    </Section>
  );
}

function KnowledgeTopicDetailPage({ navigate }: NavigationProps) {
  const topic = knowledgeTopics.find((item) => item.id === 'iam-basics') ?? knowledgeTopics[0];

  return (
    <Section eyebrow={topic?.domain ?? 'Study topic'} subtitle={topic?.summary} title={topic?.title ?? 'Knowledge topic detail'}>
      <AppCard>
        {(topic?.bullets ?? ['Structured notes', 'Related quiz route', 'Progress tracking ready']).map((bullet) => (
          <Text key={bullet} style={styles.copy}>
            - {bullet}
          </Text>
        ))}
      </AppCard>
      <View style={styles.actions}>
        <PrimaryButton onPress={() => navigate(APP_ROUTES.quiz)}>Start related quiz</PrimaryButton>
        <SecondaryButton onPress={() => navigate(APP_ROUTES.knowledgeBase)}>Back to knowledge base</SecondaryButton>
      </View>
    </Section>
  );
}

function CertificatesPage({ navigate, profile }: NavigationProps & { profile: UserAccountProfile }) {
  if (profile.certificateHistory.length > 0) {
    return (
      <Section eyebrow="Achievements" subtitle="Certificate records connected to your account profile." title="Certificates">
        <CertificateHistoryPanel onBack={() => navigate(APP_ROUTES.profile)} profile={profile} />
        <View style={styles.actions}>
          <PrimaryButton onPress={() => navigate(APP_ROUTES.certificateDetail)}>Open certificate detail</PrimaryButton>
          <SecondaryButton onPress={() => navigate(APP_ROUTES.profile)}>Back to profile</SecondaryButton>
        </View>
      </Section>
    );
  }

  return (
    <Section eyebrow="Achievements" subtitle="Certificate list route with history and detail routing." title="Certificates">
      <EmptyState
        actionLabel="Open sample certificate"
        description="Certificate generation logic comes later, but the list and detail routes are already connected."
        onAction={() => navigate(APP_ROUTES.certificateDetail)}
        title="No generated certificates yet"
      />
    </Section>
  );
}

function CertificateDetailPage({ navigate, user }: NavigationProps & { user: UserProfile }) {
  return (
    <Section eyebrow="Certificate" subtitle="Certificate detail route prepared for export and sharing integrations." title="Certificate preview">
      <AppCard style={styles.certificatePreview}>
        <Text style={styles.certificateBrand}>{APP_NAME}</Text>
        <Text style={styles.certificateTitle}>Certificate of Completion</Text>
        <Text style={styles.copy}>Awarded to {user.name}</Text>
        <Text style={styles.cardTitle}>AWS Certified Cloud Practitioner Practice Exam</Text>
        <Text style={styles.copy}>Score: 82% | Certificate ID: ACC-AWS-CCP-SAMPLE</Text>
      </AppCard>
      <View style={styles.actions}>
        <PrimaryButton onPress={() => navigate(APP_ROUTES.certificates)}>Back to certificates</PrimaryButton>
        <SecondaryButton onPress={() => navigate(APP_ROUTES.testResult)}>View source result</SecondaryButton>
      </View>
    </Section>
  );
}

function ProfilePage({ navigate, onLogout, profile }: NavigationProps & { onLogout: () => void; profile: UserAccountProfile }) {
  return (
    <Section eyebrow="Account" subtitle="Profile overview, history, subscription, and account management." title="Profile overview">
      <ProfileSummary
        onCertificates={() => navigate(APP_ROUTES.certificateHistory)}
        onEdit={() => navigate(APP_ROUTES.editProfile)}
        onHistory={() => navigate(APP_ROUTES.learningHistory)}
        onSettings={() => navigate(APP_ROUTES.settings)}
        onSubscription={() => navigate(APP_ROUTES.subscription)}
        profile={profile}
      />
      <View style={styles.actions}>
        <SecondaryButton onPress={() => navigate(APP_ROUTES.dashboard)}>Back to dashboard</SecondaryButton>
        <SecondaryButton onPress={onLogout}>Logout</SecondaryButton>
      </View>
    </Section>
  );
}

function EditProfilePage({ navigate, profile }: NavigationProps & { profile: UserAccountProfile }) {
  return (
    <Section eyebrow="Profile" subtitle="Edit your name and active certification path. Changes persist locally." title="Edit profile">
      <EditProfileForm onCancel={() => navigate(APP_ROUTES.profile)} onSaved={() => navigate(APP_ROUTES.profile)} profile={profile} />
    </Section>
  );
}

function SettingsPage({ navigate, profile }: NavigationProps & { profile: UserAccountProfile }) {
  return (
    <Section eyebrow="Preferences" subtitle="Account settings, privacy links, and security controls." title="Account settings">
      <AccountSettingsPanel
        onChangePassword={() => navigate(APP_ROUTES.changePassword)}
        onEditProfile={() => navigate(APP_ROUTES.editProfile)}
        onLegal={() => navigate(APP_ROUTES.privacyPolicy)}
        profile={profile}
      />
    </Section>
  );
}

function ChangePasswordPage({ navigate }: NavigationProps) {
  return (
    <Section eyebrow="Security" subtitle="Change your local account password." title="Change password">
      <ChangePasswordForm onCancel={() => navigate(APP_ROUTES.settings)} />
    </Section>
  );
}

function LearningHistoryPage({ navigate, profile }: NavigationProps & { profile: UserAccountProfile }) {
  return (
    <Section eyebrow="Learning" subtitle="Recent mock tests, quizzes, and study sessions." title="Learning history">
      <LearningHistoryPanel onBack={() => navigate(APP_ROUTES.profile)} profile={profile} />
    </Section>
  );
}

function CertificateHistoryPage({ navigate, profile }: NavigationProps & { profile: UserAccountProfile }) {
  return (
    <Section eyebrow="Achievements" subtitle="Earned certificate records and verification ids." title="Certificate history">
      <CertificateHistoryPanel onBack={() => navigate(APP_ROUTES.profile)} profile={profile} />
    </Section>
  );
}

function SubscriptionPage({ navigate, profile }: NavigationProps & { profile: UserAccountProfile }) {
  return (
    <Section eyebrow="Billing" subtitle="Authenticated subscription status and plan controls." title="Subscription status">
      <SubscriptionStatusPanel
        onBack={() => navigate(APP_ROUTES.profile)}
        onPricing={() => navigate(APP_ROUTES.pricing)}
        profile={profile}
      />
    </Section>
  );
}

function AdminDashboardPage({ navigate }: NavigationProps) {
  return (
    <Section eyebrow="Admin" subtitle="Protected admin route for platform readiness and future content operations." title="Admin dashboard">
      <Table columns={serviceColumns} getRowKey={(row) => row.name} rows={serviceReadiness} />
      <View style={styles.actions}>
        <PrimaryButton onPress={() => navigate(APP_ROUTES.certifications)}>Manage catalogue</PrimaryButton>
        <SecondaryButton onPress={() => navigate(APP_ROUTES.tests)}>Review test routes</SecondaryButton>
      </View>
    </Section>
  );
}

type RouteCardProps = {
  badge: string;
  copy: string;
  onPress: () => void;
  title: string;
};

function RouteCard({ badge, copy, onPress, title }: RouteCardProps) {
  return (
    <AppCard style={styles.flexCard}>
      <Badge tone="info">{badge}</Badge>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.copy}>{copy}</Text>
      <PrimaryButton onPress={onPress}>Open</PrimaryButton>
    </AppCard>
  );
}

type SectionProps = {
  children: ReactNode;
  eyebrow: string;
  subtitle?: string;
  title: string;
};

function Section({ children, eyebrow, subtitle, title }: SectionProps) {
  return (
    <View style={styles.section}>
      <SectionHeader eyebrow={eyebrow} subtitle={subtitle} title={title} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm
  },
  activeBreadcrumbText: {
    color: theme.colors.text
  },
  breadcrumbs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs
  },
  breadcrumbItem: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.xs
  },
  breadcrumbSeparator: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: '900'
  },
  breadcrumbText: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md
  },
  cardTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 22
  },
  certificateBrand: {
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center'
  },
  certificatePreview: {
    alignItems: 'center',
    borderColor: theme.colors.primary,
    gap: theme.spacing.md,
    padding: theme.spacing.xl
  },
  certificateTitle: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center'
  },
  copy: {
    color: theme.colors.textMuted,
    fontSize: 14,
    lineHeight: 21
  },
  examCard: {
    gap: theme.spacing.md
  },
  flexCard: {
    flexBasis: 250,
    flexGrow: 1
  },
  hero: {
    gap: theme.spacing.md,
    padding: theme.spacing.xl
  },
  heroCopy: {
    color: theme.colors.textMuted,
    fontSize: 16,
    lineHeight: 25,
    maxWidth: 780
  },
  heroTitle: {
    color: theme.colors.text,
    fontSize: 44,
    fontWeight: '900',
    lineHeight: 50
  },
  landingHero: {
    gap: theme.spacing.lg,
    paddingVertical: theme.spacing.xxl
  },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md
  },
  optionCard: {
    backgroundColor: theme.colors.surface
  },
  price: {
    color: theme.colors.primary,
    fontSize: 22,
    fontWeight: '900'
  },
  routeHeading: {
    gap: theme.spacing.sm
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    justifyContent: 'space-between'
  },
  section: {
    gap: theme.spacing.md
  },
  tableMuted: {
    color: theme.colors.textMuted,
    fontSize: 13,
    lineHeight: 19
  },
  tableText: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 19
  }
});
