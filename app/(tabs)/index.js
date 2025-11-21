import { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  Modal,
  TouchableOpacity,
  Platform,
  ActionSheetIOS,
  ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppStore } from '../../store/useAppStore';
import { calculateDaysDifference, sortEvents } from '../../utils/dateUtils';
import AnimatedScaleTouchable from '../../components/AnimatedScaleTouchable';
import SearchBar from '../../components/SearchBar';
import { getPastelCard, getEmojiForCategory, getCardVariants } from '../../utils/theme';
import { cancelEventNotifications } from '../../utils/notificationUtils';
import { useTheme } from '../../hooks/useTheme';

/**
 * Home (Dashboard) Screen
 * Purpose: Overview of all countdowns with pinned event highlight
 */
export default function HomeScreen() {
  const router = useRouter();
  const { events, categories, loadEvents, loadCategories, deleteEvent, getPinnedEvent, darkMode } =
    useAppStore();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [longPressEvent, setLongPressEvent] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    loadEvents();
    loadCategories();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredEvents(sortEvents(events));
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = events.filter((event) => event.title.toLowerCase().includes(query));
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
  const categoryEmojiMap = useMemo(() => categories, [categories]);

  const handleLongPress = (event) => {
    setLongPressEvent(event);
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Edit', 'Delete'],
          destructiveButtonIndex: 2,
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            router.push({
              pathname: '/create-event',
              params: { id: event.id },
            });
          } else if (buttonIndex === 2) {
            handleDeleteEvent(event.id, event.title);
          }
          setLongPressEvent(null);
        }
      );
    } else {
      setShowMenu(true);
    }
  };

  const handleDeleteEvent = async (id, title) => {
    Alert.alert('Delete Event', `Are you sure you want to delete "${title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          // Cancel notifications
          await cancelEventNotifications(id);
          await deleteEvent(id);
        },
      },
    ]);
    setShowMenu(false);
    setLongPressEvent(null);
  };

  const handleEditEvent = () => {
    if (longPressEvent) {
      router.push({
        pathname: '/create-event',
        params: { id: longPressEvent.id },
      });
    }
    setShowMenu(false);
    setLongPressEvent(null);
  };

  const renderPinnedSection = () => {
    if (searchQuery.trim() !== '') return null;

    if (pinnedEvent) {
      const days = calculateDaysDifference(pinnedEvent.targetDate);
      const isPast = days < 0;
      const absDay = Math.abs(days);
      const cardContent = (
        <>
          <Text style={styles.pinnedTitle}>{pinnedEvent.title}</Text>
          <Text style={styles.pinnedDays}>{absDay}</Text>
          <View style={styles.pinnedBadge}>
            <Text style={styles.pinnedBadgeText}>{isPast ? 'days since' : 'days left'}</Text>
          </View>
          <Text style={styles.pinnedDate}>
            {new Date(pinnedEvent.targetDate).toLocaleDateString()}
          </Text>
        </>
      );

      return (
        <AnimatedScaleTouchable
          style={styles.pinnedTouchable}
          onPress={() => router.push(`/details/${pinnedEvent.id}`)}>
          {pinnedEvent.backgroundImage ? (
            <ImageBackground
              source={{ uri: pinnedEvent.backgroundImage }}
              style={styles.pinnedCard}
              imageStyle={styles.pinnedImage}>
              <View pointerEvents="none" style={styles.pinnedOverlay} />
              {cardContent}
            </ImageBackground>
          ) : (
            <LinearGradient colors={[theme.colors.card, theme.colors.accentLight]} style={styles.pinnedCard}>
              {cardContent}
            </LinearGradient>
          )}
        </AnimatedScaleTouchable>
      );
    }

    if (events.length > 0) {
      return (
        <View style={[styles.idleCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <Ionicons name="pin-outline" size={48} color={theme.colors.primary} />
          <Text style={[styles.idleText, { color: theme.colors.text }]}>No pinned day yet</Text>
          <Text style={[styles.idleSubtext, { color: theme.colors.textMuted }]}>Pin an important event from your list</Text>
        </View>
      );
    }

    return (
      <View style={[styles.emptyCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <Ionicons name="calendar-outline" size={64} color={theme.colors.primary} />
        <Text style={[styles.emptyText, { color: theme.colors.text }]}>No days yet</Text>
        <AnimatedScaleTouchable
          style={[styles.emptyButton, { borderColor: theme.colors.primary }]}
          onPress={() => router.push('/create-event')}>
          <Text style={styles.emptyButtonText}>Add your first day</Text>
        </AnimatedScaleTouchable>
      </View>
    );
  };

  const renderEventItem = ({ item }) => {
    const days = calculateDaysDifference(item.targetDate);
    const isPast = days < 0;
    const absDay = Math.abs(days);
    const pastel = getPastelCard(item.id, darkMode);
    const emoji = getEmojiForCategory(categoryEmojiMap, item.categoryId);

    return (
      <AnimatedScaleTouchable
        style={[styles.eventItem, { backgroundColor: pastel.backgroundColor }]}
        onPress={() => router.push(`/details/${item.id}`)}
        onLongPress={() => handleLongPress(item)}>
        <View style={[styles.eventIcon, { backgroundColor: pastel.accentColor }]}>
          <Text style={styles.eventEmoji}>{emoji}</Text>
        </View>
        <View style={styles.eventContent}>
          <Text
            style={[styles.eventTitle, { color: theme.colors.text }]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.title}
          </Text>
          <Text style={[styles.eventDate, { color: theme.colors.textMuted }]} numberOfLines={1} ellipsizeMode="tail">
            {new Date(item.targetDate).toLocaleDateString()}
          </Text>
        </View>
        <View style={[styles.badge, isPast ? styles.pastBadge : styles.futureBadge]}>
          <Text
            style={[
              styles.badgeText,
              { color: isPast ? theme.colors.body : theme.colors.primaryDark || theme.colors.primary },
            ]}>
            {isPast ? `${absDay} days ago` : `${absDay} days left`}
          </Text>
        </View>
      </AnimatedScaleTouchable>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Mini Days</Text>
      </View>

      {renderPinnedSection()}

      <View style={styles.searchWrapper}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search events..."
        />
      </View>

      <FlatList
        data={filteredEvents}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          searchQuery.trim() !== '' ? (
            <View style={styles.emptySearch}>
              <Text style={[styles.emptySearchText, { color: theme.colors.textMuted }]}>No events found</Text>
            </View>
          ) : null
        }
        showsVerticalScrollIndicator={false}
      />

      <AnimatedScaleTouchable
        style={[styles.fab, { borderColor: theme.colors.primary, backgroundColor: theme.colors.card }]}
        onPress={() => router.push('/create-event')}>
        <Ionicons name="add" size={36} color={theme.colors.primary} />
      </AnimatedScaleTouchable>

      {/* Android Long Press Menu */}
      {Platform.OS === 'android' && (
        <Modal
          visible={showMenu}
          transparent
          animationType="fade"
          onRequestClose={() => {
            setShowMenu(false);
            setLongPressEvent(null);
          }}>
          <TouchableOpacity
            style={styles.menuOverlay}
            activeOpacity={1}
            onPress={() => {
              setShowMenu(false);
              setLongPressEvent(null);
            }}>
            <View style={[styles.menuContent, { backgroundColor: theme.colors.surface }]}>
              {longPressEvent && (
                <>
                  <Text style={[styles.menuTitle, { color: theme.colors.title }]} numberOfLines={1} ellipsizeMode="tail">
                    {longPressEvent.title}
                  </Text>
                  <TouchableOpacity
                    style={[styles.menuItem, { borderBottomColor: theme.colors.border }]}
                    onPress={handleEditEvent}>
                    <Ionicons name="create-outline" size={20} color={theme.colors.primary} />
                    <Text style={[styles.menuItemText, { color: theme.colors.title }]}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => handleDeleteEvent(longPressEvent.id, longPressEvent.title)}>
                    <Ionicons name="trash-outline" size={20} color={theme.colors.danger} />
                    <Text style={[styles.menuItemText, { color: theme.colors.danger }]}>Delete</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </TouchableOpacity>
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
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingTop: 12,
      paddingBottom: 8,
    },
    headerTitle: {
      ...theme.typography.h1,
      textAlign: 'center',
    },
    pinnedTouchable: {
      marginHorizontal: theme.spacing.xl,
      marginTop: theme.spacing.md,
      borderRadius: theme.radii.xl,
      ...theme.shadow.card,
    },
    pinnedCard: {
      paddingVertical: theme.spacing['2xl'],
      paddingHorizontal: theme.spacing.xl,
      borderRadius: theme.radii.xl,
      alignItems: 'center',
      overflow: 'hidden',
    },
    pinnedOverlay: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: theme.radii.xl,
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
    },
    pinnedImage: {
      borderRadius: theme.radii.xl,
    },
    pinnedTitle: {
      ...theme.typography.h3,
      marginBottom: theme.spacing.md,
      textAlign: 'center',
      color: theme.colors.title,
    },
    pinnedDays: {
      fontSize: 96,
      fontWeight: '700',
      color: theme.colors.primary,
      letterSpacing: 2,
    },
    pinnedBadge: {
      marginTop: theme.spacing.lg,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.radii.full,
      backgroundColor: theme.colors.accentLight,
    },
    pinnedBadgeText: {
      ...theme.typography.body,
      fontWeight: '600',
      color: theme.colors.primaryDark || theme.colors.primary,
    },
    pinnedDate: {
      ...theme.typography.body,
      color: theme.colors.body,
      marginTop: theme.spacing.md,
    },
    idleCard: {
      margin: theme.spacing.xl,
      padding: theme.spacing['2xl'],
      borderRadius: theme.radii.xl,
      alignItems: 'center',
      minHeight: 180,
      justifyContent: 'center',
      borderWidth: 1,
      ...theme.shadow.card,
    },
    idleText: {
      ...theme.typography.h3,
      marginTop: theme.spacing.lg,
    },
    idleSubtext: {
      ...theme.typography.bodySmall,
      marginTop: theme.spacing.sm,
    },
    emptyCard: {
      margin: theme.spacing.xl,
      padding: theme.spacing['2xl'],
      borderRadius: theme.radii.xl,
      alignItems: 'center',
      minHeight: 200,
      justifyContent: 'center',
      borderWidth: 1,
      ...theme.shadow.card,
    },
    emptyText: {
      ...theme.typography.h3,
      marginTop: theme.spacing.lg,
    },
    emptyButton: {
      marginTop: theme.spacing.xl,
      paddingHorizontal: theme.spacing.xl,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.radii.lg,
      borderWidth: 1,
      backgroundColor: 'transparent',
    },
    emptyButtonText: {
      color: theme.colors.primary,
      ...theme.typography.body,
      fontWeight: '600',
    },
    searchWrapper: {
      marginHorizontal: theme.spacing.xl,
      marginTop: theme.spacing.sm,
    },
    listContent: {
      paddingHorizontal: theme.spacing.xl,
      paddingBottom: 140,
      paddingTop: theme.spacing.lg,
    },
    eventItem: {
      flexDirection: 'row',
      padding: theme.spacing.xl,
      borderRadius: theme.radii.lg,
      marginBottom: theme.spacing.md,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.divider,
      ...theme.shadow.card,
    },
    eventIcon: {
      width: 52,
      height: 52,
      borderRadius: 26,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: theme.spacing.lg,
    },
    eventEmoji: {
      fontSize: 26,
    },
    eventContent: {
      flex: 1,
      minWidth: 0,
    },
    eventTitle: {
      ...theme.typography.body,
      fontWeight: '600',
      marginBottom: theme.spacing.xs,
      flexShrink: 1,
    },
    eventDate: {
      ...theme.typography.bodySmall,
      flexShrink: 1,
    },
    badge: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.radii.full,
      marginLeft: theme.spacing.md,
      flexShrink: 0,
    },
    futureBadge: {
      backgroundColor: theme.colors.accentLight,
    },
    pastBadge: {
      backgroundColor: theme.colors.surfaceAlt,
    },
    badgeText: {
      ...theme.typography.caption,
      fontWeight: '600',
      color: theme.colors.primaryDark || theme.colors.primary,
    },
    emptySearch: {
      padding: theme.spacing['2xl'],
      alignItems: 'center',
    },
    emptySearchText: {
      ...theme.typography.body,
    },
    fab: {
      position: 'absolute',
      bottom: 96,
      right: theme.spacing.lg,
      width: 77,
      height: 77,
      borderRadius: 38.5,
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.shadow.floating,
      borderWidth: 1.5,
    },
    menuOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    menuContent: {
      borderRadius: theme.radii.lg,
      padding: theme.spacing.xl,
      width: '80%',
      maxWidth: 400,
      ...theme.shadow.floating,
    },
    menuTitle: {
      ...theme.typography.h3,
      marginBottom: theme.spacing.lg,
      paddingBottom: theme.spacing.lg,
      borderBottomWidth: 1,
      flexShrink: 1,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.lg,
      borderBottomWidth: 1,
      gap: theme.spacing.md,
    },
    menuItemText: {
      ...theme.typography.body,
      fontWeight: '600',
      flexShrink: 1,
    },
  });
