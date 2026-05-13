import { StyleSheet, Text, View } from 'react-native';
import { theme } from '@/constants/theme';

type SectionHeaderProps = {
  eyebrow?: string;
  subtitle?: string;
  title: string;
};

export function SectionHeader({ eyebrow, subtitle, title }: SectionHeaderProps) {
  return (
    <View style={styles.header}>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  eyebrow: {
    color: theme.colors.primary,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
    textTransform: 'uppercase'
  },
  header: {
    gap: theme.spacing.xs
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
    maxWidth: 760
  },
  title: {
    color: theme.colors.text,
    fontSize: 26,
    fontWeight: '900',
    lineHeight: 32
  }
});
