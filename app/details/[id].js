import { useState, useEffect, useRef, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Alert,
  ScrollView,
  Image,
  Modal,
  ActionSheetIOS,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import ViewShot from 'react-native-view-shot';
import { useAppStore } from '../../store/useAppStore';
import { calculateDaysDifference, formatDate } from '../../utils/dateUtils';
import AnimatedScaleTouchable from '../../components/AnimatedScaleTouchable';
import { useTheme } from '../../hooks/useTheme';

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
  const { events, categories, deleteEvent, updateEvent } = useAppStore();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [event, setEvent] = useState(null);
  const [category, setCategory] = useState(null);
  const [countdownMode, setCountdownMode] = useState('forward'); // 'forward' or 'backward'
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [displayUnit, setDisplayUnit] = useState('days');
  const shareViewRef = useRef(null);

  useEffect(() => {
    const foundEvent = events.find((e) => e.id === params.id);
    if (foundEvent) {
      setEvent(foundEvent);
      const foundCategory = categories.find((c) => c.id === foundEvent.categoryId);
      setCategory(foundCategory);
      // Load countdown mode preference (default to forward)
      setCountdownMode(foundEvent.countdownMode || 'forward');
      setDisplayUnit('days');
    } else {
      // Event not found, navigate back to home
      router.replace('/(tabs)');
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
            // Navigate directly to home, not just back
            router.replace('/(tabs)');
          },
        },
      ]
    );
  };

  const handlePickImage = async () => {
    try {
      // Request permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission', 'Photo library access is required to select background image');
        return;
      }

      // Show image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const imageUri = result.assets[0].uri;
        await updateEvent(event.id, { backgroundImage: imageUri });
        setEvent({ ...event, backgroundImage: imageUri });
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to select image, please try again');
    }
  };

  const handleRemoveImage = async () => {
    Alert.alert(
      'Remove Background',
      'Are you sure you want to remove the background image?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          onPress: async () => {
            await updateEvent(event.id, { backgroundImage: null });
            setEvent({ ...event, backgroundImage: null });
          },
        },
      ]
    );
  };

  const handleToggleCountdownMode = async () => {
    const newMode = countdownMode === 'forward' ? 'backward' : 'forward';
    setCountdownMode(newMode);
    await updateEvent(event.id, { countdownMode: newMode });
  };

  const cycleDisplayUnit = () => {
    setDisplayUnit((prev) => {
      if (prev === 'days') return 'weeks';
      if (prev === 'weeks') return 'months';
      if (prev === 'months') return 'years';
      return 'days';
    });
  };

  const handleShare = async () => {
    try {
      if (!shareViewRef.current) {
        Alert.alert('Error', 'Unable to generate share image');
        return;
      }

      // Capture the view as an image
      const uri = await shareViewRef.current.capture();
      
      // Check if sharing is available
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert('Error', 'Sharing is not available on this device');
        return;
      }

      // Share the image
      await Sharing.shareAsync(uri, {
        mimeType: 'image/png',
        dialogTitle: 'Share Event',
      });
    } catch (error) {
      console.error('Error sharing:', error);
      Alert.alert('Error', 'Failed to share image. Please try again.');
    }
  };

  const showImageOptions = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Select Image', event.backgroundImage ? 'Remove Image' : null].filter(Boolean),
          destructiveButtonIndex: event.backgroundImage ? 2 : undefined,
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            handlePickImage();
          } else if (buttonIndex === 2 && event.backgroundImage) {
            handleRemoveImage();
          }
        }
      );
    } else {
      setShowImagePicker(true);
    }
  };

  if (!event) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
          <AnimatedScaleTouchable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.title} />
          </AnimatedScaleTouchable>
          <Text style={[styles.headerTitle, { color: theme.colors.title }]}>Mini Days</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: theme.colors.body }]}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const days = calculateDaysDifference(event.targetDate);
  const isPast = days < 0;
  // Use countdown mode to determine display
  const displayDays = countdownMode === 'backward' ? -days : days;
  const absDays = Math.abs(displayDays);
  const formattedDate = formatDate(event.targetDate);
  const displayValue = (() => {
    switch (displayUnit) {
      case 'weeks':
        return (absDays / 7).toFixed(1);
      case 'months':
        return (absDays / 30).toFixed(1);
      case 'years':
        return (absDays / 365).toFixed(2);
      case 'days':
      default:
        return absDays.toString();
    }
  })();

  const displayLabel = (() => {
    const suffix =
      countdownMode === 'backward'
        ? displayDays >= 0
          ? 'passed'
          : 'left'
        : displayDays >= 0
        ? 'left'
        : 'passed';
    const unitLabel =
      displayUnit === 'days'
        ? 'days'
        : displayUnit === 'weeks'
        ? 'weeks'
        : displayUnit === 'months'
        ? 'months'
        : 'years';

    return `${unitLabel} ${suffix}`;
  })();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <AnimatedScaleTouchable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.title} />
        </AnimatedScaleTouchable>
        <Text style={[styles.headerTitle, { color: theme.colors.title }]}>Mini Days</Text>
        <AnimatedScaleTouchable onPress={handleEdit}>
          <Text style={[styles.editButton, { color: theme.colors.primary }]}>Edit</Text>
        </AnimatedScaleTouchable>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.mainCardContainer}>
          {event.backgroundImage ? (
            <Image
              source={{ uri: event.backgroundImage }}
              style={styles.backgroundImage}
              resizeMode="cover"
            />
          ) : (
            <LinearGradient
              colors={[theme.colors.card, theme.colors.accentLight]}
              style={StyleSheet.absoluteFillObject}
            />
          )}
          <View style={styles.mainCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.emojiDecor}>✨</Text>
            </View>

            <Pressable style={styles.countdownContainer} onPress={cycleDisplayUnit} hitSlop={10}>
              <Text style={styles.countdownNumber}>{displayValue}</Text>
              <Text style={styles.countdownLabel}>{displayLabel}</Text>
            </Pressable>

            <View style={styles.dateContainer}>
              <Text style={styles.dateLabel}>Target Date: </Text>
              <Text style={styles.dateValue}>{formattedDate}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.cardActionRow, { backgroundColor: theme.colors.surface }]}>
          <TouchableOpacity
            style={[styles.cardActionButton, { borderColor: theme.colors.primary }]}
            onPress={handleShare}>
            <Ionicons name="share-outline" size={18} color={theme.colors.primary} />
            <Text style={[styles.cardActionText, { color: theme.colors.primary }]}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.cardActionButton, { borderColor: theme.colors.primary, borderRightWidth: 0 }]}
            onPress={showImageOptions}>
            <Ionicons name="image-outline" size={18} color={theme.colors.primary} />
            <Text style={[styles.cardActionText, { color: theme.colors.primary }]}>Change Background</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.detailsSection, { backgroundColor: theme.colors.surface }]}>
          <View style={[styles.detailRow, { borderBottomColor: theme.colors.border }]}>
            <View style={styles.detailLeft}>
              <Ionicons name="folder-outline" size={20} color={theme.colors.primary} />
              <Text style={[styles.detailLabel, { color: theme.colors.title }]}>Category</Text>
            </View>
            <View style={styles.detailRight}>
              <Text style={styles.categoryEmoji}>{category?.icon}</Text>
              <Text style={[styles.detailValue, { color: theme.colors.body }]}>{category?.name || 'Unknown'}</Text>
            </View>
          </View>

          <View style={[styles.detailRow, { borderBottomColor: theme.colors.border }]}>
            <View style={styles.detailLeft}>
              <Ionicons name="pin-outline" size={20} color={theme.colors.primary} />
              <Text style={[styles.detailLabel, { color: theme.colors.title }]}>Pinned</Text>
            </View>
            <Text style={[styles.detailValue, { color: theme.colors.body }]}>{event.isPinned ? 'Yes' : 'No'}</Text>
          </View>

          <View style={[styles.detailRow, { borderBottomColor: theme.colors.border }]}>
            <View style={styles.detailLeft}>
              <Ionicons name="repeat-outline" size={20} color={theme.colors.primary} />
              <Text style={[styles.detailLabel, { color: theme.colors.title }]}>Repeat</Text>
            </View>
            <Text style={[styles.detailValue, { color: theme.colors.body }]}>
              {event.repeatRule === 'none'
                ? 'None'
                : event.repeatRule === 'daily'
                ? 'Daily'
                : event.repeatRule === 'weekly'
                ? 'Weekly'
                : event.repeatRule === 'monthly'
                ? 'Monthly'
                : event.repeatRule}
            </Text>
          </View>

          <View style={[styles.detailRow, { borderBottomColor: theme.colors.border }]}>
            <View style={styles.detailLeft}>
              <Ionicons name="notifications-outline" size={20} color={theme.colors.primary} />
              <Text style={[styles.detailLabel, { color: theme.colors.title }]}>Reminder</Text>
            </View>
            <Text style={[styles.detailValue, { color: theme.colors.body }]}>
              {event.remind && event.reminderAt
                ? formatDate(event.reminderAt) + ' ' + new Date(event.reminderAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                : 'Off'}
            </Text>
          </View>
        </View>

        <AnimatedScaleTouchable style={styles.deleteButton} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={20} color={theme.colors.danger} />
          <Text style={styles.deleteButtonText}>Delete Event</Text>
        </AnimatedScaleTouchable>

      </ScrollView>

      {/* Hidden view for sharing - captures the event card */}
      <View style={styles.hiddenShareView}>
        <ViewShot ref={shareViewRef} options={{ format: 'png', quality: 1.0 }}>
          <View style={styles.shareCardContainer}>
            {event.backgroundImage ? (
              <Image
                source={{ uri: event.backgroundImage }}
                style={styles.shareBackgroundImage}
                resizeMode="cover"
              />
            ) : (
              <LinearGradient
                colors={[theme.colors.card, theme.colors.accentLight]}
                style={StyleSheet.absoluteFillObject}
              />
            )}
            <View style={styles.shareCard}>
              <View style={styles.shareCardHeader}>
                <Text style={styles.shareEventTitle}>{event.title}</Text>
                <Text style={styles.shareEmojiDecor}>✨</Text>
              </View>

              <View style={styles.shareCountdownContainer}>
                <Text style={styles.shareCountdownNumber}>{absDays}</Text>
                <Text style={styles.shareCountdownLabel}>
                  {countdownMode === 'backward'
                    ? (displayDays >= 0 ? 'days passed' : 'days left')
                    : (displayDays >= 0 ? 'days left' : 'days passed')}
                </Text>
              </View>

              <View style={styles.shareDateContainer}>
                <Text style={styles.shareDateLabel}>Target Date: </Text>
                <Text style={styles.shareDateValue}>{formattedDate}</Text>
              </View>

              <View style={styles.shareBrandContainer}>
                <Text style={styles.shareBrandText}>Mini Days</Text>
              </View>
            </View>
          </View>
        </ViewShot>
      </View>

      {/* Android Image Picker Modal */}
      {Platform.OS === 'android' && (
        <Modal
          visible={showImagePicker}
          transparent
          animationType="slide"
          onRequestClose={() => setShowImagePicker(false)}>
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
              <Text style={[styles.modalTitle, { color: theme.colors.title }]}>Select Background Image</Text>
              <TouchableOpacity
                style={[styles.modalButton, { borderColor: theme.colors.primary }]}
                onPress={() => {
                  setShowImagePicker(false);
                  handlePickImage();
                }}>
                <Text style={[styles.modalButtonText, { color: theme.colors.primary }]}>Choose from Library</Text>
              </TouchableOpacity>
              {event.backgroundImage && (
                <TouchableOpacity
                  style={[styles.modalButton, { borderColor: theme.colors.danger, marginTop: theme.spacing.md }]}
                  onPress={() => {
                    setShowImagePicker(false);
                    handleRemoveImage();
                  }}>
                  <Text style={[styles.modalButtonText, { color: theme.colors.danger }]}>Remove Background</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.modalButton, { borderColor: theme.colors.divider, marginTop: theme.spacing.md }]}
                onPress={() => setShowImagePicker(false)}>
                <Text style={[styles.modalButtonText, { color: theme.colors.body }]}>Cancel</Text>
              </TouchableOpacity>
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
    },
    editButton: {
      fontSize: 16,
      fontWeight: '700',
    },
    content: {
      flex: 1,
    },
    mainCardContainer: {
      margin: 20,
      borderRadius: theme.radii.xl,
      overflow: 'hidden',
      ...theme.shadow.floating,
    },
    backgroundImage: {
      ...StyleSheet.absoluteFillObject,
      width: '100%',
      height: '100%',
    },
    mainCard: {
      minHeight: 400,
      padding: 20,
    },
    cardHeader: {
      backgroundColor: theme.colors.card,
      paddingVertical: 20,
      paddingHorizontal: 20,
      borderRadius: theme.radii.lg,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    eventTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: theme.colors.title,
      textAlign: 'center',
    },
    emojiDecor: {
      fontSize: 20,
      marginLeft: 8,
    },
    countdownContainer: {
      alignItems: 'center',
      paddingVertical: 40,
    },
    countdownNumber: {
      fontSize: 96,
      fontWeight: '700',
      color: theme.colors.primary,
      letterSpacing: 2,
    },
    countdownLabel: {
      fontSize: 20,
      color: theme.colors.body,
      marginTop: 8,
      fontWeight: '600',
    },
    dateContainer: {
      alignItems: 'center',
      paddingBottom: 20,
    },
    dateLabel: {
      fontSize: 14,
      color: theme.colors.body,
      marginBottom: 4,
    },
    dateValue: {
      fontSize: 18,
      color: theme.colors.title,
      fontWeight: '600',
    },
    cardActionRow: {
      flexDirection: 'row',
      marginHorizontal: 20,
      marginTop: theme.spacing.md,
      marginBottom: theme.spacing.xl,
      borderRadius: theme.radii.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
      overflow: 'hidden',
      backgroundColor: theme.colors.card,
      ...theme.shadow.card,
    },
    cardActionButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      columnGap: theme.spacing.sm,
      paddingVertical: theme.spacing.md,
      borderRightWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.border,
      backgroundColor: 'transparent',
    },
    cardActionText: {
      ...theme.typography.body,
      fontWeight: '600',
    },
    detailsSection: {
      marginHorizontal: 20,
      borderRadius: 24,
      overflow: 'hidden',
      ...theme.shadow.card,
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 18,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
    },
    detailLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    detailLabel: {
      ...theme.typography.body,
      marginLeft: theme.spacing.md,
      fontWeight: '600',
    },
    detailRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    categoryEmoji: {
      fontSize: 20,
      marginRight: 8,
    },
    detailValue: {
      ...theme.typography.body,
      fontWeight: '600',
    },
    deleteButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 20,
      marginTop: 20,
      marginBottom: 40,
      paddingVertical: 16,
      borderRadius: 24,
      borderWidth: 2,
      ...theme.shadow.card,
      backgroundColor: theme.colors.card,
      borderColor: theme.colors.danger,
    },
    deleteButtonText: {
      ...theme.typography.body,
      fontWeight: '700',
      marginLeft: theme.spacing.sm,
      color: theme.colors.danger,
    },
    loadingContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loadingText: {
      fontSize: 16,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      borderRadius: 24,
      padding: 24,
      width: '80%',
      maxWidth: 400,
    },
    modalTitle: {
      ...theme.typography.h2,
      marginBottom: theme.spacing.xl,
      textAlign: 'center',
    },
    modalButton: {
      paddingVertical: theme.spacing.md + 2,
      borderRadius: theme.radii.md,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.card,
    },
    modalButtonText: {
      ...theme.typography.body,
      fontWeight: '600',
      color: theme.colors.primary,
    },
    hiddenShareView: {
      position: 'absolute',
      left: -9999,
      top: -9999,
      width: 400,
      height: 600,
    },
    shareCardContainer: {
      width: 400,
      height: 600,
      borderRadius: 26,
      overflow: 'hidden',
    },
    shareBackgroundImage: {
      ...StyleSheet.absoluteFillObject,
      width: '100%',
      height: '100%',
    },
    shareCard: {
      flex: 1,
      padding: 30,
      justifyContent: 'space-between',
    },
    shareCardHeader: {
      backgroundColor: theme.colors.card,
      paddingVertical: 20,
      paddingHorizontal: 20,
      borderRadius: theme.radii.lg,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    shareEventTitle: {
      fontSize: 28,
      fontWeight: '700',
      color: theme.colors.title,
      textAlign: 'center',
    },
    shareEmojiDecor: {
      fontSize: 24,
      marginLeft: 8,
    },
    shareCountdownContainer: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    shareCountdownNumber: {
      fontSize: 120,
      fontWeight: '700',
      color: theme.colors.primary,
      letterSpacing: 2,
    },
    shareCountdownLabel: {
      fontSize: 24,
      color: theme.colors.body,
      marginTop: 12,
      fontWeight: '600',
    },
    shareDateContainer: {
      alignItems: 'center',
      paddingBottom: 20,
    },
    shareDateLabel: {
      fontSize: 16,
      color: theme.colors.body,
      marginBottom: 4,
    },
    shareDateValue: {
      fontSize: 20,
      color: theme.colors.title,
      fontWeight: '600',
    },
    shareBrandContainer: {
      alignItems: 'center',
      paddingTop: 20,
    },
    shareBrandText: {
      fontSize: 18,
      color: theme.colors.primaryDark || theme.colors.primary,
      fontWeight: '600',
    },
  });
