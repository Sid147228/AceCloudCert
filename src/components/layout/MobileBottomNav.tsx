import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MOBILE_NAVIGATION } from '@/constants/routes';
import { theme } from '@/constants/theme';
import type { AppRoute } from '@/types';

type MobileBottomNavProps = {
  activeRoute: AppRoute;
  navigate: (route: AppRoute) => void;
  routeLabels: Record<AppRoute, string>;
};

export function MobileBottomNav({ activeRoute, navigate, routeLabels }: MobileBottomNavProps) {
  return (
    <View style={styles.nav}>
      {MOBILE_NAVIGATION.map((route) => (
        <Pressable
          key={route}
          onPress={() => navigate(route)}
          style={[styles.item, activeRoute === route && styles.activeItem]}
        >
          <Text style={[styles.label, activeRoute === route && styles.activeLabel]}>{routeLabels[route]}</Text>
        </Pressable>
      ))}
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
  item: {
    alignItems: 'center',
    borderRadius: theme.radii.md,
    minWidth: 88,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  label: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: '900'
  },
  nav: {
    backgroundColor: theme.colors.surface,
    borderTopColor: theme.colors.border,
    borderTopWidth: 1,
    bottom: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
    justifyContent: 'center',
    left: 0,
    padding: theme.spacing.sm,
    position: 'absolute',
    right: 0
  }
});
