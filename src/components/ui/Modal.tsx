import type { ReactNode } from 'react';
import { Modal as NativeModal, Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '@/constants/theme';
import { IconButton } from './IconButton';

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
  title: string;
  visible: boolean;
};

export function Modal({ children, onClose, title, visible }: ModalProps) {
  return (
    <NativeModal animationType="fade" onRequestClose={onClose} transparent visible={visible}>
      <Pressable onPress={onClose} style={styles.overlay}>
        <Pressable style={styles.dialog}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <IconButton accessibilityLabel="Close modal" onPress={onClose}>x</IconButton>
          </View>
          {children}
        </Pressable>
      </Pressable>
    </NativeModal>
  );
}

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    gap: theme.spacing.md,
    maxWidth: 620,
    padding: theme.spacing.lg,
    width: '92%'
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.md,
    justifyContent: 'space-between'
  },
  overlay: {
    alignItems: 'center',
    backgroundColor: theme.colors.overlay,
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing.lg
  },
  title: {
    color: theme.colors.text,
    flex: 1,
    fontSize: 20,
    fontWeight: '900'
  }
});
