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
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../store/useAppStore';
import AnimatedScaleTouchable from '../components/AnimatedScaleTouchable';
import DateTimePicker from '@react-native-community/datetimepicker';
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
  const [pendingTargetDate, setPendingTargetDate] = useState(targetDate);
  const [pendingReminderDate, setPendingReminderDate] = useState(reminderAt);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showDatePicker) {
      setPendingTargetDate(targetDate);
    }
  }, [showDatePicker, targetDate]);

  useEffect(() => {
    if (showReminderPicker) {
      setPendingReminderDate(reminderAt);
    }
  }, [showReminderPicker, reminderAt]);

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

  const handleTargetPickerChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      if (event.type === 'dismissed') {
        setShowDatePicker(false);
        return;
      }
      if (selectedDate) {
        setShowDatePicker(false);
        setTargetDate(selectedDate);
      }
    } else if (selectedDate) {
      setPendingTargetDate(selectedDate);
    }
  };

  const handleReminderPickerChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      if (event.type === 'dismissed') {
        setShowReminderPicker(false);
        return;
      }
      if (selectedDate) {
        setShowReminderPicker(false);
        setReminderAt(selectedDate);
      }
    } else if (selectedDate) {
      setPendingReminderDate(selectedDate);
    }
  };

  const confirmTargetPicker = () => {
    setTargetDate(pendingTargetDate);
    setShowDatePicker(false);
  };

  const cancelTargetPicker = () => {
    setShowDatePicker(false);
    setPendingTargetDate(targetDate);
  };

  const confirmReminderPicker = () => {
    setReminderAt(pendingReminderDate);
    setShowReminderPicker(false);
  };

  const cancelReminderPicker = () => {
    setShowReminderPicker(false);
    setPendingReminderDate(reminderAt);
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
              ]}
              numberOfLines={1}
              ellipsizeMode="tail">
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
                ]}
                numberOfLines={1}
                ellipsizeMode="tail">
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
        <AnimatedScaleTouchable style={styles.headerAction} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.title} />
        </AnimatedScaleTouchable>
        <Text style={[styles.headerTitle, { color: theme.colors.title }]} numberOfLines={1} ellipsizeMode="tail">
          {isEditing ? 'Edit Event' : 'New Event'}
        </Text>
        <View style={styles.headerAction}>
          <Ionicons name="arrow-back" size={24} color="transparent" />
        </View>
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
            <Text
              style={[styles.dateDisplayText, { color: theme.colors.title }]}
              numberOfLines={1}
              ellipsizeMode="tail">
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
            <View style={styles.switchTextGroup}>
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
            <View style={styles.switchTextGroup}>
              <Text style={[styles.label, { color: theme.colors.title }]}>Reminder</Text>
              {remind ? (
                <TouchableOpacity
                  onPress={() => setShowReminderPicker(true)}
                  style={styles.reminderTimeButton}>
                  <Text
                    style={[styles.reminderTimeText, { color: theme.colors.primary }]}
                    numberOfLines={1}
                    ellipsizeMode="tail">
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
          <Text style={[styles.saveButtonText, { color: theme.colors.primary }]} numberOfLines={1} ellipsizeMode="tail">
            {loading ? 'Saving...' : 'Save Event'}
          </Text>
        </AnimatedScaleTouchable>
      </View>

      {Platform.OS === 'android' && showDatePicker && (
        <DateTimePicker
          value={targetDate}
          mode="datetime"
          display="default"
          onChange={handleTargetPickerChange}
        />
      )}

      {Platform.OS === 'ios' && (
        <Modal
          visible={showDatePicker}
          animationType="slide"
          transparent
          presentationStyle="overFullScreen"
          onRequestClose={cancelTargetPicker}>
          <View style={styles.pickerModalWrapper}>
            <TouchableWithoutFeedback onPress={cancelTargetPicker}>
              <View style={styles.pickerModalBackdrop} />
            </TouchableWithoutFeedback>
            <View style={[styles.pickerModalContainer, { backgroundColor: theme.colors.surface }]}>
              <Text style={[styles.pickerModalTitle, { color: theme.colors.title }]}>Select target date</Text>
              <View style={[styles.iosPickerWrapper, { backgroundColor: theme.colors.card }]}>
                <DateTimePicker
                  value={pendingTargetDate}
                  mode="datetime"
                  display="spinner"
                  onChange={handleTargetPickerChange}
                  style={styles.iosPicker}
                  textColor={Platform.OS === 'ios' ? theme.colors.title || '#111827' : undefined}
                />
              </View>
              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.modalActionButton} onPress={cancelTargetPicker}>
                  <Text style={[styles.modalActionText, { color: theme.colors.body }]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalActionButton} onPress={confirmTargetPicker}>
                  <Text style={[styles.modalActionText, { color: theme.colors.primary }]}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {Platform.OS === 'android' && showReminderPicker && (
        <DateTimePicker
          value={reminderAt}
          mode="datetime"
          display="default"
          onChange={handleReminderPickerChange}
        />
      )}

      {Platform.OS === 'ios' && (
        <Modal
          visible={showReminderPicker}
          animationType="slide"
          transparent
          presentationStyle="overFullScreen"
          onRequestClose={cancelReminderPicker}>
          <View style={styles.pickerModalWrapper}>
            <TouchableWithoutFeedback onPress={cancelReminderPicker}>
              <View style={styles.pickerModalBackdrop} />
            </TouchableWithoutFeedback>
            <View style={[styles.pickerModalContainer, { backgroundColor: theme.colors.surface }]}>
              <Text style={[styles.pickerModalTitle, { color: theme.colors.title }]}>Select reminder time</Text>
              <View style={[styles.iosPickerWrapper, { backgroundColor: theme.colors.card }]}>
                <DateTimePicker
                  value={pendingReminderDate}
                  mode="datetime"
                  display="spinner"
                  onChange={handleReminderPickerChange}
                  style={styles.iosPicker}
                  textColor={Platform.OS === 'ios' ? theme.colors.title || '#111827' : undefined}
                />
              </View>
              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.modalActionButton} onPress={cancelReminderPicker}>
                  <Text style={[styles.modalActionText, { color: theme.colors.body }]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalActionButton} onPress={confirmReminderPicker}>
                  <Text style={[styles.modalActionText, { color: theme.colors.primary }]}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
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
      flexShrink: 1,
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
      gap: theme.spacing.sm,
      minWidth: 0,
    },
    dateDisplayText: {
      fontSize: 16,
      flex: 1,
      flexShrink: 1,
    },
    hint: {
      ...theme.typography.caption,
      marginTop: theme.spacing.sm,
      textAlign: 'left',
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
      flexShrink: 1,
      textAlign: 'center',
    },
    calendarButtonTextActive: {
      color: theme.colors.primary,
    },
    switchRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: theme.spacing.lg,
    },
    switchTextGroup: {
      flex: 1,
      minWidth: 0,
    },
    reminderTimeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
      gap: 4,
      flexWrap: 'nowrap',
    },
    reminderTimeText: {
      ...theme.typography.bodySmall,
      fontWeight: '600',
      flexShrink: 1,
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
      columnGap: theme.spacing.xs,
      minWidth: 0,
    },
    optionButtonActive: {
      backgroundColor: theme.colors.accentLight,
      borderColor: theme.colors.primary,
    },
    optionText: {
      ...theme.typography.bodySmall,
      fontWeight: '600',
      color: theme.colors.body,
      flexShrink: 1,
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
      flexShrink: 1,
      textAlign: 'center',
    },
    pickerModalWrapper: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    pickerModalBackdrop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.25)',
    },
    pickerModalContainer: {
      borderTopLeftRadius: theme.radii.xl,
      borderTopRightRadius: theme.radii.xl,
      paddingHorizontal: theme.spacing.xl,
      paddingTop: theme.spacing.lg,
      paddingBottom: theme.spacing.xxl,
      gap: theme.spacing.lg,
      backgroundColor: theme.colors.card,
    },
    pickerModalTitle: {
      ...theme.typography.body,
      fontWeight: '700',
      textAlign: 'center',
    },
    iosPicker: {
      marginVertical: -theme.spacing.md,
    },
    iosPickerWrapper: {
      borderRadius: theme.radii.lg,
      overflow: 'hidden',
      paddingVertical: theme.spacing.xs,
    },
    modalActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: theme.spacing.md,
    },
    modalActionButton: {
      flex: 1,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.radii.md,
      borderWidth: 1,
      borderColor: theme.colors.divider,
      alignItems: 'center',
    },
    modalActionText: {
      ...theme.typography.body,
      fontWeight: '600',
    },
  });
