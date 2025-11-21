import { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AnimatedScaleTouchable from '../components/AnimatedScaleTouchable';
import { useTheme } from '../hooks/useTheme';

const FAQ_CONTENT = `Below is your full MiniDays FAQ in English, translated exactly from the Chinese version you approved.

 No content was changed. No omissions. No additions.

 You can directly copy this into Cursor or your app.

---

📘 MiniDays FAQ (Common Questions & Usage Tips)

Welcome to MiniDays — your personal event tracker and countdown companion!

 Here are the most common questions and suggestions to help you use the app smoothly.

---

🌟 1. How do I create a new event?

You can create a new event in the following places:

- The “+” button at the bottom-right of the Home screen

- The “+” button on the top-right of the Category (Countdowns) screen

- The “Add Event” button when a category is empty

When creating an event, you can set:

- Event name

- Solar or Lunar date

- Category (can create custom categories)

- Pinned status (only one pinned event allowed)

- Repeating frequency (Daily/Weekly/Monthly)

- Reminder and reminder time

---

🗂️ 2. Can I create custom categories?

Yes!

Go to Countdowns → top-right “+” → New Category

You can:

- Enter a category name

- Choose a cute emoji icon

- Save and assign future events

You can also create a category from the “Category” section inside New Event.

---

🔄 3. How does the Repeat feature work?

In the “Repeat” section, you can choose:

- None — no repeat

- Daily — reminds you at the same time every day

- Weekly — reminds you weekly on the same weekday

- Monthly — reminds you monthly on the same date

MiniDays will automatically send reminders based on your settings.

---

⏰ 4. How do reminders work? Can I choose an exact time?

Yes.

When you turn on Reminder, a time picker wheel appears.

You can choose:

- Year

- Month

- Day

- Hour

- Minute

Reminder notifications include:

- Event name

- Event date

---

🌓 5. How do I enable dark mode?

Go to:

Profile → Dark Theme

After enabling, all pages will switch to dark mode:

- Home

- Categories

- Event details

- Edit event

- All secondary & tertiary screens

Colors follow iOS system dark mode appearance.

---

💗 6. How do I change an event’s background?

Inside the event detail page:

- Long-press the large event display card

- A dialog pops up allowing you to choose a photo

- Select an image from your phone’s gallery

Photo access permission is required.

---

🗑️ 7. Why does “Event not found” appear after deleting?

This prompt has been removed in newer versions.

Now:

✔ After deleting an event, MiniDays returns to Home automatically,

 ✔ No error message is shown.

---

📤 8. Can I share an event?

Yes!

Long-press an event on the Home screen:

You will see:

2734. Share

2735. Edit

2736. Delete

Choose Share:

- MiniDays generates a nicely formatted event screenshot

- You can share it to common social apps

---

🔢 9. Can countdown be shown in weeks/months/years?

Yes.

On the event detail screen:

👉 Tap the large countdown number

MiniDays will toggle between:

- Days

- Weeks

- Months

- Years

Non-integer values show two decimals, e.g.:

- 3.25 weeks

- 1.58 months

---

🧹 10. How does search work?

In the Home search bar:

You can type a keyword.

 MiniDays searches:

✔ Event name

 ✔ Category name

 ✔ Target date (smart match)

Results are sorted by relevance.

Clear the search bar to restore the full list.

---

📦 11. Is my data saved safely? Will it be lost?

MiniDays uses:

📌 Local storage (AsyncStorage)

 📌 No account required

 📌 No cloud upload

Deleting/uninstalling the app will clear your data.

---

📁 12. How do I view all events in a category?

Go to:

Countdowns → tap a category card

If the category contains no events, a cute empty-state page appears with a button to add events quickly.

---

🛠 13. Why can only one event be pinned?

To keep the main screen clean and focused.

To change the pinned event:

- Unpin the current one

- Pin a different event

---

📆 14. How do I switch between Solar and Lunar dates?

When creating or editing an event:

Choose:

- Solar

- Lunar

If Lunar is selected, MiniDays automatically converts it to Solar for display.

---

🎨 15. Why is the theme a soft pink + neutral mix?

The MiniDays design philosophy:

- Cute but not childish

- Neutral enough for both men and women

- Soft colors + light card layout

- Simple and pleasant to use every day

---

📮 16. What if the screen doesn't refresh or turns blank?

Try:

- Shake device → Reload JS

- Close Expo Go and reopen

- Press r in the terminal to reload

- Clear Expo Go cache

- Restart the development server

---

📱 17. How do I use MiniDays on an iPhone?

Recommended:

- Use Expo Go

- Scan the QR code from the terminal

If the QR code fails:

- Click “open web” in terminal

- Enter the URL manually in Safari

---

🧰 18. Does MiniDays support theme customization?

Yes.

Developers can modify:

- Theme primary colors

- Background colors

- Card colors

- Fonts

- Animations

More themes are planned in future updates.`;

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

