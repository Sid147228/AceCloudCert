import type { ReactNode } from 'react';
import { SafeAreaView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { theme } from '@/constants/theme';
import type { AppRoute } from '@/types';
import { AppLogo } from './AppLogo';
import { DesktopSidebar } from './DesktopSidebar';
import { MobileBottomNav } from './MobileBottomNav';
import { PageContainer } from './PageContainer';

type AppShellProps = {
  activeRoute: AppRoute;
  children: ReactNode;
  navigate: (route: AppRoute) => void;
  routeLabels: Record<AppRoute, string>;
};

export function AppShell({ activeRoute, children, navigate, routeLabels }: AppShellProps) {
  const { width } = useWindowDimensions();
  const desktop = width >= 960;

  return (
    <SafeAreaView style={styles.app}>
      <StatusBar style="light" />
      <View style={styles.shell}>
        {desktop ? <DesktopSidebar activeRoute={activeRoute} navigate={navigate} routeLabels={routeLabels} /> : null}
        <View style={styles.main}>
          {!desktop ? (
            <View style={styles.mobileHeader}>
              <AppLogo />
            </View>
          ) : null}
          <PageContainer desktopSidebar={desktop}>{children}</PageContainer>
        </View>
      </View>
      {!desktop ? <MobileBottomNav activeRoute={activeRoute} navigate={navigate} routeLabels={routeLabels} /> : null}
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
  mobileHeader: {
    backgroundColor: theme.colors.background,
    borderBottomColor: theme.colors.border,
    borderBottomWidth: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: 14
  },
  shell: {
    flex: 1,
    flexDirection: 'row',
    minHeight: 0
  }
});
