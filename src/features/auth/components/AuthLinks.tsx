import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { SecondaryButton } from '@/components/ui';
import { theme } from '@/constants/theme';

type AuthLinksProps = {
  children?: ReactNode;
  links: readonly {
    label: string;
    onPress: () => void;
  }[];
};

export function AuthLinks({ children, links }: AuthLinksProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        {links.map((link) => (
          <SecondaryButton key={link.label} onPress={link.onPress}>
            {link.label}
          </SecondaryButton>
        ))}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm
  },
  wrap: {
    gap: theme.spacing.sm
  }
});
