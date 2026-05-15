import { LOCAL_MOCK_ADMIN_EMAIL } from '@/constants/admin';
import { knowledgeTopics } from '@/data';
import type {
  AdminAnalyticsRow,
  AdminCertificationRow,
  AdminKnowledgeTopicRow,
  AdminQuestionRow,
  AdminSnapshot,
  AdminUserRow
} from '@/features/admin';
import type { AdminService } from './contracts';
import { contentService } from './contentService';
import type { Certification, Question } from '@/types';

function buildCertificationRows(
  certifications: readonly Certification[],
  questionBank: readonly Question[]
): readonly AdminCertificationRow[] {
  return certifications.map((certification) => {
    const certificationQuestions = questionBank.filter((question) => question.certificationId === certification.id);
    const certificationTopics = knowledgeTopics.filter((topic) => topic.certificationId === certification.id);

    return {
      domainCount: certification.domains.length,
      examCode: certification.examCode,
      id: certification.id,
      name: certification.name,
      planRequirement: certification.planRequirement,
      provider: certification.provider,
      questionCount: certificationQuestions.length,
      status: certification.status,
      topicCount: certificationTopics.length
    };
  });
}

function buildQuestionRows(questionBank: readonly Question[]): readonly AdminQuestionRow[] {
  return questionBank.map((question) => ({
    certificationId: question.certificationId,
    difficulty: question.difficulty,
    domain: question.domain,
    id: question.id,
    isPremium: question.isPremium,
    optionCount: question.options.length,
    reference: question.reference,
    subDomain: question.subDomain
  }));
}

function buildKnowledgeTopicRows(): readonly AdminKnowledgeTopicRow[] {
  return knowledgeTopics.map((topic) => ({
    category: topic.category,
    certificationId: topic.certificationId,
    estimatedReadingMinutes: topic.estimatedReadingMinutes,
    id: topic.id,
    relatedQuestionCount: topic.relatedQuestionIds.length,
    title: topic.title
  }));
}

function buildUserRows(): readonly AdminUserRow[] {
  return [
    {
      email: 'learner@acecloudcert.com',
      fullName: 'AceCloudCert Learner',
      id: 'local-demo-user',
      lastActiveLabel: 'Local demo account',
      plan: 'Free',
      role: 'learner',
      status: 'mock'
    },
    {
      email: LOCAL_MOCK_ADMIN_EMAIL,
      fullName: 'AceCloudCert Admin',
      id: 'local-admin-user',
      lastActiveLabel: 'Created only when local mock admin mode is enabled',
      plan: 'Gold',
      role: 'admin',
      status: 'backend pending'
    }
  ];
}

function buildAnalyticsRows(): readonly AdminAnalyticsRow[] {
  return [
    {
      description: 'Local attempt history already stores score, pass/fail, time taken, and domain breakdowns per user.',
      id: 'attempt-events',
      name: 'Attempt event stream',
      status: 'local ready'
    },
    {
      description: 'Dashboard analytics calculate average score, pass rate, weak areas, score trend, and study streak from local attempts.',
      id: 'learner-analytics',
      name: 'Learner analytics',
      status: 'local ready'
    },
    {
      description: 'Cross-user reporting should query Firestore attempt summaries with admin-only security rules and aggregate indexes.',
      id: 'cohort-reporting',
      name: 'Cohort reporting',
      status: 'backend pending'
    },
    {
      description: 'Content performance should connect question IDs, domains, and incorrect answer rates once backend event collection is enabled.',
      id: 'content-performance',
      name: 'Question performance',
      status: 'backend pending'
    }
  ];
}

async function buildSnapshot(): Promise<AdminSnapshot> {
  const [certifications, questions] = await Promise.all([
    contentService.listCertifications(),
    contentService.listQuestions()
  ]);
  const certificationRows = buildCertificationRows(certifications, questions);
  const questionRows = buildQuestionRows(questions);
  const knowledgeTopicRows = buildKnowledgeTopicRows();
  const premiumQuestions = questionRows.filter((question) => question.isPremium).length;
  const activeCertifications = certificationRows.filter((certification) => certification.status === 'active').length;

  return {
    analyticsRows: buildAnalyticsRows(),
    certificationRows,
    knowledgeTopicRows,
    metrics: [
      { label: 'Certifications', value: certificationRows.length },
      { label: 'Active tracks', value: activeCertifications },
      { label: 'Questions', value: questionRows.length },
      { label: 'Premium questions', value: premiumQuestions },
      { label: 'Knowledge topics', value: knowledgeTopicRows.length },
      { label: 'Admin routes', value: 6 }
    ],
    questionRows,
    userRows: buildUserRows()
  };
}

export const adminService: AdminService = {
  async getDashboardSnapshot() {
    return buildSnapshot();
  }
};
