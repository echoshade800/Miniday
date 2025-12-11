import { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../store/useAppStore';
import AnimatedScaleTouchable from '../components/AnimatedScaleTouchable';
import IconPicker from '../components/IconPicker';
import { CATEGORY_ICON_METADATA } from '../components/CategoryIcons';
import { useTheme } from '../hooks/useTheme';

/**
 * Create Category Screen
 * Purpose: Add new custom countdown categories
 *
 * Features:
 * - Category name input
 * - SVG icon selection
 * - Save and return to categories list
 */

export default function CreateCategoryScreen() {
  const navigation = useNavigation();
  const { addCategory } = useAppStore();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme || {}, insets.top), [theme, insets.top]);
  const [name, setName] = useState('');
  const [selectedIconKey, setSelectedIconKey] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a category name');
      return;
    }

    setLoading(true);

    try {
      await addCategory({
        name: name.trim(),
        iconKey: selectedIconKey,
        // Keep icon for backward compatibility (using first emoji as fallback)
        icon: '🌟',
      });

      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to create category. Please try again.');
      console.error('Create category error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <AnimatedScaleTouchable 
          style={styles.headerAction} 
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.title} />
        </AnimatedScaleTouchable>
        <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">
          New Category
        </Text>
        <View style={styles.headerAction}>
          <Ionicons name="arrow-back" size={24} color="transparent" />
        </View>
      </View>

      <ScrollView 
        style={styles.content}
        nestedScrollEnabled={true}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}>
        <View style={styles.field}>
          <Text style={styles.label}>Category Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Health, Travel, Study"
            value={name}
            onChangeText={setName}
            placeholderTextColor={theme.colors.placeholder}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Icon</Text>
          <IconPicker
            selectedIconKey={selectedIconKey}
            onSelectIcon={setSelectedIconKey}
            style={styles.iconPicker}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <AnimatedScaleTouchable
          style={[styles.saveButton, { borderColor: theme.colors.primary }, loading && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={loading}>
          <Text style={[styles.saveButtonText, { color: theme.colors.primary }]} numberOfLines={1} ellipsizeMode="tail">
            {loading ? 'Creating...' : 'Create Category'}
          </Text>
        </AnimatedScaleTouchable>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (theme, topInset) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: Math.max(16, topInset + 8),
      paddingBottom: 16,
      backgroundColor: theme.colors.surface,
    },
    headerTitle: {
      ...theme.typography.h2,
      color: theme.colors.text,
      flex: 1,
      flexShrink: 1,
      textAlign: 'center',
      marginHorizontal: theme.spacing.md,
    },
    headerAction: {
      paddingHorizontal: theme.spacing.xs,
      paddingVertical: theme.spacing.xs,
      flexShrink: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      flex: 1,
    },
    field: {
      backgroundColor: theme.colors.surface,
      marginTop: 12,
      marginHorizontal: 20,
      paddingHorizontal: 20,
      paddingVertical: 18,
      borderRadius: theme.radii.lg,
      ...theme.shadow.soft,
    },
    label: {
      ...theme.typography.body,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
      textAlign: 'left',
    },
    input: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.radii.md,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md + 2,
      ...theme.typography.body,
      color: theme.colors.text,
      borderWidth: theme.input.borderWidth,
      borderColor: theme.colors.divider,
    },
    iconPicker: {
      marginTop: theme.spacing.sm,
    },
    footer: {
      padding: 20,
      backgroundColor: theme.colors.surface,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    saveButton: {
      paddingVertical: 16,
      borderRadius: theme.radii.lg,
      alignItems: 'center',
      ...theme.shadow.soft,
      borderWidth: 1,
      backgroundColor: 'transparent',
    },
    saveButtonDisabled: {
      opacity: 0.6,
    },
    saveButtonText: {
      ...theme.typography.h3,
      fontWeight: '700',
      flexShrink: 1,
      textAlign: 'center',
    },
  });
