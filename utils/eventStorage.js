import AsyncStorage from '@react-native-async-storage/async-storage';

const EVENTS_KEY = 'MiniDays_events';
const CATEGORIES_KEY = 'MiniDays_categories';

// Default categories with new icon system
export const DEFAULT_CATEGORIES = [
  { id: '1', name: 'Life', iconKey: 'life', icon: '🌞' },
  { id: '2', name: 'Work', iconKey: 'work', icon: '💼' },
  { id: '3', name: 'Love', iconKey: 'love', icon: '❤️' },
  { id: '4', name: 'Celebration', iconKey: 'celebration', icon: '🎉' },
  { id: '5', name: 'Birthday', iconKey: 'birthday', icon: '🎂' },
  { id: '6', name: 'Graduation', iconKey: 'graduation', icon: '🎓' },
  { id: '7', name: 'Flight', iconKey: 'flight', icon: '✈️' },
  { id: '8', name: 'Travel', iconKey: 'travel', icon: '🧳' },
  { id: '9', name: 'Home', iconKey: 'home', icon: '🏡' },
  { id: '10', name: 'Fitness', iconKey: 'fitness', icon: '🏋️' },
  { id: '11', name: 'Study', iconKey: 'study', icon: '📚' },
  { id: '12', name: 'Gaming', iconKey: 'game', icon: '🎮' },
  { id: '13', name: 'Music', iconKey: 'music', icon: '🎧' },
  { id: '14', name: 'Dining', iconKey: 'eating', icon: '🍽️' },
  { id: '15', name: 'Pizza Night', iconKey: 'pizza', icon: '🍕' },
  { id: '16', name: 'Coffee', iconKey: 'coffee', icon: '☕️' },
  { id: '17', name: 'Restroom', iconKey: 'toilet', icon: '🚻' },
  { id: '18', name: 'Moonlight', iconKey: 'moon', icon: '🌙' },
  { id: '19', name: 'Walk', iconKey: 'walk', icon: '🚶' },
  { id: '20', name: 'Picnic', iconKey: 'picnic', icon: '🧺' },
  { id: '21', name: 'Thinking', iconKey: 'thinking', icon: '🤔' },
  { id: '22', name: 'Art', iconKey: 'art', icon: '🎨' },
  { id: '23', name: 'Phone Time', iconKey: 'phone', icon: '📱' },
  { id: '24', name: 'Soccer', iconKey: 'soccer', icon: '⚽️' },
  { id: '25', name: 'Basketball', iconKey: 'basketball', icon: '🏀' },
  { id: '26', name: 'Archery', iconKey: 'archery', icon: '🎯' },
  { id: '27', name: 'Swimming', iconKey: 'swimming', icon: '🏊' },
  { id: '28', name: 'Flowers', iconKey: 'flower', icon: '🌸' },
];

export const DEFAULT_CATEGORY_IDS = DEFAULT_CATEGORIES.map((category) => category.id);

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
