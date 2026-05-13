import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { theme } from '@/constants/theme';

export type TableColumn<Row> = {
  key: string;
  minWidth?: number;
  render: (row: Row) => ReactNode;
  title: string;
};

type TableProps<Row> = {
  columns: readonly TableColumn<Row>[];
  getRowKey: (row: Row) => string;
  rows: readonly Row[];
};

export function Table<Row>({ columns, getRowKey, rows }: TableProps<Row>) {
  return (
    <ScrollView horizontal style={styles.wrap}>
      <View style={styles.table}>
        <View style={styles.headerRow}>
          {columns.map((column) => (
            <Text key={column.key} style={[styles.headerCell, { minWidth: column.minWidth ?? 160 }]}>
              {column.title}
            </Text>
          ))}
        </View>
        {rows.map((row) => (
          <View key={getRowKey(row)} style={styles.row}>
            {columns.map((column) => (
              <View key={column.key} style={[styles.cell, { minWidth: column.minWidth ?? 160 }]}>
                {column.render(row)}
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cell: {
    justifyContent: 'center',
    padding: theme.spacing.md
  },
  headerCell: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: '900',
    padding: theme.spacing.md,
    textTransform: 'uppercase'
  },
  headerRow: {
    backgroundColor: theme.colors.surface,
    borderBottomColor: theme.colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row'
  },
  row: {
    borderBottomColor: theme.colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row'
  },
  table: {
    minWidth: '100%'
  },
  wrap: {
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    borderWidth: 1
  }
});
