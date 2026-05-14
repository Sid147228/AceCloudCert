import { APP_NAME, DEFAULT_CERTIFICATION_ID } from '@/constants/app';
import { certifications } from '@/data';
import type { TestAttempt } from '@/features/tests';
import type { CertificateRecord } from '@/types';
import { formatPercent } from '@/utils';

export const DEFAULT_CERTIFICATE_SHARE_MESSAGE =
  'I am happy to share that I have earned a new certificate on AWS using AceCloudCert!';

type CreateCertificateInput = {
  attempt: TestAttempt;
  userName: string;
};

export function createCertificateRecord({ attempt, userName }: CreateCertificateInput): CertificateRecord {
  const issuedAt = attempt.completedAt;
  const certificationId = attempt.certificationId || DEFAULT_CERTIFICATION_ID;
  const certificationName = getCertificationName(certificationId);
  const certificateId = createCertificateId(certificationId, issuedAt, attempt.id);

  return {
    certificateId,
    certificationId,
    certificationName,
    id: `certificate-${attempt.id}`,
    issuedAt,
    score: attempt.scorePercent,
    sourceAttemptId: attempt.id,
    userId: attempt.userId,
    userName,
    verificationUrl: `https://acecloudcert.com/verify/${certificateId}`
  };
}

export function getCertificateShareText() {
  return DEFAULT_CERTIFICATE_SHARE_MESSAGE;
}

export function createLinkedInShareUrl(certificate: CertificateRecord) {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(certificate.verificationUrl)}`;
}

export function renderCertificateHtml(certificate: CertificateRecord) {
  const issueDate = formatCertificateDate(certificate.issuedAt);

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>${escapeHtml(certificate.certificateId)}</title>
    <style>
      body {
        background: #e5e7eb;
        color: #0f172a;
        font-family: Georgia, 'Times New Roman', serif;
        margin: 0;
        padding: 40px;
      }
      .certificate {
        background: #f8fafc;
        border: 10px solid #047857;
        box-shadow: 0 24px 70px rgba(15, 23, 42, 0.18);
        margin: 0 auto;
        max-width: 980px;
        min-height: 640px;
        padding: 48px;
        text-align: center;
      }
      .inner {
        border: 2px solid #86efac;
        min-height: 560px;
        padding: 44px;
      }
      .brand {
        align-items: center;
        display: inline-flex;
        gap: 12px;
        margin-bottom: 34px;
      }
      .mark {
        background: #ff8c00;
        border-radius: 12px;
        color: #0b1220;
        font-family: Arial, sans-serif;
        font-size: 28px;
        font-weight: 900;
        height: 54px;
        line-height: 54px;
        width: 54px;
      }
      .brand-name {
        color: #0b1220;
        font-family: Arial, sans-serif;
        font-size: 28px;
        font-weight: 900;
      }
      .eyebrow {
        color: #047857;
        font-family: Arial, sans-serif;
        font-size: 13px;
        font-weight: 900;
        letter-spacing: 3px;
        text-transform: uppercase;
      }
      h1 {
        color: #064e3b;
        font-size: 48px;
        font-weight: 700;
        margin: 14px 0 28px;
      }
      .awarded {
        color: #475569;
        font-family: Arial, sans-serif;
        font-size: 17px;
        margin: 0;
      }
      .candidate {
        border-bottom: 2px solid #047857;
        color: #111827;
        display: inline-block;
        font-size: 42px;
        font-weight: 700;
        margin: 16px 0 22px;
        min-width: 440px;
        padding-bottom: 10px;
      }
      .certification {
        color: #111827;
        font-family: Arial, sans-serif;
        font-size: 24px;
        font-weight: 900;
        margin: 10px 0;
      }
      .score {
        color: #047857;
        font-family: Arial, sans-serif;
        font-size: 22px;
        font-weight: 900;
        margin-top: 18px;
      }
      .seal {
        align-items: center;
        background: #facc15;
        border: 7px double #a16207;
        border-radius: 999px;
        color: #713f12;
        display: inline-flex;
        flex-direction: column;
        font-family: Arial, sans-serif;
        font-size: 11px;
        font-weight: 900;
        height: 112px;
        justify-content: center;
        margin: 28px 0;
        text-transform: uppercase;
        width: 112px;
      }
      .seal strong {
        font-size: 20px;
      }
      .meta {
        color: #475569;
        display: flex;
        font-family: Arial, sans-serif;
        font-size: 13px;
        justify-content: space-between;
        margin-top: 26px;
        text-align: left;
      }
      .verification {
        color: #475569;
        font-family: Arial, sans-serif;
        font-size: 12px;
        margin-top: 26px;
      }
    </style>
  </head>
  <body>
    <main class="certificate">
      <section class="inner">
        <div class="brand">
          <div class="mark">A</div>
          <div class="brand-name">${APP_NAME}</div>
        </div>
        <div class="eyebrow">Certificate of Achievement</div>
        <h1>Cloud Excellence</h1>
        <p class="awarded">This certificate is proudly awarded to</p>
        <div class="candidate">${escapeHtml(certificate.userName)}</div>
        <p class="awarded">for successfully completing the AceCloudCert assessment for</p>
        <div class="certification">${escapeHtml(certificate.certificationName)}</div>
        <div class="score">Score: ${formatPercent(certificate.score)}</div>
        <div class="seal"><strong>ACE</strong><span>Excellence</span><span>Verified</span></div>
        <div class="meta">
          <div><strong>Issue date</strong><br />${escapeHtml(issueDate)}</div>
          <div><strong>Certificate ID</strong><br />${escapeHtml(certificate.certificateId)}</div>
        </div>
        <p class="verification">Verify this achievement at ${escapeHtml(certificate.verificationUrl)}</p>
      </section>
    </main>
  </body>
</html>`;
}

export function formatCertificateDate(value: string) {
  return new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date(value));
}

function getCertificationName(certificationId: string) {
  return certifications.find((certification) => certification.id === certificationId)?.name ?? 'AWS Certified Cloud Practitioner';
}

function createCertificateId(certificationId: string, issuedAt: string, attemptId: string) {
  const certificationCode = certificationId.toUpperCase().replace(/[^A-Z0-9]/g, '-');
  const dateCode = issuedAt.slice(0, 10).replace(/-/g, '');
  const hash = createShortHash(`${certificationId}:${issuedAt}:${attemptId}`);

  return `ACC-${certificationCode}-${dateCode}-${hash}`;
}

function createShortHash(value: string) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash.toString(36).toUpperCase().padStart(6, '0').slice(-6);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
