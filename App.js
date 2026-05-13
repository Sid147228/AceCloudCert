import React, { useMemo, useState } from 'react';
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const logo = require('./assets/icon.png');

const colors = {
  bg: '#050505',
  panel: '#0B0F14',
  card: '#111827',
  cardSoft: '#172033',
  border: '#263241',
  orange: '#FF8C00',
  orangeSoft: '#FFB347',
  text: '#FFFFFF',
  muted: '#9CA3AF',
  green: '#22C55E',
  red: '#EF4444',
};

const certifications = [
  {
    id: 'aws-ccp',
    provider: 'AWS',
    title: 'AWS Certified Cloud Practitioner',
    difficulty: 'Foundational',
    questions: 12,
    progress: 64,
    status: 'active',
  },
  {
    id: 'aws-saa',
    provider: 'AWS',
    title: 'AWS Solutions Architect Associate',
    difficulty: 'Associate',
    questions: 0,
    progress: 0,
    status: 'coming soon',
  },
  {
    id: 'az-900',
    provider: 'Microsoft Azure',
    title: 'Azure Fundamentals',
    difficulty: 'Foundational',
    questions: 0,
    progress: 0,
    status: 'coming soon',
  },
  {
    id: 'gcp-cdl',
    provider: 'Google Cloud',
    title: 'Google Cloud Digital Leader',
    difficulty: 'Foundational',
    questions: 0,
    progress: 0,
    status: 'coming soon',
  },
];

const questions = [
  {
    id: 'q1',
    certificationId: 'aws-ccp',
    domain: 'Cloud concepts',
    difficulty: 'easy',
    question: 'Which statement best describes cloud computing?',
    options: [
      'Buying physical servers for a private data center',
      'On-demand delivery of IT resources over the internet with pay-as-you-go pricing',
      'Running all applications from a single laptop',
      'A fixed monthly contract for dedicated hardware only',
    ],
    correctAnswer: 'On-demand delivery of IT resources over the internet with pay-as-you-go pricing',
    explanation:
      'AWS defines cloud computing as on-demand access to IT resources over the internet with usage-based pricing.',
  },
  {
    id: 'q2',
    certificationId: 'aws-ccp',
    domain: 'AWS global infrastructure',
    difficulty: 'easy',
    question: 'What is an AWS Availability Zone?',
    options: [
      'A billing account boundary',
      'One or more discrete data centers with redundant power, networking, and connectivity',
      'A support plan tier',
      'A global DNS service',
    ],
    correctAnswer: 'One or more discrete data centers with redundant power, networking, and connectivity',
    explanation:
      'Availability Zones are physically separate locations inside a Region and are designed for high availability.',
  },
  {
    id: 'q3',
    certificationId: 'aws-ccp',
    domain: 'Security and compliance',
    difficulty: 'medium',
    question: 'Under the AWS shared responsibility model, which task is AWS responsible for?',
    options: [
      'Managing customer IAM users',
      'Encrypting customer application code',
      'Protecting the physical infrastructure that runs AWS services',
      'Choosing customer password rotation policy',
    ],
    correctAnswer: 'Protecting the physical infrastructure that runs AWS services',
    explanation:
      'AWS is responsible for security of the cloud, including physical facilities, hardware, and managed infrastructure.',
  },
  {
    id: 'q4',
    certificationId: 'aws-ccp',
    domain: 'Compute',
    difficulty: 'easy',
    question: 'Which AWS service provides resizable virtual servers in the cloud?',
    options: ['Amazon S3', 'Amazon EC2', 'AWS IAM', 'Amazon Route 53'],
    correctAnswer: 'Amazon EC2',
    explanation: 'Amazon EC2 provides virtual machine capacity that can be resized and managed by the customer.',
  },
  {
    id: 'q5',
    certificationId: 'aws-ccp',
    domain: 'Storage',
    difficulty: 'easy',
    question: 'Which AWS service is commonly used for object storage?',
    options: ['Amazon S3', 'Amazon RDS', 'AWS Lambda', 'Amazon VPC'],
    correctAnswer: 'Amazon S3',
    explanation: 'Amazon S3 stores objects in buckets and is commonly used for static assets, backups, and data lakes.',
  },
  {
    id: 'q6',
    certificationId: 'aws-ccp',
    domain: 'Databases',
    difficulty: 'medium',
    question: 'Which AWS database service is a managed NoSQL key-value and document database?',
    options: ['Amazon Aurora', 'Amazon DynamoDB', 'Amazon Redshift', 'Amazon RDS for PostgreSQL'],
    correctAnswer: 'Amazon DynamoDB',
    explanation: 'DynamoDB is a fully managed NoSQL database designed for high-scale key-value and document workloads.',
  },
  {
    id: 'q7',
    certificationId: 'aws-ccp',
    domain: 'Networking',
    difficulty: 'medium',
    question: 'Which AWS service lets customers create an isolated virtual network?',
    options: ['Amazon VPC', 'AWS Shield', 'AWS CloudTrail', 'Amazon CloudWatch'],
    correctAnswer: 'Amazon VPC',
    explanation: 'Amazon VPC lets you define private IP ranges, subnets, route tables, and network boundaries.',
  },
  {
    id: 'q8',
    certificationId: 'aws-ccp',
    domain: 'Billing and pricing',
    difficulty: 'easy',
    question: 'Which AWS tool helps estimate monthly cloud costs before deployment?',
    options: ['AWS Pricing Calculator', 'AWS CloudTrail', 'AWS Trusted Advisor only', 'AWS Artifact'],
    correctAnswer: 'AWS Pricing Calculator',
    explanation: 'AWS Pricing Calculator helps model service usage and estimate projected costs.',
  },
  {
    id: 'q9',
    certificationId: 'aws-ccp',
    domain: 'Monitoring',
    difficulty: 'medium',
    question: 'Which service collects metrics and logs for AWS resources and applications?',
    options: ['Amazon CloudWatch', 'AWS Config', 'AWS Organizations', 'Amazon Cognito'],
    correctAnswer: 'Amazon CloudWatch',
    explanation: 'CloudWatch collects metrics, logs, and alarms for AWS resources and application workloads.',
  },
  {
    id: 'q10',
    certificationId: 'aws-ccp',
    domain: 'Support plans',
    difficulty: 'medium',
    question: 'Which AWS Support plan provides access to a Technical Account Manager?',
    options: ['Basic', 'Developer', 'Business', 'Enterprise'],
    correctAnswer: 'Enterprise',
    explanation: 'Enterprise Support includes a designated Technical Account Manager.',
  },
  {
    id: 'q11',
    certificationId: 'aws-ccp',
    domain: 'Serverless',
    difficulty: 'easy',
    question: 'Which AWS service runs code without provisioning or managing servers?',
    options: ['AWS Lambda', 'Amazon EC2 Auto Scaling', 'Amazon EBS', 'Amazon Lightsail'],
    correctAnswer: 'AWS Lambda',
    explanation: 'AWS Lambda is a serverless compute service where AWS manages the underlying servers.',
  },
  {
    id: 'q12',
    certificationId: 'aws-ccp',
    domain: 'Security and compliance',
    difficulty: 'medium',
    question: 'Which service helps securely manage access to AWS services and resources?',
    options: ['AWS IAM', 'Amazon SQS', 'Amazon Kinesis', 'AWS Snowball'],
    correctAnswer: 'AWS IAM',
    explanation: 'IAM is used to manage users, groups, roles, policies, and permissions in AWS.',
  },
];

const topics = [
  {
    title: 'What is cloud computing?',
    domain: 'Cloud concepts',
    body:
      'Cloud computing gives learners a flexible way to use compute, storage, databases, and networking without buying hardware up front.',
    bullets: ['On-demand self-service', 'Elastic capacity', 'Pay-as-you-go pricing', 'Managed global infrastructure'],
  },
  {
    title: 'AWS global infrastructure',
    domain: 'AWS global infrastructure',
    body:
      'AWS services run across Regions, Availability Zones, edge locations, and Regional edge caches to help applications stay resilient and close to users.',
    bullets: ['Regions are geographic areas', 'Availability Zones isolate failure', 'Edge locations speed delivery'],
  },
  {
    title: 'IAM basics',
    domain: 'Security and compliance',
    body:
      'Identity and Access Management controls who can access AWS resources and what actions they can perform.',
    bullets: ['Use least privilege', 'Prefer roles for applications', 'Enable MFA for sensitive users'],
  },
  {
    title: 'EC2 basics',
    domain: 'Compute',
    body:
      'Amazon EC2 provides virtual servers that can be selected by size, operating system, purchasing model, and network placement.',
    bullets: ['Choose instance families by workload', 'Use Auto Scaling for demand changes', 'Use security groups as firewalls'],
  },
  {
    title: 'S3 basics',
    domain: 'Storage',
    body:
      'Amazon S3 is durable object storage for files, backups, static websites, logs, and data lakes.',
    bullets: ['Stores objects in buckets', 'Supports lifecycle policies', 'Can encrypt data at rest'],
  },
  {
    title: 'RDS basics',
    domain: 'Databases',
    body:
      'Amazon RDS is a managed relational database service for engines such as PostgreSQL, MySQL, MariaDB, Oracle, and SQL Server.',
    bullets: ['Managed backups', 'Patching support', 'Multi-AZ high availability option'],
  },
  {
    title: 'Lambda basics',
    domain: 'Serverless',
    body:
      'AWS Lambda runs code in response to events and scales automatically without server management.',
    bullets: ['Event-driven compute', 'Pay for execution time', 'Common with API Gateway and S3 events'],
  },
  {
    title: 'VPC basics',
    domain: 'Networking',
    body:
      'Amazon VPC lets teams design private cloud networks with subnets, route tables, gateways, and network security controls.',
    bullets: ['Public and private subnets', 'Security groups', 'Network ACLs', 'Internet and NAT gateways'],
  },
  {
    title: 'CloudWatch basics',
    domain: 'Monitoring',
    body:
      'Amazon CloudWatch gives visibility into metrics, logs, dashboards, and alarms for AWS resources and applications.',
    bullets: ['Collect metrics', 'Store logs', 'Create alarms', 'Build operational dashboards'],
  },
  {
    title: 'AWS pricing and billing',
    domain: 'Billing and pricing',
    body:
      'AWS pricing varies by service, usage, Region, purchase option, data transfer, and storage class.',
    bullets: ['Use Pricing Calculator', 'Set Budgets alerts', 'Review Cost Explorer', 'Tag resources for allocation'],
  },
  {
    title: 'Shared responsibility model',
    domain: 'Security and compliance',
    body:
      'AWS handles security of the cloud, while customers handle security in the cloud depending on the services used.',
    bullets: ['AWS protects infrastructure', 'Customers manage data and access', 'Responsibility changes by service type'],
  },
  {
    title: 'AWS support plans',
    domain: 'Support plans',
    body:
      'AWS Support plans range from Basic to Enterprise, with higher tiers adding technical support, faster response times, and account guidance.',
    bullets: ['Basic is included', 'Developer supports experiments', 'Business supports production', 'Enterprise adds a TAM'],
  },
];

const plans = [
  {
    name: 'Free',
    price: 'GBP 0',
    features: ['Limited question bank', 'Basic quizzes', 'Basic progress tracking'],
  },
  {
    name: 'Silver',
    price: 'GBP 9.99/mo',
    features: ['Full AWS CCP bank', 'Mock exams', 'Progress tracking', 'Certificate access'],
  },
  {
    name: 'Gold',
    price: 'GBP 19.99/mo',
    features: ['Everything in Silver', 'Advanced analytics', 'All certifications', 'Premium study material'],
  },
];

const legalPages = {
  privacy:
    'AceCloudCert stores only the profile, progress, attempts, and certificate information needed to operate the learning experience. Firebase integration will add secure account storage later.',
  terms:
    'AceCloudCert is a certification preparation tool. Practice scores and certificates generated inside the app are study achievements and are not official vendor credentials.',
  cookies:
    'The web app can use local browser storage to remember session, progress, consent, and mock exam history. No advertising cookie flow is active in this mock build.',
  data:
    'Users can request profile deletion, progress export, and correction of stored learning records when backend account services are connected.',
};

function safePercent(value) {
  return `${Math.max(0, Math.min(100, Math.round(value)))}%`;
}

function AppButton({ label, onPress, variant = 'primary', disabled = false }) {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [
        styles.button,
        variant === 'secondary' && styles.buttonSecondary,
        variant === 'ghost' && styles.buttonGhost,
        disabled && styles.buttonDisabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <Text style={[styles.buttonText, variant !== 'primary' && styles.buttonTextSecondary]}>{label}</Text>
    </Pressable>
  );
}

function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

function ProgressBar({ value }) {
  return (
    <View style={styles.progressTrack}>
      <View style={[styles.progressFill, { width: safePercent(value) }]} />
    </View>
  );
}

function LogoHeader({ user, setScreen }) {
  return (
    <View style={styles.header}>
      <View style={styles.brandRow}>
        <Image source={logo} style={styles.logo} />
        <View>
          <Text style={styles.brand}>AceCloudCert</Text>
          <Text style={styles.brandSub}>Cloud certification prep</Text>
        </View>
      </View>
      <View style={styles.headerActions}>
        <AppButton label={user ? 'Profile' : 'Login'} variant="secondary" onPress={() => setScreen(user ? 'profile' : 'auth')} />
      </View>
    </View>
  );
}

function AuthScreen({ onLogin, setLegal }) {
  const [mode, setMode] = useState('login');
  const [fullName, setFullName] = useState('Siddharth Mathur');
  const [email, setEmail] = useState('learner@acecloudcert.com');
  const [password, setPassword] = useState('password123');
  const [confirm, setConfirm] = useState('password123');
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState('');

  const submit = () => {
    setError('');
    if (!email.includes('@') || password.length < 6) {
      setError('Enter a valid email and a password with at least 6 characters.');
      return;
    }
    if (mode === 'signup') {
      if (!fullName.trim()) {
        setError('Full name is required.');
        return;
      }
      if (password !== confirm) {
        setError('Passwords do not match.');
        return;
      }
      if (!accepted) {
        setError('You must accept the Terms and Privacy Policy to create an account.');
        return;
      }
    }
    onLogin({ name: mode === 'signup' ? fullName : 'Siddharth Mathur', email, plan: 'Free' });
  };

  return (
    <ScrollView contentContainerStyle={styles.screenBody}>
      <View style={styles.authShell}>
        <Card style={styles.authCard}>
          <Text style={styles.eyebrow}>{mode === 'login' ? 'Welcome back' : 'Create account'}</Text>
          <Text style={styles.h1}>{mode === 'login' ? 'Continue your AWS prep' : 'Start learning with AceCloudCert'}</Text>
          <Text style={styles.muted}>Mock exams, topic quizzes, study material, certificates, and local progress tracking in one app.</Text>

          {mode === 'signup' && (
            <TextInput style={styles.input} value={fullName} onChangeText={setFullName} placeholder="Full name" placeholderTextColor={colors.muted} />
          )}
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Email"
            placeholderTextColor={colors.muted}
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor={colors.muted}
          />
          {mode === 'signup' && (
            <TextInput
              style={styles.input}
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry
              placeholder="Confirm password"
              placeholderTextColor={colors.muted}
            />
          )}

          {mode === 'signup' && (
            <View style={styles.consentRow}>
              <Switch value={accepted} onValueChange={setAccepted} trackColor={{ true: colors.orange, false: colors.border }} thumbColor={colors.text} />
              <Pressable style={styles.consentCopy} onPress={() => setAccepted(!accepted)}>
                <Text style={styles.smallText}>I accept the Terms and Privacy Policy.</Text>
              </Pressable>
            </View>
          )}

          {!!error && <Text style={styles.errorText}>{error}</Text>}
          <AppButton label={mode === 'login' ? 'Login' : 'Create account'} onPress={submit} />
          <AppButton label={mode === 'login' ? 'Forgot password' : 'View terms'} variant="ghost" onPress={() => setLegal(mode === 'login' ? 'data' : 'terms')} />
          <AppButton
            label={mode === 'login' ? 'Need an account? Sign up' : 'Already have an account? Login'}
            variant="secondary"
            onPress={() => setMode(mode === 'login' ? 'signup' : 'login')}
          />
        </Card>
      </View>
    </ScrollView>
  );
}

function Dashboard({ user, attempts, certificates, setScreen, startTest }) {
  const latest = attempts[0];
  const average = attempts.length ? attempts.reduce((sum, item) => sum + item.score, 0) / attempts.length : 0;
  return (
    <ScrollView contentContainerStyle={styles.screenBody}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>AWS Certified Cloud Practitioner</Text>
        <Text style={styles.h1}>Welcome, {user?.name || 'learner'}</Text>
        <Text style={styles.heroCopy}>Build exam confidence with realistic AWS questions, focused study notes, score history, and certificate records.</Text>
        <View style={styles.heroButtons}>
          <AppButton label="Start mock test" onPress={() => startTest('mock')} />
          <AppButton label="Continue learning" variant="secondary" onPress={() => setScreen('learn')} />
        </View>
      </View>

      <View style={styles.statsGrid}>
        <Stat title="Recent score" value={latest ? `${latest.score}%` : 'Not taken'} />
        <Stat title="Tests completed" value={attempts.length} />
        <Stat title="Average score" value={attempts.length ? `${Math.round(average)}%` : '0%'} />
        <Stat title="Study streak" value="5 days" />
      </View>

      <Text style={styles.sectionTitle}>Quick actions</Text>
      <View style={styles.actionGrid}>
        <Action title="Start mock test" body="Timed AWS CCP practice exam" onPress={() => startTest('mock')} />
        <Action title="Topic quiz" body="Focus by AWS domain" onPress={() => setScreen('tests')} />
        <Action title="Knowledge base" body="Study notes and examples" onPress={() => setScreen('learn')} />
        <Action title="Certificates" body={`${certificates.length} earned certificates`} onPress={() => setScreen('certificates')} />
        <Action title="Upgrade plan" body="Unlock full prep access" onPress={() => setScreen('pricing')} />
      </View>

      <Text style={styles.sectionTitle}>Certification catalogue</Text>
      <Catalogue setScreen={setScreen} startTest={startTest} />
    </ScrollView>
  );
}

function Stat({ title, value }) {
  return (
    <Card style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.muted}>{title}</Text>
    </Card>
  );
}

function Action({ title, body, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.actionCard, pressed && styles.pressed]}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.muted}>{body}</Text>
    </Pressable>
  );
}

function Catalogue({ startTest }) {
  return (
    <View style={styles.catalogueGrid}>
      {certifications.map((cert) => (
        <Card key={cert.id} style={styles.certCard}>
          <View style={styles.rowBetween}>
            <Text style={styles.badge}>{cert.provider}</Text>
            <Text style={[styles.status, cert.status !== 'active' && styles.statusMuted]}>{cert.status}</Text>
          </View>
          <Text style={styles.cardTitle}>{cert.title}</Text>
          <Text style={styles.muted}>{cert.difficulty} level</Text>
          <Text style={styles.smallText}>{cert.questions || 'Structured content planned'} questions</Text>
          <ProgressBar value={cert.progress} />
          <AppButton
            label={cert.status === 'active' ? 'Start / Continue' : 'Coming soon'}
            variant={cert.status === 'active' ? 'primary' : 'secondary'}
            disabled={cert.status !== 'active'}
            onPress={() => startTest('mock')}
          />
        </Card>
      ))}
    </View>
  );
}

function TestsScreen({ startTest }) {
  const domains = [...new Set(questions.map((q) => q.domain))];
  return (
    <ScrollView contentContainerStyle={styles.screenBody}>
      <Text style={styles.eyebrow}>Practice center</Text>
      <Text style={styles.h1}>Mock exams and topic quizzes</Text>
      <Text style={styles.muted}>Every test uses local structured question data and saves score history in this session.</Text>

      <View style={styles.actionGrid}>
        <Action title="Full mock test" body={`${questions.length} questions with pass mark at 70%`} onPress={() => startTest('mock')} />
        <Action title="Quick quiz" body="Five high-signal questions" onPress={() => startTest('quick')} />
      </View>

      <Text style={styles.sectionTitle}>Topic-wise quiz</Text>
      <View style={styles.topicGrid}>
        {domains.map((domain) => (
          <Pressable key={domain} style={({ pressed }) => [styles.topicCard, pressed && styles.pressed]} onPress={() => startTest('topic', domain)}>
            <Text style={styles.cardTitle}>{domain}</Text>
            <Text style={styles.muted}>{questions.filter((q) => q.domain === domain).length} question set</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

function TestRunner({ test, setTest, finishTest }) {
  const current = test.questions[test.index];
  const selected = test.answers[current.id];
  const marked = test.marked[current.id];

  const choose = (option) => setTest({ ...test, answers: { ...test.answers, [current.id]: option } });
  const move = (delta) => setTest({ ...test, index: Math.max(0, Math.min(test.questions.length - 1, test.index + delta)) });
  const toggleMark = () => setTest({ ...test, marked: { ...test.marked, [current.id]: !marked } });

  return (
    <ScrollView contentContainerStyle={styles.screenBody}>
      <View style={styles.rowBetween}>
        <View>
          <Text style={styles.eyebrow}>{test.title}</Text>
          <Text style={styles.h1}>Question {test.index + 1} of {test.questions.length}</Text>
        </View>
        <Text style={styles.timer}>25:00</Text>
      </View>
      <ProgressBar value={((test.index + 1) / test.questions.length) * 100} />
      <Card>
        <View style={styles.rowBetween}>
          <Text style={styles.badge}>{current.domain}</Text>
          <Text style={styles.smallText}>{current.difficulty}</Text>
        </View>
        <Text style={styles.questionText}>{current.question}</Text>
        {current.options.map((option) => (
          <Pressable
            key={option}
            onPress={() => choose(option)}
            style={({ pressed }) => [styles.option, selected === option && styles.optionSelected, pressed && styles.pressed]}
          >
            <Text style={styles.optionText}>{option}</Text>
          </Pressable>
        ))}
      </Card>
      <View style={styles.heroButtons}>
        <AppButton label={marked ? 'Marked for review' : 'Mark for review'} variant="secondary" onPress={toggleMark} />
        <AppButton label="Previous" variant="secondary" onPress={() => move(-1)} disabled={test.index === 0} />
        {test.index === test.questions.length - 1 ? (
          <AppButton label="Submit test" onPress={() => finishTest(test)} />
        ) : (
          <AppButton label="Next" onPress={() => move(1)} />
        )}
      </View>
    </ScrollView>
  );
}

function ResultScreen({ result, setScreen, startTest, generateCertificate }) {
  if (!result) {
    return (
      <ScrollView contentContainerStyle={styles.screenBody}>
        <Text style={styles.h1}>No result yet</Text>
        <AppButton label="Start a mock test" onPress={() => startTest('mock')} />
      </ScrollView>
    );
  }
  return (
    <ScrollView contentContainerStyle={styles.screenBody}>
      <Text style={styles.eyebrow}>Test result</Text>
      <Text style={styles.h1}>{result.passed ? 'Passed' : 'Keep practising'} with {result.score}%</Text>
      <View style={styles.statsGrid}>
        <Stat title="Correct" value={result.correct} />
        <Stat title="Incorrect" value={result.total - result.correct} />
        <Stat title="Pass mark" value="70%" />
        <Stat title="Time taken" value="18m" />
      </View>
      <Text style={styles.sectionTitle}>Domain breakdown</Text>
      {Object.entries(result.domainBreakdown).map(([domain, item]) => (
        <Card key={domain} style={styles.breakdownRow}>
          <View style={styles.rowBetween}>
            <Text style={styles.cardTitle}>{domain}</Text>
            <Text style={styles.smallText}>{item.correct}/{item.total}</Text>
          </View>
          <ProgressBar value={(item.correct / item.total) * 100} />
        </Card>
      ))}
      <Text style={styles.sectionTitle}>Review answers</Text>
      {result.questions.map((q, index) => {
        const answer = result.answers[q.id];
        const correct = answer === q.correctAnswer;
        return (
          <Card key={q.id}>
            <Text style={styles.smallText}>Q{index + 1} - {q.domain}</Text>
            <Text style={styles.cardTitle}>{q.question}</Text>
            <Text style={correct ? styles.correctText : styles.errorText}>Your answer: {answer || 'Not answered'}</Text>
            <Text style={styles.smallText}>Correct answer: {q.correctAnswer}</Text>
            <Text style={styles.muted}>{q.explanation}</Text>
          </Card>
        );
      })}
      <View style={styles.heroButtons}>
        <AppButton label="Retry test" variant="secondary" onPress={() => startTest('mock')} />
        <AppButton label="Back to tests" variant="secondary" onPress={() => setScreen('tests')} />
        <AppButton label="Generate certificate" disabled={!result.passed} onPress={() => generateCertificate(result)} />
      </View>
    </ScrollView>
  );
}

function LearnScreen({ startTest }) {
  const [active, setActive] = useState(topics[0]);
  return (
    <ScrollView contentContainerStyle={styles.screenBody}>
      <Text style={styles.eyebrow}>Knowledge base</Text>
      <Text style={styles.h1}>AWS CCP study material</Text>
      <Text style={styles.muted}>Clear notes, practical examples, and direct quiz actions for each exam domain.</Text>
      <View style={styles.learnLayout}>
        <View style={styles.topicList}>
          {topics.map((topic) => (
            <Pressable key={topic.title} onPress={() => setActive(topic)} style={[styles.topicPill, active.title === topic.title && styles.topicPillActive]}>
              <Text style={styles.smallText}>{topic.title}</Text>
            </Pressable>
          ))}
        </View>
        <Card style={styles.topicDetail}>
          <Text style={styles.badge}>{active.domain}</Text>
          <Text style={styles.h2}>{active.title}</Text>
          <Text style={styles.muted}>{active.body}</Text>
          {active.bullets.map((bullet) => (
            <Text key={bullet} style={styles.bullet}>- {bullet}</Text>
          ))}
          <AppButton label="Take related quiz" onPress={() => startTest('topic', active.domain)} />
        </Card>
      </View>
    </ScrollView>
  );
}

function CertificatesScreen({ certificates, user, latestResult, generateCertificate }) {
  return (
    <ScrollView contentContainerStyle={styles.screenBody}>
      <Text style={styles.eyebrow}>Certificates</Text>
      <Text style={styles.h1}>Achievement records</Text>
      <Text style={styles.muted}>Passed mock exams generate a certificate record and a branded preview. PDF export can be connected next.</Text>
      {latestResult?.passed && (
        <AppButton label="Generate latest certificate" onPress={() => generateCertificate(latestResult)} />
      )}
      {certificates.length === 0 ? (
        <Card>
          <Text style={styles.cardTitle}>No certificates yet</Text>
          <Text style={styles.muted}>Pass the AWS Cloud Practitioner mock exam to create your first AceCloudCert certificate.</Text>
        </Card>
      ) : (
        certificates.map((cert) => (
          <Card key={cert.id} style={styles.certificatePreview}>
            <Text style={styles.badge}>AceCloudCert</Text>
            <Text style={styles.h2}>Certificate of Completion</Text>
            <Text style={styles.muted}>Presented to</Text>
            <Text style={styles.certificateName}>{user?.name || cert.userName}</Text>
            <Text style={styles.muted}>{cert.certification}</Text>
            <Text style={styles.cardTitle}>Score: {cert.score}%</Text>
            <Text style={styles.smallText}>Date: {cert.date} - Certificate ID: {cert.id}</Text>
            <View style={styles.heroButtons}>
              <AppButton label="Download" variant="secondary" onPress={() => {}} />
              <AppButton label="Share" variant="secondary" onPress={() => {}} />
            </View>
          </Card>
        ))
      )}
    </ScrollView>
  );
}

function ProfileScreen({ user, attempts, certificates, setUser, setScreen }) {
  const avg = attempts.length ? Math.round(attempts.reduce((sum, attempt) => sum + attempt.score, 0) / attempts.length) : 0;
  return (
    <ScrollView contentContainerStyle={styles.screenBody}>
      <Text style={styles.eyebrow}>Profile</Text>
      <Text style={styles.h1}>{user?.name || 'Guest learner'}</Text>
      <Text style={styles.muted}>{user?.email || 'Not signed in'}</Text>
      <View style={styles.statsGrid}>
        <Stat title="Current plan" value={user?.plan || 'Free'} />
        <Stat title="Tests completed" value={attempts.length} />
        <Stat title="Average score" value={`${avg}%`} />
        <Stat title="Certificates" value={certificates.length} />
      </View>
      <Text style={styles.sectionTitle}>Test history</Text>
      {attempts.length === 0 ? (
        <Card><Text style={styles.muted}>No attempts yet.</Text></Card>
      ) : (
        attempts.map((attempt) => (
          <Card key={attempt.id}>
            <View style={styles.rowBetween}>
              <Text style={styles.cardTitle}>{attempt.title}</Text>
              <Text style={attempt.passed ? styles.correctText : styles.errorText}>{attempt.score}%</Text>
            </View>
            <Text style={styles.smallText}>{attempt.date}</Text>
          </Card>
        ))
      )}
      <Text style={styles.sectionTitle}>Settings</Text>
      <View style={styles.actionGrid}>
        <Action title="Subscription status" body={user?.plan || 'Free'} onPress={() => setScreen('pricing')} />
        <Action title="Privacy Policy" body="How data is handled" onPress={() => setScreen('privacy')} />
        <Action title="Terms and Conditions" body="Study app terms" onPress={() => setScreen('terms')} />
        <Action title="Cookie Policy" body="Local storage notice" onPress={() => setScreen('cookies')} />
      </View>
      <AppButton label="Logout" variant="secondary" onPress={() => setUser(null)} />
    </ScrollView>
  );
}

function PricingScreen({ user, setUser }) {
  return (
    <ScrollView contentContainerStyle={styles.screenBody}>
      <Text style={styles.eyebrow}>Plans</Text>
      <Text style={styles.h1}>Subscription options</Text>
      <Text style={styles.muted}>Stripe-ready mock upgrade flow for Free, Silver, and Gold plans.</Text>
      <View style={styles.catalogueGrid}>
        {plans.map((plan) => (
          <Card key={plan.name} style={styles.planCard}>
            <Text style={styles.h2}>{plan.name}</Text>
            <Text style={styles.price}>{plan.price}</Text>
            {plan.features.map((feature) => (
              <Text key={feature} style={styles.bullet}>- {feature}</Text>
            ))}
            <AppButton label={user?.plan === plan.name ? 'Current plan' : `Upgrade to ${plan.name}`} onPress={() => setUser({ ...(user || {}), plan: plan.name })} />
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

function LegalScreen({ type }) {
  const titleMap = {
    privacy: 'Privacy Policy',
    terms: 'Terms and Conditions',
    cookies: 'Cookie Policy',
    data: 'Data Handling Notice',
  };
  return (
    <ScrollView contentContainerStyle={styles.screenBody}>
      <Text style={styles.eyebrow}>Legal and GDPR</Text>
      <Text style={styles.h1}>{titleMap[type]}</Text>
      <Card>
        <Text style={styles.muted}>{legalPages[type]}</Text>
        <Text style={styles.bullet}>- Account data will be Firebase-ready.</Text>
        <Text style={styles.bullet}>- Payment data will be handled by Stripe when subscriptions are connected.</Text>
        <Text style={styles.bullet}>- Learning history and certificates are kept separate from official vendor credentials.</Text>
      </Card>
    </ScrollView>
  );
}

function CookieBanner({ accepted, setAccepted, setScreen }) {
  if (accepted) return null;
  return (
    <View style={styles.cookieBanner}>
      <Text style={styles.smallText}>AceCloudCert uses local storage for consent, session, progress, and mock exam history.</Text>
      <View style={styles.cookieButtons}>
        <AppButton label="Policy" variant="ghost" onPress={() => setScreen('cookies')} />
        <AppButton label="Accept" onPress={() => setAccepted(true)} />
      </View>
    </View>
  );
}

export default function App() {
  const [screen, setScreen] = useState('home');
  const [user, setUser] = useState({ name: 'Siddharth Mathur', email: 'learner@acecloudcert.com', plan: 'Free' });
  const [acceptedCookies, setAcceptedCookies] = useState(false);
  const [test, setTest] = useState(null);
  const [latestResult, setLatestResult] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [certificates, setCertificates] = useState([]);

  const navItems = useMemo(
    () => [
      ['home', 'Home'],
      ['learn', 'Learn'],
      ['tests', 'Tests'],
      ['certificates', 'Certificates'],
      ['profile', 'Profile'],
    ],
    []
  );

  const startTest = (type, domain) => {
    const pool = domain ? questions.filter((q) => q.domain === domain) : questions;
    const testQuestions = type === 'quick' ? pool.slice(0, 5) : pool;
    setTest({
      title: domain ? `${domain} quiz` : type === 'quick' ? 'Quick quiz' : 'AWS CCP mock test',
      type,
      domain,
      questions: testQuestions,
      index: 0,
      answers: {},
      marked: {},
      startedAt: Date.now(),
    });
    setScreen('runner');
  };

  const finishTest = (session) => {
    const correct = session.questions.filter((q) => session.answers[q.id] === q.correctAnswer).length;
    const score = Math.round((correct / session.questions.length) * 100);
    const domainBreakdown = session.questions.reduce((acc, q) => {
      if (!acc[q.domain]) acc[q.domain] = { correct: 0, total: 0 };
      acc[q.domain].total += 1;
      if (session.answers[q.id] === q.correctAnswer) acc[q.domain].correct += 1;
      return acc;
    }, {});
    const result = {
      id: `attempt-${Date.now()}`,
      title: session.title,
      score,
      correct,
      total: session.questions.length,
      passed: score >= 70,
      date: new Date().toLocaleDateString(),
      questions: session.questions,
      answers: session.answers,
      domainBreakdown,
    };
    setLatestResult(result);
    setAttempts([result, ...attempts]);
    setTest(null);
    setScreen('result');
  };

  const generateCertificate = (result) => {
    if (!result?.passed) return;
    const cert = {
      id: `ACC-${Date.now().toString().slice(-8)}`,
      userName: user?.name || 'AceCloudCert Learner',
      certification: 'AWS Certified Cloud Practitioner',
      score: result.score,
      date: new Date().toLocaleDateString(),
    };
    setCertificates([cert, ...certificates]);
    setScreen('certificates');
  };

  let content;
  if (!user && screen !== 'auth' && !['privacy', 'terms', 'cookies', 'data'].includes(screen)) {
    content = <AuthScreen onLogin={setUser} setLegal={setScreen} />;
  } else if (screen === 'auth') {
    content = <AuthScreen onLogin={(nextUser) => { setUser(nextUser); setScreen('home'); }} setLegal={setScreen} />;
  } else if (screen === 'learn') {
    content = <LearnScreen startTest={startTest} />;
  } else if (screen === 'tests') {
    content = <TestsScreen startTest={startTest} />;
  } else if (screen === 'runner' && test) {
    content = <TestRunner test={test} setTest={setTest} finishTest={finishTest} />;
  } else if (screen === 'result') {
    content = <ResultScreen result={latestResult} setScreen={setScreen} startTest={startTest} generateCertificate={generateCertificate} />;
  } else if (screen === 'certificates') {
    content = <CertificatesScreen certificates={certificates} user={user} latestResult={latestResult} generateCertificate={generateCertificate} />;
  } else if (screen === 'profile') {
    content = <ProfileScreen user={user} attempts={attempts} certificates={certificates} setUser={setUser} setScreen={setScreen} />;
  } else if (screen === 'pricing') {
    content = <PricingScreen user={user} setUser={setUser} />;
  } else if (['privacy', 'terms', 'cookies', 'data'].includes(screen)) {
    content = <LegalScreen type={screen} />;
  } else {
    content = <Dashboard user={user} attempts={attempts} certificates={certificates} setScreen={setScreen} startTest={startTest} />;
  }

  return (
    <SafeAreaView style={styles.app}>
      <StatusBar style="light" />
      <LogoHeader user={user} setScreen={setScreen} />
      <View style={styles.content}>{content}</View>
      {screen !== 'runner' && (
        <View style={styles.tabBar}>
          {navItems.map(([key, label]) => (
            <Pressable key={key} onPress={() => setScreen(key)} style={[styles.tabItem, screen === key && styles.tabItemActive]}>
              <Text style={[styles.tabText, screen === key && styles.tabTextActive]}>{label}</Text>
            </Pressable>
          ))}
        </View>
      )}
      <CookieBanner accepted={acceptedCookies} setAccepted={setAcceptedCookies} setScreen={setScreen} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    minHeight: Platform.OS === 'web' ? '100vh' : undefined,
    backgroundColor: colors.bg,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.panel,
    gap: 12,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minWidth: 0,
  },
  logo: {
    width: 42,
    height: 42,
    borderRadius: 10,
  },
  brand: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 20,
  },
  brandSub: {
    color: colors.muted,
    fontSize: 12,
  },
  headerActions: {
    minWidth: 92,
  },
  content: {
    flex: 1,
  },
  screenBody: {
    width: '100%',
    maxWidth: 1160,
    alignSelf: 'center',
    padding: 20,
    paddingBottom: 126,
    gap: 16,
  },
  hero: {
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderWidth: 1,
    padding: 24,
    borderRadius: 8,
    gap: 12,
  },
  h1: {
    color: colors.text,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '900',
  },
  h2: {
    color: colors.text,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '800',
  },
  eyebrow: {
    color: colors.orange,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  heroCopy: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 720,
  },
  muted: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
  },
  smallText: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 19,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
    marginTop: 8,
  },
  heroButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    alignItems: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 10,
  },
  statCard: {
    flexGrow: 1,
    flexBasis: 180,
  },
  statValue: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    flexGrow: 1,
    flexBasis: 210,
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    gap: 8,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22,
  },
  catalogueGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  certCard: {
    flexGrow: 1,
    flexBasis: 250,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  badge: {
    color: colors.bg,
    backgroundColor: colors.orange,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    fontSize: 12,
    fontWeight: '900',
    overflow: 'hidden',
  },
  status: {
    color: colors.green,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  statusMuted: {
    color: colors.muted,
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.orange,
    borderRadius: 8,
  },
  button: {
    minHeight: 44,
    borderRadius: 8,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.orange,
  },
  buttonSecondary: {
    backgroundColor: colors.cardSoft,
    borderColor: colors.border,
  },
  buttonGhost: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  buttonText: {
    color: colors.bg,
    fontWeight: '900',
    fontSize: 14,
  },
  buttonTextSecondary: {
    color: colors.text,
  },
  pressed: {
    opacity: 0.78,
  },
  tabBar: {
    position: Platform.OS === 'web' ? 'fixed' : 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.panel,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  tabItem: {
    minWidth: 92,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabItemActive: {
    backgroundColor: colors.orange,
  },
  tabText: {
    color: colors.muted,
    fontWeight: '800',
  },
  tabTextActive: {
    color: colors.bg,
  },
  authShell: {
    minHeight: 560,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authCard: {
    width: '100%',
    maxWidth: 520,
  },
  input: {
    minHeight: 48,
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    color: colors.text,
    paddingHorizontal: 14,
    fontSize: 15,
  },
  consentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  consentCopy: {
    flex: 1,
  },
  errorText: {
    color: colors.red,
    fontSize: 14,
    lineHeight: 20,
  },
  correctText: {
    color: colors.green,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '800',
  },
  topicGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  topicCard: {
    flexGrow: 1,
    flexBasis: 220,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    gap: 8,
  },
  timer: {
    color: colors.orange,
    fontSize: 20,
    fontWeight: '900',
  },
  questionText: {
    color: colors.text,
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '800',
  },
  option: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panel,
    borderRadius: 8,
    padding: 14,
  },
  optionSelected: {
    borderColor: colors.orange,
    backgroundColor: '#2A1A05',
  },
  optionText: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
  },
  breakdownRow: {
    gap: 12,
  },
  learnLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  topicList: {
    flexGrow: 1,
    flexBasis: 260,
    gap: 8,
  },
  topicPill: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
  },
  topicPillActive: {
    borderColor: colors.orange,
    backgroundColor: colors.cardSoft,
  },
  topicDetail: {
    flexGrow: 3,
    flexBasis: 430,
  },
  bullet: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 22,
  },
  certificatePreview: {
    borderColor: colors.orange,
    backgroundColor: '#0E121A',
    alignItems: 'flex-start',
  },
  certificateName: {
    color: colors.orangeSoft,
    fontSize: 28,
    fontWeight: '900',
  },
  planCard: {
    flexGrow: 1,
    flexBasis: 270,
  },
  price: {
    color: colors.orange,
    fontSize: 24,
    fontWeight: '900',
  },
  cookieBanner: {
    position: Platform.OS === 'web' ? 'fixed' : 'absolute',
    left: 16,
    right: 16,
    bottom: 78,
    maxWidth: 920,
    alignSelf: 'center',
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  cookieButtons: {
    flexDirection: 'row',
    gap: 8,
  },
});
