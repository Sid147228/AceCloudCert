import type { Certification } from '@/types';

export const certifications: readonly Certification[] = [
  {
    id: 'aws-ccp',
    provider: 'AWS',
    name: 'AWS Certified Cloud Practitioner',
    level: 'Foundational',
    description:
      'Foundational AWS certification covering cloud value, shared responsibility, core services, billing, security, and support.',
    examCode: 'CLF-C02',
    domains: [
      'Cloud Concepts',
      'Security and Compliance',
      'Cloud Technology and Services',
      'Billing, Pricing, and Support'
    ],
    questionCount: 120,
    estimatedStudyHours: 35,
    difficulty: 'Beginner',
    progress: 64,
    planRequirement: 'Free',
    status: 'active'
  },
  {
    id: 'aws-saa',
    provider: 'AWS',
    name: 'AWS Solutions Architect Associate',
    level: 'Associate',
    description:
      'Architecture-focused AWS certification for designing resilient, secure, performant, and cost-optimized workloads.',
    examCode: 'SAA-C03',
    domains: [
      'Secure Architectures',
      'Resilient Architectures',
      'High-Performing Architectures',
      'Cost-Optimized Architectures'
    ],
    questionCount: 180,
    estimatedStudyHours: 70,
    difficulty: 'Intermediate',
    progress: 0,
    planRequirement: 'Silver',
    status: 'locked'
  },
  {
    id: 'az-900',
    provider: 'Microsoft Azure',
    name: 'Microsoft Azure Fundamentals',
    level: 'Foundational',
    description:
      'Entry-level Azure certification covering cloud concepts, Azure services, governance, pricing, and support.',
    examCode: 'AZ-900',
    domains: [
      'Cloud Concepts',
      'Azure Architecture and Services',
      'Azure Management and Governance',
      'Pricing and Support'
    ],
    questionCount: 110,
    estimatedStudyHours: 30,
    difficulty: 'Beginner',
    progress: 0,
    planRequirement: 'Silver',
    status: 'locked'
  },
  {
    id: 'az-104',
    provider: 'Microsoft Azure',
    name: 'Azure Administrator Associate',
    level: 'Administrator',
    description:
      'Administrator-level Azure certification focused on identity, governance, storage, compute, networking, and monitoring.',
    examCode: 'AZ-104',
    domains: [
      'Identity and Governance',
      'Storage Management',
      'Compute Resources',
      'Virtual Networking',
      'Monitoring and Backup'
    ],
    questionCount: 170,
    estimatedStudyHours: 75,
    difficulty: 'Intermediate',
    progress: 0,
    planRequirement: 'Gold',
    status: 'coming soon'
  },
  {
    id: 'gcp-cdl',
    provider: 'Google Cloud',
    name: 'Google Cloud Digital Leader',
    level: 'Foundational',
    description:
      'Business and technical foundation certification for Google Cloud products, transformation concepts, and data innovation.',
    examCode: 'CDL',
    domains: [
      'Digital Transformation',
      'Infrastructure and Application Modernization',
      'Data and AI Innovation',
      'Security and Operations'
    ],
    questionCount: 105,
    estimatedStudyHours: 32,
    difficulty: 'Beginner',
    progress: 0,
    planRequirement: 'Silver',
    status: 'locked'
  },
  {
    id: 'gcp-ace',
    provider: 'Google Cloud',
    name: 'Google Associate Cloud Engineer',
    level: 'Associate',
    description:
      'Hands-on Google Cloud certification for deploying applications, managing operations, and configuring cloud solutions.',
    examCode: 'ACE',
    domains: [
      'Cloud Solution Environment',
      'Planning and Configuration',
      'Deployment and Implementation',
      'Operations',
      'Security and Access'
    ],
    questionCount: 160,
    estimatedStudyHours: 65,
    difficulty: 'Intermediate',
    progress: 0,
    planRequirement: 'Gold',
    status: 'coming soon'
  },
  {
    id: 'salesforce-admin',
    provider: 'Salesforce',
    name: 'Salesforce Administrator',
    level: 'Administrator',
    description:
      'Salesforce administrator certification covering platform configuration, data management, automation, security, and reporting.',
    examCode: 'ADM-201',
    domains: [
      'Configuration and Setup',
      'Object Manager and Lightning Apps',
      'Sales and Service Applications',
      'Productivity and Collaboration',
      'Data and Analytics',
      'Workflow and Process Automation'
    ],
    questionCount: 150,
    estimatedStudyHours: 55,
    difficulty: 'Intermediate',
    progress: 0,
    planRequirement: 'Gold',
    status: 'coming soon'
  },
  {
    id: 'cisco-ccna',
    provider: 'Cisco',
    name: 'Cisco CCNA',
    level: 'Associate',
    description:
      'Networking certification covering network fundamentals, IP services, security, automation, and access technologies.',
    examCode: '200-301',
    domains: [
      'Network Fundamentals',
      'Network Access',
      'IP Connectivity',
      'IP Services',
      'Security Fundamentals',
      'Automation and Programmability'
    ],
    questionCount: 190,
    estimatedStudyHours: 90,
    difficulty: 'Advanced',
    progress: 0,
    planRequirement: 'Gold',
    status: 'coming soon'
  }
];
