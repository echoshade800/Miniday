import { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../store/useAppStore';
import { useTheme } from '../hooks/useTheme';

const { width } = Dimensions.get('window');

/**
 * Onboarding Screen
 * Purpose: Welcome users and explain the app's core features
 *
 * Features:
 * - 3-slide walkthrough
 * - Privacy & Terms link
 * - Navigate to Home after completion
 */

const slides = [
  {
    icon: 'calendar-outline',
    title: 'Track Important Days',
    description: 'Effortlessly track countdowns, anniversaries, and milestones in your life.',
  },
  {
    icon: 'folder-outline',
    title: 'Organize by Category',
    description: 'Keep your events organized with categories like Life, Work, Anniversary, and Love.',
  },
  {
    icon: 'notifications-outline',
    title: 'Never Miss a Moment',
    description: 'Get a reminder at 8:00 AM on the day that matters most to you.',
  },
];

export default function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();
  const setOnboardingComplete = useAppStore((state) => state.setOnboardingComplete);
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleGetStarted();
    }
  };

  const handleGetStarted = () => {
    setOnboardingComplete(true);
    router.replace('/(tabs)');
  };

  const slide = slides[currentSlide];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name={slide.icon} size={100} color={theme.colors.primary} />
        </View>

        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.description}>{slide.description}</Text>

        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentSlide && styles.activeDot,
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleNext}
          activeOpacity={0.8}>
          <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail">
            {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => router.push('/about')}>
          <Text style={styles.linkText} numberOfLines={1} ellipsizeMode="tail">
            Privacy & Terms
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 30,
    },
    iconContainer: {
      marginBottom: 40,
    },
    title: {
      ...theme.typography.h1,
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: theme.spacing.xl,
    },
    description: {
      ...theme.typography.body,
      color: theme.colors.textMuted,
      textAlign: 'left',
      paddingHorizontal: theme.spacing.xl,
      flexShrink: 1,
    },
    pagination: {
      flexDirection: 'row',
      marginTop: 40,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.colors.divider,
      marginHorizontal: 4,
    },
    activeDot: {
      backgroundColor: theme.colors.primary,
      width: 24,
    },
    footer: {
      paddingHorizontal: 30,
      paddingBottom: 30,
    },
    button: {
      backgroundColor: 'transparent',
      paddingVertical: theme.spacing.lg,
      borderRadius: theme.radii.lg,
      alignItems: 'center',
      marginBottom: theme.spacing.lg,
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    buttonText: {
      color: theme.colors.primary,
      ...theme.typography.h3,
      fontWeight: '600',
      flexShrink: 1,
      textAlign: 'center',
    },
    linkButton: {
      alignItems: 'center',
      paddingVertical: theme.spacing.sm,
    },
    linkText: {
      color: theme.colors.body,
      ...theme.typography.bodySmall,
      flexShrink: 1,
      textAlign: 'center',
    },
  });
