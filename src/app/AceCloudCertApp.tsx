import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppCard, FeatureCard, MetricCard } from '@/components/cards';
import { DomainProgressList } from '@/components/charts';
import { FormField } from '@/components/forms';
import { AppShell } from '@/components/layout';
import { AppButton, ProgressBar } from '@/components/ui';
import { APP_NAME, DEFAULT_CERTIFICATION_ID, DEFAULT_USER_ID, PASS_MARK_PERCENT } from '@/constants/app';
import { APP_ROUTES } from '@/constants/routes';
import { theme } from '@/constants/theme';
import { certifications, knowledgeTopics, legalPages, questionBank, subscriptionPlans } from '@/data';
import { featureModules, featureRouteLabels } from '@/features';
import { useAppNavigation } from '@/hooks';
import { getAvailableFeatures } from '@/lib/featureModule';
import { serviceReadiness } from '@/services';
import type { AppRoute, UserProfile } from '@/types';
import { countQuestionsByDomain, calculateReadinessScore } from '@/utils/exam';
import { formatCount, formatPercent } from '@/utils/format';

const localUser: UserProfile = {
  id: DEFAULT_USER_ID,
  name: 'AceCloudCert Learner',
  email: 'learner@acecloudcert.com',
  plan: 'Free'
};

export default function AceCloudCertApp() {
  const { activeRoute, navigate } = useAppNavigation();
  const [email, setEmail] = useState(localUser.email);
  const [password, setPassword] = useState('password123');

  const activeCertification = certifications.find((certification) => certification.id === DEFAULT_CERTIFICATION_ID) ?? certifications[0];
  const domainCounts = useMemo(() => countQuestionsByDomain(questionBank), []);
  const availableFeatures = useMemo(() => getAvailableFeatures(featureModules), []);
  const readiness = calculateReadinessScore(questionBank.length, 0);

  const routeLabels = featureRouteLabels as Record<AppRoute, string>;

  return (
    <AppShell activeRoute={activeRoute} navigate={navigate} routeLabels={routeLabels}>
      {activeRoute === APP_ROUTES.dashboard && (
        <DashboardFoundation
          navigate={navigate}
          readiness={readiness}
          user={localUser}
          activeCertificationTitle={activeCertification?.title ?? 'AWS Certified Cloud Practitioner'}
          availableFeatureCount={availableFeatures.length}
        />
      )}
      {activeRoute === APP_ROUTES.auth && (
        <AuthFoundation email={email} password={password} setEmail={setEmail} setPassword={setPassword} />
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
      <FeatureMap navigate={navigate} />
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
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Enterprise foundation</Text>
        <Text style={styles.title}>Welcome, {user.name}</Text>
        <Text style={styles.copy}>
          {APP_NAME} is now organized around typed modules, shared contracts, central routes, and reusable UI building blocks.
        </Text>
        <View style={styles.actions}>
          <AppButton onPress={() => navigate(APP_ROUTES.tests)}>Review test foundation</AppButton>
          <AppButton onPress={() => navigate(APP_ROUTES.certifications)} variant="secondary">
            Certification catalogue
          </AppButton>
        </View>
      </View>
      <View style={styles.metricGrid}>
        <MetricCard label="Active path" value={activeCertificationTitle} />
        <MetricCard label="Readiness baseline" value={formatPercent(readiness)} />
        <MetricCard label="Feature modules" value={availableFeatureCount} />
        <MetricCard label="Pass mark" value={formatPercent(PASS_MARK_PERCENT)} />
      </View>
    </>
  );
}

type AuthFoundationProps = {
  email: string;
  password: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
};

function AuthFoundation({ email, password, setEmail, setPassword }: AuthFoundationProps) {
  return (
    <Section title="Authentication Foundation" eyebrow="Identity">
      <Text style={styles.copy}>
        The auth module now has a typed home for Firebase Auth integration while the current shell keeps local credentials isolated.
      </Text>
      <View style={styles.form}>
        <FormField label="Email" onChangeText={setEmail} value={email} />
        <FormField label="Password" onChangeText={setPassword} secureTextEntry value={password} />
      </View>
    </Section>
  );
}

function CertificationsFoundation() {
  return (
    <Section title="Certification Catalogue Foundation" eyebrow="Content catalogue">
      <View style={styles.cardGrid}>
        {certifications.map((certification) => (
          <AppCard key={certification.id} style={styles.flexCard}>
            <View style={styles.row}>
              <Text style={styles.badge}>{certification.provider}</Text>
              <Text style={styles.status}>{certification.status}</Text>
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
    <Section title="Test Engine Foundation" eyebrow="Exam engine">
      <Text style={styles.copy}>
        The test engine foundation separates question data, pass mark constants, domain analytics, and future attempt persistence.
      </Text>
      <DomainProgressList domainCounts={domainCounts} />
    </Section>
  );
}

function QuestionsFoundation({ domainCounts }: DomainProps) {
  return (
    <Section title="Question Bank Foundation" eyebrow="Content quality">
      <View style={styles.metricGrid}>
        <MetricCard label="Seed questions" value={questionBank.length} />
        <MetricCard label="Domains covered" value={Object.keys(domainCounts).length} />
        <MetricCard label="Primary certification" value="AWS CCP" />
      </View>
      <Text style={styles.copy}>
        Questions are now typed by certification, domain, difficulty, answer, and explanation so admin and test modules can share one model.
      </Text>
    </Section>
  );
}

function KnowledgeBaseFoundation() {
  return (
    <Section title="Knowledge Base Foundation" eyebrow="Learning content">
      <View style={styles.cardGrid}>
        {knowledgeTopics.map((topic) => (
          <AppCard key={topic.id} style={styles.flexCard}>
            <Text style={styles.badge}>{topic.domain}</Text>
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
    <Section title="Certificates Foundation" eyebrow="Achievements">
      <Text style={styles.copy}>
        Certificate records now have a dedicated module boundary for previews, export jobs, storage paths, and verification ids.
      </Text>
      <AppCard>
        <Text style={styles.badge}>{APP_NAME}</Text>
        <Text style={styles.cardTitle}>Certificate service contract ready</Text>
        <Text style={styles.copy}>PDF/PNG generation and share actions will attach to this module in the feature build phase.</Text>
      </AppCard>
    </Section>
  );
}

function SubscriptionsFoundation() {
  return (
    <Section title="Subscriptions Foundation" eyebrow="Billing">
      <View style={styles.cardGrid}>
        {subscriptionPlans.map((plan) => (
          <AppCard key={plan.id} style={styles.flexCard}>
            <Text style={styles.cardTitle}>{plan.name}</Text>
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
    <Section title="Profile Foundation" eyebrow="Account">
      <View style={styles.metricGrid}>
        <MetricCard label="Learner" value={user.name} />
        <MetricCard label="Plan" value={user.plan} />
        <MetricCard label="Session model" value="Local" />
      </View>
    </Section>
  );
}

function AdminFoundation() {
  return (
    <Section title="Admin Foundation" eyebrow="Operations">
      <Text style={styles.copy}>Service readiness is centralized so backend, billing, and content administration can be implemented deliberately.</Text>
      <View style={styles.cardGrid}>
        {serviceReadiness.map((item) => (
          <AppCard key={item.name} style={styles.flexCard}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.copy}>{item.purpose}</Text>
            {item.requiredConfiguration.map((config) => (
              <Text key={config} style={styles.copy}>- {config}</Text>
            ))}
          </AppCard>
        ))}
      </View>
    </Section>
  );
}

function LegalFoundation() {
  return (
    <Section title="Legal Foundation" eyebrow="Compliance">
      <View style={styles.cardGrid}>
        {legalPages.map((page) => (
          <AppCard key={page.id} style={styles.flexCard}>
            <Text style={styles.cardTitle}>{page.title}</Text>
            <Text style={styles.copy}>{page.summary}</Text>
          </AppCard>
        ))}
      </View>
    </Section>
  );
}

type FeatureMapProps = {
  navigate: (route: AppRoute) => void;
};

function FeatureMap({ navigate }: FeatureMapProps) {
  return (
    <Section title="Feature Module Map" eyebrow="Architecture">
      <View style={styles.cardGrid}>
        {featureModules.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} onPress={() => navigate(feature.route)} />
        ))}
      </View>
    </Section>
  );
}

type SectionProps = {
  children: React.ReactNode;
  eyebrow: string;
  title: string;
};

function Section({ children, eyebrow, title }: SectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.heading}>{title}</Text>
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
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radii.sm,
    color: theme.colors.background,
    fontSize: 12,
    fontWeight: '900',
    overflow: 'hidden',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 5
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
  eyebrow: {
    color: theme.colors.primary,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
    textTransform: 'uppercase'
  },
  flexCard: {
    flexBasis: 250,
    flexGrow: 1
  },
  form: {
    gap: theme.spacing.md,
    maxWidth: 520
  },
  heading: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 30
  },
  hero: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    borderWidth: 1,
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
    gap: theme.spacing.sm,
    justifyContent: 'space-between'
  },
  section: {
    gap: theme.spacing.md
  },
  status: {
    color: theme.colors.success,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  title: {
    color: theme.colors.text,
    fontSize: 34,
    fontWeight: '900',
    lineHeight: 40
  }
});
