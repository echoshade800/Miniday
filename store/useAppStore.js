import { create } from 'zustand';
import { eventStorage } from '../utils/eventStorage';
import { getNextOccurrence } from '../utils/dateUtils';

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

  // Actions
  setOnboardingComplete: (complete) => set({ hasCompletedOnboarding: complete }),

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
