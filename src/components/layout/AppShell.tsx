import type { ReactNode } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import logo from '../../../assets/icon.png';
import { APP_NAME, APP_TAGLINE } from '@/constants/app';
import { PRIMARY_NAVIGATION } from '@/constants/routes';
import { theme } from '@/constants/theme';
import type { AppRoute } from '@/types';

type AppShellProps = {
  activeRoute: AppRoute;
  children: ReactNode;
  navigate: (route: AppRoute) => void;
  routeLabels: Record<AppRoute, string>;
};

export function AppShell({ activeRoute, children, navigate, routeLabels }: AppShellProps) {
  return (
    <SafeAreaView style={styles.app}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <Image source={logo} style={styles.logo} />
          <View>
            <Text style={styles.brand}>{APP_NAME}</Text>
            <Text style={styles.tagline}>{APP_TAGLINE}</Text>
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.content}>{children}</ScrollView>
      <View style={styles.nav}>
        {PRIMARY_NAVIGATION.map((route) => (
          <Pressable
            key={route}
            onPress={() => navigate(route)}
            style={[styles.navItem, activeRoute === route && styles.navItemActive]}
          >
            <Text style={[styles.navText, activeRoute === route && styles.navTextActive]}>{routeLabels[route]}</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: {
    backgroundColor: theme.colors.background,
    flex: 1,
    minHeight: '100%'
  },
  brand: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: '900'
  },
  brandRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.sm
  },
  content: {
    alignSelf: 'center',
    gap: theme.spacing.md,
    maxWidth: 1160,
    padding: theme.spacing.lg,
    paddingBottom: 112,
    width: '100%'
  },
  header: {
    backgroundColor: theme.colors.surface,
    borderBottomColor: theme.colors.border,
    borderBottomWidth: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: 14
  },
  logo: {
    borderRadius: theme.radii.md,
    height: 42,
    width: 42
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
  },
  navItem: {
    alignItems: 'center',
    borderRadius: theme.radii.md,
    minWidth: 92,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  navItemActive: {
    backgroundColor: theme.colors.primary
  },
  navText: {
    color: theme.colors.textMuted,
    fontWeight: '900'
  },
  navTextActive: {
    color: theme.colors.background
  },
  tagline: {
    color: theme.colors.textMuted,
    fontSize: 12
  }
});
