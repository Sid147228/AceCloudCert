import { Pressable, StyleSheet, Text, View } from 'react-native';
import { DESKTOP_SECONDARY_NAVIGATION, PRIMARY_NAVIGATION } from '@/constants/routes';
import { theme } from '@/constants/theme';
import type { AppRoute } from '@/types';
import { AppLogo } from './AppLogo';

type DesktopSidebarProps = {
  activeRoute: AppRoute;
  navigate: (route: AppRoute) => void;
  onLogout: () => void;
  routeLabels: Record<AppRoute, string>;
};

export function DesktopSidebar({ activeRoute, navigate, onLogout, routeLabels }: DesktopSidebarProps) {
  return (
    <View style={styles.sidebar}>
      <AppLogo />
      <View style={styles.group}>
        <Text style={styles.groupLabel}>Workspace</Text>
        {PRIMARY_NAVIGATION.map((route) => (
          <Pressable key={route} onPress={() => navigate(route)} style={[styles.item, activeRoute === route && styles.activeItem]}>
            <Text style={[styles.label, activeRoute === route && styles.activeLabel]}>{routeLabels[route]}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.group}>
        <Text style={styles.groupLabel}>Manage</Text>
        {DESKTOP_SECONDARY_NAVIGATION.map((route) => (
          <Pressable key={route} onPress={() => navigate(route)} style={[styles.item, activeRoute === route && styles.activeItem]}>
            <Text style={[styles.label, activeRoute === route && styles.activeLabel]}>{routeLabels[route]}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.footer}>
        <Pressable onPress={onLogout} style={styles.logout}>
          <Text style={styles.logoutLabel}>Sign out</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  activeItem: {
    backgroundColor: theme.colors.primary
  },
  activeLabel: {
    color: theme.colors.background
  },
  group: {
    gap: theme.spacing.xs
  },
  groupLabel: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: '900',
    paddingHorizontal: theme.spacing.xs,
    textTransform: 'uppercase'
  },
  item: {
    borderRadius: theme.radii.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 11
  },
  label: {
    color: theme.colors.textMuted,
    fontSize: 14,
    fontWeight: '900'
  },
  footer: {
    marginTop: 'auto'
  },
  logout: {
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 11
  },
  logoutLabel: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '900'
  },
  sidebar: {
    backgroundColor: theme.colors.surface,
    borderRightColor: theme.colors.border,
    borderRightWidth: 1,
    gap: theme.spacing.xl,
    padding: theme.spacing.lg,
    width: 280
  }
});
