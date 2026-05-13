import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppCard, FeatureCard, StatCard } from '@/components/cards';
import { DomainProgressList } from '@/components/charts';
import { InputField, PasswordField, SelectField } from '@/components/forms';
import { AppShell, SectionHeader } from '@/components/layout';
import { Badge, EmptyState, PrimaryButton, ProgressBar, SecondaryButton, Table, Tabs, ToastNotification } from '@/components/ui';
import type { TableColumn } from '@/components/ui';
import { APP_NAME, DEFAULT_CERTIFICATION_ID, DEFAULT_USER_ID, PASS_MARK_PERCENT } from '@/constants/app';
import { APP_ROUTES } from '@/constants/routes';
import { theme } from '@/constants/theme';
import { certifications, knowledgeTopics, legalPages, questionBank, subscriptionPlans } from '@/data';
import { featureModules, featureRouteLabels } from '@/features';
import { useAppNavigation } from '@/hooks';
import { getAvailableFeatures } from '@/lib';
import { serviceReadiness } from '@/services';
import type { AppRoute, ServiceReadinessItem, UserPlan, UserProfile } from '@/types';
import { calculateReadinessScore, countQuestionsByDomain } from '@/utils';
import { formatCount, formatPercent } from '@/utils';

const localUser: UserProfile = {
  id: DEFAULT_USER_ID,
  name: 'AceCloudCert Learner',
  email: 'learner@acecloudcert.com',
  plan: 'Free'
};

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
  const { activeRoute, navigate } = useAppNavigation();
  const [email, setEmail] = useState(localUser.email);
  const [password, setPassword] = useState('password123');
  const [selectedPlan, setSelectedPlan] = useState<UserPlan>('Free');

  const activeCertification = certifications.find((certification) => certification.id === DEFAULT_CERTIFICATION_ID) ?? certifications[0];
  const domainCounts = useMemo(() => countQuestionsByDomain(questionBank), []);
  const availableFeatures = useMemo(() => getAvailableFeatures(featureModules), []);
  const readiness = calculateReadinessScore(questionBank.length, 0);
  const routeLabels = featureRouteLabels as Record<AppRoute, string>;

  return (
    <AppShell activeRoute={activeRoute} navigate={navigate} routeLabels={routeLabels}>
      {activeRoute === APP_ROUTES.dashboard && (
        <DashboardFoundation
          activeCertificationTitle={activeCertification?.title ?? 'AWS Certified Cloud Practitioner'}
          availableFeatureCount={availableFeatures.length}
          navigate={navigate}
          readiness={readiness}
          user={localUser}
        />
      )}
      {activeRoute === APP_ROUTES.auth && (
        <AuthFoundation
          email={email}
          password={password}
          selectedPlan={selectedPlan}
          setEmail={setEmail}
          setPassword={setPassword}
          setSelectedPlan={setSelectedPlan}
        />
      )}
      {activeRoute === APP_ROUTES.certifications && <CertificationsFoundation />}
      {activeRoute === APP_ROUTES.tests && <TestsFoundation domainCounts={domainCounts} />}
      {activeRoute === APP_ROUTES.questions && <QuestionsFoundation domainCounts={domainCounts} />}
      {activeRoute === APP_ROUTES.knowledgeBase && <KnowledgeBaseFoundation />}
      {activeRoute === APP_ROUTES.certificates && <CertificatesFoundation />}
      {activeRoute === APP_ROUTES.subscriptions && <SubscriptionsFoundation />}
      {activeRoute === APP_ROUTES.profile && <ProfileFoundation user={localUser} />}
      {activeRoute === APP_ROUTES.admin && <AdminFoundation />}
      {activeRoute === APP_ROUTES.legal && <LegalFoundation />}
    </AppShell>
  );
}

type DashboardFoundationProps = {
  activeCertificationTitle: string;
  availableFeatureCount: number;
  navigate: (route: AppRoute) => void;
  readiness: number;
  user: UserProfile;
};

function DashboardFoundation({
  activeCertificationTitle,
  availableFeatureCount,
  navigate,
  readiness,
  user
}: DashboardFoundationProps) {
  return (
    <>
      <AppCard style={styles.hero}>
        <SectionHeader
          eyebrow="Enterprise foundation"
          title={`Welcome, ${user.name}`}
          subtitle={`${APP_NAME} now has premium design tokens, shared UI primitives, central routes, and feature-owned module boundaries.`}
        />
        <ToastNotification
          message="The design system is ready for feature-by-feature rebuild work."
          title="Architecture upgraded"
          tone="success"
        />
        <View style={styles.actions}>
          <PrimaryButton onPress={() => navigate(APP_ROUTES.tests)}>Review test foundation</PrimaryButton>
          <SecondaryButton onPress={() => navigate(APP_ROUTES.certifications)}>Certification catalogue</SecondaryButton>
        </View>
      </AppCard>

      <View style={styles.metricGrid}>
        <StatCard label="Active path" value={activeCertificationTitle} />
        <StatCard label="Readiness baseline" value={formatPercent(readiness)} />
        <StatCard label="Feature modules" value={availableFeatureCount} />
        <StatCard label="Pass mark" value={formatPercent(PASS_MARK_PERCENT)} />
      </View>

      <Section title="Feature Module Map" eyebrow="Architecture">
        <View style={styles.cardGrid}>
          {featureModules.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} onPress={() => navigate(feature.route)} />
          ))}
        </View>
      </Section>
    </>
  );
}

type AuthFoundationProps = {
  email: string;
  password: string;
  selectedPlan: UserPlan;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setSelectedPlan: (value: UserPlan) => void;
};

function AuthFoundation({ email, password, selectedPlan, setEmail, setPassword, setSelectedPlan }: AuthFoundationProps) {
  return (
    <Section
      title="Authentication Foundation"
      eyebrow="Identity"
      subtitle="A polished form surface is ready for Firebase Auth, password reset, session persistence, and profile onboarding."
    >
      <AppCard style={styles.formCard}>
        <InputField label="Email" onChangeText={setEmail} value={email} />
        <PasswordField label="Password" onChangeText={setPassword} value={password} />
        <SelectField
          label="Starting plan"
          onChange={(value) => setSelectedPlan(value as UserPlan)}
          options={subscriptionPlans.map((plan) => ({ label: plan.name, value: plan.id }))}
          value={selectedPlan}
        />
      </AppCard>
    </Section>
  );
}

function CertificationsFoundation() {
  return (
    <Section
      title="Certification Catalogue Foundation"
      eyebrow="Content catalogue"
      subtitle="Certification cards now share consistent badges, progress bars, spacing, and enterprise card treatment."
    >
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
          </AppCard>
        ))}
      </View>
    </Section>
  );
}

type DomainProps = {
  domainCounts: Record<string, number>;
};

function TestsFoundation({ domainCounts }: DomainProps) {
  return (
    <Section
      title="Test Engine Foundation"
      eyebrow="Exam engine"
      subtitle="Domain analytics, pass mark constants, and future attempt persistence now have a consistent visual container."
    >
      <AppCard>
        <DomainProgressList domainCounts={domainCounts} />
      </AppCard>
    </Section>
  );
}

function QuestionsFoundation({ domainCounts }: DomainProps) {
  const [activeTab, setActiveTab] = useState('domains');

  return (
    <Section
      title="Question Bank Foundation"
      eyebrow="Content quality"
      subtitle="The question model is typed by certification, domain, difficulty, answer, and explanation."
    >
      <Tabs
        activeId={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: 'domains', label: 'Domains' },
          { id: 'model', label: 'Data model' }
        ]}
      />
      {activeTab === 'domains' ? (
        <View style={styles.metricGrid}>
          <StatCard label="Seed questions" value={questionBank.length} />
          <StatCard label="Domains covered" value={Object.keys(domainCounts).length} />
          <StatCard label="Primary certification" value="AWS CCP" />
        </View>
      ) : (
        <AppCard>
          <Text style={styles.cardTitle}>Question contract</Text>
          <Text style={styles.copy}>id, certificationId, domain, prompt, options, correctAnswer, explanation, difficulty</Text>
        </AppCard>
      )}
    </Section>
  );
}

function KnowledgeBaseFoundation() {
  return (
    <Section
      title="Knowledge Base Foundation"
      eyebrow="Learning content"
      subtitle="Study topics use the same card, badge, typography, and spacing rules as the rest of the product."
    >
      <View style={styles.cardGrid}>
        {knowledgeTopics.map((topic) => (
          <AppCard key={topic.id} style={styles.flexCard}>
            <Badge tone="info">{topic.domain}</Badge>
            <Text style={styles.cardTitle}>{topic.title}</Text>
            <Text style={styles.copy}>{topic.summary}</Text>
          </AppCard>
        ))}
      </View>
    </Section>
  );
}

function CertificatesFoundation() {
  return (
    <Section
      title="Certificates Foundation"
      eyebrow="Achievements"
      subtitle="Certificate previews, exports, storage paths, and verification ids have a dedicated module boundary."
    >
      <EmptyState
        description="PDF and PNG generation will attach to this module when the certificate feature build starts."
        title="No certificate records yet"
      />
    </Section>
  );
}

function SubscriptionsFoundation() {
  return (
    <Section
      title="Subscriptions Foundation"
      eyebrow="Billing"
      subtitle="Plan cards are ready for Stripe Checkout, billing portal links, and entitlement enforcement."
    >
      <View style={styles.cardGrid}>
        {subscriptionPlans.map((plan) => (
          <AppCard key={plan.id} style={styles.flexCard}>
            <View style={styles.row}>
              <Text style={styles.cardTitle}>{plan.name}</Text>
              {plan.id === 'Free' ? <Badge tone="success">Current</Badge> : null}
            </View>
            <Text style={styles.price}>{plan.priceLabel}</Text>
            {plan.features.map((feature) => (
              <Text key={feature} style={styles.copy}>- {feature}</Text>
            ))}
          </AppCard>
        ))}
      </View>
    </Section>
  );
}

type ProfileFoundationProps = {
  user: UserProfile;
};

function ProfileFoundation({ user }: ProfileFoundationProps) {
  return (
    <Section
      title="Profile Foundation"
      eyebrow="Account"
      subtitle="Profile surfaces now share stat cards and branded account typography."
    >
      <View style={styles.metricGrid}>
        <StatCard label="Learner" value={user.name} />
        <StatCard label="Plan" value={user.plan} />
        <StatCard label="Session model" value="Local" />
      </View>
    </Section>
  );
}

function AdminFoundation() {
  return (
    <Section
      title="Admin Foundation"
      eyebrow="Operations"
      subtitle="The admin foundation lists backend and platform integrations using the reusable table component."
    >
      <Table columns={serviceColumns} getRowKey={(row) => row.name} rows={serviceReadiness} />
    </Section>
  );
}

function LegalFoundation() {
  return (
    <Section
      title="Legal Foundation"
      eyebrow="Compliance"
      subtitle="Legal and privacy pages share the same card and text hierarchy as product modules."
    >
      <View style={styles.cardGrid}>
        {legalPages.map((page) => (
          <AppCard key={page.id} style={styles.flexCard}>
            <Badge tone="neutral">{page.id}</Badge>
            <Text style={styles.cardTitle}>{page.title}</Text>
            <Text style={styles.copy}>{page.summary}</Text>
          </AppCard>
        ))}
      </View>
    </Section>
  );
}

type SectionProps = {
  children: React.ReactNode;
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
  copy: {
    color: theme.colors.textMuted,
    fontSize: 14,
    lineHeight: 21
  },
  flexCard: {
    flexBasis: 250,
    flexGrow: 1
  },
  formCard: {
    gap: theme.spacing.md,
    maxWidth: 560
  },
  hero: {
    gap: theme.spacing.md,
    padding: theme.spacing.xl
  },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md
  },
  price: {
    color: theme.colors.primary,
    fontSize: 22,
    fontWeight: '900'
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
