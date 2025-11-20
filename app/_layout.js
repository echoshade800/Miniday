
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

  const { loadEvents, loadCategories, loadThemeMode } = useAppStore();
  const themeMode = useAppStore((state) => state.themeMode);

  useEffect(() => {
    // Startup identity flow
    const initializeApp = async () => {
      try {
        // 1. Load theme preference
        await loadThemeMode();

        // 2. Attempt to read userData
        const userData = await StorageUtils.getUserData();
        if (userData) {
          console.log('User data loaded:', userData.userName);
        }

        // 3. Attempt to read storageData
        const storageData = await StorageUtils.getData();
        if (storageData) {
          console.log('Storage data loaded');
        }

        // 4. Load events and categories
        await loadEvents();
        await loadCategories();

        // 5. Continue to render the app
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
      <StatusBar style={themeMode === 'dark' ? 'light' : 'dark'} />
    </>
  );
}
