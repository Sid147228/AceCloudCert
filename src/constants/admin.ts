export const ADMIN_MOCK_MODE_STORAGE_KEY = 'acecloudcert.admin.mockMode.enabled';
export const LOCAL_MOCK_ADMIN_EMAIL = 'admin@acecloudcert.local';
export const LOCAL_MOCK_ADMIN_PASSWORD = 'admin12345';

export const ADMIN_PERMISSIONS = [
  'content:read',
  'content:write',
  'questions:read',
  'questions:write',
  'users:read',
  'analytics:read'
] as const;
