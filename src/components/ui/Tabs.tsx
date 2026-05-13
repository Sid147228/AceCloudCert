import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '@/constants/theme';

export type TabItem = {
  id: string;
  label: string;
};

type TabsProps = {
  activeId: string;
  onChange: (id: string) => void;
  tabs: readonly TabItem[];
};

export function Tabs({ activeId, onChange, tabs }: TabsProps) {
  return (
    <View style={styles.tabs}>
      {tabs.map((tab) => (
        <Pressable
          key={tab.id}
          onPress={() => onChange(tab.id)}
          style={[styles.tab, activeId === tab.id && styles.activeTab]}
        >
          <Text style={[styles.label, activeId === tab.id && styles.activeLabel]}>{tab.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  activeLabel: {
    color: theme.colors.background
  },
  activeTab: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary
  },
  label: {
    color: theme.colors.textMuted,
    fontSize: 13,
    fontWeight: '900'
  },
  tab: {
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 9
  },
  tabs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs
  }
});
