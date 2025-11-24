import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

/**
 * Request notification permissions
 */
export async function requestNotificationPermissions() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.warn('Notification permissions not granted');
    return false;
  }

  // Configure Android channel
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'MiniDays Reminders',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#2BA29A',
    });
  }

  return true;
}

/**
 * Schedule a notification for an event
 */
export async function scheduleEventNotification(event) {
  try {
    // Cancel existing notifications for this event
    await cancelEventNotifications(event.id);

    // If reminder is off, don't schedule
    if (!event.remind || !event.reminderAt) {
      return;
    }

    const reminderDate = new Date(event.reminderAt);
    const now = new Date();

    // If reminder time has passed and it's not a repeating event, don't schedule
    if (reminderDate < now && event.repeat === 'none') {
      return;
    }

    const notificationContent = {
      title: '📌 MiniDays 提醒你：',
      body: `「${event.title}」将在今天发生！\n时间：${formatNotificationDate(reminderDate)}`,
      data: { eventId: event.id },
      sound: true,
    };

    if (event.repeat === 'none') {
      // One-time notification
      if (reminderDate > now) {
        await Notifications.scheduleNotificationAsync({
          content: notificationContent,
          trigger: reminderDate,
          identifier: `event-${event.id}`,
        });
      }
    } else {
      // Repeating notification
      let trigger = null;

      if (event.repeat === 'daily') {
        trigger = {
          hour: reminderDate.getHours(),
          minute: reminderDate.getMinutes(),
          repeats: true,
        };
      } else if (event.repeat === 'weekly') {
        trigger = {
          weekday: reminderDate.getDay() === 0 ? 7 : reminderDate.getDay(), // Sunday = 7
          hour: reminderDate.getHours(),
          minute: reminderDate.getMinutes(),
          repeats: true,
        };
      } else if (event.repeat === 'monthly') {
        trigger = {
          day: reminderDate.getDate(),
          hour: reminderDate.getHours(),
          minute: reminderDate.getMinutes(),
          repeats: true,
        };
      } else if (event.repeat === 'yearly') {
        trigger = {
          day: reminderDate.getDate(),
          month: reminderDate.getMonth() + 1, // month is 1-12 in expo-notifications
          hour: reminderDate.getHours(),
          minute: reminderDate.getMinutes(),
          repeats: true,
        };
      }

      if (trigger) {
        await Notifications.scheduleNotificationAsync({
          content: notificationContent,
          trigger,
          identifier: `event-${event.id}`,
        });
      }
    }
  } catch (error) {
    console.error('Failed to schedule notification:', error);
  }
}

/**
 * Cancel all notifications for an event
 */
export async function cancelEventNotifications(eventId) {
  try {
    await Notifications.cancelScheduledNotificationAsync(`event-${eventId}`);
  } catch (error) {
    console.error('Failed to cancel notification:', error);
  }
}

/**
 * Format date for notification display
 */
function formatNotificationDate(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, '0');

  return `${month}月${day}日 ${displayHours}:${displayMinutes} ${ampm}`;
}

/**
 * Get all scheduled notifications (for debugging)
 */
export async function getAllScheduledNotifications() {
  return await Notifications.getAllScheduledNotificationsAsync();
}

