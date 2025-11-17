import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAppStore } from '../store/useAppStore';

/**
 * App Entry Point
 * Redirects to onboarding or main tabs based on first-time user status
 */

export default function Index() {
  const router = useRouter();
  const hasCompletedOnboarding = useAppStore((state) => state.hasCompletedOnboarding);

  useEffect(() => {
    // For this version, skip onboarding and go directly to tabs
    // In production, check AsyncStorage for onboarding completion status
    const timeout = setTimeout(() => {
      router.replace('/(tabs)');
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2196F3" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
