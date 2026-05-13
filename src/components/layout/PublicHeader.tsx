import { Pressable, StyleSheet, Text, View } from 'react-native';
import { PUBLIC_NAVIGATION, APP_ROUTES } from '@/constants/routes';
import { theme } from '@/constants/theme';
import type { AppRoute } from '@/types';
import { SecondaryButton, PrimaryButton } from '@/components/ui';
import { AppLogo } from './AppLogo';

type PublicHeaderProps = {
  activeRoute: AppRoute;
  desktop: boolean;
  navigate: (route: AppRoute) => void;
  routeLabels: Record<AppRoute, string>;
};

export function PublicHeader({ activeRoute, desktop, navigate, routeLabels }: PublicHeaderProps) {
  return (
    <View style={styles.header}>
      <AppLogo />
      {desktop ? (
        <View style={styles.nav}>
          {PUBLIC_NAVIGATION.map((route) => (
            <Pressable key={route} onPress={() => navigate(route)} style={styles.navItem}>
              <Text style={[styles.navText, activeRoute === route && styles.activeNavText]}>{routeLabels[route]}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}
      <View style={styles.actions}>
        <SecondaryButton onPress={() => navigate(APP_ROUTES.login)} size="sm">
          Login
        </SecondaryButton>
        <PrimaryButton onPress={() => navigate(APP_ROUTES.signup)} size="sm">
          Signup
        </PrimaryButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs
  },
  activeNavText: {
    color: theme.colors.primary
  },
  header: {
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
  nav: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: theme.spacing.md,
    justifyContent: 'center'
  },
  navItem: {
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: theme.spacing.xs
  },
  navText: {
    color: theme.colors.textMuted,
    fontSize: 14,
    fontWeight: '900'
  }
});
