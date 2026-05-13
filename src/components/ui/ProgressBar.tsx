import type { DimensionValue } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { theme } from '@/constants/theme';
import { formatPercent } from '@/utils/format';

type ProgressBarProps = {
  value: number;
};

export function ProgressBar({ value }: ProgressBarProps) {
  const width = formatPercent(value) as DimensionValue;

  return (
    <View accessibilityLabel={`Progress ${formatPercent(value)}`} style={styles.track}>
      <View style={[styles.fill, { width }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radii.md,
    height: '100%'
  },
  track: {
    backgroundColor: '#1F2937',
    borderRadius: theme.radii.md,
    height: 8,
    overflow: 'hidden'
  }
});
