import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../../store/useAppStore';
import { calculateDaysDifference, sortEvents } from '../../utils/dateUtils';

/**
 * Countdowns Screen (Feature A)
 * Purpose: Browse and manage countdowns with category organization
 *
 * Features:
 * - Toggle between "All Events" and "By Category" views
 * - Search functionality
 * - Swipe-to-delete
 * - Navigate to category-specific lists
 *
 * To extend:
 * - Add sorting options (by date, name, category)
 * - Add filtering by date range
 * - Implement batch operations
 */

export default function CountdownsScreen() {
  const router = useRouter();
  const { events, categories, loadEvents, loadCategories, deleteEvent, deleteCategory } =
    useAppStore();
  const [viewMode, setViewMode] = useState('all'); // 'all' or 'categories'
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    loadEvents();
    loadCategories();
  }, []);

  useEffect(() => {
    if (viewMode === 'all') {
      if (searchQuery.trim() === '') {
        setFilteredEvents(sortEvents(events));
      } else {
        const query = searchQuery.toLowerCase();
        const filtered = events.filter((event) =>
          event.title.toLowerCase().includes(query)
        );
        setFilteredEvents(sortEvents(filtered));
      }
    }
  }, [events, searchQuery, viewMode]);

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

  const handleDeleteCategory = (id, name) => {
    Alert.alert(
      'Delete Category',
      `Delete "${name}"? Events will be moved to the default category.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteCategory(id);
          },
        },
      ]
    );
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

  const renderCategoryItem = ({ item }) => {
    const categoryEvents = events.filter((e) => e.categoryId === item.id);
    const upcomingEvent = sortEvents(categoryEvents)[0];

    return (
      <TouchableOpacity
        style={styles.categoryItem}
        onPress={() =>
          router.push({
            pathname: '/category-events',
            params: { categoryId: item.id, categoryName: item.name },
          })
        }
        onLongPress={() => handleDeleteCategory(item.id, item.name)}>
        <View style={styles.categoryIcon}>
          <Text style={styles.categoryEmoji}>{item.icon}</Text>
        </View>
        <View style={styles.categoryContent}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryName}>{item.name}</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{categoryEvents.length}</Text>
            </View>
          </View>
          {upcomingEvent && (
            <Text style={styles.categoryPreview} numberOfLines={1}>
              {upcomingEvent.title}
            </Text>
          )}
        </View>
        <Ionicons name="chevron-forward" size={20} color="#999" />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Countdowns</Text>
        {viewMode === 'categories' && (
          <TouchableOpacity onPress={() => router.push('/create-category')}>
            <Ionicons name="add" size={28} color="#2196F3" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.segmentedControl}>
        <TouchableOpacity
          style={[styles.segment, viewMode === 'all' && styles.activeSegment]}
          onPress={() => setViewMode('all')}>
          <Text
            style={[styles.segmentText, viewMode === 'all' && styles.activeSegmentText]}>
            All Events
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.segment, viewMode === 'categories' && styles.activeSegment]}
          onPress={() => setViewMode('categories')}>
          <Text
            style={[
              styles.segmentText,
              viewMode === 'categories' && styles.activeSegmentText,
            ]}>
            By Category
          </Text>
        </TouchableOpacity>
      </View>

      {viewMode === 'all' && (
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search events..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      )}

      {viewMode === 'all' ? (
        <FlatList
          data={filteredEvents}
          renderItem={renderEventItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="calendar-outline" size={64} color="#ccc" />
              <Text style={styles.emptyText}>
                {searchQuery ? 'No events found' : 'No events yet'}
              </Text>
            </View>
          }
        />
      ) : (
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="folder-outline" size={64} color="#ccc" />
              <Text style={styles.emptyText}>No categories yet</Text>
            </View>
          }
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 12,
    borderRadius: 12,
    padding: 4,
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeSegment: {
    backgroundColor: '#2196F3',
  },
  segmentText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
  },
  activeSegmentText: {
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  listContent: {
    paddingHorizontal: 20,
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
  categoryItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  categoryEmoji: {
    fontSize: 24,
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
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  countBadge: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  countText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  categoryPreview: {
    fontSize: 14,
    color: '#999',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 16,
  },
});
