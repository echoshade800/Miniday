import { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AnimatedScaleTouchable from '../components/AnimatedScaleTouchable';
import { useTheme } from '../hooks/useTheme';

const FAQ_CONTENT = `1. How do I create a new event?

Go to the main screen and tap the “+” button (or the add button at the bottom). Fill in the event name, date, category, and any reminder or repeat options.



2. How do I edit an existing event?

Open the event you want to change and tap the “Edit” button in the top-right corner.



3. Why does the countdown number change when I tap it?

You can tap the countdown number to switch between different views:



Days



Years / Months / Days



Months / Days



Weeks / Days

Tap again to cycle back.



4. Can I customize the event background?

Yes. Open the event → tap “Customize” → choose an image from your gallery.

You can also adjust contrast and text color visibility.



5. How do I pin an event to the top?

Open the event → enable the “Pinned” toggle.

Only one event can be pinned at a time.



6. How do reminders work?

Enable “Reminder” when editing an event, then select the reminder date and time. You will receive a notification at the chosen time.



7. What does ‘Repeat’ mean?

Repeat allows an event to automatically recur:



Daily – every day at the same time



Weekly – same weekday every week



Monthly – same day every month



None – no repetition



8. Why does the countdown text size change?

The app automatically adjusts text size to make sure long formats (such as “18 years 4 months 22 days”) fit properly on your screen.



9. How do I delete an event?

Open the event → scroll to the bottom → tap “Delete Event”.

Or long-press an event card on the main list and choose “Delete”.



10. How do I switch to dark mode?

Go to the Profile tab and toggle “Dark Theme”.

All screens will follow the same theme instantly.



11. Does this app require a login?

No. All features are available without creating an account.



12. Is my data stored online?

Your events are saved locally on your device. They are not uploaded to any server.`;

export default function FAQScreen() {
  const router = useRouter();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <AnimatedScaleTouchable style={styles.headerAction} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.title} />
        </AnimatedScaleTouchable>
        <Text style={[styles.headerTitle, { color: theme.colors.title }]} numberOfLines={1} ellipsizeMode="tail">
          FAQ
        </Text>
        <View style={styles.headerAction}>
          <Ionicons name="arrow-back" size={24} color="transparent" />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.contentCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <Text style={[styles.faqText, { color: theme.colors.text }]}>{FAQ_CONTENT}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    headerTitle: {
      ...theme.typography.h2,
      flex: 1,
      flexShrink: 1,
      textAlign: 'center',
      marginHorizontal: theme.spacing.md,
    },
    headerAction: {
      paddingHorizontal: theme.spacing.xs,
      paddingVertical: theme.spacing.xs,
      flexShrink: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingBottom: theme.spacing['2xl'],
    },
    contentCard: {
      borderRadius: theme.radii.xl,
      padding: theme.spacing.xl,
      borderWidth: 1,
      ...theme.shadow.soft,
    },
    faqText: {
      ...theme.typography.bodySmall,
      lineHeight: 22,
      textAlign: 'left',
    },
  });

