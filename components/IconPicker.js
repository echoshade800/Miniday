import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ICON_DEFINITIONS, ICON_GROUPS, CUSTOM_ICON_KEYS, ICON_LABELS } from './CategoryIcons';
import AnimatedScaleTouchable from './AnimatedScaleTouchable';
import { useTheme } from '../hooks/useTheme';

/**
 * Icon Picker Component
 * Displays a grid of category icons for selection
 */
export default function IconPicker({ selectedIconKey, onSelectIcon, style }) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [showCustomIcons, setShowCustomIcons] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {ICON_GROUPS.map((group) => (
        <View key={group.key} style={styles.groupSection}>
          <Text style={styles.groupLabel}>{group.label}</Text>
          <View style={styles.groupGrid}>
            {group.iconKeys
              .map((key) => ({ key, def: ICON_DEFINITIONS[key] }))
              .filter(({ def }) => !!def)
              .map(({ key, def }) => {
                const IconComponent = def.component;
                const isSelected = selectedIconKey === key;

                return (
                  <View key={`${group.key}-${key}`} style={styles.iconItem}>
                    <AnimatedScaleTouchable
                      style={[
                        styles.iconButton,
                        isSelected && styles.iconButtonActive,
                        { borderColor: theme.colors.divider },
                        isSelected && { borderColor: theme.colors.primary },
                      ]}
                      onPress={() => onSelectIcon(key)}>
                      <View style={styles.iconWrapper}>
                        <IconComponent
                          size={26}
                          color={isSelected ? theme.colors.primary : def.accentColor}
                          strokeWidth={2.6}
                        />
                      </View>
                    </AnimatedScaleTouchable>
                    <Text style={[styles.iconLabel, { color: theme.colors.body }]} numberOfLines={1}>
                      {ICON_LABELS[key] || key}
                    </Text>
                  </View>
                );
              })}
          </View>
        </View>
      ))}
      
      {/* Custom Icons Section */}
      <View style={styles.groupSection}>
        <TouchableOpacity
          style={styles.customHeader}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={() => {
            setShowCustomIcons(!showCustomIcons);
          }}>
          <Text style={styles.groupLabel}>Custom</Text>
          <Ionicons
            name={showCustomIcons ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={theme.colors.body}
          />
        </TouchableOpacity>
        
        {showCustomIcons && (
          <View style={styles.groupGrid}>
            {CUSTOM_ICON_KEYS
              .map((key) => ({ key, def: ICON_DEFINITIONS[key] }))
              .filter(({ def }) => !!def)
              .map(({ key, def }) => {
                const IconComponent = def.component;
                const isSelected = selectedIconKey === key;

                return (
                  <View key={`custom-${key}`} style={styles.iconItem}>
                    <AnimatedScaleTouchable
                      style={[
                        styles.iconButton,
                        isSelected && styles.iconButtonActive,
                        { borderColor: theme.colors.divider },
                        isSelected && { borderColor: theme.colors.primary },
                      ]}
                      onPress={() => onSelectIcon(key)}>
                      <View style={styles.iconWrapper}>
                        <IconComponent
                          size={26}
                          color={isSelected ? theme.colors.primary : def.accentColor}
                          strokeWidth={2.6}
                        />
                      </View>
                    </AnimatedScaleTouchable>
                    <Text style={[styles.iconLabel, { color: theme.colors.body }]} numberOfLines={1}>
                      {ICON_LABELS[key] || key}
                    </Text>
                  </View>
                );
              })}
          </View>
        )}
      </View>
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      gap: 16,
    },
    groupSection: {
      gap: 12,
    },
    groupLabel: {
      ...theme.typography.caption,
      fontWeight: '700',
      color: theme.colors.body,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
    },
    customHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 8,
      minHeight: 44,
    },
    groupGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    iconItem: {
      alignItems: 'center',
      width: 68,
      gap: 6,
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
    iconLabel: {
      fontSize: 11,
      textAlign: 'center',
      maxWidth: 68,
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

