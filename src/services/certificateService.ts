import type { CertificateRecord } from '@/types';
import { collection, doc, getDoc, getDocs, orderBy, query, setDoc, where } from 'firebase/firestore';
import type { CertificateService } from './contracts';
import { FIRESTORE_COLLECTIONS, getFirebaseFirestoreInstance, isFirebaseBackendEnabled } from './firebase';
import { wrapFirebaseError } from './firebaseError';
import { fromFirestoreCertificate, toFirestoreCertificate } from './firestoreModels';
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
    if (isFirebaseBackendEnabled()) {
      try {
        const db = getFirebaseFirestoreInstance();

        if (!db) {
          return null;
        }

        const snapshot = await getDoc(doc(db, FIRESTORE_COLLECTIONS.certificates, id));
        return snapshot.exists() ? fromFirestoreCertificate(snapshot.id, snapshot.data()) : null;
      } catch (error) {
        wrapFirebaseError('Load Firestore certificate', error);
      }
    }

    const store = await loadStore();
    return store.certificates.find((certificate) => certificate.id === id) ?? null;
  },

  async getCertificateForAttempt(userId: string, attemptId: string) {
    if (isFirebaseBackendEnabled()) {
      try {
        const db = getFirebaseFirestoreInstance();

        if (!db) {
          return null;
        }

        const certificateQuery = query(
          collection(db, FIRESTORE_COLLECTIONS.certificates),
          where('userId', '==', userId),
          where('sourceAttemptId', '==', attemptId)
        );
        const snapshot = await getDocs(certificateQuery);
        const certificate = snapshot.docs[0];

        return certificate ? fromFirestoreCertificate(certificate.id, certificate.data()) : null;
      } catch (error) {
        wrapFirebaseError('Load Firestore certificate for attempt', error);
      }
    }

    const store = await loadStore();
    return (
      store.certificates.find(
        (certificate) => certificate.userId === userId && certificate.sourceAttemptId === attemptId
      ) ?? null
    );
  },

  async listCertificates(userId: string) {
    if (isFirebaseBackendEnabled()) {
      try {
        const db = getFirebaseFirestoreInstance();

        if (!db) {
          return [];
        }

        const certificateQuery = query(
          collection(db, FIRESTORE_COLLECTIONS.certificates),
          where('userId', '==', userId),
          orderBy('issuedAt', 'desc')
        );
        const snapshot = await getDocs(certificateQuery);

        return snapshot.docs.map((certificate) => fromFirestoreCertificate(certificate.id, certificate.data()));
      } catch (error) {
        wrapFirebaseError('List Firestore certificates', error);
      }
    }

    const store = await loadStore();
    return sortCertificates(store.certificates.filter((certificate) => certificate.userId === userId));
  },

  async saveCertificate(certificate: CertificateRecord) {
    if (isFirebaseBackendEnabled()) {
      try {
        const db = getFirebaseFirestoreInstance();

        if (!db) {
          return certificate;
        }

        await setDoc(
          doc(db, FIRESTORE_COLLECTIONS.certificates, certificate.id),
          toFirestoreCertificate(certificate),
          { merge: true }
        );
        return certificate;
      } catch (error) {
        wrapFirebaseError('Save Firestore certificate', error);
      }
    }

    const store = await loadStore();
    const certificates = sortCertificates([
      certificate,
      ...store.certificates.filter((storedCertificate) => storedCertificate.id !== certificate.id)
    ]).slice(0, 100);

    await saveStore({ certificates });
    return certificate;
  }
};
