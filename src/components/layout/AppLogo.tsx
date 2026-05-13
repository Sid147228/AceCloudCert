import { Image, StyleSheet, Text, View } from 'react-native';
import logo from '../../../assets/icon.png';
import { APP_NAME, APP_TAGLINE } from '@/constants/app';
import { theme } from '@/constants/theme';

type AppLogoProps = {
  compact?: boolean;
};

export function AppLogo({ compact = false }: AppLogoProps) {
  return (
    <View style={styles.brand}>
      <Image source={logo} style={compact ? styles.compactLogo : styles.logo} />
      {!compact ? (
        <View>
          <Text style={styles.name}>{APP_NAME}</Text>
          <Text style={styles.tagline}>{APP_TAGLINE}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  brand: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.sm,
    minWidth: 0
  },
  compactLogo: {
    borderRadius: theme.radii.md,
    height: 36,
    width: 36
  },
  logo: {
    borderRadius: theme.radii.md,
    height: 44,
    width: 44
  },
  name: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: '900'
  },
  tagline: {
    color: theme.colors.textMuted,
    fontSize: 12
  }
});
