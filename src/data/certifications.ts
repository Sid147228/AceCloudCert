import type { Certification } from '@/types';

export const certifications: readonly Certification[] = [
  {
    id: 'aws-ccp',
    provider: 'AWS',
    title: 'AWS Certified Cloud Practitioner',
    difficulty: 'Foundational',
    questionCount: 12,
    progress: 64,
    status: 'active'
  },
  {
    id: 'aws-saa',
    provider: 'AWS',
    title: 'AWS Solutions Architect Associate',
    difficulty: 'Associate',
    questionCount: 0,
    progress: 0,
    status: 'planned'
  },
  {
    id: 'az-900',
    provider: 'Microsoft Azure',
    title: 'Azure Fundamentals',
    difficulty: 'Foundational',
    questionCount: 0,
    progress: 0,
    status: 'planned'
  },
  {
    id: 'gcp-cdl',
    provider: 'Google Cloud',
    title: 'Google Cloud Digital Leader',
    difficulty: 'Foundational',
    questionCount: 0,
    progress: 0,
    status: 'planned'
  }
];
