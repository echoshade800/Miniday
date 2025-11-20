import { create } from 'zustand';
import { eventStorage } from '../utils/eventStorage';
import { getNextOccurrence } from '../utils/dateUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_MODE_KEY = 'MiniDays_themeMode';
const LEGACY_DARK_MODE_KEY = 'MiniDays_darkMode';

/**
 * Global app store using Zustand
 * Manages events, categories, and app state
 */
export const useAppStore = create((set, get) => ({
  // State
  events: [],
  categories: [],
  loading: false,
  hasCompletedOnboarding: false,
  darkMode: false,
  themeMode: 'light',

  // Actions
  setOnboardingComplete: (complete) => set({ hasCompletedOnboarding: complete }),

  loadThemeMode: async () => {
    try {
      let storedMode = await AsyncStorage.getItem(THEME_MODE_KEY);

      if (storedMode !== 'light' && storedMode !== 'dark') {
        const legacyValue = await AsyncStorage.getItem(LEGACY_DARK_MODE_KEY);
        const legacyIsDark = legacyValue === 'true';
        storedMode = legacyIsDark ? 'dark' : 'light';
        await AsyncStorage.setItem(THEME_MODE_KEY, storedMode);
      }

      set({ themeMode: storedMode, darkMode: storedMode === 'dark' });
      return storedMode;
    } catch (error) {
      console.error('Failed to load theme mode:', error);
      return 'light';
    }
  },

  setThemeMode: async (mode) => {
    try {
      await AsyncStorage.setItem(THEME_MODE_KEY, mode);
      set({ themeMode: mode, darkMode: mode === 'dark' });
    } catch (error) {
      console.error('Failed to save theme mode:', error);
    }
  },

  // Backward-compatible helpers
  loadDarkMode: async () => {
    const mode = await get().loadThemeMode();
    return mode === 'dark';
  },

  setDarkMode: async (isDark) => {
    await get().setThemeMode(isDark ? 'dark' : 'light');
  },

  loadEvents: async () => {
    set({ loading: true });
    const events = await eventStorage.getEvents();
    // Process repeating events to show next occurrence
    const processedEvents = events.map(event => {
      if (event.repeatRule && event.repeatRule !== 'none') {
        return {
          ...event,
          targetDate: getNextOccurrence(event.targetDate, event.repeatRule),
        };
      }
      return event;
    });
    set({ events: processedEvents, loading: false });
  },

  loadCategories: async () => {
    const categories = await eventStorage.getCategories();
    set({ categories });
  },

  addEvent: async (event) => {
    // Handle pinning logic: unpin other events if this one is pinned
    if (event.isPinned) {
      const currentEvents = get().events;
      const updatedEvents = currentEvents.map(e => ({ ...e, isPinned: false }));
      await eventStorage.saveEvents(updatedEvents);
    }

    const newEvent = await eventStorage.addEvent(event);
    if (newEvent) {
      await get().loadEvents();
      return newEvent;
    }
    return null;
  },

  updateEvent: async (id, updates) => {
    // Handle pinning logic
    if (updates.isPinned) {
      const currentEvents = get().events;
      for (const event of currentEvents) {
        if (event.id !== id && event.isPinned) {
          await eventStorage.updateEvent(event.id, { isPinned: false });
        }
      }
    }

    const updated = await eventStorage.updateEvent(id, updates);
    if (updated) {
      await get().loadEvents();
      return updated;
    }
    return null;
  },

  deleteEvent: async (id) => {
    const success = await eventStorage.deleteEvent(id);
    if (success) {
      await get().loadEvents();
    }
    return success;
  },

  addCategory: async (category) => {
    const newCategory = await eventStorage.addCategory(category);
    if (newCategory) {
      await get().loadCategories();
      return newCategory;
    }
    return null;
  },

  deleteCategory: async (id) => {
    const success = await eventStorage.deleteCategory(id);
    if (success) {
      await get().loadCategories();
      await get().loadEvents();
    }
    return success;
  },

  getPinnedEvent: () => {
    const events = get().events;
    return events.find(e => e.isPinned) || null;
  },

  getEventsByCategory: (categoryId) => {
    const events = get().events;
    return events.filter(e => e.categoryId === categoryId);
  },
}));
