import AsyncStorage from '@react-native-async-storage/async-storage';

const EVENTS_KEY = 'MiniDays_events';
const CATEGORIES_KEY = 'MiniDays_categories';

<<<<<<< HEAD
// Default categories with new icon system
const DEFAULT_CATEGORIES = [
  { id: '1', name: 'Life', iconKey: 'life', icon: '🌞' },
  { id: '2', name: 'Work', iconKey: 'work', icon: '💼' },
  { id: '3', name: 'Anniversary', iconKey: 'celebration', icon: '🎉' },
  { id: '4', name: 'Love', iconKey: 'love', icon: '❤️' },
=======
// Default categories with premium, sophisticated icons
const DEFAULT_CATEGORIES = [
  { id: '1', name: 'Life', icon: '✨' },
  { id: '2', name: 'Work', icon: '🎯' },
  { id: '3', name: 'Anniversary', icon: '🏆' },
  { id: '4', name: 'Love', icon: '💎' },
  { id: '5', name: 'Travel', icon: '✈️' },
  { id: '6', name: 'Health', icon: '🌱' },
  { id: '7', name: 'Study', icon: '📚' },
  { id: '8', name: 'Birthday', icon: '🎂' },
>>>>>>> 04cc856fdfd4cd109ea457b7c8ad5aa83e921d9f
];

/**
 * Event storage utility for managing countdown events
 */
export const eventStorage = {
  /**
   * Get all events
   */
  async getEvents() {
    try {
      const data = await AsyncStorage.getItem(EVENTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to get events:', error);
      return [];
    }
  },

  /**
   * Save events
   */
  async saveEvents(events) {
    try {
      await AsyncStorage.setItem(EVENTS_KEY, JSON.stringify(events));
      return true;
    } catch (error) {
      console.error('Failed to save events:', error);
      return false;
    }
  },

  /**
   * Add a new event
   */
  async addEvent(event) {
    try {
      const events = await this.getEvents();
      const newEvent = {
        ...event,
        id: Date.now().toString(),
        createdAt: Date.now(),
      };
      events.push(newEvent);
      await this.saveEvents(events);
      return newEvent;
    } catch (error) {
      console.error('Failed to add event:', error);
      return null;
    }
  },

  /**
   * Update an event
   */
  async updateEvent(id, updates) {
    try {
      const events = await this.getEvents();
      const index = events.findIndex(e => e.id === id);
      if (index !== -1) {
        events[index] = { ...events[index], ...updates };
        await this.saveEvents(events);
        return events[index];
      }
      return null;
    } catch (error) {
      console.error('Failed to update event:', error);
      return null;
    }
  },

  /**
   * Delete an event
   */
  async deleteEvent(id) {
    try {
      const events = await this.getEvents();
      const filtered = events.filter(e => e.id !== id);
      await this.saveEvents(filtered);
      return true;
    } catch (error) {
      console.error('Failed to delete event:', error);
      return false;
    }
  },

  /**
   * Get categories
   */
  async getCategories() {
    try {
      const data = await AsyncStorage.getItem(CATEGORIES_KEY);
      if (!data) {
        // Initialize with default categories
        await this.saveCategories(DEFAULT_CATEGORIES);
        return DEFAULT_CATEGORIES;
      }
      return JSON.parse(data);
    } catch (error) {
      console.error('Failed to get categories:', error);
      return DEFAULT_CATEGORIES;
    }
  },

  /**
   * Save categories
   */
  async saveCategories(categories) {
    try {
      await AsyncStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
      return true;
    } catch (error) {
      console.error('Failed to save categories:', error);
      return false;
    }
  },

  /**
   * Add a new category
   */
  async addCategory(category) {
    try {
      const categories = await this.getCategories();
      const newCategory = {
        ...category,
        id: Date.now().toString(),
      };
      categories.push(newCategory);
      await this.saveCategories(categories);
      return newCategory;
    } catch (error) {
      console.error('Failed to add category:', error);
      return null;
    }
  },

  /**
   * Delete a category and reassign events to default
   */
  async deleteCategory(id) {
    try {
      const categories = await this.getCategories();
      const filtered = categories.filter(c => c.id !== id);
      await this.saveCategories(filtered);

      // Reassign events to first category
      const events = await this.getEvents();
      const updated = events.map(e =>
        e.categoryId === id ? { ...e, categoryId: '1' } : e
      );
      await this.saveEvents(updated);

      return true;
    } catch (error) {
      console.error('Failed to delete category:', error);
      return false;
    }
  },
};
