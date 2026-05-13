import type { ReactNode } from 'react';
import { SafeAreaView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { APP_ROUTES } from '@/constants/routes';
import { theme } from '@/constants/theme';
import type { AppRoute } from '@/types';
import { SecondaryButton } from '@/components/ui';
import { AppLogo } from './AppLogo';
import { DesktopSidebar } from './DesktopSidebar';
import { MobileBottomNav } from './MobileBottomNav';
import { PageContainer } from './PageContainer';
import { PublicHeader } from './PublicHeader';

type AppShellProps = {
  activeRoute: AppRoute;
  activeMenuRoute: AppRoute;
  children: ReactNode;
  isAuthenticated: boolean;
  navigate: (route: AppRoute) => void;
  onLogout: () => void;
  routeLabels: Record<AppRoute, string>;
};

export function AppShell({
  activeRoute,
  activeMenuRoute,
  children,
  isAuthenticated,
  navigate,
  onLogout,
  routeLabels
}: AppShellProps) {
  const { width } = useWindowDimensions();
  const desktop = width >= 960;

  return (
    <SafeAreaView style={styles.app}>
      <StatusBar style="light" />
      <View style={styles.shell}>
        {desktop && isAuthenticated ? (
          <DesktopSidebar activeRoute={activeMenuRoute} navigate={navigate} onLogout={onLogout} routeLabels={routeLabels} />
        ) : null}
        <View style={styles.main}>
          {!isAuthenticated ? (
            <PublicHeader activeRoute={activeRoute} desktop={desktop} navigate={navigate} routeLabels={routeLabels} />
          ) : !desktop ? (
            <View style={styles.mobileHeader}>
              <AppLogo />
              <View style={styles.mobileActions}>
                <SecondaryButton onPress={() => navigate(APP_ROUTES.settings)} size="sm">
                  Settings
                </SecondaryButton>
                <SecondaryButton onPress={onLogout} size="sm">
                  Sign out
                </SecondaryButton>
              </View>
            </View>
          ) : null}
          <PageContainer desktopSidebar={desktop && isAuthenticated}>{children}</PageContainer>
        </View>
      </View>
      {!desktop && isAuthenticated ? (
        <MobileBottomNav activeRoute={activeMenuRoute} navigate={navigate} routeLabels={routeLabels} />
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: {
    backgroundColor: theme.colors.background,
    flex: 1,
    minHeight: '100%'
  },
  main: {
    flex: 1
  },
  mobileActions: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs
  },
  mobileHeader: {
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderBottomColor: theme.colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: 14
  },
  shell: {
    flex: 1,
    flexDirection: 'row',
    minHeight: 0
  }
});
