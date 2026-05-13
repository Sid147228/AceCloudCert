import { useMemo, useState } from 'react';
import { APP_ROUTES } from '@/constants/routes';
import type { AppRoute } from '@/types';

export function useAppNavigation(initialRoute: AppRoute = APP_ROUTES.landing) {
  const [activeRoute, setActiveRoute] = useState<AppRoute>(initialRoute);

  return useMemo(
    () => ({
      activeRoute,
      navigate: setActiveRoute
    }),
    [activeRoute]
  );
}
