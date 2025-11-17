import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '../hooks/useFrameworkReady';
import StorageUtils from '../utils/StorageUtils';
import { useAppStore } from '../store/useAppStore';

/**
 * Root Layout
 * Handles app initialization, identity flow, and navigation structure
 */
export default function RootLayout() {
  useFrameworkReady();

  const { loadEvents, loadCategories } = useAppStore();

  useEffect(() => {
    // Startup identity flow
    const initializeApp = async () => {
      try {
        // 1. Attempt to read userData
        const userData = await StorageUtils.getUserData();
        if (userData) {
          console.log('User data loaded:', userData.userName);
        }

        // 2. Attempt to read storageData
        const storageData = await StorageUtils.getData();
        if (storageData) {
          console.log('Storage data loaded');
        }

        // 3. Load events and categories
        await loadEvents();
        await loadCategories();

        // 4. Continue to render the app
      } catch (error) {
        console.error('App initialization error:', error);
      }
    };

    initializeApp();
  }, []);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="details/[id]" />
        <Stack.Screen name="create-event" />
        <Stack.Screen name="create-category" />
        <Stack.Screen name="category-events" />
        <Stack.Screen name="about" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
