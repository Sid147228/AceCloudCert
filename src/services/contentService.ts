import { collection, getDocs } from 'firebase/firestore';
import { certifications, questionBank } from '@/data';
import type { Certification, Question } from '@/types';
import type { ContentService } from './contracts';
import { FIRESTORE_COLLECTIONS, getFirebaseFirestoreInstance, isFirebaseBackendEnabled } from './firebase';
import { wrapFirebaseError } from './firebaseError';
import { fromFirestoreCertification, fromFirestoreQuestion } from './firestoreModels';

async function listFirestoreCollection<Model>(
  collectionName: string,
  mapper: (id: string, document: Record<string, unknown>) => Model
): Promise<readonly Model[]> {
  const db = getFirebaseFirestoreInstance();

  if (!db) {
    return [];
  }

  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map((document) => mapper(document.id, document.data()));
}

export const contentService: ContentService = {
  async listCertifications(): Promise<readonly Certification[]> {
    if (isFirebaseBackendEnabled()) {
      try {
        const firestoreCertifications = await listFirestoreCollection(
          FIRESTORE_COLLECTIONS.certifications,
          fromFirestoreCertification
        );

        return firestoreCertifications.length > 0 ? firestoreCertifications : certifications;
      } catch (error) {
        wrapFirebaseError('List Firestore certifications', error);
      }
    }

    return certifications;
  },

  async listQuestions(): Promise<readonly Question[]> {
    if (isFirebaseBackendEnabled()) {
      try {
        const firestoreQuestions = await listFirestoreCollection(FIRESTORE_COLLECTIONS.questions, fromFirestoreQuestion);

        return firestoreQuestions.length > 0 ? firestoreQuestions : questionBank;
      } catch (error) {
        wrapFirebaseError('List Firestore questions', error);
      }
    }

    return questionBank;
  }
};
