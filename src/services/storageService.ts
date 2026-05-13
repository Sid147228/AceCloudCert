const memoryStore = new Map<string, string>();

function getLocalStorage() {
  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
}

export const storageService = {
  async getItem(key: string) {
    const localStorage = getLocalStorage();

    if (localStorage) {
      return localStorage.getItem(key);
    }

    return memoryStore.get(key) ?? null;
  },

  async getJson<T>(key: string): Promise<T | null> {
    const item = await storageService.getItem(key);

    if (!item) {
      return null;
    }

    try {
      return JSON.parse(item) as T;
    } catch {
      await storageService.removeItem(key);
      return null;
    }
  },

  async removeItem(key: string) {
    const localStorage = getLocalStorage();

    if (localStorage) {
      localStorage.removeItem(key);
    }

    memoryStore.delete(key);
  },

  async setItem(key: string, value: string) {
    const localStorage = getLocalStorage();

    if (localStorage) {
      localStorage.setItem(key, value);
      return;
    }

    memoryStore.set(key, value);
  },

  async setJson<T>(key: string, value: T) {
    await storageService.setItem(key, JSON.stringify(value));
  }
};
