import type { CertificateRecord } from '@/types';
import type { CertificateService } from './contracts';
import { storageService } from './storageService';

type CertificateStore = {
  certificates: readonly CertificateRecord[];
};

const CERTIFICATE_STORE_KEY = 'acecloudcert.certificates.v1';

async function loadStore(): Promise<CertificateStore> {
  return (await storageService.getJson<CertificateStore>(CERTIFICATE_STORE_KEY)) ?? { certificates: [] };
}

async function saveStore(store: CertificateStore) {
  await storageService.setJson(CERTIFICATE_STORE_KEY, store);
}

function sortCertificates(certificates: readonly CertificateRecord[]) {
  return [...certificates].sort((a, b) => new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime());
}

export const certificateService: CertificateService = {
  async getCertificate(id: string) {
    const store = await loadStore();
    return store.certificates.find((certificate) => certificate.id === id) ?? null;
  },

  async getCertificateForAttempt(userId: string, attemptId: string) {
    const store = await loadStore();
    return (
      store.certificates.find(
        (certificate) => certificate.userId === userId && certificate.sourceAttemptId === attemptId
      ) ?? null
    );
  },

  async listCertificates(userId: string) {
    const store = await loadStore();
    return sortCertificates(store.certificates.filter((certificate) => certificate.userId === userId));
  },

  async saveCertificate(certificate: CertificateRecord) {
    const store = await loadStore();
    const certificates = sortCertificates([
      certificate,
      ...store.certificates.filter((storedCertificate) => storedCertificate.id !== certificate.id)
    ]).slice(0, 100);

    await saveStore({ certificates });
    return certificate;
  }
};
