import type { TestAttempt, TestSession } from '@/features/tests';
import { storageService } from './storageService';

type TestStore = {
  attempts: readonly TestAttempt[];
  sessions: readonly TestSession[];
};

const TEST_STORE_KEY = 'acecloudcert.tests.v1';

async function loadStore(): Promise<TestStore> {
  return (await storageService.getJson<TestStore>(TEST_STORE_KEY)) ?? { attempts: [], sessions: [] };
}

async function saveStore(store: TestStore) {
  await storageService.setJson(TEST_STORE_KEY, store);
}

export const testService = {
  async clearActiveSession(userId: string) {
    const store = await loadStore();
    await saveStore({
      ...store,
      sessions: store.sessions.filter((session) => session.userId !== userId)
    });
  },

  async getActiveSession(userId: string): Promise<TestSession | null> {
    const store = await loadStore();
    return store.sessions.find((session) => session.userId === userId) ?? null;
  },

  async listAttempts(userId: string): Promise<readonly TestAttempt[]> {
    const store = await loadStore();
    return store.attempts
      .filter((attempt) => attempt.userId === userId)
      .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
  },

  async saveActiveSession(session: TestSession): Promise<TestSession> {
    const store = await loadStore();
    await saveStore({
      ...store,
      sessions: [...store.sessions.filter((storedSession) => storedSession.userId !== session.userId), session]
    });

    return session;
  },

  async saveAttempt(attempt: TestAttempt): Promise<TestAttempt> {
    const store = await loadStore();
    const attempts = [attempt, ...store.attempts.filter((storedAttempt) => storedAttempt.id !== attempt.id)].slice(0, 100);

    await saveStore({
      attempts,
      sessions: store.sessions.filter((session) => session.userId !== attempt.userId)
    });

    return attempt;
  }
};
