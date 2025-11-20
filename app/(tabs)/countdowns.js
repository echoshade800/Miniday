import { useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppStore } from '../../store/useAppStore';
import { sortEvents } from '../../utils/dateUtils';
import AnimatedScaleTouchable from '../../components/AnimatedScaleTouchable';
import { getCategoryGradient } from '../../utils/theme';
import { useTheme } from '../../hooks/useTheme';

/**
 * Countdowns Screen
 * Purpose: Browse and manage countdowns with category organization
 */
export default function CountdownsScreen() {
  const router = useRouter();
  const { events, categories, loadEvents, loadCategories, deleteCategory, darkMode } =
    useAppStore();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  useEffect(() => {
    loadEvents();
    loadCategories();
  }, []);

  const handleDeleteCategory = (id, name) => {
    Alert.alert('Delete Category', `Delete "${name}"? Events will be moved to default category.`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteCategory(id);
        },
      },
    ]);
  };

  const renderCategoryItem = ({ item, index }) => {
    const categoryEvents = events.filter((e) => e.categoryId === item.id);
    const upcomingEvent = sortEvents(categoryEvents)[0];
    const gradient = getCategoryGradient(index, darkMode);

    return (
      <AnimatedScaleTouchable
        style={styles.categoryTouchable}
        onPress={() =>
          router.push({
            pathname: '/category-events',
            params: { categoryId: item.id, categoryName: item.name },
          })
        }
        onLongPress={() => handleDeleteCategory(item.id, item.name)}>
        <LinearGradient colors={gradient} style={styles.categoryItem}>
          <View style={styles.categoryEmojiWrapper}>
            <Text style={styles.categoryEmoji}>{item.icon || '🧁'}</Text>
          </View>
          <View style={styles.categoryContent}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryName}>{item.name}</Text>
              <View style={styles.countBadge}>
                <Text style={styles.countText}>{categoryEvents.length}</Text>
              </View>
            </View>
            {upcomingEvent ? (
              <Text style={styles.categoryPreview} numberOfLines={1}>
                Next: {upcomingEvent.title}
              </Text>
            ) : (
              <Text style={styles.categoryPreview}>No events</Text>
            )}
          </View>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.primaryDark || theme.colors.primary} />
        </LinearGradient>
      </AnimatedScaleTouchable>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Mini Days</Text>
        <AnimatedScaleTouchable
          style={[styles.addCategoryButton, { borderColor: theme.colors.primary, position: 'absolute', right: 10 }]}
          onPress={() => router.push('/create-category')}>
          <Ionicons name="add" size={20} color={theme.colors.primary} />
        </AnimatedScaleTouchable>
      </View>

      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="folder-outline" size={64} color={theme.colors.textMuted} />
            <Text style={[styles.emptyText, { color: theme.colors.textMuted }]}>No categories yet</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />

      <AnimatedScaleTouchable
        style={[styles.fab, { borderColor: theme.colors.primary, backgroundColor: theme.colors.card }]}
        onPress={() => router.push('/create-event')}>
        <Ionicons name="add" size={36} color={theme.colors.primary} />
      </AnimatedScaleTouchable>
    </SafeAreaView>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingTop: 12,
      paddingBottom: 8,
      position: 'relative',
    },
    headerTitle: {
      ...theme.typography.h1,
      textAlign: 'center',
    },
    addCategoryButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.shadow.card,
      borderWidth: 1,
      backgroundColor: 'transparent',
    },
    listContent: {
      paddingHorizontal: theme.spacing.xl,
      paddingBottom: 120,
      paddingTop: theme.spacing.md,
    },
    categoryTouchable: {
      borderRadius: theme.radii.lg,
      marginBottom: theme.spacing.md + 2,
      ...theme.shadow.card,
    },
    categoryItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing.xl,
      borderRadius: theme.radii.lg,
    },
    categoryEmojiWrapper: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: theme.colors.accentLight,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 16,
    },
    categoryEmoji: {
      fontSize: 28,
    },
    categoryContent: {
      flex: 1,
    },
    categoryHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    categoryName: {
      ...theme.typography.body,
      fontWeight: '700',
      color: theme.colors.title,
      marginRight: theme.spacing.sm,
    },
    countBadge: {
      backgroundColor: theme.colors.accentLight,
      paddingHorizontal: theme.spacing.sm + 2,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.radii.md,
    },
    countText: {
      ...theme.typography.caption,
      fontWeight: '700',
      color: theme.colors.primaryDark || theme.colors.primary,
    },
    categoryPreview: {
      ...theme.typography.bodySmall,
      color: theme.colors.body,
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 60,
    },
    emptyText: {
      ...theme.typography.body,
      marginTop: theme.spacing.lg,
    },
    fab: {
      position: 'absolute',
      bottom: 96,
      right: theme.spacing.lg,
      width: 77,
      height: 77,
      borderRadius: 38.5,
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.shadow.floating,
      borderWidth: 1.5,
    },
  });
