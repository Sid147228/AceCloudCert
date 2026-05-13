import type { ReactNode } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

type PageContainerProps = {
  children: ReactNode;
  desktopSidebar?: boolean;
};

export function PageContainer({ children, desktopSidebar = false }: PageContainerProps) {
  return (
    <ScrollView contentContainerStyle={[styles.content, desktopSidebar && styles.desktopContent]}>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    alignSelf: 'center',
    gap: theme.spacing.lg,
    maxWidth: 1180,
    padding: theme.spacing.lg,
    paddingBottom: 112,
    width: '100%'
  },
  desktopContent: {
    paddingBottom: theme.spacing.xxl
  }
});
