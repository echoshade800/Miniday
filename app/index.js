import { useEffect, useMemo } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';

/**
 * App Entry Point
 * Redirects to onboarding or main tabs based on first-time user status
 */

export default function Index() {
  const router = useRouter();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

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
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
  });
