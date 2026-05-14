import { ADMIN_ROUTES } from '@/constants/routes';
import type { AuthUser } from '@/features/auth';
import type { AdminRouteGuard } from './types';
import type { AppRoute } from '@/types';

const adminRouteSet = new Set<AppRoute>(ADMIN_ROUTES);

export function isAdminRoute(route: AppRoute) {
  return adminRouteSet.has(route);
}

export function isAdminUser(user: Pick<AuthUser, 'role'> | null | undefined) {
  return user?.role === 'admin';
}

export function getAdminRouteGuard(route: AppRoute, user: Pick<AuthUser, 'role'> | null | undefined): AdminRouteGuard {
  if (!isAdminRoute(route)) {
    return {
      allowed: true,
      route
    };
  }

  if (isAdminUser(user)) {
    return {
      allowed: true,
      route
    };
  }

  return {
    allowed: false,
    reason: 'Admin routes require an admin role claim. Local mock admin mode is disabled by default.',
    route
  };
}
