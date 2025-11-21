import { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../store/useAppStore';
import AnimatedScaleTouchable from '../components/AnimatedScaleTouchable';
import { useTheme } from '../hooks/useTheme';

/**
 * Create Category Screen
 * Purpose: Add new custom countdown categories
 *
 * Features:
 * - Category name input
 * - Emoji/icon selection
 * - Save and return to categories list
 *
 * To extend:
 * - Add more icon options
 * - Add custom color selection
 * - Add category templates
 * - Add category sorting order
 */

const EMOJI_OPTIONS = [
  '🌟', '💼', '🎉', '❤️', '🎂', '🎓',
  '✈️', '🏠', '💪', '📚', '🎮', '🎵',
  '🍕', '☕', '🌈', '⭐', '🔥', '💡',
  '🎨', '📱', '⚽', '🎯', '🌸', '🌙',
];

export default function CreateCategoryScreen() {
  const router = useRouter();
  const { addCategory } = useAppStore();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [name, setName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('🌟');
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
        icon: selectedIcon,
      });

      router.back();
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
        <AnimatedScaleTouchable style={styles.headerAction} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.title} />
        </AnimatedScaleTouchable>
        <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">
          New Category
        </Text>
        <View style={styles.headerAction}>
          <Ionicons name="arrow-back" size={24} color="transparent" />
        </View>
      </View>

      <ScrollView style={styles.content}>
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
          <View style={styles.iconGrid}>
            {EMOJI_OPTIONS.map((emoji) => (
              <AnimatedScaleTouchable
                key={emoji}
                style={[
                  styles.iconButton,
                  selectedIcon === emoji && styles.iconButtonActive,
                ]}
                onPress={() => setSelectedIcon(emoji)}>
                <Text style={styles.iconEmoji}>{emoji}</Text>
              </AnimatedScaleTouchable>
            ))}
          </View>
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

const createStyles = (theme) =>
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
      paddingVertical: 16,
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
    iconGrid: {
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
      borderColor: theme.colors.divider,
    },
    iconButtonActive: {
      backgroundColor: theme.colors.accentLight,
      borderColor: theme.colors.primary,
    },
    iconEmoji: {
      fontSize: 28,
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
