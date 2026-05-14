import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Image, Pressable, Share, StyleSheet, Text, View } from 'react-native';
import logo from '../../assets/icon.png';
import { AppCard, StatCard } from '@/components/cards';
import { DomainProgressList } from '@/components/charts';
import { InputField, SelectField } from '@/components/forms';
import { AppShell, SectionHeader } from '@/components/layout';
import { Badge, EmptyState, LoadingState, Modal, PrimaryButton, ProgressBar, SecondaryButton, Table, Tabs, ToastNotification } from '@/components/ui';
import type { TableColumn } from '@/components/ui';
import { APP_NAME, DEFAULT_CERTIFICATION_ID, PASS_MARK_PERCENT } from '@/constants/app';
import { APP_ROUTES } from '@/constants/routes';
import { theme } from '@/constants/theme';
import { AuthProvider, UserProfileProvider, useAuth, useUserProfile } from '@/context';
import { certifications, knowledgeTopics, legalPages, questionBank, subscriptionPlans } from '@/data';
import { EmailVerificationNotice, ForgotPasswordForm, LoginForm, SignupForm } from '@/features/auth/components';
import type { AuthUser } from '@/features/auth';
import { CertificationCatalogue, CertificationDetail } from '@/features/certifications/components';
import type { CertificationFilters } from '@/features/certifications';
import {
  createCertificateRecord,
  createLinkedInShareUrl,
  formatCertificateDate,
  getCertificateShareText,
  renderCertificateHtml
} from '@/features/certificates';
import { buildDashboardOverview } from '@/features/dashboard';
import { filterKnowledgeTopics, getKnowledgeCategories, getRelatedQuestions } from '@/features/knowledge-base';
import type { KnowledgeTopicFilters } from '@/features/knowledge-base';
import {
  EMPTY_TEST_ANALYTICS,
  TEST_MODE_CONFIGS,
  answerQuestion,
  calculateResultInsights,
  createTestSession,
  getAnsweredCount,
  getCurrentQuestionView,
  getElapsedSeconds,
  getMarkedForReviewCount,
  getModeTitle,
  getRemainingSeconds,
  getSessionQuestions,
  getTestModeConfig,
  getUnansweredCount,
  goToQuestion,
  submitTestSession,
  toggleQuestionReview
} from '@/features/tests';
import type { ScoreTrendPoint, TestAnalytics, TestAttempt, TestModeId, TestSession } from '@/features/tests';
import {
  AccountSettingsPanel,
  ChangePasswordForm,
  EditProfileForm,
  LearningHistoryPanel,
  ProfileSummary
} from '@/features/profile/components';
import type { UserAccountProfile } from '@/features/profile';
import {
  canAccessCertification,
  canAccessFeature,
  canStartTestMode,
  getEffectiveCertificationStatus,
  getPlanChangeVerb,
  getRecommendedUpgradePlan
} from '@/features/subscriptions';
import { ROUTE_LABELS, ROUTE_META, getBreadcrumbs, getNavigationRoute, isProtectedRoute } from '@/app/navigation';
import { useAppNavigation } from '@/hooks';
import { analyticsService, certificateService, serviceReadiness, testService } from '@/services';
import type {
  AppRoute,
  CertificateRecord,
  Certification,
  KnowledgeTopic,
  LegalPage,
  ServiceReadinessItem,
  SubscriptionPlan,
  UserPlan
} from '@/types';
import { countQuestionsByDomain, formatCount, formatPercent } from '@/utils';

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
  const { addCertificateHistoryItem, addLearningHistoryItem, isProfileLoading, profile, updatePlan } = useUserProfile();
  const [redirectAfterLogin, setRedirectAfterLogin] = useState<AppRoute>(APP_ROUTES.dashboard);
  const [activeTestTab, setActiveTestTab] = useState('overview');
  const [selectedSubscriptionPlan, setSelectedSubscriptionPlan] = useState<UserPlan>('Silver');
  const [subscriptionNotice, setSubscriptionNotice] = useState<string | null>(null);
  const [certificationFilters, setCertificationFilters] = useState<CertificationFilters>({
    level: 'All',
    provider: 'All',
    search: ''
  });
  const [knowledgeFilters, setKnowledgeFilters] = useState<KnowledgeTopicFilters>({
    category: 'All',
    search: ''
  });
  const [selectedKnowledgeTopicId, setSelectedKnowledgeTopicId] = useState('cloud-computing');
  const [selectedCertificationId, setSelectedCertificationId] = useState(DEFAULT_CERTIFICATION_ID);
  const [selectedTestDomain, setSelectedTestDomain] = useState('Cloud concepts');
  const [selectedTestMode, setSelectedTestMode] = useState<TestModeId>('full-mock');
  const [activeTestSession, setActiveTestSession] = useState<TestSession | null>(null);
  const [testAnalytics, setTestAnalytics] = useState<TestAnalytics>(EMPTY_TEST_ANALYTICS);
  const [testAttempts, setTestAttempts] = useState<readonly TestAttempt[]>([]);
  const [certificateRecords, setCertificateRecords] = useState<readonly CertificateRecord[]>([]);
  const [selectedCertificateId, setSelectedCertificateId] = useState<string | null>(null);
  const [certificateNotice, setCertificateNotice] = useState<string | null>(null);
  const [latestAttempt, setLatestAttempt] = useState<TestAttempt | null>(null);
  const [timerTick, setTimerTick] = useState(Date.now());

  const domainCounts = useMemo(() => countQuestionsByDomain(questionBank), []);
  const selectedCertification =
    certifications.find((certification) => certification.id === selectedCertificationId) ?? certifications[0];
  const selectedKnowledgeTopic =
    knowledgeTopics.find((topic) => topic.id === selectedKnowledgeTopicId) ?? knowledgeTopics[0];
  const selectedCertificate =
    certificateRecords.find((certificate) => certificate.id === selectedCertificateId) ?? certificateRecords[0];
  const selectedTestModeConfig = getTestModeConfig(selectedTestMode);
  const activeMenuRoute =
    isAuthenticated && !isProtectedRoute(activeRoute) ? getAuthenticatedPublicMenuRoute(activeRoute) : getNavigationRoute(activeRoute);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setActiveTestSession(null);
      setLatestAttempt(null);
      setTestAnalytics(EMPTY_TEST_ANALYTICS);
      setTestAttempts([]);
      setCertificateRecords([]);
      setSelectedCertificateId(null);
      return;
    }

    let active = true;
    const currentUserId = user.id;

    async function loadTestState() {
      const [storedSession, storedAttempts, storedAnalytics, storedCertificates] = await Promise.all([
        testService.getActiveSession(currentUserId),
        testService.listAttempts(currentUserId),
        analyticsService.getTestAnalytics(currentUserId),
        certificateService.listCertificates(currentUserId)
      ]);

      if (!active) {
        return;
      }

      setActiveTestSession(storedSession);
      setTestAnalytics(storedAnalytics);
      setTestAttempts(storedAttempts);
      setCertificateRecords(storedCertificates);
      setLatestAttempt(storedAttempts[0] ?? null);
      setSelectedCertificateId(storedCertificates[0]?.id ?? null);

      if (storedSession) {
        setSelectedTestMode(storedSession.mode);
        if (storedSession.domain) {
          setSelectedTestDomain(storedSession.domain);
        }
      }
    }

    void loadTestState();

    return () => {
      active = false;
    };
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (!activeTestSession) {
      return undefined;
    }

    const timer = setInterval(() => {
      setTimerTick(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, [activeTestSession]);

  useEffect(() => {
    if (activeTestSession && getRemainingSeconds(activeTestSession, timerTick) === 0) {
      void completeTestSession(activeTestSession);
    }
  }, [activeTestSession, timerTick]);

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

  function openCertificationDetail(certification: Certification) {
    setSelectedCertificationId(certification.id);
    navigate(APP_ROUTES.certificationDetail);
  }

  function handleCertificationPrimaryAction(certification: Certification) {
    setSelectedCertificationId(certification.id);

    if (profile && certification.status !== 'coming soon' && !canAccessCertification(profile.plan, certification)) {
      setSelectedSubscriptionPlan(certification.planRequirement);
      setSubscriptionNotice(`${certification.name} requires the ${certification.planRequirement} plan.`);
      navigate(APP_ROUTES.subscription);
      return;
    }

    if (getEffectiveCertificationStatus(profile?.plan ?? 'Free', certification) === 'active') {
      if (certification.id !== DEFAULT_CERTIFICATION_ID) {
        navigate(APP_ROUTES.certificationDetail);
        return;
      }

      navigate(APP_ROUTES.knowledgeBase);
      return;
    }

    if (certification.status === 'locked') {
      setSelectedSubscriptionPlan(certification.planRequirement);
      navigate(APP_ROUTES.subscription);
      return;
    }

    navigate(APP_ROUTES.certificationDetail);
  }

  function openKnowledgeTopic(topic: KnowledgeTopic) {
    setSelectedKnowledgeTopicId(topic.id);
    navigate(APP_ROUTES.knowledgeTopicDetail);
  }

  function startKnowledgeTopicQuiz(topic: KnowledgeTopic) {
    setSelectedTestMode('topic-quiz');
    setSelectedTestDomain(topic.category);
    navigate(APP_ROUTES.quiz);
  }

  function openTestMode(mode: TestModeId) {
    if (profile && !canStartTestMode(profile.plan, mode)) {
      setSelectedSubscriptionPlan(getRecommendedUpgradePlan('fullMockExam'));
      setSubscriptionNotice('Full mock exams are included with Silver and Gold plans.');
      navigate(APP_ROUTES.subscription);
      return;
    }

    setSelectedTestMode(mode);
    navigate(mode === 'full-mock' ? APP_ROUTES.mockTest : APP_ROUTES.quiz);
  }

  async function startSelectedTest(mode = selectedTestMode, domain = selectedTestDomain) {
    if (!user) {
      return;
    }

    if (profile && !canStartTestMode(profile.plan, mode)) {
      setSelectedSubscriptionPlan(getRecommendedUpgradePlan('fullMockExam'));
      setSubscriptionNotice('Upgrade to Silver to unlock full mock exams.');
      navigate(APP_ROUTES.subscription);
      return;
    }

    const session = createTestSession(
      {
        certificationId: DEFAULT_CERTIFICATION_ID,
        domain: mode === 'topic-quiz' ? domain : undefined,
        mode,
        plan: profile?.plan ?? 'Free',
        userId: user.id
      },
      testAttempts
    );

    setActiveTestSession(session);
    setTimerTick(Date.now());
    await testService.saveActiveSession(session);
  }

  function resumeActiveTest() {
    if (!activeTestSession) {
      return;
    }

    setSelectedTestMode(activeTestSession.mode);
    setSelectedTestDomain(activeTestSession.domain ?? selectedTestDomain);
    navigate(activeTestSession.mode === 'full-mock' ? APP_ROUTES.mockTest : APP_ROUTES.quiz);
  }

  function persistTestSession(session: TestSession) {
    setActiveTestSession(session);
    void testService.saveActiveSession(session);
  }

  function selectTestAnswer(questionId: string, optionId: string) {
    if (!activeTestSession) {
      return;
    }

    persistTestSession(answerQuestion(activeTestSession, questionId, optionId));
  }

  function toggleReviewFlag(questionId: string) {
    if (!activeTestSession) {
      return;
    }

    persistTestSession(toggleQuestionReview(activeTestSession, questionId));
  }

  function moveToQuestion(index: number) {
    if (!activeTestSession) {
      return;
    }

    persistTestSession(goToQuestion(activeTestSession, index));
  }

  async function completeTestSession(session = activeTestSession) {
    if (!session) {
      return;
    }

    const attempt = submitTestSession(session);
    const storedAttempt = await testService.saveAttempt(attempt);
    const [storedAttempts, storedAnalytics] = await Promise.all([
      testService.listAttempts(session.userId),
      analyticsService.getTestAnalytics(session.userId)
    ]);

    setLatestAttempt(storedAttempt);
    setTestAnalytics(storedAnalytics);
    setTestAttempts(storedAttempts);
    setActiveTestSession(null);

    if (profile) {
      await addLearningHistoryItem({
        certificationId: storedAttempt.certificationId,
        completedAt: storedAttempt.completedAt,
        durationMinutes: Math.max(1, Math.ceil(storedAttempt.timeTakenSeconds / 60)),
        id: storedAttempt.id,
        mode: storedAttempt.mode === 'full-mock' ? 'Mock Test' : 'Quiz',
        passed: storedAttempt.passed,
        score: storedAttempt.scorePercent,
        title: getAttemptTitle(storedAttempt)
      });
    }

    if (storedAttempt.passed) {
      await generateCertificateForAttempt(storedAttempt);
    }

    navigate(APP_ROUTES.testResult);
  }

  async function generateCertificateForAttempt(attempt: TestAttempt) {
    if (!attempt.passed) {
      return null;
    }

    const existingCertificate = await certificateService.getCertificateForAttempt(attempt.userId, attempt.id);

    if (existingCertificate) {
      setSelectedCertificateId(existingCertificate.id);
      return existingCertificate;
    }

    const certificate = createCertificateRecord({
      attempt,
      userName: profile?.fullName ?? user?.fullName ?? 'AceCloudCert Learner'
    });
    const storedCertificate = await certificateService.saveCertificate(certificate);
    const storedCertificates = await certificateService.listCertificates(attempt.userId);

    setCertificateRecords(storedCertificates);
    setSelectedCertificateId(storedCertificate.id);

    if (profile) {
      await addCertificateHistoryItem({
        certificateId: storedCertificate.certificateId,
        certificationId: storedCertificate.certificationId,
        certificationName: storedCertificate.certificationName,
        id: storedCertificate.id,
        issuedAt: storedCertificate.issuedAt,
        score: storedCertificate.score
      });
    }

    return storedCertificate;
  }

  async function openCertificateForAttempt(attempt: TestAttempt) {
    const certificate = await generateCertificateForAttempt(attempt);

    if (certificate) {
      navigate(APP_ROUTES.certificateDetail);
      return;
    }

    navigate(APP_ROUTES.certificates);
  }

  function openCertificate(certificate: CertificateRecord) {
    setSelectedCertificateId(certificate.id);
    setCertificateNotice(null);
    navigate(APP_ROUTES.certificateDetail);
  }

  async function exportCertificate(certificate: CertificateRecord) {
    if (!canAccessFeature(profile?.plan ?? 'Free', 'certificateDownload')) {
      setSelectedSubscriptionPlan(getRecommendedUpgradePlan('certificateDownload'));
      setCertificateNotice('Certificate download is available on Silver and Gold plans.');
      setSubscriptionNotice('Certificate download is available on Silver and Gold plans.');
      navigate(APP_ROUTES.subscription);
      return;
    }

    const html = renderCertificateHtml(certificate);

    try {
      const file = await Print.printToFileAsync({ html });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(file.uri, {
          dialogTitle: `${APP_NAME} certificate ${certificate.certificateId}`
        });
        setCertificateNotice('Certificate export is ready to share or save.');
        return;
      }
    } catch {
      // Browser fallback below handles environments where native PDF export is unavailable.
    }

    const browserWindow = getBrowserWindow();

    if (browserWindow?.open) {
      browserWindow.open(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`, '_blank');
      setCertificateNotice('Certificate opened in a new tab for printing or saving.');
      return;
    }

    setCertificateNotice('Certificate export is not available in this runtime.');
  }

  async function shareCertificate(certificate: CertificateRecord) {
    const message = getCertificateShareText();

    try {
      await Share.share({
        message,
        title: `${APP_NAME} certificate`
      });
      setCertificateNotice('Share text is ready.');
      return;
    } catch {
      const browserWindow = getBrowserWindow();
      browserWindow?.open?.(createLinkedInShareUrl(certificate), '_blank');
      setCertificateNotice('LinkedIn sharing opened with the certificate verification link.');
    }
  }

  function openLinkedInShare(certificate: CertificateRecord) {
    const browserWindow = getBrowserWindow();
    browserWindow?.open?.(createLinkedInShareUrl(certificate), '_blank');
    setCertificateNotice('LinkedIn sharing opened with the certificate verification link.');
  }

  async function changeSubscriptionPlan(plan: UserPlan) {
    setSelectedSubscriptionPlan(plan);

    if (!profile) {
      return;
    }

    const currentPlan = profile.plan;
    const updatedProfile = await updatePlan(plan);
    const action = getPlanChangeVerb(currentPlan, plan).toLowerCase();

    setSubscriptionNotice(
      currentPlan === plan
        ? `${updatedProfile.plan} is already your active plan.`
        : `Mock ${action} complete. ${updatedProfile.plan} is now stored on your local learner profile.`
    );
  }

  function selectPricingPlan(plan: UserPlan) {
    setSelectedSubscriptionPlan(plan);

    if (isAuthenticated) {
      navigate(APP_ROUTES.subscription);
      return;
    }

    navigate(APP_ROUTES.signup);
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
        <PricingPage
          currentPlan={profile?.plan}
          isAuthenticated={isAuthenticated}
          navigate={navigate}
          onSelectPlan={selectPricingPlan}
        />
      ) : activeRoute === APP_ROUTES.privacyPolicy ? (
        <LegalPageContent legalPageId="privacy" />
      ) : activeRoute === APP_ROUTES.terms ? (
        <LegalPageContent legalPageId="terms" />
      ) : activeRoute === APP_ROUTES.dashboard ? (
        profile ? (
          <DashboardPage
            activeSession={activeTestSession}
            analytics={testAnalytics}
            navigate={navigate}
            onAttemptSelect={(attempt) => {
              setLatestAttempt(attempt);
              navigate(APP_ROUTES.testResult);
            }}
            onContinueLearning={(topic) => {
              if (topic) {
                openKnowledgeTopic(topic);
                return;
              }

              navigate(APP_ROUTES.knowledgeBase);
            }}
            onStartTestMode={openTestMode}
            onStartTopicQuiz={startKnowledgeTopicQuiz}
            profile={profile}
          />
        ) : (
          showProtectedFallback()
        )
      ) : activeRoute === APP_ROUTES.certifications ? (
        <CertificationsPage
          filters={certificationFilters}
          onFiltersChange={setCertificationFilters}
          onOpenCertification={openCertificationDetail}
          onPrimaryAction={handleCertificationPrimaryAction}
          plan={profile?.plan ?? 'Free'}
        />
      ) : activeRoute === APP_ROUTES.certificationDetail ? (
        selectedCertification ? (
          <CertificationDetailPage
            certification={selectedCertification}
            navigate={navigate}
            onPrimaryAction={handleCertificationPrimaryAction}
            plan={profile?.plan ?? 'Free'}
          />
        ) : (
          showProtectedFallback()
        )
      ) : activeRoute === APP_ROUTES.tests ? (
        <TestsPage
          activeSession={activeTestSession}
          activeTab={activeTestTab}
          analytics={testAnalytics}
          attempts={testAttempts}
          domainCounts={domainCounts}
          navigate={navigate}
          onDomainChange={setSelectedTestDomain}
          onAttemptSelect={(attempt) => {
            setLatestAttempt(attempt);
            navigate(APP_ROUTES.testResult);
          }}
          onModeSelect={openTestMode}
          onResume={resumeActiveTest}
          selectedDomain={selectedTestDomain}
          setActiveTab={setActiveTestTab}
        />
      ) : activeRoute === APP_ROUTES.mockTest ? (
        <TestSessionPage
          activeSession={activeTestSession}
          mode="full-mock"
          navigate={navigate}
          onAnswer={selectTestAnswer}
          onExit={() => navigate(APP_ROUTES.tests)}
          onGoToQuestion={moveToQuestion}
          onStart={() => void startSelectedTest('full-mock')}
          onSubmit={() => void completeTestSession()}
          onToggleReview={toggleReviewFlag}
          timerNow={timerTick}
        />
      ) : activeRoute === APP_ROUTES.quiz ? (
        <TestSessionPage
          activeSession={activeTestSession}
          mode={selectedTestModeConfig.id === 'full-mock' ? 'quick-quiz' : selectedTestModeConfig.id}
          navigate={navigate}
          onAnswer={selectTestAnswer}
          onExit={() => navigate(APP_ROUTES.tests)}
          onGoToQuestion={moveToQuestion}
          onStart={() => void startSelectedTest(selectedTestModeConfig.id === 'full-mock' ? 'quick-quiz' : selectedTestModeConfig.id)}
          onSubmit={() => void completeTestSession()}
          onToggleReview={toggleReviewFlag}
          selectedDomain={selectedTestDomain}
          timerNow={timerTick}
        />
      ) : activeRoute === APP_ROUTES.testResult ? (
        <TestResultPage
          analytics={testAnalytics}
          attempt={latestAttempt}
          certificate={latestAttempt ? certificateRecords.find((certificate) => certificate.sourceAttemptId === latestAttempt.id) : undefined}
          navigate={navigate}
          onOpenCertificate={openCertificateForAttempt}
          onRetry={() => openTestMode(latestAttempt?.mode ?? 'full-mock')}
        />
      ) : activeRoute === APP_ROUTES.testReview ? (
        <TestReviewPage attempt={latestAttempt} navigate={navigate} />
      ) : activeRoute === APP_ROUTES.knowledgeBase ? (
        <KnowledgeBasePage
          filters={knowledgeFilters}
          navigate={navigate}
          onFiltersChange={setKnowledgeFilters}
          onOpenTopic={openKnowledgeTopic}
          onStartQuiz={startKnowledgeTopicQuiz}
        />
      ) : activeRoute === APP_ROUTES.knowledgeTopicDetail ? (
        <KnowledgeTopicDetailPage
          navigate={navigate}
          onStartQuiz={startKnowledgeTopicQuiz}
          topic={selectedKnowledgeTopic}
        />
      ) : activeRoute === APP_ROUTES.certificates ? (
        profile ? (
          <CertificatesPage
            certificates={certificateRecords}
            navigate={navigate}
            onOpenCertificate={openCertificate}
            profile={profile}
          />
        ) : (
          showProtectedFallback()
        )
      ) : activeRoute === APP_ROUTES.certificateDetail ? (
        profile ? (
          <CertificateDetailPage
            certificate={selectedCertificate}
            notice={certificateNotice}
            navigate={navigate}
            onExport={exportCertificate}
            onLinkedInShare={openLinkedInShare}
            onShare={shareCertificate}
            plan={profile.plan}
          />
        ) : (
          showProtectedFallback()
        )
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
        profile ? (
          <CertificateHistoryPage
            certificates={certificateRecords}
            navigate={navigate}
            onOpenCertificate={openCertificate}
            profile={profile}
          />
        ) : (
          showProtectedFallback()
        )
      ) : activeRoute === APP_ROUTES.subscription ? (
        profile ? (
          <SubscriptionPage
            navigate={navigate}
            notice={subscriptionNotice}
            onChangePlan={(plan) => void changeSubscriptionPlan(plan)}
            onSelectPlan={setSelectedSubscriptionPlan}
            profile={profile}
            selectedPlan={selectedSubscriptionPlan}
          />
        ) : (
          showProtectedFallback()
        )
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

function getAttemptTitle(attempt: TestAttempt) {
  if (attempt.mode === 'topic-quiz' && attempt.domain) {
    return `${attempt.domain} topic quiz`;
  }

  return `${getModeTitle(attempt.mode)} - AWS Certified Cloud Practitioner`;
}

function formatDuration(totalSeconds: number) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat('en', {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    month: 'short'
  }).format(new Date(value));
}

function getBrowserWindow() {
  const runtime = globalThis as typeof globalThis & {
    window?: {
      open?: (url?: string, target?: string) => unknown;
    };
  };

  return runtime.window;
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

function PricingPage({
  currentPlan,
  isAuthenticated,
  onSelectPlan
}: NavigationProps & {
  currentPlan?: UserPlan;
  isAuthenticated: boolean;
  onSelectPlan: (plan: UserPlan) => void;
}) {
  return (
    <Section
      eyebrow="Plans"
      subtitle="Choose Free, Silver, or Gold. Payments are mocked locally now, with Stripe-ready plan keys prepared for checkout later."
      title="Pricing built for self-paced certification prep"
    >
      <View style={styles.cardGrid}>
        {subscriptionPlans.map((plan) => (
          <PlanCard
            currentPlan={currentPlan}
            isAuthenticated={isAuthenticated}
            key={plan.id}
            onSelectPlan={onSelectPlan}
            plan={plan}
          />
        ))}
      </View>
      <PlanComparisonTable />
    </Section>
  );
}

function PlanCard({
  currentPlan,
  isAuthenticated,
  onSelectPlan,
  plan
}: {
  currentPlan?: UserPlan;
  isAuthenticated: boolean;
  onSelectPlan: (plan: UserPlan) => void;
  plan: SubscriptionPlan;
}) {
  const isCurrent = currentPlan === plan.id;

  return (
    <AppCard style={[styles.flexCard, isCurrent && styles.currentPlanCard]}>
      <View style={styles.row}>
        <Text style={styles.cardTitle}>{plan.name}</Text>
        {isCurrent ? <Badge tone="success">Current</Badge> : plan.id === 'Gold' ? <Badge tone="primary">Premium</Badge> : <Badge tone="info">Plan</Badge>}
      </View>
      <Text style={styles.price}>{plan.priceLabel}</Text>
      <Text style={styles.copy}>{plan.description}</Text>
      <View style={styles.verticalStack}>
        {plan.features.map((feature) => (
          <Text key={feature} style={styles.copyStrong}>
            - {feature}
          </Text>
        ))}
        {plan.limitations.map((limitation) => (
          <Text key={limitation} style={styles.copy}>
            - {limitation}
          </Text>
        ))}
      </View>
      <PrimaryButton disabled={isCurrent} onPress={() => onSelectPlan(plan.id)}>
        {isCurrent ? 'Current plan' : isAuthenticated ? plan.ctaLabel : 'Choose plan'}
      </PrimaryButton>
      {plan.stripePriceLookupKey ? <Text style={styles.microCopy}>Stripe key: {plan.stripePriceLookupKey}</Text> : null}
    </AppCard>
  );
}

function PlanComparisonTable() {
  const rows = [
    { feature: 'Question bank', Free: 'Limited', Silver: 'Full AWS', Gold: 'All certifications' },
    { feature: 'Quizzes', Free: 'Limited', Silver: 'Unlimited AWS', Gold: 'Unlimited' },
    { feature: 'Full mock exams', Free: 'Locked', Silver: 'Included', Gold: 'Included' },
    { feature: 'Certificate download', Free: 'Locked', Silver: 'Included', Gold: 'Unlimited' },
    { feature: 'Progress tracking', Free: 'Basic', Silver: 'Included', Gold: 'Advanced' },
    { feature: 'Premium knowledge base', Free: 'Locked', Silver: 'AWS core', Gold: 'Included' },
    { feature: 'Future AI tutor', Free: 'Locked', Silver: 'Locked', Gold: 'Included later' }
  ];
  const columns: readonly TableColumn<(typeof rows)[number]>[] = [
    {
      key: 'feature',
      minWidth: 220,
      render: (row) => <Text style={styles.tableText}>{row.feature}</Text>,
      title: 'Capability'
    },
    {
      key: 'Free',
      minWidth: 160,
      render: (row) => <Text style={styles.tableMuted}>{row.Free}</Text>,
      title: 'Free'
    },
    {
      key: 'Silver',
      minWidth: 160,
      render: (row) => <Text style={styles.tableMuted}>{row.Silver}</Text>,
      title: 'Silver'
    },
    {
      key: 'Gold',
      minWidth: 180,
      render: (row) => <Text style={styles.tableMuted}>{row.Gold}</Text>,
      title: 'Gold'
    }
  ];

  return (
    <View style={styles.verticalStack}>
      <SectionHeader
        eyebrow="Comparison"
        subtitle="Entitlements used by the mock upgrade flow and ready to map to Stripe products."
        title="Plan comparison"
      />
      <Table columns={columns} getRowKey={(row) => row.feature} rows={rows} />
    </View>
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
  activeSession,
  analytics,
  navigate,
  onContinueLearning,
  onAttemptSelect,
  onStartTestMode,
  onStartTopicQuiz,
  profile
}: NavigationProps & {
  activeSession: TestSession | null;
  analytics: TestAnalytics;
  onContinueLearning: (topic?: KnowledgeTopic) => void;
  onAttemptSelect: (attempt: TestAttempt) => void;
  onStartTestMode: (mode: TestModeId) => void;
  onStartTopicQuiz: (topic: KnowledgeTopic) => void;
  profile: UserAccountProfile;
}) {
  const overview = buildDashboardOverview({
    analytics,
    certifications,
    knowledgeTopics,
    profile
  });
  const firstName = profile.fullName.trim().split(/\s+/)[0] || profile.fullName;
  const averageScore = analytics.testsCompleted > 0 ? formatPercent(analytics.averageScore) : 'No data';
  const nextLessonTitle = overview.recommendedLesson?.title ?? 'Open the knowledge base';

  return (
    <>
      <AppCard style={styles.dashboardHero}>
        <View style={styles.dashboardHeroMain}>
          <View style={styles.stack}>
            <Badge tone="primary">Learner dashboard</Badge>
            <SectionHeader
              subtitle={`${overview.activeCertification.provider} ${overview.activeCertification.examCode} path`}
              title={`Welcome back, ${firstName}`}
            />
            <Text style={styles.copy}>
              Your active path is {overview.activeCertification.name}. Keep building lessons, attempts, and
              certificates toward exam readiness.
            </Text>
          </View>
          <View style={styles.dashboardProgressPanel}>
            <Text style={styles.dashboardProgressValue}>{formatPercent(overview.progressPercent)}</Text>
            <Text style={styles.copyStrong}>Current path progress</Text>
            <ProgressBar value={overview.progressPercent} />
            <Text style={styles.microCopy}>
              {overview.completedStudyTopics}/{overview.totalStudyTopics} lessons completed
            </Text>
          </View>
        </View>
        <View style={styles.actions}>
          <PrimaryButton onPress={() => onContinueLearning(overview.recommendedLesson)}>Continue learning</PrimaryButton>
          <SecondaryButton onPress={() => onStartTestMode('full-mock')}>Start mock exam</SecondaryButton>
          <SecondaryButton onPress={() => onStartTestMode('quick-quiz')}>Quick quiz</SecondaryButton>
        </View>
        {activeSession ? (
          <ToastNotification
            message={`${getModeTitle(activeSession.mode)} is still in progress. Resume it from Tests when you are ready.`}
            title="Incomplete attempt saved"
            tone="info"
          />
        ) : null}
      </AppCard>

      <View style={styles.metricGrid}>
        <StatCard label="Current certification" value={overview.activeCertification.name} />
        <StatCard label="Progress" value={formatPercent(overview.progressPercent)} />
        <StatCard label="Study streak" value={`${analytics.studyStreak}d`} />
        <StatCard label="Average score" value={averageScore} />
        <StatCard label="Tests completed" value={analytics.testsCompleted} />
        <StatCard label="Certificates earned" value={overview.certificatesEarned} />
      </View>

      <Section eyebrow="Next best action" subtitle={analytics.recommendedNextAction} title="Learning plan">
        <View style={styles.cardGrid}>
          <RecommendedLessonCard
            onContinueLearning={onContinueLearning}
            onStartTopicQuiz={onStartTopicQuiz}
            topic={overview.recommendedLesson}
          />
          <WeakAreasCard
            onPractice={() => onStartTestMode('weak-area-practice')}
            onQuickQuiz={() => onStartTestMode('quick-quiz')}
            testsCompleted={analytics.testsCompleted}
            weakAreas={overview.weakAreas}
          />
        </View>
      </Section>

      <Section eyebrow="Analytics" subtitle="Built from locally saved mock exams and quiz attempts." title="Performance snapshot">
        <View style={styles.cardGrid}>
          <ScoreTrendCard trend={analytics.scoreTrend} />
          <DomainPerformanceCards domainPerformance={analytics.domainPerformance} limit={4} />
          <RecentAttemptsCard attempts={analytics.recentAttempts} onAttemptSelect={onAttemptSelect} />
        </View>
      </Section>

      <Section eyebrow="Quick actions" title="Keep moving">
        <View style={styles.cardGrid}>
          <DashboardActionCard
            badge="Lesson"
            copy={nextLessonTitle}
            cta="Continue learning"
            onPress={() => onContinueLearning(overview.recommendedLesson)}
            title="Continue learning"
          />
          <DashboardActionCard
            badge="65 questions"
            copy="Run a timed AWS Cloud Practitioner mock exam."
            cta="Start mock exam"
            onPress={() => onStartTestMode('full-mock')}
            title="Start mock exam"
          />
          <DashboardActionCard
            badge="20 questions"
            copy="Practice with a shorter quiz session."
            cta="Quick quiz"
            onPress={() => onStartTestMode('quick-quiz')}
            title="Quick quiz"
          />
          <DashboardActionCard
            badge={overview.weakAreas.length > 0 ? `${overview.weakAreas.length} weak areas` : 'Adaptive'}
            copy={overview.weakAreas[0]?.domain ?? 'Use recent attempts to generate focused practice.'}
            cta="Review weak areas"
            onPress={() => onStartTestMode('weak-area-practice')}
            title="Review weak areas"
          />
          <DashboardActionCard
            badge={String(overview.certificatesEarned)}
            copy="Open earned certificate records and previews."
            cta="View certificates"
            onPress={() => navigate(APP_ROUTES.certificates)}
            title="View certificates"
          />
          <DashboardActionCard
            badge={profile.plan}
            copy="Compare Silver and Gold access for more certifications."
            cta="Upgrade plan"
            onPress={() => navigate(APP_ROUTES.subscription)}
            title="Upgrade plan"
          />
        </View>
      </Section>
    </>
  );
}

function RecommendedLessonCard({
  onContinueLearning,
  onStartTopicQuiz,
  topic
}: {
  onContinueLearning: (topic?: KnowledgeTopic) => void;
  onStartTopicQuiz: (topic: KnowledgeTopic) => void;
  topic?: KnowledgeTopic;
}) {
  if (!topic) {
    return (
      <AppCard style={styles.flexCard}>
        <Text style={styles.cardTitle}>Recommended next lesson</Text>
        <Text style={styles.copy}>Knowledge base recommendations will appear when an active certification has lessons.</Text>
        <PrimaryButton onPress={() => onContinueLearning()}>Open knowledge base</PrimaryButton>
      </AppCard>
    );
  }

  return (
    <AppCard style={styles.flexCard}>
      <View style={styles.row}>
        <Badge tone="info">{topic.category}</Badge>
        <Text style={styles.dateText}>{topic.estimatedReadingMinutes} min read</Text>
      </View>
      <Text style={styles.cardTitle}>Recommended next lesson</Text>
      <Text style={styles.copyStrong}>{topic.title}</Text>
      <Text style={styles.copy}>{topic.summary}</Text>
      <View style={styles.actions}>
        <PrimaryButton onPress={() => onContinueLearning(topic)} size="sm">
          Open lesson
        </PrimaryButton>
        <SecondaryButton onPress={() => onStartTopicQuiz(topic)} size="sm">
          Related quiz
        </SecondaryButton>
      </View>
    </AppCard>
  );
}

function WeakAreasCard({
  onPractice,
  onQuickQuiz,
  testsCompleted,
  weakAreas
}: {
  onPractice: () => void;
  onQuickQuiz: () => void;
  testsCompleted: number;
  weakAreas: TestAnalytics['domainPerformance'];
}) {
  if (testsCompleted === 0) {
    return (
      <AppCard style={styles.flexCard}>
        <Text style={styles.cardTitle}>Weak areas</Text>
        <Text style={styles.copy}>
          Complete a quiz or mock exam to unlock domain-level weak area analysis from your saved attempts.
        </Text>
        <PrimaryButton onPress={onQuickQuiz} size="sm">
          Start quick quiz
        </PrimaryButton>
      </AppCard>
    );
  }

  if (weakAreas.length === 0) {
    return (
      <AppCard style={styles.flexCard}>
        <View style={styles.row}>
          <Text style={styles.cardTitle}>Weak areas</Text>
          <Badge tone="success">On track</Badge>
        </View>
        <Text style={styles.copy}>
          No saved domain is below the pass mark. Keep validating your readiness with another timed attempt.
        </Text>
        <SecondaryButton onPress={onPractice} size="sm">
          Practice anyway
        </SecondaryButton>
      </AppCard>
    );
  }

  return (
    <AppCard style={styles.flexCard}>
      <View style={styles.row}>
        <Text style={styles.cardTitle}>Weak areas</Text>
        <Badge tone="danger">{weakAreas.length} focus</Badge>
      </View>
      <View style={styles.domainList}>
        {weakAreas.map((domain) => (
          <View key={domain.domain} style={styles.domainRow}>
            <View style={styles.row}>
              <Text style={styles.copyStrong}>{domain.domain}</Text>
              <Text style={styles.copy}>{formatPercent(domain.scorePercent)}</Text>
            </View>
            <ProgressBar value={domain.scorePercent} />
            <Text style={styles.microCopy}>
              {domain.correct}/{domain.total} correct across {formatCount(domain.attempts, 'attempt')}
            </Text>
          </View>
        ))}
      </View>
      <PrimaryButton onPress={onPractice} size="sm">
        Review weak areas
      </PrimaryButton>
    </AppCard>
  );
}

function DashboardActionCard({
  badge,
  copy,
  cta,
  onPress,
  title
}: {
  badge: string;
  copy: string;
  cta: string;
  onPress: () => void;
  title: string;
}) {
  return (
    <AppCard style={styles.dashboardActionCard}>
      <Badge tone="neutral">{badge}</Badge>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.copy}>{copy}</Text>
      <SecondaryButton onPress={onPress} size="sm">
        {cta}
      </SecondaryButton>
    </AppCard>
  );
}

function CertificationsPage({
  filters,
  onOpenCertification,
  onFiltersChange,
  onPrimaryAction,
  plan
}: {
  filters: CertificationFilters;
  onFiltersChange: (filters: CertificationFilters) => void;
  onOpenCertification: (certification: Certification) => void;
  onPrimaryAction: (certification: Certification) => void;
  plan: UserPlan;
}) {
  return (
    <Section
      eyebrow="Catalogue"
      subtitle="Filter certification tracks by provider, level, or search. AWS Cloud Practitioner is active; premium and future paths are clearly marked."
      title="Certification catalogue"
    >
      <CertificationCatalogue
        filters={filters}
        onFiltersChange={onFiltersChange}
        onOpenCertification={onOpenCertification}
        onPrimaryAction={onPrimaryAction}
        plan={plan}
      />
    </Section>
  );
}

function CertificationDetailPage({
  certification,
  navigate,
  onPrimaryAction,
  plan
}: NavigationProps & {
  certification: Certification;
  onPrimaryAction: (certification: Certification) => void;
  plan: UserPlan;
}) {
  return (
    <Section eyebrow={certification.provider} subtitle="Certification detail, readiness metadata, domains, and access actions." title={certification.name}>
      <CertificationDetail
        certification={certification}
        onBack={() => navigate(APP_ROUTES.certifications)}
        onMockTest={() => navigate(APP_ROUTES.mockTest)}
        onPrimaryAction={onPrimaryAction}
        onStartLearning={() => navigate(APP_ROUTES.knowledgeBase)}
        plan={plan}
      />
    </Section>
  );
}

function TestsPage({
  activeSession,
  activeTab,
  analytics,
  attempts,
  domainCounts,
  navigate,
  onDomainChange,
  onAttemptSelect,
  onModeSelect,
  onResume,
  selectedDomain,
  setActiveTab
}: NavigationProps & {
  activeSession: TestSession | null;
  activeTab: string;
  analytics: TestAnalytics;
  attempts: readonly TestAttempt[];
  domainCounts: Record<string, number>;
  onDomainChange: (value: string) => void;
  onAttemptSelect: (attempt: TestAttempt) => void;
  onModeSelect: (mode: TestModeId) => void;
  onResume: () => void;
  selectedDomain: string;
  setActiveTab: (value: string) => void;
}) {
  const domainOptions = Object.keys(domainCounts).map((domain) => ({ label: domain, value: domain }));

  return (
    <Section eyebrow="Exam engine" subtitle="Choose a real timed practice mode, resume incomplete work, and review saved attempts." title="Tests">
      {activeSession ? (
        <AppCard style={styles.resumeCard}>
          <View style={styles.row}>
            <View style={styles.stack}>
              <Badge tone="primary">Resume available</Badge>
              <Text style={styles.cardTitle}>{getModeTitle(activeSession.mode)}</Text>
              <Text style={styles.copy}>
                {getAnsweredCount(activeSession)} answered, {getUnansweredCount(activeSession)} unanswered,{' '}
                {getMarkedForReviewCount(activeSession)} marked for review.
              </Text>
            </View>
            <PrimaryButton onPress={onResume}>Resume attempt</PrimaryButton>
          </View>
        </AppCard>
      ) : null}

      <Tabs
        activeId={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: 'overview', label: 'Modes' },
          { id: 'analytics', label: 'Analytics' },
          { id: 'domains', label: 'Domains' },
          { id: 'history', label: 'History' }
        ]}
      />
      {activeTab === 'domains' ? (
        <AppCard>
          <DomainProgressList domainCounts={domainCounts} />
        </AppCard>
      ) : activeTab === 'analytics' ? (
        <AnalyticsPanel analytics={analytics} onAttemptSelect={onAttemptSelect} />
      ) : activeTab === 'history' ? (
        attempts.length > 0 ? (
          <View style={styles.cardGrid}>
            {attempts.slice(0, 6).map((attempt) => (
              <AppCard key={attempt.id} style={styles.flexCard}>
                <View style={styles.row}>
                  <Badge tone={attempt.passed ? 'success' : 'danger'}>{attempt.passed ? 'Passed' : 'Needs work'}</Badge>
                  <Text style={styles.dateText}>{formatDateTime(attempt.completedAt)}</Text>
                </View>
                <Text style={styles.cardTitle}>{getAttemptTitle(attempt)}</Text>
                <Text style={styles.copy}>
                  {attempt.correctCount}/{attempt.questionIds.length} correct | {formatDuration(attempt.timeTakenSeconds)}
                </Text>
                <ProgressBar value={attempt.scorePercent} />
                <PrimaryButton
                  onPress={() => {
                    onAttemptSelect(attempt);
                  }}
                >
                  Open result
                </PrimaryButton>
              </AppCard>
            ))}
          </View>
        ) : (
          <EmptyState
            actionLabel="Start full mock"
            description="Completed mock exams and quizzes will be saved here with scores, timing, and pass status."
            onAction={() => onModeSelect('full-mock')}
            title="No saved attempts yet"
          />
        )
      ) : (
        <>
          <View style={styles.metricGrid}>
            <StatCard label="Pass mark" value={formatPercent(PASS_MARK_PERCENT)} />
            <StatCard label="Question bank" value={formatCount(questionBank.length, 'question')} />
            <StatCard label="Domains" value={Object.keys(domainCounts).length} />
          </View>
          <View style={styles.cardGrid}>
            {TEST_MODE_CONFIGS.map((config) => (
              <AppCard key={config.id} style={styles.flexCard}>
                <View style={styles.row}>
                  <Badge tone={config.id === 'full-mock' ? 'primary' : 'info'}>{config.questionCount} questions</Badge>
                  <Text style={styles.dateText}>{config.durationMinutes}m</Text>
                </View>
                <Text style={styles.cardTitle}>{config.title}</Text>
                <Text style={styles.copy}>{config.description}</Text>
                {config.requiresDomain ? (
                  <SelectField label="Domain" onChange={onDomainChange} options={domainOptions} value={selectedDomain} />
                ) : null}
                <PrimaryButton onPress={() => onModeSelect(config.id)}>
                  {activeSession?.mode === config.id ? 'Resume' : 'Start'}
                </PrimaryButton>
              </AppCard>
            ))}
          </View>
        </>
      )}
    </Section>
  );
}

function AnalyticsPanel({ analytics, onAttemptSelect }: { analytics: TestAnalytics; onAttemptSelect: (attempt: TestAttempt) => void }) {
  return (
    <View style={styles.verticalStack}>
      <View style={styles.metricGrid}>
        <StatCard label="Average score" value={formatPercent(analytics.averageScore)} />
        <StatCard label="Tests completed" value={analytics.testsCompleted} />
        <StatCard label="Pass rate" value={formatPercent(analytics.passRate)} />
        <StatCard label="Study streak" value={`${analytics.studyStreak}d`} />
      </View>
      <ToastNotification message={analytics.recommendedNextAction} title="Recommended next action" tone="info" />
      <View style={styles.cardGrid}>
        <ScoreTrendCard trend={analytics.scoreTrend} />
        <DomainPerformanceCards domainPerformance={analytics.domainPerformance} />
        <RecentAttemptsCard attempts={analytics.recentAttempts} onAttemptSelect={onAttemptSelect} />
      </View>
    </View>
  );
}

function ScoreTrendCard({ trend }: { trend: readonly ScoreTrendPoint[] }) {
  return (
    <AppCard style={styles.flexCard}>
      <Text style={styles.cardTitle}>Score trend</Text>
      {trend.length > 0 ? (
        <View style={styles.trendChart}>
          {trend.map((point) => (
            <View key={point.attemptId} style={styles.trendColumn}>
              <View style={styles.trendTrack}>
                <View style={[styles.trendBar, { height: Math.max(8, point.scorePercent) }]} />
              </View>
              <Text style={styles.trendLabel}>{point.label}</Text>
              <Text style={styles.trendScore}>{formatPercent(point.scorePercent)}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.copy}>Complete a quiz or mock exam to start building a score trend.</Text>
      )}
    </AppCard>
  );
}

function DomainPerformanceCards({
  domainPerformance,
  limit
}: {
  domainPerformance: TestAnalytics['domainPerformance'];
  limit?: number;
}) {
  const visibleDomains = typeof limit === 'number' ? domainPerformance.slice(0, limit) : domainPerformance;

  if (visibleDomains.length === 0) {
    return (
      <AppCard style={styles.flexCard}>
        <Text style={styles.cardTitle}>Domain performance</Text>
        <Text style={styles.copy}>Domain analytics appear after the first completed attempt.</Text>
      </AppCard>
    );
  }

  return (
    <AppCard style={styles.flexCard}>
      <Text style={styles.cardTitle}>Domain performance</Text>
      <View style={styles.domainList}>
        {visibleDomains.map((domain) => (
          <View key={domain.domain} style={styles.domainRow}>
            <View style={styles.row}>
              <Text style={styles.copyStrong}>{domain.domain}</Text>
              <Text style={styles.copy}>{formatPercent(domain.scorePercent)}</Text>
            </View>
            <ProgressBar value={domain.scorePercent} />
            <Text style={styles.microCopy}>
              {domain.correct}/{domain.total} correct across {formatCount(domain.attempts, 'attempt')}
            </Text>
          </View>
        ))}
      </View>
    </AppCard>
  );
}

function RecentAttemptsCard({
  attempts,
  onAttemptSelect
}: {
  attempts: readonly TestAttempt[];
  onAttemptSelect: (attempt: TestAttempt) => void;
}) {
  return (
    <AppCard style={styles.flexCard}>
      <Text style={styles.cardTitle}>Recent attempts</Text>
      {attempts.length > 0 ? (
        <View style={styles.domainList}>
          {attempts.slice(0, 4).map((attempt) => (
            <Pressable key={attempt.id} onPress={() => onAttemptSelect(attempt)} style={styles.attemptRow}>
              <View style={styles.row}>
                <Badge tone={attempt.passed ? 'success' : 'danger'}>{attempt.passed ? 'Pass' : 'Review'}</Badge>
                <Text style={styles.dateText}>{formatDateTime(attempt.completedAt)}</Text>
              </View>
              <Text style={styles.copyStrong}>{getAttemptTitle(attempt)}</Text>
              <Text style={styles.copy}>
                {formatPercent(attempt.scorePercent)} | {formatDuration(attempt.timeTakenSeconds)}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : (
        <Text style={styles.copy}>Recent attempts will appear here after a test is submitted.</Text>
      )}
    </AppCard>
  );
}

function TestSessionPage({
  activeSession,
  mode,
  navigate,
  onAnswer,
  onExit,
  onGoToQuestion,
  onStart,
  onSubmit,
  onToggleReview,
  selectedDomain,
  timerNow
}: NavigationProps & {
  activeSession: TestSession | null;
  mode: TestModeId;
  onAnswer: (questionId: string, optionId: string) => void;
  onExit: () => void;
  onGoToQuestion: (index: number) => void;
  onStart: () => void;
  onSubmit: () => void;
  onToggleReview: (questionId: string) => void;
  selectedDomain?: string;
  timerNow: number;
}) {
  const [submitVisible, setSubmitVisible] = useState(false);
  const config = getTestModeConfig(mode);

  if (!activeSession || activeSession.mode !== mode) {
    return (
      <Section eyebrow="Instructions" subtitle={config.description} title={config.routeTitle}>
        <AppCard style={styles.examCard}>
          <View style={styles.metricGrid}>
            <StatCard label="Questions" value={config.questionCount} />
            <StatCard label="Pass mark" value={formatPercent(PASS_MARK_PERCENT)} />
            <StatCard label="Timer" value={`${config.durationMinutes}m`} />
            <StatCard label="Mode" value={config.title} />
          </View>
          {mode === 'topic-quiz' ? (
            <ToastNotification
              message={`This quiz will use questions from ${selectedDomain ?? 'the selected domain'}.`}
              title="Topic configured"
              tone="info"
            />
          ) : null}
          {mode === 'weak-area-practice' ? (
            <ToastNotification
              message="If you do not have enough previous attempts, AceCloudCert starts with medium and hard questions."
              title="Adaptive practice"
              tone="info"
            />
          ) : null}
          <Text style={styles.copy}>
            You can move between questions, mark items for review, submit when ready, and resume this attempt later if you
            leave before finishing.
          </Text>
          <View style={styles.actions}>
            <PrimaryButton onPress={onStart}>Start test</PrimaryButton>
            <SecondaryButton onPress={onExit}>Back to tests</SecondaryButton>
          </View>
        </AppCard>
      </Section>
    );
  }

  const view = getCurrentQuestionView(activeSession);
  const questions = getSessionQuestions(activeSession);
  const answeredCount = getAnsweredCount(activeSession);
  const unansweredCount = getUnansweredCount(activeSession);
  const markedCount = getMarkedForReviewCount(activeSession);
  const remainingSeconds = getRemainingSeconds(activeSession, timerNow);
  const elapsedSeconds = getElapsedSeconds(activeSession, timerNow);
  const progress = questions.length === 0 ? 0 : Math.round(((activeSession.currentIndex + 1) / questions.length) * 100);

  if (!view) {
    return (
      <Section eyebrow="Exam engine" subtitle="No questions are available for this configuration." title={config.routeTitle}>
        <EmptyState actionLabel="Back to tests" description="Choose another mode or topic." onAction={onExit} title="No questions found" />
      </Section>
    );
  }

  const selectedOptionId = view.answer.selectedOptionId;
  const isFirstQuestion = activeSession.currentIndex === 0;
  const isLastQuestion = activeSession.currentIndex === questions.length - 1;

  return (
    <Section eyebrow={config.title} subtitle="Live attempt with timer, answer state, review flags, and persisted progress." title={config.routeTitle}>
      <AppCard style={styles.examCard}>
        <View style={styles.row}>
          <View style={styles.badgeRow}>
            <Badge tone="info">
              Question {activeSession.currentIndex + 1} of {questions.length}
            </Badge>
            <Badge tone="neutral">{view.question.domain}</Badge>
            <Badge tone={view.question.difficulty === 'hard' ? 'danger' : view.question.difficulty === 'medium' ? 'info' : 'success'}>
              {view.question.difficulty}
            </Badge>
          </View>
          <View style={styles.timerPill}>
            <Text style={styles.timerText}>{formatDuration(remainingSeconds)}</Text>
          </View>
        </View>

        <ProgressBar value={progress} />

        <View style={styles.metricGrid}>
          <StatCard label="Answered" value={answeredCount} />
          <StatCard label="Unanswered" value={unansweredCount} />
          <StatCard label="Marked" value={markedCount} />
          <StatCard label="Elapsed" value={formatDuration(elapsedSeconds)} />
        </View>

        <Text style={styles.questionText}>{view.question.questionText}</Text>

        <View style={styles.optionList}>
          {view.question.options.map((option) => {
            const selected = selectedOptionId === option.id;

            return (
              <Pressable
                key={option.id}
                accessibilityRole="button"
                onPress={() => onAnswer(view.question.id, option.id)}
                style={[styles.answerOption, selected && styles.selectedAnswerOption]}
              >
                <Text style={[styles.optionLetter, selected && styles.selectedOptionText]}>{option.id.toUpperCase()}</Text>
                <Text style={[styles.optionText, selected && styles.selectedOptionText]}>{option.text}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.actions}>
          <SecondaryButton disabled={isFirstQuestion} onPress={() => onGoToQuestion(activeSession.currentIndex - 1)}>
            Previous
          </SecondaryButton>
          <SecondaryButton onPress={() => onToggleReview(view.question.id)}>
            {view.answer.markedForReview ? 'Unmark review' : 'Mark for review'}
          </SecondaryButton>
          <PrimaryButton disabled={isLastQuestion} onPress={() => onGoToQuestion(activeSession.currentIndex + 1)}>
            Next
          </PrimaryButton>
          <SecondaryButton onPress={() => setSubmitVisible(true)}>Submit</SecondaryButton>
        </View>

        <View style={styles.navigator}>
          {questions.map((question, index) => {
            const answer = activeSession.answers[question.id];
            const current = index === activeSession.currentIndex;
            const answered = Boolean(answer?.selectedOptionId);
            const marked = Boolean(answer?.markedForReview);

            return (
              <Pressable
                key={question.id}
                accessibilityRole="button"
                onPress={() => onGoToQuestion(index)}
                style={[
                  styles.navigatorItem,
                  answered && styles.navigatorAnswered,
                  marked && styles.navigatorMarked,
                  current && styles.navigatorCurrent
                ]}
              >
                <Text style={[styles.navigatorText, current && styles.navigatorCurrentText]}>{index + 1}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.actions}>
          <SecondaryButton onPress={onExit}>Exit and resume later</SecondaryButton>
        </View>
      </AppCard>

      <Modal onClose={() => setSubmitVisible(false)} title="Submit attempt?" visible={submitVisible}>
        <Text style={styles.copy}>
          You have answered {answeredCount} of {questions.length} questions. {unansweredCount} unanswered questions will be scored as incorrect.
        </Text>
        <View style={styles.actions}>
          <SecondaryButton onPress={() => setSubmitVisible(false)}>Keep working</SecondaryButton>
          <PrimaryButton
            onPress={() => {
              setSubmitVisible(false);
              onSubmit();
            }}
          >
            Submit test
          </PrimaryButton>
        </View>
      </Modal>
    </Section>
  );
}

function TestResultPage({
  analytics,
  attempt,
  certificate,
  navigate,
  onOpenCertificate,
  onRetry
}: NavigationProps & {
  analytics: TestAnalytics;
  attempt: TestAttempt | null;
  certificate?: CertificateRecord;
  onOpenCertificate: (attempt: TestAttempt) => void;
  onRetry: () => void;
}) {
  if (!attempt) {
    return (
      <Section eyebrow="Result" subtitle="Complete a mock exam or quiz to see scoring and analytics." title="Latest test result">
        <EmptyState actionLabel="Start test" description="No completed attempt is available yet." onAction={() => navigate(APP_ROUTES.tests)} title="No result yet" />
      </Section>
    );
  }

  const insights = calculateResultInsights(attempt);

  return (
    <Section eyebrow="Result" subtitle="Scores are calculated from the submitted answer set and saved locally." title={getAttemptTitle(attempt)}>
      <View style={styles.metricGrid}>
        <StatCard label="Status" value={attempt.passed ? 'Passed' : 'Failed'} />
        <StatCard label="Score" value={formatPercent(attempt.scorePercent)} />
        <StatCard label="Pass mark" value={formatPercent(attempt.passMark)} />
        <StatCard label="Correct" value={attempt.correctCount} />
        <StatCard label="Incorrect" value={attempt.incorrectCount} />
        <StatCard label="Unanswered" value={attempt.unansweredCount} />
        <StatCard label="Time taken" value={formatDuration(attempt.timeTakenSeconds)} />
      </View>
      <ToastNotification
        message={insights.recommendedNextAction}
        title={attempt.passed ? 'Passed' : 'Not passed yet'}
        tone={attempt.passed ? 'success' : 'error'}
      />
      <View style={styles.cardGrid}>
        <AppCard style={styles.flexCard}>
          <Badge tone="success">Strongest domain</Badge>
          <Text style={styles.cardTitle}>{insights.strongestDomain?.domain ?? 'Not enough data'}</Text>
          <Text style={styles.copy}>
            {insights.strongestDomain
              ? `${formatPercent(insights.strongestDomain.scorePercent)} | ${insights.strongestDomain.correct}/${insights.strongestDomain.total} correct`
              : 'Complete more attempts to identify a strength.'}
          </Text>
        </AppCard>
        <AppCard style={styles.flexCard}>
          <Badge tone="danger">Weakest domain</Badge>
          <Text style={styles.cardTitle}>{insights.weakestDomain?.domain ?? 'Not enough data'}</Text>
          <Text style={styles.copy}>
            {insights.weakestDomain
              ? `${formatPercent(insights.weakestDomain.scorePercent)} | ${insights.weakestDomain.correct}/${insights.weakestDomain.total} correct`
              : 'Complete more attempts to identify a weak area.'}
          </Text>
        </AppCard>
        <AppCard style={styles.flexCard}>
          <Badge tone="info">Recommended next action</Badge>
          <Text style={styles.copy}>{insights.recommendedNextAction}</Text>
        </AppCard>
      </View>
      <View style={styles.cardGrid}>
        {attempt.domainBreakdown.map((domain) => (
          <AppCard key={domain.domain} style={styles.flexCard}>
            <View style={styles.row}>
              <Text style={styles.cardTitle}>{domain.domain}</Text>
              <Badge tone={domain.scorePercent >= attempt.passMark ? 'success' : 'danger'}>{formatPercent(domain.scorePercent)}</Badge>
            </View>
            <Text style={styles.copy}>
              {domain.correct}/{domain.total} correct
            </Text>
            <ProgressBar value={domain.scorePercent} />
          </AppCard>
        ))}
      </View>
      <Section eyebrow="Analytics" subtitle="This learner-level analytics summary updates after every submitted attempt." title="Attempt context">
        <View style={styles.metricGrid}>
          <StatCard label="Average score" value={formatPercent(analytics.averageScore)} />
          <StatCard label="Tests completed" value={analytics.testsCompleted} />
          <StatCard label="Pass rate" value={formatPercent(analytics.passRate)} />
          <StatCard label="Study streak" value={`${analytics.studyStreak}d`} />
        </View>
        <View style={styles.cardGrid}>
          <ScoreTrendCard trend={analytics.scoreTrend} />
        </View>
      </Section>
      <View style={styles.actions}>
        <PrimaryButton onPress={() => navigate(APP_ROUTES.testReview)}>Review answers</PrimaryButton>
        {attempt.passed ? (
          <SecondaryButton onPress={() => void onOpenCertificate(attempt)}>
            {certificate ? 'Open certificate' : 'Generate certificate'}
          </SecondaryButton>
        ) : null}
        <SecondaryButton onPress={onRetry}>Retry mode</SecondaryButton>
        <SecondaryButton onPress={() => navigate(APP_ROUTES.tests)}>All tests</SecondaryButton>
      </View>
    </Section>
  );
}

function TestReviewPage({ attempt, navigate }: NavigationProps & { attempt: TestAttempt | null }) {
  if (!attempt) {
    return (
      <Section eyebrow="Review" subtitle="Submit a test to review answers and explanations." title="Answer review">
        <EmptyState actionLabel="Back to tests" description="No completed attempt is available for review." onAction={() => navigate(APP_ROUTES.tests)} title="No review yet" />
      </Section>
    );
  }

  const questions = attempt.questionIds
    .map((questionId) => questionBank.find((question) => question.id === questionId))
    .filter((question): question is (typeof questionBank)[number] => Boolean(question));

  return (
    <Section eyebrow="Review" subtitle="Review selected answers, correct answers, references, and explanations." title="Answer review">
      <View style={styles.cardGrid}>
        {questions.map((question, index) => {
          const answer = attempt.answers[question.id];
          const selectedOption = question.options.find((option) => option.id === answer?.selectedOptionId);
          const correctOption = question.options.find((option) => option.id === question.correctOptionId);
          const correct = answer?.selectedOptionId === question.correctOptionId;

          return (
            <AppCard key={question.id} style={styles.flexCard}>
              <View style={styles.row}>
                <Badge tone={correct ? 'success' : answer?.selectedOptionId ? 'danger' : 'neutral'}>
                  {correct ? 'Correct' : answer?.selectedOptionId ? 'Incorrect' : 'Unanswered'}
                </Badge>
                <Text style={styles.dateText}>Question {index + 1}</Text>
              </View>
              <Text style={styles.cardTitle}>{question.questionText}</Text>
              <Text style={styles.copy}>Your answer: {selectedOption?.text ?? 'No answer selected'}</Text>
              <Text style={styles.copy}>Correct answer: {correctOption?.text ?? 'Unavailable'}</Text>
              <Text style={styles.copy}>{question.explanation}</Text>
              <Text style={styles.referenceText}>Reference: {question.reference}</Text>
            </AppCard>
          );
        })}
      </View>
      <View style={styles.actions}>
        <PrimaryButton onPress={() => navigate(APP_ROUTES.testResult)}>Back to result</PrimaryButton>
        <SecondaryButton onPress={() => navigate(APP_ROUTES.tests)}>All tests</SecondaryButton>
      </View>
    </Section>
  );
}

function KnowledgeBasePage({
  filters,
  onFiltersChange,
  onOpenTopic,
  onStartQuiz
}: NavigationProps & {
  filters: KnowledgeTopicFilters;
  onFiltersChange: (filters: KnowledgeTopicFilters) => void;
  onOpenTopic: (topic: KnowledgeTopic) => void;
  onStartQuiz: (topic: KnowledgeTopic) => void;
}) {
  const categories = getKnowledgeCategories(knowledgeTopics);
  const filteredTopics = filterKnowledgeTopics(knowledgeTopics, filters);
  const categoryOptions = [{ label: 'All', value: 'All' }, ...categories.map((category) => ({ label: category, value: category }))];

  return (
    <Section
      eyebrow="Study"
      subtitle="Search AWS Cloud Practitioner study guides, filter by domain, and launch related quizzes."
      title="Knowledge base"
    >
      <AppCard style={styles.filterCard}>
        <InputField
          label="Search topics"
          onChangeText={(search) => onFiltersChange({ ...filters, search })}
          placeholder="Search IAM, VPC, billing, CloudTrail..."
          value={filters.search}
        />
        <SelectField
          label="Category"
          onChange={(category) => onFiltersChange({ ...filters, category })}
          options={categoryOptions}
          value={filters.category}
        />
      </AppCard>

      <View style={styles.metricGrid}>
        <StatCard label="AWS CCP topics" value={knowledgeTopics.length} />
        <StatCard label="Visible topics" value={filteredTopics.length} />
        <StatCard label="Categories" value={categories.length} />
      </View>

      {filteredTopics.length === 0 ? (
        <EmptyState
          actionLabel="Clear filters"
          description="Try a different keyword or reset to all categories."
          onAction={() => onFiltersChange({ category: 'All', search: '' })}
          title="No topics found"
        />
      ) : null}

      <View style={styles.cardGrid}>
        {filteredTopics.map((topic) => (
          <AppCard key={topic.id} style={styles.flexCard}>
            <View style={styles.row}>
              <Badge tone="info">{topic.category}</Badge>
              <Text style={styles.dateText}>{topic.estimatedReadingMinutes} min</Text>
            </View>
            <Text style={styles.cardTitle}>{topic.title}</Text>
            <Text style={styles.copy}>{topic.summary}</Text>
            <View style={styles.actions}>
              <PrimaryButton onPress={() => onOpenTopic(topic)}>Open topic</PrimaryButton>
              <SecondaryButton onPress={() => onStartQuiz(topic)}>Related quiz</SecondaryButton>
            </View>
          </AppCard>
        ))}
      </View>
    </Section>
  );
}

function KnowledgeTopicDetailPage({
  navigate,
  onStartQuiz,
  topic
}: NavigationProps & {
  onStartQuiz: (topic: KnowledgeTopic) => void;
  topic: KnowledgeTopic | undefined;
}) {
  if (!topic) {
    return (
      <Section eyebrow="Study topic" subtitle="Choose a topic from the knowledge base." title="Knowledge topic detail">
        <EmptyState
          actionLabel="Back to knowledge base"
          description="No topic is currently selected."
          onAction={() => navigate(APP_ROUTES.knowledgeBase)}
          title="Topic not found"
        />
      </Section>
    );
  }

  const relatedQuestions = getRelatedQuestions(topic);

  return (
    <Section eyebrow={topic.category} subtitle={topic.summary} title={topic.title}>
      <View style={styles.metricGrid}>
        <StatCard label="Reading time" value={`${topic.estimatedReadingMinutes}m`} />
        <StatCard label="Related questions" value={relatedQuestions.length} />
        <StatCard label="Certification" value="AWS CCP" />
      </View>

      <AppCard style={styles.topicSection}>
        <Text style={styles.cardTitle}>Full explanation</Text>
        {topic.fullExplanation.map((paragraph) => (
          <Text key={paragraph} style={styles.copy}>
            {paragraph}
          </Text>
        ))}
      </AppCard>

      <View style={styles.cardGrid}>
        <AppCard style={styles.flexCard}>
          <Text style={styles.cardTitle}>Key points</Text>
          {topic.keyPoints.map((point) => (
            <Text key={point} style={styles.copy}>
              - {point}
            </Text>
          ))}
        </AppCard>

        <AppCard style={styles.flexCard}>
          <Text style={styles.cardTitle}>Practical example</Text>
          <Text style={styles.copy}>{topic.practicalExample}</Text>
        </AppCard>
      </View>

      <AppCard style={styles.topicSection}>
        <View style={styles.row}>
          <Text style={styles.cardTitle}>Related questions</Text>
          <Badge tone="neutral">{relatedQuestions.length} linked</Badge>
        </View>
        {relatedQuestions.map((question) => (
          <View key={question.id} style={styles.relatedQuestion}>
            <View style={styles.row}>
              <Badge tone={question.difficulty === 'hard' ? 'danger' : question.difficulty === 'medium' ? 'info' : 'success'}>
                {question.difficulty}
              </Badge>
              <Text style={styles.dateText}>{question.domain}</Text>
            </View>
            <Text style={styles.copyStrong}>{question.questionText}</Text>
          </View>
        ))}
      </AppCard>

      <View style={styles.actions}>
        <PrimaryButton onPress={() => onStartQuiz(topic)}>Start related quiz</PrimaryButton>
        <SecondaryButton onPress={() => navigate(APP_ROUTES.knowledgeBase)}>Back to knowledge base</SecondaryButton>
      </View>
    </Section>
  );
}

function CertificatesPage({
  certificates,
  navigate,
  onOpenCertificate
}: NavigationProps & {
  certificates: readonly CertificateRecord[];
  onOpenCertificate: (certificate: CertificateRecord) => void;
  profile: UserAccountProfile;
}) {
  return (
    <Section
      eyebrow="Achievements"
      subtitle="Certificates are generated only after a passed mock exam or quiz and are saved locally to the learner account."
      title="Certificates"
    >
      <CertificateList
        certificates={certificates}
        emptyActionLabel="Start mock exam"
        emptyDescription="Pass a test with at least the required score to generate your first AceCloudCert certificate."
        emptyTitle="No generated certificates yet"
        onEmptyAction={() => navigate(APP_ROUTES.mockTest)}
        onOpenCertificate={onOpenCertificate}
      />
    </Section>
  );
}

function CertificateDetailPage({
  certificate,
  navigate,
  notice,
  onExport,
  onLinkedInShare,
  onShare,
  plan
}: NavigationProps & {
  certificate?: CertificateRecord;
  notice: string | null;
  onExport: (certificate: CertificateRecord) => void;
  onLinkedInShare: (certificate: CertificateRecord) => void;
  onShare: (certificate: CertificateRecord) => void;
  plan: UserPlan;
}) {
  if (!certificate) {
    return (
      <Section eyebrow="Certificate" subtitle="Pass a test to generate a certificate preview." title="Certificate preview">
        <EmptyState
          actionLabel="Start mock exam"
          description="No earned certificate is selected yet. Certificates are created only from passed test attempts."
          onAction={() => navigate(APP_ROUTES.mockTest)}
          title="No certificate available"
        />
      </Section>
    );
  }

  return (
    <Section eyebrow="Certificate" subtitle="Preview, export, and share your earned AceCloudCert achievement." title="Certificate preview">
      {notice ? <ToastNotification message={notice} title="Certificate action" tone="info" /> : null}
      <CertificatePreview certificate={certificate} />
      <View style={styles.cardGrid}>
        <AppCard style={styles.flexCard}>
          <Text style={styles.cardTitle}>Verification</Text>
          <Text style={styles.copy}>
            This certificate verifies a practice achievement on AceCloudCert. It is not an official vendor credential.
          </Text>
          <Text style={styles.referenceText}>{certificate.verificationUrl}</Text>
        </AppCard>
        <AppCard style={styles.flexCard}>
          <Text style={styles.cardTitle}>LinkedIn share text</Text>
          <Text style={styles.copy}>{getCertificateShareText()}</Text>
        </AppCard>
      </View>
      <View style={styles.actions}>
        <PrimaryButton onPress={() => void onExport(certificate)}>
          {canAccessFeature(plan, 'certificateDownload') ? 'Download / export' : 'Upgrade to download'}
        </PrimaryButton>
        <SecondaryButton onPress={() => void onShare(certificate)}>Share text</SecondaryButton>
        <SecondaryButton onPress={() => onLinkedInShare(certificate)}>Open LinkedIn share</SecondaryButton>
        <SecondaryButton onPress={() => navigate(APP_ROUTES.certificates)}>Back to certificates</SecondaryButton>
      </View>
    </Section>
  );
}

function CertificateList({
  certificates,
  emptyActionLabel,
  emptyDescription,
  emptyTitle,
  onEmptyAction,
  onOpenCertificate
}: {
  certificates: readonly CertificateRecord[];
  emptyActionLabel: string;
  emptyDescription: string;
  emptyTitle: string;
  onEmptyAction: () => void;
  onOpenCertificate: (certificate: CertificateRecord) => void;
}) {
  if (certificates.length === 0) {
    return (
      <EmptyState
        actionLabel={emptyActionLabel}
        description={emptyDescription}
        onAction={onEmptyAction}
        title={emptyTitle}
      />
    );
  }

  const highestScore = Math.max(...certificates.map((certificate) => certificate.score));

  return (
    <View style={styles.verticalStack}>
      <View style={styles.metricGrid}>
        <StatCard label="Certificates earned" value={certificates.length} />
        <StatCard label="Highest score" value={formatPercent(highestScore)} />
        <StatCard label="Latest issue date" value={formatCertificateDate(certificates[0]?.issuedAt ?? new Date().toISOString())} />
      </View>
      <View style={styles.cardGrid}>
        {certificates.map((certificate) => (
          <AppCard key={certificate.id} style={styles.flexCard}>
            <View style={styles.row}>
              <Badge tone="success">Earned</Badge>
              <Text style={styles.dateText}>{formatCertificateDate(certificate.issuedAt)}</Text>
            </View>
            <Text style={styles.cardTitle}>{certificate.certificationName}</Text>
            <Text style={styles.copyStrong}>{certificate.userName}</Text>
            <Text style={styles.copy}>Score: {formatPercent(certificate.score)}</Text>
            <Text style={styles.copy}>Certificate ID: {certificate.certificateId}</Text>
            <PrimaryButton onPress={() => onOpenCertificate(certificate)} size="sm">
              View certificate
            </PrimaryButton>
          </AppCard>
        ))}
      </View>
    </View>
  );
}

function CertificatePreview({ certificate }: { certificate: CertificateRecord }) {
  return (
    <AppCard style={styles.certificatePreview}>
      <View style={styles.certificateBorder}>
        <View style={styles.certificateHeader}>
          <View style={styles.certificateLogoWrap}>
            <Image source={logo} style={styles.certificateLogo} />
            <Text style={styles.certificateBrand}>{APP_NAME}</Text>
          </View>
          <View style={styles.excellenceSeal}>
            <Text style={styles.sealStrong}>ACE</Text>
            <Text style={styles.sealText}>Excellence</Text>
            <Text style={styles.sealText}>Verified</Text>
          </View>
        </View>
        <Text style={styles.certificateEyebrow}>Certificate of Achievement</Text>
        <Text style={styles.certificateTitle}>Cloud Excellence</Text>
        <Text style={styles.certificateMuted}>This certificate is proudly awarded to</Text>
        <Text style={styles.certificateCandidate}>{certificate.userName}</Text>
        <Text style={styles.certificateMuted}>for successfully completing the AceCloudCert assessment for</Text>
        <Text style={styles.certificateProgram}>{certificate.certificationName}</Text>
        <Text style={styles.certificateScore}>Score: {formatPercent(certificate.score)}</Text>
        <View style={styles.certificateMetaGrid}>
          <View style={styles.certificateMetaItem}>
            <Text style={styles.certificateMetaLabel}>Issue date</Text>
            <Text style={styles.certificateMetaValue}>{formatCertificateDate(certificate.issuedAt)}</Text>
          </View>
          <View style={styles.certificateMetaItem}>
            <Text style={styles.certificateMetaLabel}>Certificate ID</Text>
            <Text style={styles.certificateMetaValue}>{certificate.certificateId}</Text>
          </View>
        </View>
        <Text style={styles.certificateVerification}>Verify this achievement at {certificate.verificationUrl}</Text>
      </View>
    </AppCard>
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

function CertificateHistoryPage({
  certificates,
  navigate,
  onOpenCertificate
}: NavigationProps & {
  certificates: readonly CertificateRecord[];
  onOpenCertificate: (certificate: CertificateRecord) => void;
  profile: UserAccountProfile;
}) {
  return (
    <Section eyebrow="Achievements" subtitle="Earned certificate records and verification ids." title="Certificate history">
      <CertificateList
        certificates={certificates}
        emptyActionLabel="Back to profile"
        emptyDescription="Earned certificates will appear here after a passed test attempt."
        emptyTitle="No certificate records yet"
        onEmptyAction={() => navigate(APP_ROUTES.profile)}
        onOpenCertificate={onOpenCertificate}
      />
    </Section>
  );
}

function SubscriptionPage({
  navigate,
  notice,
  onChangePlan,
  onSelectPlan,
  profile,
  selectedPlan
}: NavigationProps & {
  notice: string | null;
  onChangePlan: (plan: UserPlan) => void;
  onSelectPlan: (plan: UserPlan) => void;
  profile: UserAccountProfile;
  selectedPlan: UserPlan;
}) {
  const selectedPlanDetails =
    subscriptionPlans.find((plan) => plan.id === selectedPlan) ??
    subscriptionPlans.find((plan) => plan.id === profile.plan) ??
    subscriptionPlans[0];
  const currentPlanDetails = subscriptionPlans.find((plan) => plan.id === profile.plan) ?? subscriptionPlans[0];
  const selectedAction = getPlanChangeVerb(profile.plan, selectedPlan);

  return (
    <Section
      eyebrow="Billing"
      subtitle="Mock subscription management with local profile persistence and Stripe-ready plan identifiers."
      title="Subscription management"
    >
      {notice ? <ToastNotification message={notice} title="Subscription update" tone="info" /> : null}
      <View style={styles.cardGrid}>
        <AppCard style={styles.flexCard}>
          <View style={styles.row}>
            <Badge tone="success">Current plan</Badge>
            <Text style={styles.price}>{currentPlanDetails?.priceLabel ?? 'GBP 0'}</Text>
          </View>
          <Text style={styles.cardTitle}>{profile.plan}</Text>
          <Text style={styles.copy}>Your active plan is stored on the local learner profile and controls entitlement checks.</Text>
          {(currentPlanDetails?.features ?? []).map((feature) => (
            <Text key={feature} style={styles.copyStrong}>
              - {feature}
            </Text>
          ))}
        </AppCard>

        <AppCard style={styles.flexCard}>
          <View style={styles.row}>
            <Badge tone="info">Mock checkout</Badge>
            <Text style={styles.price}>{selectedPlanDetails?.priceLabel ?? 'GBP 0'}</Text>
          </View>
          <Text style={styles.cardTitle}>{selectedAction === 'Current plan' ? 'Manage current plan' : `${selectedAction} to ${selectedPlan}`}</Text>
          <Text style={styles.copy}>
            This flow simulates checkout locally. A future Stripe integration can replace this action using the plan lookup key.
          </Text>
          <Text style={styles.referenceText}>
            {selectedPlanDetails?.stripePriceLookupKey ?? 'No Stripe price required for Free'}
          </Text>
          <PrimaryButton onPress={() => onChangePlan(selectedPlan)}>
            {selectedAction === 'Current plan' ? 'Confirm current plan' : `${selectedAction} plan`}
          </PrimaryButton>
        </AppCard>
      </View>

      <View style={styles.cardGrid}>
        {subscriptionPlans.map((plan) => (
          <PlanCard
            currentPlan={profile.plan}
            isAuthenticated
            key={plan.id}
            onSelectPlan={onSelectPlan}
            plan={plan}
          />
        ))}
      </View>

      <PlanComparisonTable />

      <View style={styles.actions}>
        <PrimaryButton onPress={() => navigate(APP_ROUTES.pricing)}>Open public pricing</PrimaryButton>
        <SecondaryButton onPress={() => navigate(APP_ROUTES.profile)}>Back to profile</SecondaryButton>
      </View>
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
  answerOption: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: theme.spacing.md,
    padding: theme.spacing.md
  },
  attemptRow: {
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    gap: theme.spacing.xs,
    padding: theme.spacing.sm
  },
  badgeRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs
  },
  certificateBrand: {
    color: '#0F172A',
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center'
  },
  certificateBorder: {
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderColor: '#047857',
    borderRadius: theme.radii.md,
    borderWidth: 8,
    gap: theme.spacing.md,
    padding: theme.spacing.xl,
    width: '100%'
  },
  certificateCandidate: {
    borderBottomColor: '#047857',
    borderBottomWidth: 2,
    color: '#111827',
    fontSize: 34,
    fontWeight: '900',
    lineHeight: 42,
    maxWidth: 720,
    paddingBottom: theme.spacing.sm,
    textAlign: 'center',
    width: '100%'
  },
  certificateEyebrow: {
    color: '#047857',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  certificateHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
    justifyContent: 'space-between',
    width: '100%'
  },
  certificateLogo: {
    borderRadius: theme.radii.md,
    height: 46,
    width: 46
  },
  certificateLogoWrap: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.sm
  },
  certificateMetaGrid: {
    borderTopColor: '#BBF7D0',
    borderTopWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
    justifyContent: 'space-between',
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.md,
    width: '100%'
  },
  certificateMetaItem: {
    flexBasis: 240,
    flexGrow: 1,
    gap: theme.spacing.xs
  },
  certificateMetaLabel: {
    color: '#047857',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  certificateMetaValue: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 20
  },
  certificateMuted: {
    color: '#475569',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center'
  },
  certificatePreview: {
    backgroundColor: '#E5E7EB',
    borderColor: '#2D3748',
    padding: theme.spacing.md
  },
  certificateProgram: {
    color: '#111827',
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 29,
    maxWidth: 760,
    textAlign: 'center'
  },
  certificateScore: {
    color: '#047857',
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center'
  },
  certificateTitle: {
    color: '#064E3B',
    fontSize: 38,
    fontWeight: '900',
    lineHeight: 46,
    textAlign: 'center'
  },
  certificateVerification: {
    color: '#475569',
    fontSize: 12,
    lineHeight: 18,
    marginTop: theme.spacing.sm,
    textAlign: 'center'
  },
  copy: {
    color: theme.colors.textMuted,
    fontSize: 14,
    lineHeight: 21
  },
  copyStrong: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 21
  },
  currentPlanCard: {
    borderColor: theme.colors.primary
  },
  dashboardActionCard: {
    flexBasis: 220,
    flexGrow: 1,
    justifyContent: 'space-between',
    minHeight: 190
  },
  dashboardHero: {
    gap: theme.spacing.lg,
    padding: theme.spacing.xl
  },
  dashboardHeroMain: {
    alignItems: 'stretch',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.lg,
    justifyContent: 'space-between'
  },
  dashboardProgressPanel: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    flexBasis: 260,
    flexGrow: 1,
    gap: theme.spacing.sm,
    maxWidth: 380,
    padding: theme.spacing.md
  },
  dashboardProgressValue: {
    color: theme.colors.primary,
    fontSize: 42,
    fontWeight: '900',
    lineHeight: 48
  },
  dateText: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  examCard: {
    gap: theme.spacing.md
  },
  excellenceSeal: {
    alignItems: 'center',
    backgroundColor: '#FACC15',
    borderColor: '#A16207',
    borderRadius: 999,
    borderWidth: 4,
    height: 104,
    justifyContent: 'center',
    width: 104
  },
  domainList: {
    gap: theme.spacing.md
  },
  domainRow: {
    gap: theme.spacing.xs
  },
  flexCard: {
    flexBasis: 250,
    flexGrow: 1
  },
  filterCard: {
    gap: theme.spacing.md
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
  microCopy: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18
  },
  optionCard: {
    backgroundColor: theme.colors.surface
  },
  navigator: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs
  },
  navigatorAnswered: {
    backgroundColor: 'rgba(34, 197, 94, 0.18)',
    borderColor: theme.colors.success
  },
  navigatorCurrent: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary
  },
  navigatorCurrentText: {
    color: theme.colors.background
  },
  navigatorItem: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.sm,
    borderWidth: 1,
    height: 34,
    justifyContent: 'center',
    width: 34
  },
  navigatorMarked: {
    borderColor: theme.colors.primary,
    borderWidth: 2
  },
  navigatorText: {
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: '900'
  },
  optionLetter: {
    color: theme.colors.primary,
    fontSize: 13,
    fontWeight: '900',
    width: 18
  },
  optionList: {
    gap: theme.spacing.sm
  },
  optionText: {
    color: theme.colors.text,
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21
  },
  price: {
    color: theme.colors.primary,
    fontSize: 22,
    fontWeight: '900'
  },
  questionText: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 28
  },
  referenceText: {
    color: theme.colors.accentBlue,
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 19
  },
  relatedQuestion: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    gap: theme.spacing.xs,
    padding: theme.spacing.md
  },
  resumeCard: {
    borderColor: theme.colors.primary
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
  selectedAnswerOption: {
    backgroundColor: 'rgba(255, 140, 0, 0.16)',
    borderColor: theme.colors.primary
  },
  selectedOptionText: {
    color: theme.colors.text
  },
  sealStrong: {
    color: '#713F12',
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 22,
    textAlign: 'center'
  },
  sealText: {
    color: '#713F12',
    fontSize: 9,
    fontWeight: '900',
    lineHeight: 12,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  stack: {
    flex: 1,
    gap: theme.spacing.xs,
    minWidth: 240
  },
  trendBar: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radii.sm,
    width: '100%'
  },
  trendChart: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: theme.spacing.sm,
    minHeight: 150
  },
  trendColumn: {
    alignItems: 'center',
    flex: 1,
    gap: theme.spacing.xs,
    minWidth: 34
  },
  trendLabel: {
    color: theme.colors.textMuted,
    fontSize: 11,
    fontWeight: '900'
  },
  trendScore: {
    color: theme.colors.text,
    fontSize: 11,
    fontWeight: '900'
  },
  trendTrack: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.sm,
    borderWidth: 1,
    height: 105,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    width: '100%'
  },
  verticalStack: {
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
  },
  timerPill: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  timerText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '900'
  },
  topicSection: {
    gap: theme.spacing.md
  }
});
