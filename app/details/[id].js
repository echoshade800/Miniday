import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
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
import * as MediaLibrary from 'expo-media-library';
import ViewShot from 'react-native-view-shot';
import Slider from '@react-native-community/slider';
import { useAppStore } from '../../store/useAppStore';
import { calculateDaysDifference, formatDate } from '../../utils/dateUtils';
import AnimatedScaleTouchable from '../../components/AnimatedScaleTouchable';
import CategoryIcon from '../../components/CategoryIcon';
import { useTheme } from '../../hooks/useTheme';
import {
  DEFAULT_BACKGROUND_CONTRAST,
  DEFAULT_COUNTER_TEXT_COLOR,
  TEXT_COLOR_OPTIONS,
  clampContrast,
  getCardOverlayColor,
  getEventContrast,
  getEventTextColor,
  detectImageTextColor,
} from '../../utils/cardStyleUtils';

const pluralize = (value, unit) => `${value} ${unit}${value === 1 ? '' : 's'}`;

const formatMonthsAndDays = (totalDays) => {
  const months = Math.floor(totalDays / 30);
  const days = totalDays % 30;
  const parts = [];
  if (months > 0) parts.push(pluralize(months, 'month'));
  if (days > 0 || parts.length === 0) parts.push(pluralize(days, 'day'));
  return parts.join(' ');
};

const formatWeeksAndDays = (totalDays) => {
  const weeks = Math.floor(totalDays / 7);
  const days = totalDays % 7;
  const parts = [];
  if (weeks > 0) parts.push(pluralize(weeks, 'week'));
  if (days > 0) parts.push(pluralize(days, 'day'));
  if (parts.length === 0) {
    parts.push(pluralize(0, 'day'));
  }
  return parts.join(' ');
};

const formatCountdownValue = (mode, totalDays) => {
  switch (mode) {
    case 'monthsDays':
      return formatMonthsAndDays(totalDays);
    case 'weeksDays':
      return formatWeeksAndDays(totalDays);
    case 'days':
    default:
      return pluralize(totalDays, 'day');
  }
};

const getAvailableDisplayModes = (totalDays) => {
  if (totalDays > 30) {
    return ['days', 'monthsDays', 'weeksDays'];
  }
  if (totalDays > 7) {
    return ['days', 'weeksDays'];
  }
  return ['days'];
};

const getDistanceSuffix = (displayDays, countdownMode) => {
  if (countdownMode === 'backward') {
    return displayDays >= 0 ? 'passed' : 'left';
  }
  return displayDays >= 0 ? 'left' : 'passed';
};

const describeDisplayMode = (mode) => {
  switch (mode) {
    case 'monthsDays':
      return 'months & days';
    case 'weeksDays':
      return 'weeks & days';
    default:
      return 'days';
  }
};

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
  const { events, categories, deleteEvent, updateEvent, darkMode } = useAppStore();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [event, setEvent] = useState(null);
  const [category, setCategory] = useState(null);
  const [countdownMode, setCountdownMode] = useState('forward'); // 'forward' or 'backward'
  const [displayMode, setDisplayMode] = useState('days');
  const [backgroundEditorVisible, setBackgroundEditorVisible] = useState(false);
  const shareViewRef = useRef(null);

  useEffect(() => {
    const foundEvent = events.find((e) => e.id === params.id);
    if (foundEvent) {
      setEvent(foundEvent);
      const foundCategory = categories.find((c) => c.id === foundEvent.categoryId);
      setCategory(foundCategory);
      // Load countdown mode preference (default to forward)
      setCountdownMode(foundEvent.countdownMode || 'forward');
      setDisplayMode('days');
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

  const handleToggleCountdownMode = async () => {
    const newMode = countdownMode === 'forward' ? 'backward' : 'forward';
    setCountdownMode(newMode);
    await updateEvent(event.id, { countdownMode: newMode });
  };

  const openBackgroundEditor = () => {
    if (!event) return;
    setBackgroundEditorVisible(true);
  };

  // Callback to handle background settings update from modal
  const handleBackgroundSettingsUpdate = useCallback((updates) => {
    setEvent((prev) => (prev ? { ...prev, ...updates } : prev));
  }, []);

  const cycleDisplayMode = () => {
    if (availableDisplayModes.length <= 1) return;
    setDisplayMode((prev) => {
      const modes = availableDisplayModes;
      const currentIndex = modes.indexOf(prev);
      const nextIndex = (currentIndex + 1) % modes.length;
      return modes[nextIndex];
    });
  };

  const captureShareImage = async () => {
    if (!shareViewRef.current) {
      Alert.alert('Error', 'Unable to generate share image');
      return null;
    }

    try {
      return await shareViewRef.current.capture();
    } catch (error) {
      console.error('Error capturing share image:', error);
      Alert.alert('Error', 'Unable to generate share image');
      return null;
    }
  };

  const shareEventImage = async () => {
    try {
      const uri = await captureShareImage();
      if (!uri) return;

      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert('Error', 'Sharing is not available on this device');
        return;
      }

      await Sharing.shareAsync(uri, {
        mimeType: 'image/png',
        dialogTitle: 'Share Event',
      });
    } catch (error) {
      console.error('Error sharing:', error);
      Alert.alert('Error', 'Failed to share image. Please try again.');
    }
  };

  const saveEventImage = async () => {
    if (Platform.OS === 'web') {
      Alert.alert('Not Supported', 'Saving images is not supported on web.');
      return;
    }

    try {
      const uri = await captureShareImage();
      if (!uri) return;

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Needed', 'Photo library access is required to save the image.');
        return;
      }

      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert('Saved as image', 'Event has been saved as an image.');
    } catch (error) {
      console.error('Error saving image:', error);
      Alert.alert('Error', 'Failed to save image. Please try again.');
    }
  };

  const handleShare = () => {
    const presentAlert = () => {
      const options = [
        { text: 'Share', onPress: () => shareEventImage() },
      ];

      if (Platform.OS !== 'web') {
        options.push({ text: 'Save Image', onPress: () => saveEventImage() });
      }

      options.push({ text: 'Cancel', style: 'cancel' });

      Alert.alert('Share Event', 'Choose an option', options);
    };

    if (Platform.OS === 'ios') {
      const hasSaveOption = Platform.OS !== 'web';
      const sheetOptions = ['Cancel', 'Share Image'];
      if (hasSaveOption) {
        sheetOptions.push('Save Image');
      }

      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: sheetOptions,
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            shareEventImage();
          } else if (hasSaveOption && buttonIndex === 2) {
            saveEventImage();
          }
        }
      );
      return;
    }

    presentAlert();
  };

  const targetDate = event?.targetDate ?? null;
  const rawDaysDifference = targetDate ? calculateDaysDifference(targetDate) : 0;
  const displayDays = countdownMode === 'backward' ? -rawDaysDifference : rawDaysDifference;
  const totalDays = Math.max(0, Math.floor(Math.abs(displayDays)));
  const availableDisplayModes = useMemo(() => getAvailableDisplayModes(totalDays), [totalDays]);

  useEffect(() => {
    if (!availableDisplayModes.includes(displayMode)) {
      setDisplayMode('days');
    }
  }, [availableDisplayModes, displayMode]);

  const displayValue = formatCountdownValue(displayMode, totalDays);
  const distanceSuffix = getDistanceSuffix(displayDays, countdownMode);
  // 使用 useMemo 稳定 distanceText 和 formattedDate，避免 BackgroundEditorModal 不必要的重渲染
  const distanceText = useMemo(() => `${displayValue} ${distanceSuffix}`.trim(), [displayValue, distanceSuffix]);
  const formattedDateMemo = useMemo(() => (targetDate ? formatDate(targetDate) : ''), [targetDate]);
  const isDaysMode = displayMode === 'days';
  const countdownTextProps = {
    numberOfLines: 2,
    adjustsFontSizeToFit: true,
    minimumFontScale: 0.7,
  };
  const textColor = getEventTextColor(event);
  const overlayColor = getCardOverlayColor(textColor, getEventContrast(event));
  const gradientColors = useMemo(() => [theme.colors.card, theme.colors.accentLight], [theme.colors.card, theme.colors.accentLight]);
  const hasCustomBackground = Boolean(event?.backgroundImage);
  const canCycleDisplayModes = availableDisplayModes.length > 1;
  const cycleHint = canCycleDisplayModes
    ? `Cycles between ${availableDisplayModes.map((mode) => describeDisplayMode(mode)).join(' → ')}`
    : undefined;

  // 稳定化回调函数，避免 BackgroundEditorModal 不必要的重渲染
  const handleCloseBackgroundEditor = useCallback(() => {
    setBackgroundEditorVisible(false);
  }, []);



  if (!event) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
          <AnimatedScaleTouchable style={styles.headerAction} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.title} />
          </AnimatedScaleTouchable>
          <Text style={[styles.headerTitle, { color: theme.colors.title }]} numberOfLines={1} ellipsizeMode="tail">
            Dayer
          </Text>
          <View style={styles.headerAction}>
            <Ionicons name="arrow-back" size={24} color="transparent" />
          </View>
        </View>
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: theme.colors.body }]}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <AnimatedScaleTouchable style={styles.headerAction} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.title} />
        </AnimatedScaleTouchable>
        <Text style={[styles.headerTitle, { color: theme.colors.title }]} numberOfLines={1} ellipsizeMode="tail">
          Dayer
        </Text>
        <AnimatedScaleTouchable style={styles.headerAction} onPress={handleEdit}>
          <Text style={[styles.editButton, { color: theme.colors.primary }]} numberOfLines={1} ellipsizeMode="tail">
            Edit
          </Text>
        </AnimatedScaleTouchable>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.mainCardContainer}>
          {hasCustomBackground ? (
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
          {hasCustomBackground && <View style={[styles.imageOverlay, { backgroundColor: overlayColor }]} />}
          <View style={styles.mainCard}>
            <Text style={[styles.eventTitle, { color: textColor }]} numberOfLines={2} ellipsizeMode="tail">
              {event.title}
            </Text>

            <TouchableOpacity
              style={styles.countdownTapArea}
              onPress={cycleDisplayMode}
              disabled={!canCycleDisplayModes}
              activeOpacity={canCycleDisplayModes ? 0.75 : 1}
              accessibilityRole="button"
              accessibilityState={{ disabled: !canCycleDisplayModes }}
              accessibilityHint={cycleHint}>
              <Text
                style={[styles.countdownDistanceCompact, { color: textColor }]}
                ellipsizeMode="clip"
                {...countdownTextProps}>
                {distanceText}
              </Text>
            </TouchableOpacity>

            <Text style={[styles.dateValue, { color: textColor }]} numberOfLines={1} ellipsizeMode="tail">
              {formattedDateMemo}
            </Text>
          </View>
          </View>

        <View style={[styles.cardActionRow, { backgroundColor: theme.colors.surface }]}>
          <TouchableOpacity
            style={[styles.cardActionButton, { borderColor: theme.colors.primary }]}
            onPress={handleShare}>
            <Ionicons name="share-outline" size={18} color={theme.colors.primary} />
            <Text style={[styles.cardActionText, { color: theme.colors.primary }]} numberOfLines={1} ellipsizeMode="tail">
              Share
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.cardActionButton, { borderColor: theme.colors.primary, borderRightWidth: 0 }]}
            onPress={openBackgroundEditor}>
            <Ionicons name="image-outline" size={18} color={theme.colors.primary} />
            <Text
              style={[styles.cardActionText, { color: theme.colors.primary }]}
              numberOfLines={1}
              ellipsizeMode="tail">
              Customize
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.detailsSection, { backgroundColor: theme.colors.surface }]}>
          <View style={[styles.detailRow, { borderBottomColor: theme.colors.border }]}>
            <View style={styles.detailLeft}>
              <Ionicons name="folder-outline" size={20} color={theme.colors.primary} />
              <Text style={[styles.detailLabel, { color: theme.colors.title }]} numberOfLines={1} ellipsizeMode="tail">
                Category
              </Text>
            </View>
            <View style={[styles.detailRight, styles.categoryRow]}>
              <CategoryIcon
                glyph={category?.icon || '🧁'}
                iconKey={event?.iconKey || category?.iconKey}
                label={category?.name || 'Unknown'}
                variantKey={event?.id || category?.id}
                size={24}
                isDark={darkMode}
              />
              <Text
                style={[styles.detailValue, { color: theme.colors.body }]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {category?.name || 'Unknown'}
              </Text>
            </View>
          </View>

          <View style={[styles.detailRow, { borderBottomColor: theme.colors.border }]}>
            <View style={styles.detailLeft}>
              <Ionicons name="pin-outline" size={20} color={theme.colors.primary} />
              <Text style={[styles.detailLabel, { color: theme.colors.title }]} numberOfLines={1} ellipsizeMode="tail">
                Pinned
              </Text>
            </View>
            <Text style={[styles.detailValue, { color: theme.colors.body }]} numberOfLines={1} ellipsizeMode="tail">
              {event.isPinned ? 'Yes' : 'No'}
            </Text>
          </View>

          <View style={[styles.detailRow, { borderBottomColor: theme.colors.border }]}>
            <View style={styles.detailLeft}>
              <Ionicons name="repeat-outline" size={20} color={theme.colors.primary} />
              <Text style={[styles.detailLabel, { color: theme.colors.title }]} numberOfLines={1} ellipsizeMode="tail">
                Repeat
              </Text>
            </View>
            <Text style={[styles.detailValue, { color: theme.colors.body }]} numberOfLines={1} ellipsizeMode="tail">
              {event.repeatRule === 'none'
                ? 'None'
                : event.repeatRule === 'daily'
                ? 'Daily'
                : event.repeatRule === 'weekly'
                ? 'Weekly'
                : event.repeatRule === 'monthly'
                ? 'Monthly'
                : event.repeatRule === 'yearly'
                ? 'Yearly'
                : event.repeatRule}
            </Text>
          </View>

          <View style={[styles.detailRow, { borderBottomColor: theme.colors.border }]}>
            <View style={styles.detailLeft}>
              <Ionicons name="notifications-outline" size={20} color={theme.colors.primary} />
              <Text style={[styles.detailLabel, { color: theme.colors.title }]} numberOfLines={1} ellipsizeMode="tail">
                Reminder
              </Text>
            </View>
            <Text style={[styles.detailValue, { color: theme.colors.body }]} numberOfLines={1} ellipsizeMode="tail">
              {event.remind && event.reminderAt
                ? formatDate(event.reminderAt) + ' ' + new Date(event.reminderAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                : 'Off'}
            </Text>
          </View>
        </View>

        <AnimatedScaleTouchable style={styles.deleteButton} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={20} color={theme.colors.danger} />
          <Text style={styles.deleteButtonText} numberOfLines={1} ellipsizeMode="tail">
            Delete Event
          </Text>
        </AnimatedScaleTouchable>

      </ScrollView>

      {/* Hidden view for sharing - captures the event card */}
      <View style={styles.hiddenShareView}>
        <ViewShot ref={shareViewRef} options={{ format: 'png', quality: 1.0 }}>
          <View style={styles.shareCardContainer}>
            {hasCustomBackground ? (
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
            {hasCustomBackground && <View style={[styles.shareOverlay, { backgroundColor: overlayColor }]} />}
            <View style={styles.shareCard}>
              <Text style={[styles.shareEventTitle, { color: textColor }]} numberOfLines={2} ellipsizeMode="tail">
                {event.title}
              </Text>
              <Text style={styles.shareCountdownText} numberOfLines={2} ellipsizeMode="tail">
                <Text style={[styles.shareCountdownNumber, { color: textColor }]}>{displayValue}</Text>
                <Text style={[styles.shareCountdownSuffix, { color: textColor }]}>{` ${distanceSuffix}`}</Text>
              </Text>
              <Text style={[styles.shareDateValue, { color: textColor }]} numberOfLines={1} ellipsizeMode="tail">
                {formattedDateMemo}
              </Text>
            </View>
          </View>
        </ViewShot>
      </View>

      <BackgroundEditorModal
        visible={backgroundEditorVisible}
        event={event}
        distanceText={distanceText}
        formattedDate={formattedDateMemo}
        gradientColors={gradientColors}
        theme={theme}
        styles={styles}
        onClose={handleCloseBackgroundEditor}
        onUpdate={handleBackgroundSettingsUpdate}
        updateEvent={updateEvent}
      />
    </SafeAreaView>
  );
}

// 背景编辑器 Modal 组件 - 独立管理所有背景编辑状态，避免影响主页面重渲染
// 解决：调整对比度时，进度轴/滑杆不再闪烁
const BackgroundEditorModal = React.memo(function BackgroundEditorModal({
  visible,
  event,
  distanceText,
  formattedDate,
  gradientColors,
  theme,
  styles,
  onClose,
  onUpdate,
  updateEvent,
}) {
  const [editorBackgroundImage, setEditorBackgroundImage] = useState(null);
  const [editorContrast, setEditorContrast] = useState(DEFAULT_BACKGROUND_CONTRAST);
  const [editorTextColor, setEditorTextColor] = useState(DEFAULT_COUNTER_TEXT_COLOR);
  const [savingBackground, setSavingBackground] = useState(false);
  const [previewContrast, setPreviewContrast] = useState(DEFAULT_BACKGROUND_CONTRAST);

  // 初始化编辑器状态（仅在 Modal 打开时）
  useEffect(() => {
    if (visible && event) {
      const initialContrast = clampContrast(event.backgroundContrast ?? DEFAULT_BACKGROUND_CONTRAST);
      setEditorContrast(initialContrast);
      setPreviewContrast(initialContrast);
      setEditorBackgroundImage(event.backgroundImage ?? null);
      setEditorTextColor(event.counterTextColor ?? DEFAULT_COUNTER_TEXT_COLOR);
    }
  }, [visible, event]);

  const handlePickImage = useCallback(async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission', 'Photo library access is required to select background image');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const imageUri = result.assets[0].uri;
        setEditorBackgroundImage(imageUri);
        
        // 自动检测图片颜色并设置默认字体颜色
        try {
          const suggestedTextColor = await detectImageTextColor(imageUri);
          setEditorTextColor(suggestedTextColor);
        } catch (error) {
          console.error('Error detecting image color:', error);
          // 如果检测失败，保持当前字体颜色不变
        }
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to select image, please try again');
    }
  }, []);

  const handleRemoveImage = useCallback(() => {
    Alert.alert(
      'Remove Background',
      'Are you sure you want to remove the background image?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          onPress: () => {
            setEditorBackgroundImage(null);
          },
        },
      ]
    );
  }, []);

  // 对比度预览变化 - 仅更新预览状态，不影响外部
  // 优化：避免不必要的 clamp，因为 SimpleSlider 已经确保值在范围内
  const handlePreviewContrastChange = useCallback((value) => {
    // SimpleSlider 已经确保值在 [0, 0.85] 范围内，直接使用即可
    // 只在值真正变化时更新，避免不必要的重渲染
    setPreviewContrast((prev) => {
      const newValue = clampContrast(value);
      // 如果值没有显著变化（考虑浮点数精度），返回原值避免重渲染
      if (Math.abs(prev - newValue) < 0.001) {
        return prev;
      }
      return newValue;
    });
  }, []);

  // 对比度调整完成 - 同步到编辑器状态
  const handlePreviewContrastComplete = useCallback((value) => {
    const clamped = clampContrast(value);
    setPreviewContrast(clamped);
    setEditorContrast(clamped);
  }, []);

  const handleApplyBackgroundSettings = useCallback(async () => {
    if (!event) return;
    try {
      setSavingBackground(true);
      const updates = {
        backgroundImage: editorBackgroundImage ?? null,
        backgroundContrast: clampContrast(editorContrast),
        counterTextColor: editorTextColor,
      };
      await updateEvent(event.id, updates);
      onUpdate(updates);
      onClose();
    } catch (error) {
      console.error('Error updating background settings:', error);
      Alert.alert('Error', 'Failed to update background settings. Please try again.');
    } finally {
      setSavingBackground(false);
    }
  }, [event, editorBackgroundImage, editorContrast, editorTextColor, updateEvent, onUpdate, onClose]);

  // 使用 useMemo 稳定样式对象，避免不必要的重渲染
  const sliderTrackColor = useMemo(() => theme.colors.surfaceAlt, [theme.colors.surfaceAlt]);
  const sliderFillColor = useMemo(() => theme.colors.primary, [theme.colors.primary]);
  const sliderThumbColor = useMemo(() => theme.colors.card, [theme.colors.card]);
  const editorPreviewStyle = useMemo(
    () => [styles.editorPreview, { backgroundColor: theme.colors.surfaceAlt }],
    [styles.editorPreview, theme.colors.surfaceAlt]
  );

  if (!event) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={[styles.backgroundEditor, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.modalTitle, { color: theme.colors.title }]}>Customize Background</Text>
          <BackgroundPreview
            imageUri={editorBackgroundImage}
            contrast={previewContrast}
            textColor={editorTextColor}
            gradientColors={gradientColors}
            containerStyle={editorPreviewStyle}
            contentStyle={styles.editorPreviewContent}>
            <Text style={[styles.previewTitle, { color: editorTextColor }]} numberOfLines={1} ellipsizeMode="tail">
              {event?.title || 'Event Title'}
            </Text>
            <Text style={[styles.previewDistance, { color: editorTextColor }]} numberOfLines={1} ellipsizeMode="tail">
              {distanceText}
            </Text>
            <Text style={[styles.previewDate, { color: editorTextColor }]} numberOfLines={1} ellipsizeMode="tail">
              {formattedDate || 'YYYY-MM-DD'}
            </Text>
          </BackgroundPreview>

          <View style={styles.editorSection}>
            <Text style={[styles.editorLabel, { color: theme.colors.title }]}>
              Contrast ({Math.round((previewContrast / 0.85) * 100)}%)
            </Text>
            <Slider
              style={styles.slider}
              value={previewContrast}
              minimumValue={0}
              maximumValue={0.85}
              step={0.01}
              onValueChange={handlePreviewContrastChange}
              onSlidingComplete={handlePreviewContrastComplete}
              minimumTrackTintColor={sliderFillColor}
              maximumTrackTintColor={sliderTrackColor}
              thumbTintColor={sliderThumbColor}
            />
          </View>

          <View style={styles.editorSection}>
            <Text style={[styles.editorLabel, { color: theme.colors.title }]}>Text color</Text>
            <View style={styles.colorOptionsRow}>
              {TEXT_COLOR_OPTIONS.map((option) => {
                const isActive = editorTextColor.toLowerCase() === option.toLowerCase();
                return (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.colorOption,
                      { borderColor: theme.colors.divider },
                      isActive && { borderColor: theme.colors.primary },
                    ]}
                    onPress={() => setEditorTextColor(option)}>
                    <View style={[styles.colorSwatch, { backgroundColor: option }]} />
                    <Text style={[styles.colorOptionLabel, { color: theme.colors.title }]}>
                      {option === '#000000' ? 'Black' : 'White'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.editorButtonsRow}>
            <TouchableOpacity
              style={[styles.modalButton, { borderColor: theme.colors.primary, flex: 1 }]}
              onPress={handlePickImage}>
              <Text style={[styles.modalButtonText, { color: theme.colors.primary }]}>Change Image</Text>
            </TouchableOpacity>
            {editorBackgroundImage && (
              <TouchableOpacity
                style={[styles.modalButton, { borderColor: theme.colors.danger, flex: 1 }]}
                onPress={handleRemoveImage}>
                <Text style={[styles.modalButtonText, { color: theme.colors.danger }]}>Remove Image</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.editorFooter}>
            <AnimatedScaleTouchable
              style={[styles.editorActionButton, { borderColor: theme.colors.divider }]}
              onPress={onClose}>
              <Text style={[styles.editorActionText, { color: theme.colors.body }]}>Close</Text>
            </AnimatedScaleTouchable>
            <AnimatedScaleTouchable
              style={[
                styles.editorActionButton,
                { borderColor: theme.colors.primary },
                savingBackground && styles.saveButtonDisabled,
              ]}
              onPress={handleApplyBackgroundSettings}
              disabled={savingBackground}>
              <Text style={[styles.editorActionText, { color: theme.colors.primary }]}>
                {savingBackground ? 'Saving...' : 'Save'}
              </Text>
            </AnimatedScaleTouchable>
          </View>
        </View>
      </View>
    </Modal>
  );
});

const BackgroundPreview = React.memo(function BackgroundPreview({
  imageUri,
  contrast,
  textColor,
  gradientColors,
  containerStyle,
  contentStyle,
  children,
}) {
  const overlayColor = useMemo(() => getCardOverlayColor(textColor, contrast), [textColor, contrast]);

  return (
    <View style={containerStyle}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
      ) : (
        <LinearGradient colors={gradientColors} style={StyleSheet.absoluteFillObject} />
      )}
      <View style={[StyleSheet.absoluteFillObject, { backgroundColor: imageUri ? overlayColor : 'transparent' }]} />
      <View style={contentStyle}>{children}</View>
    </View>
  );
});

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
    },
    headerAction: {
      paddingHorizontal: theme.spacing.xs,
      paddingVertical: theme.spacing.xs,
      flexShrink: 0,
      alignItems: 'center',
      justifyContent: 'center',
  },
  editButton: {
    fontSize: 16,
      fontWeight: '700',
      flexShrink: 1,
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
    imageOverlay: {
      ...StyleSheet.absoluteFillObject,
    },
    mainCard: {
      minHeight: 400,
      padding: 24,
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: theme.spacing.xl,
  },
  eventTitle: {
      fontSize: 24,
      fontWeight: '700',
    textAlign: 'center',
      flexShrink: 1,
  },
    countdownTapArea: {
    alignItems: 'center',
    paddingVertical: 40,
      width: '100%',
    },
    countdownDistance: {
      fontSize: 96,
      fontWeight: '700',
      letterSpacing: 2,
      textAlign: 'center',
      width: '100%',
    },
    countdownDistanceCompact: {
      fontSize: 44,
      fontWeight: '700',
      letterSpacing: 0.5,
      textAlign: 'center',
      width: '100%',
  },
  dateValue: {
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'center',
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
      minWidth: 0,
    },
    cardActionText: {
      ...theme.typography.body,
      fontWeight: '600',
      flexShrink: 1,
      textAlign: 'center',
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
      minWidth: 0,
  },
  detailLabel: {
      ...theme.typography.body,
      marginLeft: theme.spacing.md,
      fontWeight: '600',
      flexShrink: 1,
  },
  detailRight: {
    flexDirection: 'row',
    alignItems: 'center',
      flex: 1,
      justifyContent: 'flex-end',
      minWidth: 0,
      columnGap: theme.spacing.xs,
      marginLeft: theme.spacing.md,
  },
  categoryRow: {
    gap: theme.spacing.sm,
  },
  detailValue: {
      ...theme.typography.body,
      fontWeight: '600',
      flexShrink: 1,
      textAlign: 'right',
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
      flexShrink: 1,
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
    shareOverlay: {
      ...StyleSheet.absoluteFillObject,
    },
    shareCard: {
      flex: 1,
      padding: 30,
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: theme.spacing.xl,
    },
    shareEventTitle: {
      fontSize: 28,
      fontWeight: '700',
      textAlign: 'center',
    },
    shareCountdownText: {
      textAlign: 'center',
    },
    shareCountdownNumber: {
      fontSize: 120,
      fontWeight: '700',
      letterSpacing: 2,
    },
    shareCountdownSuffix: {
      ...theme.typography.body,
      fontSize: 24,
      fontWeight: '600',
    },
    shareDateValue: {
      fontSize: 20,
      fontWeight: '600',
      textAlign: 'center',
    },
    backgroundEditor: {
      borderRadius: theme.radii.xl,
      padding: theme.spacing.xl,
      width: '90%',
      maxWidth: 420,
      gap: theme.spacing.lg,
    },
    editorPreview: {
      borderRadius: theme.radii.lg,
      overflow: 'hidden',
      minHeight: 140,
    },
    editorPreviewContent: {
      padding: theme.spacing.lg,
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing.sm,
    },
    previewTitle: {
      ...theme.typography.body,
      fontWeight: '700',
      textAlign: 'center',
    },
    previewDistance: {
      fontSize: 42,
      fontWeight: '700',
      textAlign: 'center',
    },
    previewDate: {
      ...theme.typography.body,
      textAlign: 'center',
    },
    editorSection: {
      gap: theme.spacing.sm,
    },
    editorLabel: {
      ...theme.typography.body,
      fontWeight: '600',
    },
    slider: {
      width: '100%',
      height: 40,
    },
    colorOptionsRow: {
      flexDirection: 'row',
      gap: theme.spacing.md,
    },
    colorOption: {
      flex: 1,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.radii.md,
      borderWidth: 1,
      alignItems: 'center',
      gap: theme.spacing.sm,
    },
    colorSwatch: {
      width: 32,
      height: 32,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.colors.divider,
    },
    colorOptionLabel: {
      ...theme.typography.bodySmall,
      fontWeight: '600',
    },
    editorButtonsRow: {
      flexDirection: 'row',
      gap: theme.spacing.md,
    },
    editorFooter: {
      flexDirection: 'row',
      gap: theme.spacing.md,
    },
    editorActionButton: {
      flex: 1,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.radii.md,
      borderWidth: 1,
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    editorActionText: {
      ...theme.typography.body,
      fontWeight: '600',
  },
});

