import type { LegalPage } from '@/types';

export const legalPages: readonly LegalPage[] = [
  {
    id: 'privacy',
    title: 'Privacy Policy',
    summary: 'Defines how AceCloudCert handles profile, progress, attempt, and certificate records.'
  },
  {
    id: 'terms',
    title: 'Terms and Conditions',
    summary: 'Clarifies that AceCloudCert practice certificates are study achievements, not official vendor credentials.'
  },
  {
    id: 'cookies',
    title: 'Cookie Policy',
    summary: 'Explains local browser storage for consent, sessions, progress, and exam history.'
  },
  {
    id: 'data-handling',
    title: 'Data Handling Notice',
    summary: 'Documents the future export, correction, and deletion workflows for learner data.'
  }
];
