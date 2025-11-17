# Mini Days

A beautifully simple countdown tracker app built with React Native (Expo). Track important dates, anniversaries, recurring events, and never miss a moment with morning reminders.

## Features

- 📅 **Track Unlimited Countdowns** - Create as many countdown events as you need
- 📁 **Organize by Categories** - Life, Work, Anniversary, Love, and custom categories
- 📌 **Pin Important Events** - Highlight your most important countdown on the home screen
- 🔄 **Repeating Events** - Daily, weekly, or monthly recurring countdowns
- 🔔 **Morning Reminders** - Get notified at 8:00 AM on event days
- 💾 **Offline-First** - All data stored locally using AsyncStorage
- 🔍 **Search & Filter** - Quickly find events across all categories

## Tech Stack

- **Framework**: Expo SDK 54.0.7
- **Language**: JavaScript
- **Navigation**: expo-router (file-based routing)
- **State Management**: Zustand
- **Storage**: @react-native-async-storage/async-storage
- **Icons**: @expo/vector-icons (Ionicons)
- **Styling**: React Native StyleSheet

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone or download the project

2. Install dependencies:
```bash
npm install
```

### Running the App

Start the development server:
```bash
npm run dev
```

This will open Expo Dev Tools in your browser. You can then:
- Press `w` to open in web browser
- Scan QR code with Expo Go app (iOS/Android)
- Press `i` for iOS simulator (macOS only)
- Press `a` for Android emulator

### Building

Build for web:
```bash
npm run build:web
```

Type check:
```bash
npm run typecheck
```

## Project Structure

```
project/
├── app/                        # Main app screens (expo-router)
│   ├── (tabs)/                # Bottom tab navigation
│   │   ├── index.js           # Home/Dashboard
│   │   ├── countdowns.js      # Countdowns list & categories
│   │   ├── add.js             # Quick add entry point
│   │   └── profile.js         # Profile & settings
│   ├── details/[id].js        # Event details screen
│   ├── create-event.js        # Create/edit event form
│   ├── create-category.js     # Create category form
│   ├── category-events.js     # Category-specific event list
│   ├── about.js               # About & Help screen
│   ├── onboarding.js          # First-time user onboarding
│   └── _layout.js             # Root layout with navigation
├── components/                 # Reusable components (add as needed)
├── store/
│   └── useAppStore.js         # Zustand global state store
├── utils/
│   ├── StorageUtils.js        # User data & app storage utilities
│   ├── eventStorage.js        # Event & category storage
│   └── dateUtils.js           # Date calculations & formatting
├── hooks/
│   └── useFrameworkReady.ts   # Framework initialization hook
└── assets/                     # Images, fonts, etc.
```

## Key Screens

### 1. Onboarding
Welcome screen explaining app features with 3 slides and Privacy & Terms link.

### 2. Home (Dashboard)
- Pinned event card (blue for future, yellow for past)
- Search bar for filtering events
- Sorted event list (future events first, then past)
- Empty/idle states
- Swipe-to-delete

### 3. Countdowns
- Toggle between "All Events" and "By Category" views
- Category list with event counts
- Navigate to category-specific lists
- Create new categories

### 4. Create/Edit Event
- Event name & target date
- Solar/Lunar calendar toggle (lunar is stub, converts to solar)
- Category selection
- Pin toggle (auto-unpins other events)
- Repeat rules (none/daily/weekly/monthly)
- Reminder toggle (8:00 AM on event day)

### 5. Event Details
- Large countdown display
- Full event information
- Edit/Delete actions
- Color-coded by past/future status

### 6. Profile & Settings
- User info display (stub)
- App preferences (stubs: dark mode, default reminder)
- Data export option (stub)
- Link to About & Help

### 7. About & Help
- App description & version
- Feature list
- Support links (stubs: FAQ, Contact, Rate)

## How It Works

### Data Storage
All data is stored locally using AsyncStorage:
- **Events**: Stored in `MiniDays_events` key
- **Categories**: Stored in `MiniDays_categories` key (includes 4 default categories)
- **User Data**: Stored via `StorageUtils.getUserData()` / `saveUserData()`
- **App Info**: Stored via `StorageUtils.getData()` / `setData()`

### Identity Flow
On app startup (`app/_layout.js`):
1. Attempts to read user data via `StorageUtils.getUserData()`
2. Attempts to read storage data via `StorageUtils.getData()`
3. Loads events and categories from storage
4. Continues to render the app

### Event Logic
- **Pinning**: Only one event can be pinned at a time. Setting a new pin auto-unpins others.
- **Repeating Events**: Display only the next occurrence date. No automatic expiration; user must delete manually.
- **Sorting**: Future events first (soonest to latest), then past events (most recent to oldest).
- **Search**: Filters events by title, sorted by relevance.

### Countdown Calculation
- Future events: Shows "X days left" with blue styling
- Past events: Shows "X days since" with yellow styling
- Uses midnight-to-midnight comparison for day counting

## Adding New Features

### Add a New Screen
1. Create a new file in `app/` directory (e.g., `app/my-screen.js`)
2. Export a default React component
3. Navigate to it using `router.push('/my-screen')`

### Add a New Tab
1. Create a new file in `app/(tabs)/` (e.g., `app/(tabs)/new-tab.js`)
2. Update `app/(tabs)/_layout.js` to add the tab configuration

### Extend Event Properties
1. Update event creation in `utils/eventStorage.js`
2. Modify the form in `app/create-event.js`
3. Update display in `app/details/[id].js`
4. Update the Zustand store in `store/useAppStore.js` if needed

### Add Custom Categories
Users can create custom categories via the "Create Category" screen, accessible from the Countdowns tab.

## Next Steps

Here are concrete follow-up tasks to enhance the app:

1. **Cloud Sync & API Integration**
   - Implement real backend API for event synchronization
   - Add user authentication (email/password, social login)
   - Enable multi-device sync

2. **Real Push Notifications**
   - Implement actual local notification scheduling using `expo-notifications`
   - Add customizable reminder times (not just 8:00 AM)
   - Support multiple reminders per event

3. **Advanced Filtering & Sorting**
   - Add date range filters (this week, this month, this year)
   - Sort by multiple criteria (date, name, category, creation time)
   - Filter by repeat rule type

4. **Theme Support**
   - Implement dark/light mode toggle
   - Add custom color schemes
   - Per-category color customization

5. **Statistics & Analytics**
   - Show events per category chart
   - Track completion streaks for repeating events
   - Display time since first event created

6. **Import/Export Functionality**
   - Export events to JSON/CSV format
   - Import events from file
   - Backup/restore entire app data

7. **Lunar Calendar Integration**
   - Integrate a proper lunar calendar library
   - Support accurate lunar-to-solar date conversion
   - Display both calendar types in event details

8. **Widget Support**
   - Add home screen widget showing pinned event
   - Display countdown on device lock screen
   - Show upcoming events in widget

## Environment Variables

The project includes Supabase integration capabilities via environment variables:
- `EXPO_PUBLIC_SUPABASE_URL`: Supabase project URL
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key

These are currently not used but can be integrated for cloud features.

## Troubleshooting

### App won't start
- Ensure you're using Node.js v18 or higher
- Clear Metro bundler cache: `npx expo start -c`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

### Storage issues
- Clear app data/cache on your device
- For web: Clear browser localStorage
- For iOS/Android: Uninstall and reinstall the app

### Navigation errors
- Ensure all screen files export a default component
- Check that file names match the routes being navigated to
- Verify `app/_layout.js` includes all necessary Stack.Screen entries

## Contributing

This is a starter template project. Feel free to:
- Add new features from the "Next Steps" section
- Improve UI/UX design
- Optimize performance
- Add tests
- Extend documentation

## License

This project is open source and available for personal and commercial use.

---

Made with ❤️ for counting days that matter
