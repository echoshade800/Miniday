import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import WheelPicker from './WheelPicker';
import { useTheme } from '../hooks/useTheme';

/**
 * Reminder Time Picker (5 columns: Year, Month, Day, Hour, Minute)
 */
export default function ReminderTimePicker({
  value,
  onChange,
  visible,
  onClose,
}) {
  const [selectedDate, setSelectedDate] = useState(
    value ? new Date(value) : new Date()
  );
  const theme = useTheme();

  useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value));
    } else {
      setSelectedDate(new Date());
    }
  }, [value, visible]);

  // Generate year options (current year to +10 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => {
    const year = currentYear + i;
    return { value: year, label: year.toString() };
  });

  // Generate month options
  const months = [
    { value: 1, label: 'Jan' },
    { value: 2, label: 'Feb' },
    { value: 3, label: 'Mar' },
    { value: 4, label: 'Apr' },
    { value: 5, label: 'May' },
    { value: 6, label: 'Jun' },
    { value: 7, label: 'Jul' },
    { value: 8, label: 'Aug' },
    { value: 9, label: 'Sep' },
    { value: 10, label: 'Oct' },
    { value: 11, label: 'Nov' },
    { value: 12, label: 'Dec' },
  ];

  // Generate day options based on selected year and month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const getDayOptions = () => {
    const daysInMonth = getDaysInMonth(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1
    );
    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      return { value: day, label: day.toString() };
    });
  };

  // Generate hour options (0-23)
  const hours = Array.from({ length: 24 }, (_, i) => {
    return { value: i, label: i.toString().padStart(2, '0') };
  });

  // Generate minute options (0-59)
  const minutes = Array.from({ length: 60 }, (_, i) => {
    return { value: i, label: i.toString().padStart(2, '0') };
  });

  const handleYearChange = (year) => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(year);
    const maxDay = getDaysInMonth(year, newDate.getMonth() + 1);
    if (newDate.getDate() > maxDay) {
      newDate.setDate(maxDay);
    }
    setSelectedDate(newDate);
  };

  const handleMonthChange = (month) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(month - 1);
    const maxDay = getDaysInMonth(newDate.getFullYear(), month);
    if (newDate.getDate() > maxDay) {
      newDate.setDate(maxDay);
    }
    setSelectedDate(newDate);
  };

  const handleDayChange = (day) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(day);
    setSelectedDate(newDate);
  };

  const handleHourChange = (hour) => {
    const newDate = new Date(selectedDate);
    newDate.setHours(hour);
    setSelectedDate(newDate);
  };

  const handleMinuteChange = (minute) => {
    const newDate = new Date(selectedDate);
    newDate.setMinutes(minute);
    setSelectedDate(newDate);
  };

  const handleConfirm = () => {
    if (onChange) {
      onChange(selectedDate);
    }
    onClose();
  };

  const dayOptions = getDayOptions();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
          <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
            <TouchableOpacity onPress={onClose}>
              <Text style={[styles.cancelButton, { color: theme.colors.body }]}>Cancel</Text>
            </TouchableOpacity>
            <Text style={[styles.title, { color: theme.colors.title }]}>Select Reminder Time</Text>
            <TouchableOpacity onPress={handleConfirm}>
              <Text style={[styles.confirmButton, { color: theme.colors.primary }]}>Confirm</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.pickerContainer}>
            <View style={styles.column}>
              <Text style={[styles.columnLabel, { color: theme.colors.body }]}>Year</Text>
              <WheelPicker
                value={selectedDate.getFullYear()}
                onChange={handleYearChange}
                items={years}
                style={styles.wheel}
              />
            </View>

            <View style={styles.column}>
              <Text style={[styles.columnLabel, { color: theme.colors.body }]}>Month</Text>
              <WheelPicker
                value={selectedDate.getMonth() + 1}
                onChange={handleMonthChange}
                items={months}
                style={styles.wheel}
              />
            </View>

            <View style={styles.column}>
              <Text style={[styles.columnLabel, { color: theme.colors.body }]}>Day</Text>
              <WheelPicker
                value={selectedDate.getDate()}
                onChange={handleDayChange}
                items={dayOptions}
                style={styles.wheel}
              />
            </View>

            <View style={styles.column}>
              <Text style={[styles.columnLabel, { color: theme.colors.body }]}>Hour</Text>
              <WheelPicker
                value={selectedDate.getHours()}
                onChange={handleHourChange}
                items={hours}
                style={styles.wheel}
              />
            </View>

            <View style={styles.column}>
              <Text style={[styles.columnLabel, { color: theme.colors.body }]}>Min</Text>
              <WheelPicker
                value={selectedDate.getMinutes()}
                onChange={handleMinuteChange}
                items={minutes}
                style={styles.wheel}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  cancelButton: {
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  confirmButton: {
    fontSize: 16,
    fontWeight: '700',
  },
  pickerContainer: {
    flexDirection: 'row',
    height: 250,
    paddingVertical: 20,
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  columnLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  wheel: {
    flex: 1,
    width: '100%',
  },
});

