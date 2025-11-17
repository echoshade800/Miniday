import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  Platform,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../store/useAppStore';

/**
 * Create/Edit Event Screen (Feature B)
 * Purpose: Add or edit countdown events with all necessary fields
 *
 * Features:
 * - Event name input
 * - Date selection (solar/lunar calendar toggle)
 * - Category selection
 * - Pin toggle (auto-unpins other events)
 * - Repeat rule selection
 * - Reminder toggle
 *
 * To extend:
 * - Implement actual lunar calendar conversion
 * - Add custom repeat patterns
 * - Add reminder time customization
 * - Implement notification scheduling
 */

export default function CreateEventScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { events, categories, addEvent, updateEvent } = useAppStore();

  const isEditing = !!params.id;
  const editingEvent = isEditing ? events.find((e) => e.id === params.id) : null;

  const [title, setTitle] = useState(editingEvent?.title || '');
  const [targetDate, setTargetDate] = useState(
    editingEvent?.targetDate
      ? new Date(editingEvent.targetDate).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0]
  );
  const [calendarType, setCalendarType] = useState('solar');
  const [categoryId, setCategoryId] = useState(editingEvent?.categoryId || '1');
  const [isPinned, setIsPinned] = useState(editingEvent?.isPinned || false);
  const [repeatRule, setRepeatRule] = useState(editingEvent?.repeatRule || 'none');
  const [remind, setRemind] = useState(editingEvent?.remind || false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter an event name');
      return;
    }

    if (!targetDate) {
      Alert.alert('Error', 'Please select a target date');
      return;
    }

    setLoading(true);

    const eventData = {
      title: title.trim(),
      targetDate: new Date(targetDate).toISOString(),
      categoryId,
      isPinned,
      repeatRule,
      remind,
    };

    try {
      if (isEditing) {
        await updateEvent(params.id, eventData);
      } else {
        await addEvent(eventData);
      }

      router.back();
    } catch (error) {
      Alert.alert('Error', 'Failed to save event. Please try again.');
      console.error('Save event error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderCategoryPicker = () => (
    <View style={styles.field}>
      <Text style={styles.label}>Category</Text>
      <View style={styles.optionsContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.optionButton,
              categoryId === category.id && styles.optionButtonActive,
            ]}
            onPress={() => setCategoryId(category.id)}>
            <Text style={styles.categoryEmoji}>{category.icon}</Text>
            <Text
              style={[
                styles.optionText,
                categoryId === category.id && styles.optionTextActive,
              ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderRepeatPicker = () => {
    const options = [
      { value: 'none', label: 'None' },
      { value: 'daily', label: 'Daily' },
      { value: 'weekly', label: 'Weekly' },
      { value: 'monthly', label: 'Monthly' },
    ];

    return (
      <View style={styles.field}>
        <Text style={styles.label}>Repeat</Text>
        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionButton,
                repeatRule === option.value && styles.optionButtonActive,
              ]}
              onPress={() => setRepeatRule(option.value)}>
              <Text
                style={[
                  styles.optionText,
                  repeatRule === option.value && styles.optionTextActive,
                ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isEditing ? 'Edit Event' : 'New Event'}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.field}>
          <Text style={styles.label}>Event Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Anniversary, Birthday"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Target Date *</Text>
          <View style={styles.calendarTypeToggle}>
            <TouchableOpacity
              style={[
                styles.calendarButton,
                calendarType === 'solar' && styles.calendarButtonActive,
              ]}
              onPress={() => setCalendarType('solar')}>
              <Text
                style={[
                  styles.calendarButtonText,
                  calendarType === 'solar' && styles.calendarButtonTextActive,
                ]}>
                Solar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.calendarButton,
                calendarType === 'lunar' && styles.calendarButtonActive,
              ]}
              onPress={() => setCalendarType('lunar')}>
              <Text
                style={[
                  styles.calendarButtonText,
                  calendarType === 'lunar' && styles.calendarButtonTextActive,
                ]}>
                Lunar
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            value={targetDate}
            onChangeText={setTargetDate}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#999"
          />
          {calendarType === 'lunar' && (
            <Text style={styles.hint}>
              Lunar dates will be converted to solar dates
            </Text>
          )}
        </View>

        {renderCategoryPicker()}

        <View style={styles.field}>
          <View style={styles.switchRow}>
            <View>
              <Text style={styles.label}>Pin Event</Text>
              <Text style={styles.hint}>Only one event can be pinned</Text>
            </View>
            <Switch
              value={isPinned}
              onValueChange={setIsPinned}
              trackColor={{ false: '#ddd', true: '#2196F3' }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {renderRepeatPicker()}

        <View style={styles.field}>
          <View style={styles.switchRow}>
            <View>
              <Text style={styles.label}>Reminder</Text>
              <Text style={styles.hint}>Notify at 8:00 AM on event day</Text>
            </View>
            <Switch
              value={remind}
              onValueChange={setRemind}
              trackColor={{ false: '#ddd', true: '#2196F3' }}
              thumbColor="#fff"
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.saveButton, loading && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={loading}
          activeOpacity={0.8}>
          <Text style={styles.saveButtonText}>
            {loading ? 'Saving...' : 'Save Event'}
          </Text>
        </TouchableOpacity>
      </View>
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
  content: {
    flex: 1,
  },
  field: {
    backgroundColor: '#fff',
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  hint: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
  calendarTypeToggle: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 2,
  },
  calendarButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  calendarButtonActive: {
    backgroundColor: '#2196F3',
  },
  calendarButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  calendarButtonTextActive: {
    color: '#fff',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionButtonActive: {
    backgroundColor: '#E3F2FD',
    borderColor: '#2196F3',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  optionTextActive: {
    color: '#2196F3',
  },
  categoryEmoji: {
    fontSize: 18,
    marginRight: 6,
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  saveButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
