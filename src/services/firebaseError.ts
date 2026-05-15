export class FirebaseBackendError extends Error {
  operation: string;
  originalCode?: string;

  constructor(operation: string, error: unknown) {
    const originalMessage = error instanceof Error ? error.message : 'Unknown Firebase error.';
    const originalCode =
      typeof error === 'object' && error && 'code' in error && typeof error.code === 'string'
        ? error.code
        : undefined;

    super(`${operation} failed: ${originalCode ? `${originalCode} - ` : ''}${originalMessage}`);
    this.name = 'FirebaseBackendError';
    this.operation = operation;
    this.originalCode = originalCode;
  }
}

export function wrapFirebaseError(operation: string, error: unknown): never {
  throw new FirebaseBackendError(operation, error);
}
