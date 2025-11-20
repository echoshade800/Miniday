import { useState, useEffect, useMemo } from 'react';
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
import AnimatedScaleTouchable from '../components/AnimatedScaleTouchable';
import DateTimeWheelPicker from '../components/DateTimeWheelPicker';
import ReminderTimePicker from '../components/ReminderTimePicker';
import { scheduleEventNotification, cancelEventNotifications, requestNotificationPermissions } from '../utils/notificationUtils';
import { useTheme } from '../hooks/useTheme';

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
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const isEditing = !!params.id;
  const editingEvent = isEditing ? events.find((e) => e.id === params.id) : null;

  const [title, setTitle] = useState(editingEvent?.title || '');
  const [targetDate, setTargetDate] = useState(
    editingEvent?.targetDate
      ? new Date(editingEvent.targetDate)
      : new Date()
  );
  const [calendarType, setCalendarType] = useState('solar');
  const [categoryId, setCategoryId] = useState(editingEvent?.categoryId || '1');
  const [isPinned, setIsPinned] = useState(editingEvent?.isPinned || false);
  const [repeatRule, setRepeatRule] = useState(editingEvent?.repeatRule || 'none');
  const [remind, setRemind] = useState(editingEvent?.remind || false);
  const [reminderAt, setReminderAt] = useState(
    editingEvent?.reminderAt
      ? new Date(editingEvent.reminderAt)
      : (() => {
          const defaultReminder = new Date(targetDate);
          defaultReminder.setHours(8, 0, 0, 0);
          return defaultReminder;
        })()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showReminderPicker, setShowReminderPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter event name');
      return;
    }

    if (!targetDate) {
      Alert.alert('Error', 'Please select target date');
      return;
    }

    setLoading(true);

    const eventData = {
      title: title.trim(),
      targetDate: targetDate.toISOString(),
      categoryId,
      isPinned,
      repeatRule,
      remind,
      reminderAt: remind ? reminderAt.toISOString() : null,
    };

    try {
      let savedEvent;
      if (isEditing) {
        // Cancel old notifications
        await cancelEventNotifications(params.id);
        savedEvent = await updateEvent(params.id, eventData);
      } else {
        savedEvent = await addEvent(eventData);
      }

      // Schedule notifications if reminder is enabled
      if (savedEvent && remind) {
        const hasPermission = await requestNotificationPermissions();
        if (hasPermission) {
          await scheduleEventNotification({
            ...savedEvent,
            reminderAt: reminderAt.toISOString(),
            repeat: repeatRule,
          });
        }
      }

      router.back();
    } catch (error) {
      Alert.alert('Error', 'Failed to save event, please try again');
      console.error('Save event error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDateDisplay = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${month}/${day}/${year} ${hours}:${minutes}`;
  };

  const formatReminderDisplay = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${month}/${day}/${year} ${hours}:${minutes}`;
  };

  const renderCategoryPicker = () => (
    <View style={[styles.field, { backgroundColor: theme.colors.surface }]}>
      <Text style={[styles.label, { color: theme.colors.title }]}>Category</Text>
      <View style={styles.optionsContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[styles.optionButton, categoryId === category.id && styles.optionButtonActive]}
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
        <AnimatedScaleTouchable
          style={[styles.addCategoryButton, { borderColor: theme.colors.divider }]}
          onPress={() => router.push('/create-category')}>
          <Ionicons name="add" size={20} color={theme.colors.primary} />
        </AnimatedScaleTouchable>
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
      <View style={[styles.field, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.label, { color: theme.colors.title }]}>Repeat</Text>
        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[styles.optionButton, repeatRule === option.value && styles.optionButtonActive]}
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
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <AnimatedScaleTouchable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.title} />
        </AnimatedScaleTouchable>
        <Text style={[styles.headerTitle, { color: theme.colors.title }]}>
          {isEditing ? 'Edit Event' : 'New Event'}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={[styles.field, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.label, { color: theme.colors.title }]}>Event Name *</Text>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: theme.colors.card, borderColor: theme.colors.divider, color: theme.colors.title },
            ]}
            placeholder="e.g., Anniversary, Birthday"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor={theme.colors.placeholder}
          />
        </View>

        <View style={[styles.field, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.label, { color: theme.colors.title }]}>Target Date & Time *</Text>
          <View style={[styles.calendarTypeToggle, { backgroundColor: theme.colors.surfaceAlt }]}>
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
          <TouchableOpacity
            style={[styles.input, { backgroundColor: theme.colors.card, borderColor: theme.colors.divider }]}
            onPress={() => setShowDatePicker(true)}>
            <Text style={[styles.dateDisplayText, { color: theme.colors.title }]}>
              {formatDateDisplay(targetDate)}
            </Text>
            <Ionicons name="calendar-outline" size={20} color={theme.colors.body} />
          </TouchableOpacity>
          {calendarType === 'lunar' && (
            <Text style={[styles.hint, { color: theme.colors.body }]}>
              Lunar date will be converted to solar date
            </Text>
          )}
        </View>

        {renderCategoryPicker()}

        <View style={[styles.field, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.switchRow}>
            <View>
              <Text style={[styles.label, { color: theme.colors.title }]}>Pin Event</Text>
              <Text style={[styles.hint, { color: theme.colors.body }]}>Only one event can be pinned</Text>
            </View>
            <Switch
              value={isPinned}
              onValueChange={setIsPinned}
              trackColor={{ false: theme.colors.divider, true: theme.colors.primary }}
              thumbColor={theme.colors.card}
            />
          </View>
        </View>

        {renderRepeatPicker()}

        <View style={[styles.field, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.switchRow}>
            <View>
              <Text style={[styles.label, { color: theme.colors.title }]}>Reminder</Text>
              {remind ? (
                <TouchableOpacity
                  onPress={() => setShowReminderPicker(true)}
                  style={styles.reminderTimeButton}>
                  <Text style={[styles.reminderTimeText, { color: theme.colors.primary }]}>
                    {formatReminderDisplay(reminderAt)}
                  </Text>
                  <Ionicons name="time-outline" size={16} color={theme.colors.primary} />
                </TouchableOpacity>
              ) : (
                <Text style={[styles.hint, { color: theme.colors.body }]}>
                  Remind on event day
                </Text>
              )}
            </View>
            <Switch
              value={remind}
              onValueChange={setRemind}
              trackColor={{ false: theme.colors.divider, true: theme.colors.primary }}
              thumbColor={theme.colors.card}
            />
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: theme.colors.surface, borderTopColor: theme.colors.border }]}>
        <AnimatedScaleTouchable
          style={[styles.saveButton, { borderColor: theme.colors.primary }, loading && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={loading}>
          <Text style={[styles.saveButtonText, { color: theme.colors.primary }]}>
            {loading ? 'Saving...' : 'Save Event'}
          </Text>
        </AnimatedScaleTouchable>
      </View>

      <DateTimeWheelPicker
        value={targetDate}
        onChange={(date) => setTargetDate(date)}
        visible={showDatePicker}
        onClose={() => setShowDatePicker(false)}
      />

      <ReminderTimePicker
        value={reminderAt}
        onChange={(date) => setReminderAt(date)}
        visible={showReminderPicker}
        onClose={() => setShowReminderPicker(false)}
      />
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
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    headerTitle: {
      ...theme.typography.h2,
    },
    content: {
      flex: 1,
    },
    field: {
      marginTop: theme.spacing.md,
      marginHorizontal: theme.spacing.xl,
      paddingHorizontal: theme.spacing.xl,
      paddingVertical: theme.spacing.lg + 2,
      borderRadius: theme.radii.lg,
      ...theme.shadow.card,
    },
    label: {
      ...theme.typography.body,
      fontWeight: '700',
      marginBottom: theme.spacing.md,
    },
    input: {
      borderRadius: theme.radii.md,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md + 2,
      ...theme.typography.body,
      borderWidth: theme.input.borderWidth,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    dateDisplayText: {
      fontSize: 16,
    },
    hint: {
      ...theme.typography.caption,
      marginTop: theme.spacing.sm,
    },
    calendarTypeToggle: {
      flexDirection: 'row',
      marginBottom: theme.spacing.md,
      borderRadius: theme.radii.md,
      padding: theme.spacing.xs,
    },
    calendarButton: {
      flex: 1,
      paddingVertical: theme.spacing.sm + 2,
      alignItems: 'center',
      borderRadius: theme.radii.sm,
      borderWidth: 1,
      borderColor: theme.colors.divider,
      backgroundColor: 'transparent',
    },
    calendarButtonActive: {
      backgroundColor: theme.colors.accentLight,
      borderColor: theme.colors.primary,
    },
    calendarButtonText: {
      ...theme.typography.bodySmall,
      fontWeight: '600',
      color: theme.colors.body,
    },
    calendarButtonTextActive: {
      color: theme.colors.primary,
    },
    switchRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    reminderTimeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
      gap: 4,
    },
    reminderTimeText: {
      ...theme.typography.bodySmall,
      fontWeight: '600',
    },
    optionsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.sm,
    },
    optionButton: {
      paddingVertical: theme.spacing.sm + 2,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.radii.md,
      borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surfaceAlt,
      borderColor: theme.colors.divider,
    },
    optionButtonActive: {
      backgroundColor: theme.colors.accentLight,
      borderColor: theme.colors.primary,
    },
    optionText: {
      ...theme.typography.bodySmall,
      fontWeight: '600',
      color: theme.colors.body,
    },
    optionTextActive: {
      color: theme.colors.primary,
    },
    categoryEmoji: {
      fontSize: 18,
      marginRight: 6,
    },
    addCategoryButton: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 20,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 56,
      height: 40,
      backgroundColor: 'transparent',
    },
    footer: {
      padding: 20,
      borderTopWidth: 1,
    },
    saveButton: {
      paddingVertical: theme.spacing.lg,
      borderRadius: theme.radii.lg,
      alignItems: 'center',
      ...theme.shadow.card,
      borderWidth: 1,
      backgroundColor: 'transparent',
    },
    saveButtonDisabled: {
      opacity: 0.6,
    },
    saveButtonText: {
      ...theme.typography.h3,
      fontWeight: '700',
    },
  });
