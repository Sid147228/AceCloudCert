import Head from 'next/head';

const providers = [
  {
    name: 'AWS',
    path: 'Cloud Practitioner, Solutions Architect, Developer',
    status: 'Active track',
    accent: 'amber'
  },
  {
    name: 'Microsoft Azure',
    path: 'Fundamentals, Administrator, Architect',
    status: 'Coming next',
    accent: 'cyan'
  },
  {
    name: 'Google Cloud',
    path: 'Digital Leader, Associate Cloud Engineer',
    status: 'Planned',
    accent: 'green'
  },
  {
    name: 'Salesforce',
    path: 'Administrator, Platform App Builder',
    status: 'Planned',
    accent: 'rose'
  },
  {
    name: 'Cisco',
    path: 'CCNA, CyberOps, Cloud networking foundations',
    status: 'Roadmap',
    accent: 'cyan'
  },
  {
    name: 'Kubernetes',
    path: 'KCNA, CKA readiness and cluster basics',
    status: 'Roadmap',
    accent: 'green'
  }
];

const features = [
  {
    title: 'Personal readiness dashboard',
    copy:
      'Turn every study session into a clear next step with score trends, weak domains, streaks, and exam readiness signals.'
  },
  {
    title: 'Domain-level analytics',
    copy:
      'See exactly where confidence is growing and where revision time should move next across cloud concepts, billing, security, and architecture.'
  },
  {
    title: 'Adaptive practice loops',
    copy:
      'Move from lessons to targeted quizzes to full mocks without losing context, so learners practice the right material at the right time.'
  },
  {
    title: 'Team-ready structure',
    copy:
      'Enterprise-friendly foundations for onboarding cohorts, consistent certification paths, progress reviews, and training accountability.'
  },
  {
    title: 'Clear plan entitlements',
    copy:
      'Free, Silver, and Gold access levels make it easy to preview value, unlock deeper practice, and convert serious learners.'
  },
  {
    title: 'Proof after progress',
    copy:
      'Passing attempts can become branded certificate records with candidate details, scores, issue dates, and share-ready messaging.'
  }
];

const mockExamItems = [
  'Timed full mock exams that mirror the pressure of the real certification day.',
  'Quick quizzes for focused revision between work, study blocks, or team training sessions.',
  'Topic-wise practice by domain, difficulty, subdomain, and tagged learning objective.',
  'Review flags, unanswered states, pass-mark guidance, and post-test improvement notes.'
];

const knowledgeCards = [
  {
    title: 'Cloud concepts',
    copy: 'Core service models, global infrastructure, shared responsibility, and resilient architecture basics.'
  },
  {
    title: 'Security and compliance',
    copy: 'Identity, encryption, governance, monitoring, and risk-aware patterns explained in plain language.'
  },
  {
    title: 'Billing and pricing',
    copy: 'Cost controls, support plans, calculators, budgets, and optimization habits that show up in exams.'
  }
];

const certificatePoints = [
  'Candidate name, certification path, score, issue date, and certificate ID.',
  'Premium branded certificate preview for learner milestones and portfolio proof.',
  'LinkedIn-ready copy and export-friendly architecture for the next release.'
];

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    copy: 'Start with core lessons, sample questions, and basic progress tracking.',
    cta: 'Start Free',
    featured: false
  },
  {
    name: 'Silver',
    price: '$12',
    copy: 'Unlock full mock exams, deeper analytics, and structured certification practice.',
    cta: 'See Pricing',
    featured: true
  },
  {
    name: 'Gold',
    price: '$29',
    copy: 'Built for serious learners and teams that need certificates, priority paths, and richer reporting.',
    cta: 'See Pricing',
    featured: false
  }
];

const testimonials = [
  {
    quote:
      'AceCloudCert makes revision feel intentional. I can see weak areas after each attempt and decide what to study next instead of guessing.',
    name: 'Priya S.',
    role: 'AWS foundational learner'
  },
  {
    quote:
      'The flow from knowledge topics into timed practice is exactly what our junior engineers need before they sit a cloud exam.',
    name: 'Marcus L.',
    role: 'Cloud enablement lead'
  },
  {
    quote:
      'The certificate milestone changes the psychology of training. Learners can see proof of progress, not just another quiz score.',
    name: 'Elena R.',
    role: 'Technical training manager'
  }
];

const faqs = [
  {
    question: 'Which certification paths are available first?',
    answer:
      'AWS Cloud Practitioner is the lead path, with AWS Solutions Architect, Azure, Google Cloud, Salesforce, Cisco, and Kubernetes tracks structured for expansion.'
  },
  {
    question: 'Can learners start without paying?',
    answer:
      'Yes. The Free plan is designed for instant exploration with starter content, sample questions, and basic progress visibility.'
  },
  {
    question: 'Are mock exams included?',
    answer:
      'Yes. The landing page previews quick quizzes, topic-wise practice, and full mock exams with timed sessions, review states, and result breakdowns.'
  },
  {
    question: 'Does AceCloudCert support teams?',
    answer:
      'The product foundation is team-friendly, with structured paths, readiness metrics, certificate records, and pricing tiers that can grow into cohort reporting.'
  },
  {
    question: 'Can certificates be shared?',
    answer:
      'Passing attempts can generate certificate records and share-ready messaging. Export and public verification can be connected as the next product step.'
  }
];

const navItems = [
  ['Certifications', '#certifications'],
  ['Mock Exams', '#mock-exams'],
  ['Knowledge Base', '#knowledge-base'],
  ['Pricing', '#pricing'],
  ['FAQ', '#faq']
];

function Stat({ value, label }) {
  return (
    <div className="stat">
      <span>{value}</span>
      <p>{label}</p>
    </div>
  );
}

function SectionHeader({ eyebrow, title, copy }) {
  return (
    <div className="sectionHeader">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{copy}</p>
    </div>
  );
}

function PrimaryLink({ href, children, variant = 'primary' }) {
  return (
    <a className={`button ${variant}`} href={href}>
      {children}
    </a>
  );
}

function AppPreview() {
  return (
    <div className="appPreview" aria-label="AceCloudCert app preview">
      <div className="previewTopbar">
        <div className="previewBrand">
          <img src="/acecloudcert-logo.png" alt="" />
          <div>
            <strong>AceCloudCert</strong>
            <span>Certification readiness workspace</span>
          </div>
        </div>
        <div className="previewStatus">Live readiness</div>
      </div>

      <div className="previewGrid">
        <div className="previewPanel readinessPanel">
          <span className="panelLabel">Readiness score</span>
          <strong className="readinessScore">82%</strong>
          <div className="progressTrack">
            <span style={{ width: '82%' }} />
          </div>
          <p>Strong in cloud concepts. Review billing and compliance before the next mock.</p>
        </div>

        <div className="previewPanel questionPanel">
          <span className="panelLabel">Mock exam question</span>
          <h3>Which service helps forecast monthly cloud spend?</h3>
          <div className="answerRow">AWS Budgets</div>
          <div className="answerRow activeAnswer">AWS Cost Explorer</div>
          <div className="answerRow">AWS CloudTrail</div>
        </div>

        <div className="previewPanel domainsPanel">
          <span className="panelLabel">Domain progress</span>
          <div className="domainRow">
            <span>Security</span>
            <strong>88%</strong>
          </div>
          <div className="miniTrack">
            <span style={{ width: '88%' }} />
          </div>
          <div className="domainRow">
            <span>Billing</span>
            <strong>67%</strong>
          </div>
          <div className="miniTrack">
            <span style={{ width: '67%' }} />
          </div>
          <div className="domainRow">
            <span>Architecture</span>
            <strong>79%</strong>
          </div>
          <div className="miniTrack">
            <span style={{ width: '79%' }} />
          </div>
        </div>

        <div className="previewPanel certificatePanel">
          <span className="panelLabel">Certificate ready</span>
          <div className="certificateMock">
            <img src="/acecloudcert-logo.png" alt="" />
            <strong>AWS Cloud Practitioner</strong>
            <span>Pass verified: 86%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>AceCloudCert | Prepare smarter. Practice better. Certify with confidence.</title>
        <meta
          name="description"
          content="AceCloudCert is a premium cloud certification practice platform for lessons, mock exams, analytics, certificates, and team-ready readiness tracking."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <header className="siteHeader">
          <a className="brand" href="#top" aria-label="AceCloudCert home">
            <img src="/acecloudcert-logo.png" alt="AceCloudCert logo" />
            <span>AceCloudCert</span>
          </a>
          <nav aria-label="Primary navigation">
            {navItems.map(([label, href]) => (
              <a href={href} key={label}>
                {label}
              </a>
            ))}
          </nav>
          <PrimaryLink href="#pricing" variant="nav">
            See Pricing
          </PrimaryLink>
        </header>

        <section className="hero sectionBand" id="top">
          <div className="heroCopyBlock">
            <p className="eyebrow">Cloud certification training for serious learners and teams</p>
            <h1>Prepare smarter. Practice better. Certify with confidence.</h1>
            <p>
              AceCloudCert brings guided study, realistic mock exams, readiness analytics, and certificate milestones into one polished platform for cloud career growth.
            </p>
            <div className="heroActions" aria-label="Hero calls to action">
              <PrimaryLink href="#pricing">Start Free</PrimaryLink>
              <PrimaryLink href="#certifications" variant="secondary">
                View Certifications
              </PrimaryLink>
              <PrimaryLink href="#pricing" variant="ghost">
                See Pricing
              </PrimaryLink>
            </div>
          </div>

          <div className="heroStats" aria-label="Platform highlights">
            <Stat value="65+" label="exam-style questions per full mock" />
            <Stat value="3" label="practice modes for focused revision" />
            <Stat value="6" label="provider paths in the learning roadmap" />
            <Stat value="86%" label="sample passing milestone preview" />
          </div>
        </section>

        <section className="appPreviewSection" id="app-preview">
          <SectionHeader
            eyebrow="App preview"
            title="A command center for certification readiness"
            copy="The product experience is designed for repeated use: quick status checks, focused study, realistic exam pressure, and clear proof when a learner is ready."
          />
          <AppPreview />
        </section>

        <section className="sectionBand" id="certifications">
          <SectionHeader
            eyebrow="Certification providers"
            title="One premium workspace for the cloud credentials learners actually chase"
            copy="Start with AWS and grow into a multi-provider catalog with clear status, plan access, and guided preparation journeys."
          />
          <div className="providerGrid">
            {providers.map((provider) => (
              <article className={`providerCard ${provider.accent}`} key={provider.name}>
                <span>{provider.status}</span>
                <h3>{provider.name}</h3>
                <p>{provider.path}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="sectionBand" id="features">
          <SectionHeader
            eyebrow="Features"
            title="Built to convert casual practice into confident exam readiness"
            copy="Every surface is aimed at reducing uncertainty: what to study, when to test, and whether the learner is ready to book the exam."
          />
          <div className="featureGrid">
            {features.map((feature, index) => (
              <article className="featureCard" key={feature.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{feature.title}</h3>
                <p>{feature.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="sectionBand splitSection" id="mock-exams">
          <div>
            <SectionHeader
              eyebrow="Mock exams"
              title="Practice that feels close to exam day"
              copy="AceCloudCert helps learners move beyond passive reading with timed pressure, review discipline, and clear result analysis after every attempt."
            />
            <div className="checkList">
              {mockExamItems.map((item) => (
                <div className="checkItem" key={item}>
                  <span aria-hidden="true">✓</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="examCard">
            <div className="examHeader">
              <span>Full mock</span>
              <strong>64:48</strong>
            </div>
            <h3>AWS Cloud Practitioner readiness exam</h3>
            <div className="examMeta">
              <span>65 questions</span>
              <span>70% pass mark</span>
              <span>Marked review</span>
            </div>
            <div className="questionTiles" aria-label="Sample question progress">
              {Array.from({ length: 20 }).map((_, index) => (
                <span className={index < 12 ? 'answered' : index === 14 ? 'marked' : ''} key={index}>
                  {index + 1}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="sectionBand" id="knowledge-base">
          <SectionHeader
            eyebrow="Knowledge base"
            title="Concise cloud lessons connected directly to practice"
            copy="Learners can review the concept, understand why it matters, then launch the related practice without leaving the flow."
          />
          <div className="knowledgeGrid">
            {knowledgeCards.map((card) => (
              <article className="knowledgeCard" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
                <a href="#mock-exams">Practice this area</a>
              </article>
            ))}
          </div>
        </section>

        <section className="sectionBand splitSection certificates" id="certificates">
          <div>
            <SectionHeader
              eyebrow="Certificates"
              title="Give learners a milestone they can show"
              copy="Certification prep feels more complete when passing practice creates a branded record of achievement."
            />
            <div className="checkList">
              {certificatePoints.map((point) => (
                <div className="checkItem" key={point}>
                  <span aria-hidden="true">✓</span>
                  <p>{point}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="certificateArt" aria-label="Certificate preview">
            <div>
              <img src="/acecloudcert-logo.png" alt="" />
              <span>AceCloudCert</span>
            </div>
            <p>Certificate of readiness</p>
            <strong>Jamie Morgan</strong>
            <span>AWS Certified Cloud Practitioner Prep</span>
            <small>Score 86% | Issued today | ACC-2026-1482</small>
          </div>
        </section>

        <section className="sectionBand" id="pricing">
          <SectionHeader
            eyebrow="Pricing preview"
            title="Simple plans that make the upgrade path obvious"
            copy="Start free, then unlock the deeper practice loops and certificate workflows when learners are ready to commit."
          />
          <div className="pricingGrid">
            {pricingPlans.map((plan) => (
              <article className={plan.featured ? 'pricingCard featured' : 'pricingCard'} key={plan.name}>
                <span>{plan.name}</span>
                <strong>{plan.price}</strong>
                <p>{plan.copy}</p>
                <PrimaryLink href="#top" variant={plan.featured ? 'primary' : 'secondary'}>
                  {plan.cta}
                </PrimaryLink>
              </article>
            ))}
          </div>
        </section>

        <section className="sectionBand" id="testimonials">
          <SectionHeader
            eyebrow="Testimonials"
            title="Realistic early feedback for the buyers you want"
            copy="Placeholder copy is written to sound like learner, team lead, and training manager feedback until production testimonials are ready."
          />
          <div className="testimonialGrid">
            {testimonials.map((testimonial) => (
              <figure className="testimonialCard" key={testimonial.name}>
                <blockquote>"{testimonial.quote}"</blockquote>
                <figcaption>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="sectionBand" id="faq">
          <SectionHeader
            eyebrow="FAQ"
            title="Answers for learners, teams, and buyers"
            copy="Keep the landing page conversion-focused while removing the obvious friction points before a visitor clicks."
          />
          <div className="faqGrid">
            {faqs.map((faq) => (
              <article className="faqItem" key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="finalCta">
          <p className="eyebrow">Start building certification confidence today</p>
          <h2>Give learners a smarter way to prepare before they pay for the exam.</h2>
          <p>
            Launch the free path, explore provider tracks, and see how AceCloudCert turns practice data into confident next steps.
          </p>
          <div className="heroActions">
            <PrimaryLink href="#pricing">Start Free</PrimaryLink>
            <PrimaryLink href="#certifications" variant="secondary">
              View Certifications
            </PrimaryLink>
            <PrimaryLink href="#pricing" variant="ghost">
              See Pricing
            </PrimaryLink>
          </div>
        </section>
      </main>

      <footer>
        <span>AceCloudCert</span>
        <p>Cloud certification readiness for modern teams and ambitious learners.</p>
      </footer>

      <style jsx global>{`
        :root {
          color-scheme: dark;
          --bg: #05070a;
          --bg-soft: #090d13;
          --surface: #10151d;
          --surface-strong: #151c26;
          --line: rgba(214, 225, 240, 0.14);
          --line-strong: rgba(214, 225, 240, 0.28);
          --text: #f7fafc;
          --muted: #a8b3c2;
          --soft: #d9e2ee;
          --cyan: #64d6ff;
          --green: #63e6be;
          --amber: #ffc857;
          --rose: #ff7b93;
          --blue: #4f9df3;
          --shadow: 0 24px 70px rgba(0, 0, 0, 0.42);
        }

        * {
          box-sizing: border-box;
          letter-spacing: 0;
        }

        html {
          max-width: 100%;
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background:
            linear-gradient(180deg, rgba(79, 157, 243, 0.08), transparent 420px),
            radial-gradient(circle at 12% 0%, rgba(100, 214, 255, 0.12), transparent 340px),
            var(--bg);
          color: var(--text);
          font-family:
            Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          max-width: 100%;
          min-width: 320px;
          overflow-x: hidden;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        img {
          display: block;
          max-width: 100%;
        }

        main {
          margin: 0 auto;
          max-width: 1240px;
          padding: 0 28px 36px;
          width: 100%;
        }

        .siteHeader {
          align-items: center;
          display: flex;
          gap: 20px;
          justify-content: space-between;
          margin: 0 auto;
          max-width: 1240px;
          padding: 24px 28px 10px;
          position: sticky;
          top: 0;
          width: 100%;
          z-index: 10;
          background: rgba(5, 7, 10, 0.78);
          backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(214, 225, 240, 0.08);
        }

        .brand {
          align-items: center;
          display: flex;
          flex-shrink: 0;
          gap: 10px;
          min-width: 0;
        }

        .brand img {
          border-radius: 8px;
          border: 1px solid var(--line);
          height: 42px;
          width: 42px;
        }

        .brand span {
          color: var(--text);
          font-size: 18px;
          font-weight: 800;
          line-height: 1;
        }

        nav {
          align-items: center;
          display: flex;
          gap: 20px;
        }

        nav a {
          color: var(--muted);
          font-size: 14px;
          font-weight: 700;
          transition: color 180ms ease;
        }

        nav a:hover {
          color: var(--text);
        }

        .sectionBand,
        .appPreviewSection {
          animation: riseIn 640ms ease both;
          padding: 84px 0 0;
        }

        .hero {
          min-height: 610px;
          padding-top: 82px;
        }

        .heroCopyBlock {
          max-width: 960px;
          min-width: 0;
        }

        .eyebrow {
          color: var(--green);
          font-size: 12px;
          font-weight: 900;
          line-height: 18px;
          margin: 0 0 14px;
          text-transform: uppercase;
        }

        h1,
        h2,
        h3,
        p {
          margin: 0;
        }

        h1 {
          color: var(--text);
          font-size: 64px;
          font-weight: 900;
          line-height: 1.02;
          max-width: 980px;
          overflow-wrap: break-word;
        }

        .heroCopyBlock > p:not(.eyebrow) {
          color: var(--soft);
          font-size: 20px;
          line-height: 32px;
          margin-top: 24px;
          max-width: 790px;
        }

        .heroActions {
          align-items: center;
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 32px;
        }

        .button {
          align-items: center;
          border-radius: 8px;
          display: inline-flex;
          font-size: 14px;
          font-weight: 900;
          justify-content: center;
          line-height: 20px;
          min-height: 46px;
          padding: 12px 18px;
          transition:
            border-color 180ms ease,
            background 180ms ease,
            color 180ms ease,
            transform 180ms ease;
        }

        .button:hover {
          transform: translateY(-2px);
        }

        .button.primary {
          background: linear-gradient(135deg, var(--green), var(--cyan));
          color: #041014;
        }

        .button.secondary {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--line-strong);
          color: var(--text);
        }

        .button.ghost {
          border: 1px solid rgba(100, 214, 255, 0.3);
          color: var(--cyan);
        }

        .button.nav {
          background: rgba(100, 214, 255, 0.1);
          border: 1px solid rgba(100, 214, 255, 0.26);
          color: var(--text);
          min-height: 40px;
          padding: 9px 14px;
        }

        .heroStats {
          display: grid;
          gap: 12px;
          grid-template-columns: repeat(4, 1fr);
          margin-top: 58px;
        }

        .stat {
          background: rgba(16, 21, 29, 0.72);
          border: 1px solid var(--line);
          border-radius: 8px;
          padding: 18px;
        }

        .stat span {
          color: var(--text);
          display: block;
          font-size: 30px;
          font-weight: 900;
          line-height: 36px;
        }

        .stat p {
          color: var(--muted);
          font-size: 13px;
          font-weight: 700;
          line-height: 19px;
          margin-top: 6px;
        }

        .sectionHeader {
          max-width: 760px;
          min-width: 0;
        }

        .sectionHeader h2,
        .finalCta h2 {
          color: var(--text);
          font-size: 42px;
          font-weight: 900;
          line-height: 50px;
          overflow-wrap: break-word;
        }

        .sectionHeader > p:not(.eyebrow),
        .finalCta > p:not(.eyebrow) {
          color: var(--muted);
          font-size: 17px;
          line-height: 28px;
          margin-top: 14px;
        }

        .appPreview {
          background:
            linear-gradient(145deg, rgba(21, 28, 38, 0.94), rgba(9, 13, 19, 0.98)),
            var(--surface);
          border: 1px solid var(--line);
          border-radius: 8px;
          box-shadow: var(--shadow);
          margin-top: 30px;
          overflow: hidden;
          padding: 20px;
          position: relative;
        }

        .appPreview::before {
          background: linear-gradient(90deg, var(--green), var(--cyan), var(--amber), var(--rose));
          content: "";
          display: block;
          height: 3px;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
        }

        .previewTopbar {
          align-items: center;
          border-bottom: 1px solid var(--line);
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          justify-content: space-between;
          padding-bottom: 18px;
        }

        .previewBrand {
          align-items: center;
          display: flex;
          gap: 12px;
        }

        .previewBrand img {
          border-radius: 8px;
          height: 44px;
          width: 44px;
        }

        .previewBrand strong,
        .previewBrand span {
          display: block;
        }

        .previewBrand strong {
          font-size: 16px;
          line-height: 22px;
        }

        .previewBrand span,
        .panelLabel,
        .certificateArt small {
          color: var(--muted);
          font-size: 12px;
          font-weight: 800;
          line-height: 18px;
          text-transform: uppercase;
        }

        .previewStatus {
          background: rgba(99, 230, 190, 0.1);
          border: 1px solid rgba(99, 230, 190, 0.3);
          border-radius: 6px;
          color: var(--green);
          font-size: 13px;
          font-weight: 900;
          padding: 8px 10px;
        }

        .previewGrid {
          display: grid;
          gap: 14px;
          grid-template-columns: 1.05fr 1.35fr;
          margin-top: 18px;
        }

        .previewPanel {
          background: rgba(255, 255, 255, 0.035);
          border: 1px solid var(--line);
          border-radius: 8px;
          padding: 18px;
        }

        .readinessPanel,
        .certificatePanel {
          min-height: 220px;
        }

        .questionPanel {
          grid-row: span 2;
        }

        .readinessScore {
          color: var(--text);
          display: block;
          font-size: 58px;
          font-weight: 900;
          line-height: 62px;
          margin-top: 14px;
        }

        .progressTrack,
        .miniTrack {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 4px;
          height: 8px;
          margin-top: 14px;
          overflow: hidden;
        }

        .progressTrack span,
        .miniTrack span {
          background: linear-gradient(90deg, var(--green), var(--cyan));
          display: block;
          height: 100%;
        }

        .readinessPanel p {
          color: var(--muted);
          font-size: 14px;
          line-height: 22px;
          margin-top: 16px;
        }

        .questionPanel h3 {
          color: var(--text);
          font-size: 24px;
          line-height: 32px;
          margin-top: 14px;
        }

        .answerRow {
          background: rgba(255, 255, 255, 0.045);
          border: 1px solid var(--line);
          border-radius: 8px;
          color: var(--soft);
          font-size: 14px;
          font-weight: 800;
          margin-top: 12px;
          padding: 14px;
        }

        .activeAnswer {
          background: rgba(99, 230, 190, 0.12);
          border-color: rgba(99, 230, 190, 0.42);
          color: var(--text);
        }

        .domainRow {
          align-items: center;
          display: flex;
          justify-content: space-between;
          margin-top: 14px;
        }

        .domainRow span {
          color: var(--soft);
          font-size: 14px;
          font-weight: 800;
        }

        .domainRow strong {
          color: var(--green);
          font-size: 14px;
        }

        .miniTrack {
          height: 6px;
          margin-top: 8px;
        }

        .certificateMock {
          align-items: center;
          border: 1px solid rgba(255, 200, 87, 0.38);
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 16px;
          padding: 22px;
          text-align: center;
        }

        .certificateMock img {
          border-radius: 8px;
          height: 44px;
          width: 44px;
        }

        .certificateMock strong {
          font-size: 18px;
          line-height: 24px;
        }

        .certificateMock span {
          color: var(--amber);
          font-size: 13px;
          font-weight: 900;
        }

        .providerGrid,
        .featureGrid,
        .knowledgeGrid,
        .pricingGrid,
        .testimonialGrid,
        .faqGrid {
          display: grid;
          gap: 14px;
          margin-top: 30px;
        }

        .providerGrid {
          grid-template-columns: repeat(3, 1fr);
        }

        .providerCard,
        .featureCard,
        .knowledgeCard,
        .pricingCard,
        .testimonialCard,
        .faqItem,
        .examCard {
          background: rgba(16, 21, 29, 0.76);
          border: 1px solid var(--line);
          border-radius: 8px;
          padding: 20px;
        }

        .providerCard {
          min-height: 184px;
          position: relative;
        }

        .providerCard::after {
          bottom: 0;
          content: "";
          height: 3px;
          left: 0;
          position: absolute;
          right: 0;
        }

        .providerCard.amber::after {
          background: var(--amber);
        }

        .providerCard.cyan::after {
          background: var(--cyan);
        }

        .providerCard.green::after {
          background: var(--green);
        }

        .providerCard.rose::after {
          background: var(--rose);
        }

        .providerCard span,
        .pricingCard > span {
          color: var(--cyan);
          font-size: 12px;
          font-weight: 900;
          line-height: 18px;
          text-transform: uppercase;
        }

        .providerCard h3,
        .featureCard h3,
        .knowledgeCard h3,
        .examCard h3,
        .faqItem h3 {
          color: var(--text);
          font-size: 20px;
          font-weight: 900;
          line-height: 27px;
          margin-top: 12px;
        }

        .providerCard p,
        .featureCard p,
        .knowledgeCard p,
        .pricingCard p,
        .testimonialCard blockquote,
        .faqItem p {
          color: var(--muted);
          font-size: 15px;
          line-height: 24px;
          margin-top: 12px;
        }

        .featureGrid {
          grid-template-columns: repeat(3, 1fr);
        }

        .featureCard span {
          color: var(--amber);
          font-size: 13px;
          font-weight: 900;
        }

        .splitSection {
          align-items: start;
          display: grid;
          gap: 32px;
          grid-template-columns: minmax(0, 1fr) 430px;
        }

        .checkList {
          display: grid;
          gap: 12px;
          margin-top: 28px;
        }

        .checkItem {
          align-items: flex-start;
          display: flex;
          gap: 12px;
        }

        .checkItem span {
          align-items: center;
          background: rgba(99, 230, 190, 0.12);
          border: 1px solid rgba(99, 230, 190, 0.3);
          border-radius: 6px;
          color: var(--green);
          display: inline-flex;
          flex: 0 0 auto;
          font-size: 13px;
          font-weight: 900;
          height: 24px;
          justify-content: center;
          margin-top: 1px;
          width: 24px;
        }

        .checkItem p {
          color: var(--soft);
          font-size: 16px;
          line-height: 26px;
        }

        .examCard {
          box-shadow: var(--shadow);
        }

        .examHeader,
        .examMeta {
          align-items: center;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: space-between;
        }

        .examHeader span {
          color: var(--green);
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .examHeader strong {
          color: var(--amber);
          font-size: 18px;
        }

        .examMeta {
          justify-content: flex-start;
          margin-top: 18px;
        }

        .examMeta span {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--line);
          border-radius: 6px;
          color: var(--soft);
          font-size: 12px;
          font-weight: 800;
          padding: 7px 9px;
        }

        .questionTiles {
          display: grid;
          gap: 8px;
          grid-template-columns: repeat(5, 1fr);
          margin-top: 22px;
        }

        .questionTiles span {
          align-items: center;
          background: rgba(255, 255, 255, 0.045);
          border: 1px solid var(--line);
          border-radius: 6px;
          color: var(--soft);
          display: flex;
          font-size: 12px;
          font-weight: 900;
          height: 38px;
          justify-content: center;
        }

        .questionTiles .answered {
          background: rgba(99, 230, 190, 0.12);
          border-color: rgba(99, 230, 190, 0.34);
          color: var(--green);
        }

        .questionTiles .marked {
          background: rgba(255, 200, 87, 0.12);
          border-color: rgba(255, 200, 87, 0.36);
          color: var(--amber);
        }

        .knowledgeGrid,
        .testimonialGrid {
          grid-template-columns: repeat(3, 1fr);
        }

        .knowledgeCard a {
          color: var(--green);
          display: inline-flex;
          font-size: 14px;
          font-weight: 900;
          margin-top: 18px;
        }

        .certificates {
          grid-template-columns: minmax(0, 1fr) 460px;
        }

        .certificateArt {
          background: #f8fbff;
          border: 10px solid #d6efe6;
          border-radius: 8px;
          box-shadow: var(--shadow);
          color: #0d1724;
          display: grid;
          gap: 16px;
          justify-items: center;
          min-height: 330px;
          padding: 34px;
          text-align: center;
        }

        .certificateArt div {
          align-items: center;
          display: flex;
          gap: 10px;
        }

        .certificateArt img {
          border-radius: 8px;
          height: 38px;
          width: 38px;
        }

        .certificateArt div span {
          color: #0d1724;
          font-size: 17px;
          font-weight: 900;
        }

        .certificateArt p {
          color: #087057;
          font-size: 13px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .certificateArt strong {
          border-bottom: 2px solid #087057;
          color: #0d1724;
          font-size: 34px;
          line-height: 42px;
          padding: 0 12px 8px;
        }

        .certificateArt > span {
          color: #263648;
          font-size: 17px;
          font-weight: 900;
          line-height: 24px;
        }

        .pricingGrid {
          grid-template-columns: repeat(3, 1fr);
        }

        .pricingCard {
          display: flex;
          flex-direction: column;
          min-height: 292px;
        }

        .pricingCard.featured {
          border-color: rgba(99, 230, 190, 0.55);
          box-shadow: 0 22px 54px rgba(99, 230, 190, 0.08);
        }

        .pricingCard strong {
          color: var(--text);
          display: block;
          font-size: 42px;
          font-weight: 900;
          line-height: 48px;
          margin-top: 16px;
        }

        .pricingCard p {
          flex: 1;
        }

        .pricingCard .button {
          margin-top: 22px;
          width: 100%;
        }

        .testimonialCard {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 260px;
        }

        .testimonialCard blockquote {
          color: var(--soft);
          font-size: 16px;
          font-weight: 700;
          line-height: 27px;
        }

        .testimonialCard figcaption {
          border-top: 1px solid var(--line);
          margin-top: 22px;
          padding-top: 16px;
        }

        .testimonialCard strong,
        .testimonialCard span {
          display: block;
        }

        .testimonialCard strong {
          color: var(--text);
          font-size: 15px;
        }

        .testimonialCard span {
          color: var(--muted);
          font-size: 13px;
          font-weight: 800;
          margin-top: 4px;
        }

        .faqGrid {
          grid-template-columns: repeat(2, 1fr);
        }

        .faqItem h3 {
          margin-top: 0;
        }

        .finalCta {
          background:
            linear-gradient(135deg, rgba(99, 230, 190, 0.14), rgba(100, 214, 255, 0.1)),
            rgba(16, 21, 29, 0.9);
          border: 1px solid rgba(99, 230, 190, 0.35);
          border-radius: 8px;
          margin: 86px auto 0;
          padding: 42px;
        }

        .finalCta h2 {
          max-width: 850px;
        }

        .finalCta > p:not(.eyebrow) {
          max-width: 720px;
        }

        footer {
          align-items: center;
          border-top: 1px solid var(--line);
          color: var(--muted);
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: space-between;
          margin: 30px auto 0;
          max-width: 1240px;
          padding: 24px 28px 34px;
          width: 100%;
        }

        footer span {
          color: var(--text);
          font-weight: 900;
        }

        footer p {
          font-size: 13px;
          line-height: 20px;
        }

        @keyframes riseIn {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 980px) {
          main {
            padding-left: 22px;
            padding-right: 22px;
          }

          nav {
            display: none;
          }

          h1 {
            font-size: 48px;
            line-height: 56px;
          }

          .hero {
            min-height: auto;
            padding-top: 62px;
          }

          .heroStats,
          .providerGrid,
          .featureGrid,
          .knowledgeGrid,
          .pricingGrid,
          .testimonialGrid,
          .faqGrid {
            grid-template-columns: repeat(2, 1fr);
          }

          .previewGrid,
          .splitSection,
          .certificates {
            grid-template-columns: 1fr;
          }

          .questionPanel {
            grid-row: auto;
          }
        }

        @media (max-width: 640px) {
          .siteHeader {
            padding: 16px 18px 8px;
          }

          .brand span {
            font-size: 16px;
          }

          .button.nav {
            display: none;
          }

          main {
            padding: 0 18px 28px;
          }

          .sectionBand,
          .appPreviewSection {
            padding-top: 62px;
          }

          h1 {
            font-size: 34px;
            line-height: 40px;
            max-width: 330px;
          }

          .heroCopyBlock > p:not(.eyebrow) {
            font-size: 17px;
            line-height: 28px;
            max-width: 330px;
          }

          .heroActions {
            align-items: stretch;
            flex-direction: column;
            max-width: 330px;
            width: 100%;
          }

          .heroActions .button,
          .eyebrow,
          .sectionHeader,
          .heroStats {
            max-width: 100%;
          }

          .eyebrow {
            max-width: 330px;
            overflow-wrap: break-word;
          }

          .heroStats {
            max-width: 330px;
            width: 100%;
          }

          .sectionHeader h2,
          .finalCta h2 {
            font-size: 31px;
            line-height: 39px;
          }

          .heroStats,
          .providerGrid,
          .featureGrid,
          .knowledgeGrid,
          .pricingGrid,
          .testimonialGrid,
          .faqGrid {
            grid-template-columns: 1fr;
          }

          .appPreview {
            max-width: 330px;
            padding: 14px;
            width: 100%;
          }

          .previewGrid,
          .previewPanel,
          .previewTopbar {
            max-width: 100%;
            min-width: 0;
            width: 100%;
          }

          .readinessScore {
            font-size: 46px;
            line-height: 52px;
          }

          .questionPanel h3 {
            font-size: 18px;
            line-height: 26px;
            overflow-wrap: break-word;
          }

          .answerRow {
            font-size: 13px;
          }

          .certificateArt {
            padding: 24px 16px;
          }

          .certificateArt strong {
            font-size: 27px;
            line-height: 34px;
          }

          .finalCta {
            padding: 28px 20px;
          }

          .button {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          *,
          *::before,
          *::after {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
          }
        }
      `}</style>
    </>
  );
}
