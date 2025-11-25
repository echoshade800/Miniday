import { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AnimatedScaleTouchable from '../components/AnimatedScaleTouchable';
import { useTheme } from '../hooks/useTheme';

const FAQ_ITEMS = [
  {
    question: 'How do I create a new event?',
    paragraphs: [
      'Go to the main screen and tap the “+” button (or the add button at the bottom).',
      'Fill in the event name, date, category, and any reminder or repeat options.',
    ],
  },
  {
    question: 'How do I edit an existing event?',
    paragraphs: ['Open the event you want to change and tap the “Edit” button in the top-right corner.'],
  },
  {
    question: 'Why does the countdown number change when I tap it?',
    paragraphs: ['You can tap the countdown number to switch between different views:'],
    list: ['Days', 'Years / Months / Days', 'Months / Days', 'Weeks / Days'],
    footer: 'Tap again to cycle back.',
  },
  {
    question: 'Can I customize the event background?',
    paragraphs: [
      'Open the event, tap “Customize”, then choose an image from your gallery.',
      'Adjust contrast and text color visibility if needed.',
    ],
  },
  {
    question: 'How do I pin an event to the top?',
    paragraphs: ['Open the event and enable the “Pinned” toggle.', 'Only one event can be pinned at a time.'],
  },
  {
    question: 'How do reminders work?',
    paragraphs: [
      'Enable “Reminder” when editing an event and select the reminder date and time.',
      'You will receive a notification at the chosen time.',
    ],
  },
  {
    question: 'What does “Repeat” mean?',
    paragraphs: ['Repeat allows an event to automatically recur:'],
    list: [
      'Daily — every day at the same time',
      'Weekly — same weekday every week',
      'Monthly — same day every month',
      'None — no repetition',
    ],
  },
  {
    question: 'Why does the countdown text size change?',
    paragraphs: [
      'The app automatically adjusts text size to make sure long formats (such as “18 years 4 months 22 days”) fit properly on your screen.',
    ],
  },
  {
    question: 'How do I delete an event?',
    paragraphs: [
      'Open the event, scroll to the bottom, and tap “Delete Event”.',
      'You can also long-press an event card on the main list and choose “Delete”.',
    ],
  },
  {
    question: 'How do I switch to dark mode?',
    paragraphs: ['Go to the Profile tab and toggle “Dark Theme”.', 'All screens will follow the same theme instantly.'],
  },
  {
    question: 'Does this app require a login?',
    paragraphs: ['No. All features are available without creating an account.'],
  },
  {
    question: 'Is my data stored online?',
    paragraphs: ['Your events are saved locally on your device and are not uploaded to any server.'],
  },
];

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
          {FAQ_ITEMS.map((item, index) => {
            const isLast = index === FAQ_ITEMS.length - 1;
            return (
              <View key={item.question} style={[styles.faqItem, isLast && styles.faqItemLast]}>
                <Text style={[styles.question, { color: theme.colors.title }]}>{item.question}</Text>
                {item.paragraphs.map((paragraph, paragraphIndex) => (
                  <Text key={`${item.question}-p-${paragraphIndex}`} style={[styles.answer, { color: theme.colors.text }]}>
                    {paragraph}
                  </Text>
                ))}
                {item.list && (
                  <View style={styles.list}>
                    {item.list.map((entry) => (
                      <View key={`${item.question}-${entry}`} style={styles.listRow}>
                        <Text style={[styles.bullet, { color: theme.colors.primary }]}>•</Text>
                        <Text style={[styles.listText, { color: theme.colors.text }]}>{entry}</Text>
                      </View>
                    ))}
                  </View>
                )}
                {item.footer && <Text style={[styles.answer, { color: theme.colors.text }]}>{item.footer}</Text>}
              </View>
            );
          })}
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
    faqItem: {
      marginBottom: theme.spacing.lg,
    },
    faqItemLast: {
      marginBottom: 0,
    },
    question: {
      ...theme.typography.body,
      fontWeight: '700',
      marginBottom: theme.spacing.xs,
    },
    answer: {
      ...theme.typography.bodySmall,
      lineHeight: 22,
      marginBottom: theme.spacing.xs,
    },
    list: {
      marginBottom: theme.spacing.xs,
    },
    listRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: theme.spacing.xs,
    },
    bullet: {
      marginRight: theme.spacing.sm,
      fontSize: 12,
      lineHeight: 22,
    },
    listText: {
      ...theme.typography.bodySmall,
      flex: 1,
      lineHeight: 22,
    },
  });
