import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { CATEGORY_ICON_METADATA } from './CategoryIcons';
import AnimatedScaleTouchable from './AnimatedScaleTouchable';
import { useTheme } from '../hooks/useTheme';

/**
 * Icon Picker Component
 * Displays a grid of category icons for selection
 */
export default function IconPicker({ selectedIconKey, onSelectIcon, style }) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={[styles.container, style]}>
      {CATEGORY_ICON_METADATA.map(({ key, label, icon: IconComponent }) => (
        <AnimatedScaleTouchable
          key={key}
          style={[
            styles.iconButton,
            selectedIconKey === key && styles.iconButtonActive,
            { borderColor: theme.colors.divider },
            selectedIconKey === key && { borderColor: theme.colors.primary },
          ]}
          onPress={() => onSelectIcon(key)}>
          <View style={styles.iconWrapper}>
            <IconComponent size={56} />
          </View>
        </AnimatedScaleTouchable>
      ))}
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    iconButton: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: theme.colors.card,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
    },
    iconButtonActive: {
      backgroundColor: theme.colors.accentLight,
    },
    iconWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      borderRadius: 28,
    },
  });

