import type { KnowledgeTopic } from '@/types';

export const knowledgeTopics: readonly KnowledgeTopic[] = [
  {
    id: 'cloud-computing',
    title: 'What is cloud computing?',
    domain: 'Cloud concepts',
    summary: 'Flexible access to compute, storage, database, and networking services without buying hardware up front.',
    bullets: ['On-demand self-service', 'Elastic capacity', 'Pay-as-you-go pricing', 'Managed global infrastructure']
  },
  {
    id: 'aws-global-infrastructure',
    title: 'AWS global infrastructure',
    domain: 'AWS global infrastructure',
    summary: 'Regions, Availability Zones, and edge locations help applications stay resilient and close to users.',
    bullets: ['Regions are geographic areas', 'Availability Zones isolate failure', 'Edge locations speed delivery']
  },
  {
    id: 'iam-basics',
    title: 'IAM basics',
    domain: 'Security and compliance',
    summary: 'Identity and Access Management controls who can access AWS resources and what actions they can perform.',
    bullets: ['Use least privilege', 'Prefer roles for applications', 'Enable MFA for sensitive users']
  },
  {
    id: 'pricing-billing',
    title: 'AWS pricing and billing',
    domain: 'Billing and pricing',
    summary: 'AWS pricing varies by usage, Region, purchase option, data transfer, and storage class.',
    bullets: ['Use Pricing Calculator', 'Set Budgets alerts', 'Review Cost Explorer', 'Tag resources for allocation']
  }
];
