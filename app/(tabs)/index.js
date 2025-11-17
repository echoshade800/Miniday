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
 * Home (Dashboard) Screen
 * Purpose: Overview of all countdowns with pinned event highlight
 *
 * Features:
 * - Pinned event display (top 1/3)
 * - Search bar for filtering events
 * - Sorted event list (future first, then past)
 * - Swipe-to-delete functionality
 * - Empty/idle states
 *
 * To extend:
 * - Add pull-to-refresh
 * - Add event categories filter
 * - Implement animations for list items
 */

export default function HomeScreen() {
  const router = useRouter();
  const { events, loadEvents, deleteEvent, getPinnedEvent } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredEvents(sortEvents(events));
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = events.filter(event =>
        event.title.toLowerCase().includes(query)
      );
      // Sort by relevance (exact match first, then partial)
      const sorted = filtered.sort((a, b) => {
        const aTitle = a.title.toLowerCase();
        const bTitle = b.title.toLowerCase();
        const aExact = aTitle === query;
        const bExact = bTitle === query;
        if (aExact && !bExact) return -1;
        if (!aExact && bExact) return 1;
        return aTitle.indexOf(query) - bTitle.indexOf(query);
      });
      setFilteredEvents(sorted);
    }
  }, [events, searchQuery]);

  const pinnedEvent = getPinnedEvent();

  const handleDeleteEvent = (id, title) => {
    Alert.alert(
      'Delete Event',
      `Are you sure you want to delete "${title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteEvent(id);
          },
        },
      ]
    );
  };

  const renderPinnedSection = () => {
    if (searchQuery.trim() !== '') return null;

    if (pinnedEvent) {
      const days = calculateDaysDifference(pinnedEvent.targetDate);
      const isPast = days < 0;
      const absDay = Math.abs(days);

      return (
        <TouchableOpacity
          style={[styles.pinnedCard, isPast ? styles.pastCard : styles.futureCard]}
          onPress={() => router.push(`/details/${pinnedEvent.id}`)}
          activeOpacity={0.9}>
          <Text style={styles.pinnedTitle}>{pinnedEvent.title}</Text>
          <Text style={styles.pinnedDays}>{absDay}</Text>
          <Text style={styles.pinnedLabel}>
            {isPast ? `days since` : `days left`}
          </Text>
          <Text style={styles.pinnedDate}>
            {new Date(pinnedEvent.targetDate).toLocaleDateString()}
          </Text>
        </TouchableOpacity>
      );
    }

    if (events.length > 0) {
      return (
        <View style={styles.idleCard}>
          <Ionicons name="pin-outline" size={48} color="#FFA726" />
          <Text style={styles.idleText}>No pinned day yet</Text>
          <Text style={styles.idleSubtext}>Pin an important event from your list</Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyCard}>
        <Ionicons name="calendar-outline" size={64} color="#fff" />
        <Text style={styles.emptyText}>No days yet</Text>
        <TouchableOpacity
          style={styles.emptyButton}
          onPress={() => router.push('/create-event')}>
          <Text style={styles.emptyButtonText}>Add your first day</Text>
        </TouchableOpacity>
      </View>
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

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mini Days</Text>
        <TouchableOpacity onPress={() => router.push('/create-event')}>
          <Ionicons name="add" size={28} color="#2196F3" />
        </TouchableOpacity>
      </View>

      {renderPinnedSection()}

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

      <FlatList
        data={filteredEvents}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          searchQuery.trim() !== '' ? (
            <View style={styles.emptySearch}>
              <Text style={styles.emptySearchText}>No events found</Text>
            </View>
          ) : null
        }
      />
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
  pinnedCard: {
    margin: 20,
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
    minHeight: 200,
    justifyContent: 'center',
  },
  futureCard: {
    backgroundColor: '#2196F3',
  },
  pastCard: {
    backgroundColor: '#FFA726',
  },
  pinnedTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  pinnedDays: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#fff',
  },
  pinnedLabel: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.9,
    marginTop: 8,
  },
  pinnedDate: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginTop: 12,
  },
  idleCard: {
    margin: 20,
    padding: 40,
    borderRadius: 16,
    backgroundColor: '#FFF9E6',
    alignItems: 'center',
    minHeight: 180,
    justifyContent: 'center',
  },
  idleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F57C00',
    marginTop: 16,
  },
  idleSubtext: {
    fontSize: 14,
    color: '#F57C00',
    marginTop: 8,
    opacity: 0.8,
  },
  emptyCard: {
    margin: 20,
    padding: 40,
    borderRadius: 16,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    minHeight: 200,
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginTop: 16,
  },
  emptyButton: {
    marginTop: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 12,
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
  emptySearch: {
    padding: 40,
    alignItems: 'center',
  },
  emptySearchText: {
    fontSize: 16,
    color: '#999',
  },
});
