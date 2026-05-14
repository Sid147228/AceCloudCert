import type { LegalPage } from '@/types';

const lastUpdated = '14 May 2026';

export const legalPages: readonly LegalPage[] = [
  {
    id: 'privacy',
    title: 'Privacy Policy',
    summary:
      'Explains what personal data AceCloudCert collects, why it is used, how long it is kept, and the rights available to UK/EU learners.',
    lastUpdated,
    sections: [
      {
        title: 'Who this policy applies to',
        body: [
          'This Privacy Policy applies to learners and visitors who use AceCloudCert to study for cloud certification exams, complete mock tests, track progress, manage certificates, or review subscription plans.',
          'AceCloudCert is currently a local-first learning platform. Account, progress, test, certificate, consent, and subscription preference data is stored in the browser on this device unless and until a hosted backend such as Firebase is connected.'
        ]
      },
      {
        title: 'Personal data we use',
        body: [
          'AceCloudCert uses the minimum learner data needed to operate the product experience.'
        ],
        bullets: [
          'Account details such as name, email address, password hash in the mock local service, and email verification status.',
          'Profile details such as active certification, current plan, joined date, settings, and communication preferences.',
          'Learning records such as answers, scores, time taken, domain performance, marked questions, saved attempts, and study history.',
          'Certificate records such as candidate name, certification name, score, issue date, certificate ID, and verification URL placeholder.',
          'Technical and preference data such as session state, consent preference, and local storage records required to keep the app working.'
        ]
      },
      {
        title: 'Why we use personal data',
        body: [
          'We use personal data to provide the learning service, keep accounts secure, calculate results, generate certificate records, remember preferences, and improve the product.'
        ],
        bullets: [
          'Contract necessity: to create accounts, run mock tests, save progress, and deliver profile and certificate features requested by the learner.',
          'Legitimate interests: to maintain product security, prevent misuse, understand product readiness, and improve learning workflows.',
          'Consent: for optional cookies, optional communications, and any future analytics or marketing tools that are not strictly necessary.',
          'Legal obligation: where future billing, tax, compliance, or security obligations require limited records to be retained.'
        ]
      },
      {
        title: 'Sharing and processors',
        body: [
          'In the current local build, AceCloudCert does not send learner records to a remote database. Future production integrations may use Firebase for authentication/data storage, Stripe for subscriptions, email providers for account messages, hosting providers for web delivery, and analytics tools where consent is required.',
          'When third-party processors are connected, they should be limited to the data needed for their purpose and governed by appropriate processor agreements, security controls, and international transfer safeguards where required.'
        ]
      },
      {
        title: 'Retention',
        body: [
          'Local learner records remain on this device until the learner logs out, clears browser storage, or uses future account deletion/export workflows. Hosted production records should be kept only for as long as needed for learning, account, certificate verification, billing, security, or legal purposes.',
          'Certificate and transaction records may need different retention periods from study attempts because they support verification, audit, billing, and dispute handling.'
        ]
      },
      {
        title: 'Your rights',
        body: [
          'UK/EU data protection law gives individuals rights over personal data. Depending on the circumstances, these include access, rectification, erasure, restriction, objection, portability, and withdrawal of consent.',
          'You may request deletion through the Delete Account Request page. Some records may be retained where law, security, billing, fraud prevention, dispute handling, or certificate verification requires it. You may also complain to the UK Information Commissioner or your local supervisory authority.'
        ]
      }
    ]
  },
  {
    id: 'terms',
    title: 'Terms and Conditions',
    summary:
      'Sets the learner terms for using AceCloudCert, including account responsibilities, subscriptions, study content, and certificate limitations.',
    lastUpdated,
    sections: [
      {
        title: 'Use of AceCloudCert',
        body: [
          'AceCloudCert is a cloud certification preparation platform for mock exams, quizzes, knowledge base content, progress tracking, certificate records, and subscription plan management.',
          'You must provide accurate account information, keep your login details secure, and use the platform only for lawful learning and assessment preparation.'
        ]
      },
      {
        title: 'Study content and exam readiness',
        body: [
          'AceCloudCert content is designed to support preparation and confidence building. It does not guarantee that a learner will pass a third-party certification exam.',
          'Cloud provider exams, services, pricing, and policies change over time. Learners should check official vendor exam guides before booking an exam.'
        ]
      },
      {
        title: 'Practice certificates',
        body: [
          'AceCloudCert certificates are platform achievement records generated after passing eligible mock exams. They are not official credentials from AWS, Microsoft, Google Cloud, Salesforce, Cisco, or any other certification vendor.',
          'You must not present an AceCloudCert certificate as an official vendor certification.'
        ]
      },
      {
        title: 'Subscriptions and locked features',
        body: [
          'The current app includes a mock subscription flow for Free, Silver, and Gold plans. No real payment is processed in this build.',
          'When Stripe or another payment provider is connected, plan prices, renewal terms, cancellation rights, taxes, invoices, and refund terms must be shown before payment is taken.'
        ]
      },
      {
        title: 'Acceptable use',
        body: [
          'You must not attempt to reverse engineer restricted content, abuse local storage, automate unfair access, share another user account, upload malicious content, or interfere with service availability.',
          'AceCloudCert may suspend or restrict accounts in a future hosted service where needed to protect learners, data, content, or platform security.'
        ]
      },
      {
        title: 'Liability and changes',
        body: [
          'AceCloudCert is provided as a learning tool. To the fullest extent permitted by law, the platform is not liable for exam outcomes, employment decisions, vendor changes, or indirect loss arising from reliance on study materials.',
          'Terms may be updated for product, legal, security, or payment changes. Material production changes should be communicated in the app or by email where required.'
        ]
      }
    ]
  },
  {
    id: 'cookies',
    title: 'Cookie Policy',
    summary:
      'Explains essential browser storage, consent preferences, and how optional cookies or analytics should be introduced later.',
    lastUpdated,
    sections: [
      {
        title: 'How AceCloudCert stores preferences',
        body: [
          'AceCloudCert currently uses browser local storage rather than advertising cookies. Local storage keeps the app functional by remembering session state, consent preference, profile data, test attempts, progress, certificates, and subscription preference on this device.',
          'Essential storage is required for login, protected routes, test resume, certificate history, and cookie consent. Without it, the app cannot reliably provide its core learning features.'
        ]
      },
      {
        title: 'Optional cookies',
        body: [
          'Optional analytics, marketing, or tracking cookies are not enabled in this build. If optional cookies are added later, AceCloudCert should ask for consent before setting them, describe their purpose, and provide a way to change or withdraw consent.'
        ]
      },
      {
        title: 'Consent choices',
        body: [
          'The cookie banner lets users accept essential storage and decline optional cookies. Declining optional cookies does not block access to core learning functionality because optional cookies are not required for the service.',
          'You can clear the stored consent preference by clearing browser site data, or update it from this Cookie Policy page.'
        ]
      },
      {
        title: 'Storage categories',
        body: [
          'AceCloudCert separates browser storage into practical categories so future backend integrations can map these records to formal consent and retention controls.'
        ],
        bullets: [
          'Strictly necessary: session, consent state, protected route state, saved test attempt, and account security flows.',
          'Functional preferences: active certification, settings, plan preference, and recently selected study/test filters.',
          'Learning records: answers, score history, domain analytics, certificates, and study progress.',
          'Optional analytics: not active in this build and should require prior consent where required.'
        ]
      }
    ]
  },
  {
    id: 'data-handling',
    title: 'Data Handling Notice',
    summary:
      'Documents the current local storage model and the future Firebase, Stripe, export, correction, and deletion workflow structure.',
    lastUpdated,
    sections: [
      {
        title: 'Current local-first model',
        body: [
          'AceCloudCert currently stores learner records locally in the browser. This allows the app to work without a production database while keeping the service layer ready for Firebase, Firestore, Storage, and Stripe.',
          'Local records are device-specific. Clearing browser storage, using another browser, or using another device may remove or hide local learning history.'
        ]
      },
      {
        title: 'Future hosted data model',
        body: [
          'When a hosted backend is connected, user profiles, attempts, analytics, certificates, plan status, consent records, and deletion/export requests should be stored as structured records with user ownership, audit metadata, and security rules.',
          'Firebase Authentication should hold authentication identity. Firestore should store learner/profile records. Firebase Storage or an equivalent storage service should hold generated certificate assets. Stripe should hold payment and billing records only when real subscriptions are enabled.'
        ]
      },
      {
        title: 'Security controls',
        body: [
          'Production data handling should follow least privilege access, environment-based secrets, authenticated user rules, audit logging, encryption in transit, and provider-managed encryption at rest.',
          'Private keys, Stripe secrets, Firebase service credentials, and webhook secrets must never be hardcoded into client code.'
        ]
      },
      {
        title: 'Export, correction, and deletion',
        body: [
          'AceCloudCert should support clear workflows for learners to request a copy of their data, correct inaccurate profile data, withdraw optional consent, and request account deletion.',
          'Deletion requests should verify identity, record the request, remove or anonymise eligible learning data, cancel or disconnect subscriptions where applicable, and document any records retained for legal, billing, security, or dispute reasons.'
        ]
      },
      {
        title: 'Data minimisation',
        body: [
          'Feature data should be collected only when it supports a learner-visible purpose. For example, test analytics should store enough information to show progress and domain performance, without collecting unrelated device or behavioural data.',
          'Future analytics should use aggregated or pseudonymous data where possible and should be separated from core account records.'
        ]
      }
    ]
  },
  {
    id: 'delete-account',
    title: 'Delete Account Request',
    summary:
      'Provides a structured request flow for future account erasure, identity verification, retained records, and response tracking.',
    lastUpdated,
    sections: [
      {
        title: 'What this request covers',
        body: [
          'A delete account request starts an erasure workflow for the learner account and eligible records linked to that account.'
        ],
        bullets: [
          'Profile data, local session records, settings, and communication preferences.',
          'Learning history, saved test sessions, mock exam attempts, answers, scores, and domain analytics.',
          'Certificate records where deletion is legally and operationally permitted.',
          'Subscription preference in the local app and future links to Stripe subscription management.'
        ]
      },
      {
        title: 'What may be retained',
        body: [
          'The right to erasure is not absolute. Some records may need to be retained where required for legal obligations, billing, fraud prevention, security, dispute handling, certificate verification, or to defend legal claims.',
          'If a future hosted service refuses or limits a deletion request, it should explain the reason and provide information about complaint rights.'
        ]
      },
      {
        title: 'Response workflow',
        body: [
          'In a production backend, submitting this request should create a secure support/compliance record, verify identity, pause optional communications, assess retained records, and respond without undue delay.',
          'The local build records the request on screen only. Backend ticketing, identity checks, email confirmation, and irreversible deletion actions are intentionally left for the Firebase/Firestore implementation phase.'
        ]
      }
    ]
  }
];
