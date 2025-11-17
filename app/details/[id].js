import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../../store/useAppStore';
import { calculateDaysDifference, formatDate } from '../../utils/dateUtils';

/**
 * Event Details Screen
 * Purpose: Display full event information with edit/delete actions
 *
 * Features:
 * - Large countdown display (blue for future, yellow for past)
 * - Event details (title, date, weekday)
 * - Edit button (navigates to edit mode)
 * - Delete button (with confirmation)
 *
 * To extend:
 * - Add sharing functionality
 * - Add event history/statistics
 * - Show related events from same category
 * - Add reminder management
 */

export default function DetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { events, categories, deleteEvent } = useAppStore();
  const [event, setEvent] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const foundEvent = events.find((e) => e.id === params.id);
    if (foundEvent) {
      setEvent(foundEvent);
      const foundCategory = categories.find((c) => c.id === foundEvent.categoryId);
      setCategory(foundCategory);
    } else {
      Alert.alert('Error', 'Event not found', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    }
  }, [params.id, events, categories]);

  const handleEdit = () => {
    router.push({
      pathname: '/create-event',
      params: { id: event.id },
    });
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Event',
      `Are you sure you want to delete "${event.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteEvent(event.id);
            router.back();
          },
        },
      ]
    );
  };

  if (!event) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mini Days</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const days = calculateDaysDifference(event.targetDate);
  const isPast = days < 0;
  const absDays = Math.abs(days);
  const formattedDate = formatDate(event.targetDate);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mini Days</Text>
        <TouchableOpacity onPress={handleEdit}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={[styles.mainCard, isPast ? styles.pastCard : styles.futureCard]}>
          <View style={styles.cardHeader}>
            <Text style={styles.eventTitle}>{event.title}</Text>
          </View>

          <View style={styles.countdownContainer}>
            <Text style={styles.countdownNumber}>{absDays}</Text>
            <Text style={styles.countdownLabel}>
              {isPast ? 'days since' : 'days left'}
            </Text>
          </View>

          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>Target date:</Text>
            <Text style={styles.dateValue}>{formattedDate}</Text>
          </View>
        </View>

        <View style={styles.detailsSection}>
          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <Ionicons name="folder-outline" size={20} color="#2196F3" />
              <Text style={styles.detailLabel}>Category</Text>
            </View>
            <View style={styles.detailRight}>
              <Text style={styles.categoryEmoji}>{category?.icon}</Text>
              <Text style={styles.detailValue}>{category?.name || 'Unknown'}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <Ionicons name="pin-outline" size={20} color="#2196F3" />
              <Text style={styles.detailLabel}>Pinned</Text>
            </View>
            <Text style={styles.detailValue}>{event.isPinned ? 'Yes' : 'No'}</Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <Ionicons name="repeat-outline" size={20} color="#2196F3" />
              <Text style={styles.detailLabel}>Repeat</Text>
            </View>
            <Text style={styles.detailValue}>
              {event.repeatRule === 'none'
                ? 'None'
                : event.repeatRule.charAt(0).toUpperCase() + event.repeatRule.slice(1)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <Ionicons name="notifications-outline" size={20} color="#2196F3" />
              <Text style={styles.detailLabel}>Reminder</Text>
            </View>
            <Text style={styles.detailValue}>
              {event.remind ? '8:00 AM on event day' : 'Off'}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
          activeOpacity={0.8}>
          <Ionicons name="trash-outline" size={20} color="#f44336" />
          <Text style={styles.deleteButtonText}>Delete Event</Text>
        </TouchableOpacity>
      </ScrollView>
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
  editButton: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  mainCard: {
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  futureCard: {
    backgroundColor: '#2196F3',
  },
  pastCard: {
    backgroundColor: '#FFA726',
  },
  cardHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  eventTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  countdownContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  countdownNumber: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#fff',
  },
  countdownLabel: {
    fontSize: 20,
    color: '#fff',
    opacity: 0.9,
    marginTop: 8,
  },
  dateContainer: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  dateLabel: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  detailsSection: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  detailRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryEmoji: {
    fontSize: 18,
    marginRight: 6,
  },
  detailValue: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#f44336',
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#f44336',
    fontWeight: '600',
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#999',
  },
});
