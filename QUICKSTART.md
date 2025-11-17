# Mini Days - Quick Start Guide

## 🚀 Installation & Running

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

This opens Expo Dev Tools. Then:
- Press **`w`** to open in web browser
- Scan QR code with **Expo Go** app (iOS/Android)
- Press **`i`** for iOS simulator (macOS only)
- Press **`a`** for Android emulator

### 3. Build for Web
```bash
npm run build:web
```

Output will be in the `dist/` folder.

---

## 📱 First Use

When you first open the app:

1. **Skip Onboarding** - The app currently skips to the main tabs
2. **Home Tab** - Shows empty state with "Add your first day" button
3. **Tap the + icon** or go to "Add" tab to create your first event

---

## 🎯 Quick Feature Tour

### Creating Your First Event

1. Tap the **"+"** icon in the header or **"Add"** tab
2. Enter an event name (e.g., "Birthday", "Anniversary")
3. Select a target date
4. Choose a category (Life, Work, Anniversary, Love)
5. Toggle **"Pin Event"** to feature it on the home screen
6. Set **"Repeat"** if it's a recurring event
7. Enable **"Reminder"** for 8:00 AM notifications
8. Tap **"Save Event"**

### Home Screen Features

- **Top Section**: Shows your pinned event with countdown
  - Blue = future events ("X days left")
  - Yellow = past events ("X days since")
- **Search Bar**: Filter events by name
- **Event List**: All events sorted (future first, past second)
- **Long Press**: Delete an event

### Organizing with Categories

1. Go to **"Countdowns"** tab
2. Tap **"By Category"** segment
3. Tap **"+"** icon to create a custom category
4. Choose an emoji icon and name
5. Tap any category to view its events

### Event Details

Tap any event to see:
- Large countdown number
- Full date with weekday
- Category, pin status, repeat rule, reminder
- **Edit** button (top right)
- **Delete** button (bottom, red outline)

---

## 💾 Data Storage

All data is stored **locally** on your device using AsyncStorage:

- Events
- Categories (includes 4 default: Life, Work, Anniversary, Love)
- User preferences
- App state

**No internet connection required!**

---

## 🎨 UI Color Guide

- **Blue** (#2196F3): Future events, primary actions
- **Yellow** (#FFA726): Past events, idle states
- **Red** (#f44336): Delete actions
- **White** (#fff): Card backgrounds
- **Gray** (#f5f5f5): App background

---

## ⌨️ Keyboard Shortcuts (Web)

When using the web version:
- Type in search bar to filter events
- Click anywhere outside inputs to dismiss keyboard
- Use Tab to navigate between form fields

---

## 🔧 Troubleshooting

### App won't start
```bash
# Clear cache and restart
npx expo start -c
```

### Storage issues (Web)
Open browser DevTools → Application → Local Storage → Clear

### Storage issues (Mobile)
Uninstall and reinstall the app

### Events not showing
- Check if you're in search mode (clear search bar)
- Verify events were saved (check Countdowns → All Events)

---

## 📝 Sample Events to Try

Create these to explore all features:

1. **Birthday** (Life category, repeating yearly, pinned)
2. **Project Deadline** (Work category, future date)
3. **Anniversary** (Anniversary category, past date to see "days since")
4. **Weekly Meeting** (Work category, repeating weekly)
5. **Valentine's Day** (Love category, repeating yearly, reminder on)

---

## 🎓 Pro Tips

1. **Pin your most important event** - Only one can be pinned, choose wisely!
2. **Use categories** - Keep work and personal life separate
3. **Search is your friend** - Quickly find any event by typing
4. **Long press to delete** - Quick way to remove events from lists
5. **Repeating events** - Perfect for birthdays, anniversaries, weekly meetings
6. **Past events** - Track milestones like "days since quit smoking"

---

## 📚 Next Steps

After getting comfortable with the basics:

- Read the full [README.md](README.md) for technical details
- Check the "Next Steps" section for enhancement ideas
- Explore the codebase to understand the architecture
- Add your own custom features!

---

## 🆘 Need Help?

- Check **About & Help** screen in the Profile tab
- Review the [README.md](README.md) documentation
- Inspect the code comments in each screen file

---

**Enjoy tracking your important days! 🎉**
