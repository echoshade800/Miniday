import { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppStore } from '../store/useAppStore';
import { calculateDaysDifference, sortEvents } from '../utils/dateUtils';
import { getPastelCard } from '../theme';
import AnimatedScaleTouchable from '../components/AnimatedScaleTouchable';
import { useTheme } from '../hooks/useTheme';

/**
 * Category Events Screen
 * Purpose: Display all events within a specific category
 *
 * Features:
 * - Filtered event list by category
 * - Sorted by date (future first, past second)
 * - Empty state when no events
 * - Navigate to event details
 * - Delete events
 *
 * To extend:
 * - Add category-specific statistics
 * - Add batch operations
 * - Add export category data
 */

export default function CategoryEventsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { events, deleteEvent } = useAppStore();
  const [categoryEvents, setCategoryEvents] = useState([]);
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  useEffect(() => {
    const filtered = events.filter((e) => e.categoryId === params.categoryId);
    setCategoryEvents(sortEvents(filtered));
  }, [events, params.categoryId]);

  const handleDeleteEvent = (id, title) => {
    Alert.alert('Delete Event', `Are you sure you want to delete "${title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteEvent(id);
        },
      },
    ]);
  };

  const renderEventItem = ({ item }) => {
    const days = calculateDaysDifference(item.targetDate);
    const isPast = days < 0;
    const absDay = Math.abs(days);
    const pastel = getPastelCard(item.id);

    return (
      <AnimatedScaleTouchable
        style={[styles.eventItem, { backgroundColor: pastel.backgroundColor }]}
        onPress={() => router.push(`/details/${item.id}`)}
        onLongPress={() => handleDeleteEvent(item.id, item.title)}>
        <View style={styles.eventContent}>
          <Text style={styles.eventTitle} numberOfLines={1} ellipsizeMode="tail">
            {item.title}
          </Text>
          <Text style={styles.eventDate} numberOfLines={1} ellipsizeMode="tail">
            {new Date(item.targetDate).toLocaleDateString()}
          </Text>
        </View>
        <View style={[styles.badge, isPast ? styles.pastBadge : styles.futureBadge]}>
          <Text style={styles.badgeText} numberOfLines={1} ellipsizeMode="tail">
            {isPast ? `${absDay}d ago` : `${absDay}d left`}
          </Text>
        </View>
      </AnimatedScaleTouchable>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <LinearGradient colors={[theme.colors.card, theme.colors.accentLight]} style={styles.emptyTop}>
        <Ionicons name="calendar-outline" size={64} color={theme.colors.primary} />
        <Text style={styles.emptyTopEmoji}>✨</Text>
      </LinearGradient>
      <View style={styles.emptyBottom}>
        <Text style={styles.emptyText}>No events in this category yet</Text>
        <AnimatedScaleTouchable style={styles.addButton} onPress={() => router.push('/create-event')}>
          <Text style={styles.addButtonText} numberOfLines={1} ellipsizeMode="tail">
            Add Event
          </Text>
        </AnimatedScaleTouchable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <AnimatedScaleTouchable style={styles.headerAction} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.title} />
        </AnimatedScaleTouchable>
        <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">
          {params.categoryName}
        </Text>
        <AnimatedScaleTouchable style={styles.headerAction} onPress={() => router.push('/create-event')}>
          <Ionicons name="add" size={28} color={theme.colors.primary} />
        </AnimatedScaleTouchable>
      </View>

      {categoryEvents.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={categoryEvents}
          renderItem={renderEventItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
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
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.divider,
    },
    headerTitle: {
      ...theme.typography.h2,
      color: theme.colors.title,
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
    listContent: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 20,
    },
    eventItem: {
      flexDirection: 'row',
      padding: 18,
      borderRadius: theme.radii.lg,
      marginBottom: 12,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.divider,
      ...theme.shadow.soft,
    },
    eventContent: {
      flex: 1,
      minWidth: 0,
    },
    eventTitle: {
      ...theme.typography.body,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
      flexShrink: 1,
    },
    eventDate: {
      ...theme.typography.bodySmall,
      color: theme.colors.textMuted,
      flexShrink: 1,
    },
    badge: {
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: theme.radii.md,
      marginLeft: theme.spacing.md,
      flexShrink: 0,
    },
    futureBadge: {
      backgroundColor: theme.colors.accentLight,
    },
    pastBadge: {
      backgroundColor: theme.colors.surfaceAlt,
    },
    badgeText: {
      ...theme.typography.caption,
      fontWeight: '600',
      color: theme.colors.primaryDark || theme.colors.primary,
      flexShrink: 1,
      textAlign: 'center',
    },
    emptyContainer: {
      flex: 1,
    },
    emptyTop: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderTopLeftRadius: theme.radii.xl,
      borderTopRightRadius: theme.radii.xl,
      overflow: 'hidden',
    },
    emptyTopEmoji: {
      fontSize: 32,
      marginTop: 12,
    },
    emptyBottom: {
      flex: 2,
      backgroundColor: theme.colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 40,
      borderBottomLeftRadius: theme.radii.xl,
      borderBottomRightRadius: theme.radii.xl,
      borderWidth: 1,
      borderColor: theme.colors.divider,
      borderTopWidth: 0,
    },
    emptyText: {
      ...theme.typography.body,
      color: theme.colors.textMuted,
      textAlign: 'center',
      marginBottom: theme.spacing.lg,
      fontWeight: '600',
    },
    addButton: {
      paddingHorizontal: theme.spacing['2xl'],
      paddingVertical: theme.spacing.md + 2,
      borderRadius: theme.radii.lg,
      ...theme.shadow.card,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      backgroundColor: 'transparent',
    },
    addButtonText: {
      ...theme.typography.body,
      fontWeight: '700',
      color: theme.colors.primary,
      flexShrink: 1,
      textAlign: 'center',
    },
  });
