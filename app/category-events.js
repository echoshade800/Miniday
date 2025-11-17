import { useState, useEffect } from 'react';
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
import { useAppStore } from '../store/useAppStore';
import { calculateDaysDifference, sortEvents } from '../utils/dateUtils';

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

    return (
      <TouchableOpacity
        style={styles.eventItem}
        onPress={() => router.push(`/details/${item.id}`)}
        onLongPress={() => handleDeleteEvent(item.id, item.title)}>
        <View style={styles.eventContent}>
          <Text style={styles.eventTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.eventDate}>
            {new Date(item.targetDate).toLocaleDateString()}
          </Text>
        </View>
        <View style={[styles.badge, isPast ? styles.pastBadge : styles.futureBadge]}>
          <Text style={styles.badgeText}>
            {isPast ? `${absDay}d ago` : `${absDay}d left`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyTop}>
        <Ionicons name="calendar-outline" size={64} color="#fff" />
      </View>
      <View style={styles.emptyBottom}>
        <Text style={styles.emptyText}>No events in this category yet</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/create-event')}>
          <Text style={styles.addButtonText}>Add Event</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{params.categoryName}</Text>
        <TouchableOpacity onPress={() => router.push('/create-event')}>
          <Ionicons name="add" size={28} color="#2196F3" />
        </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  eventItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 14,
    color: '#999',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  futureBadge: {
    backgroundColor: '#E3F2FD',
  },
  pastBadge: {
    backgroundColor: '#FFF3E0',
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
  },
  emptyTop: {
    flex: 1,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyBottom: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginBottom: 24,
  },
  addButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
