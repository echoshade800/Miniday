import { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AnimatedScaleTouchable from '../../components/AnimatedScaleTouchable';
import { SECTION_EMOJIS } from '../../utils/theme';
import { useAppStore } from '../../store/useAppStore';
import { useTheme } from '../../hooks/useTheme';

/**
 * Profile & Settings Screen
 */
export default function ProfileScreen() {
  const router = useRouter();
  const { themeMode, setThemeMode, loadThemeMode } = useAppStore();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const isDarkMode = themeMode === 'dark';
  const [defaultReminder, setDefaultReminder] = useState(true);

  useEffect(() => {
    loadThemeMode();
  }, []);

  const handleDarkModeToggle = async () => {
    await setThemeMode(isDarkMode ? 'light' : 'dark');
  };

  const renderSettingRow = (emoji, title, value, onPress) => (
    <AnimatedScaleTouchable style={[styles.settingRow, { backgroundColor: theme.colors.surface }]} onPress={onPress} activeScale={0.97}>
      <View style={styles.settingLeft}>
        <View style={[styles.emojiBadge, { backgroundColor: theme.colors.surfaceAlt }]}>
          <Text style={styles.emoji}>{emoji}</Text>
        </View>
        <Text
          style={[styles.settingTitle, { color: theme.colors.title }]}
          numberOfLines={1}
          ellipsizeMode="tail">
          {title}
        </Text>
      </View>
      {typeof value === 'boolean' ? (
          <Switch
            value={value}
            onValueChange={onPress}
            trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
            thumbColor={theme.colors.card}
            ios_backgroundColor={theme.colors.border}
          />
      ) : (
        <Ionicons name="chevron-forward" size={20} color={theme.colors.body} />
      )}
    </AnimatedScaleTouchable>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.title }]}>Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionCard}>
          <View style={[styles.profileCard, { backgroundColor: theme.colors.surface, ...theme.shadow.soft }]}>
            <View style={[styles.avatarContainer, { backgroundColor: theme.colors.surfaceAlt, borderColor: theme.colors.border }]}>
              <Text style={styles.avatarEmoji}>{SECTION_EMOJIS.avatar}</Text>
            </View>
            <Text style={[styles.userName, { color: theme.colors.title }]}>Guest User</Text>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionEmoji}>{SECTION_EMOJIS.preferences}</Text>
            <Text style={[styles.sectionTitle, { color: theme.colors.title }]}>Preferences</Text>
          </View>
          <View style={[styles.sectionBody, { backgroundColor: theme.colors.surfaceAlt, borderColor: theme.colors.border }]}>
            {renderSettingRow('🌙', 'Dark Theme', isDarkMode, handleDarkModeToggle)}
            {renderSettingRow(
              '🔔',
              'Default Reminder',
              defaultReminder,
              () => setDefaultReminder(!defaultReminder)
            )}
          </View>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionEmoji}>{SECTION_EMOJIS.about}</Text>
            <Text style={[styles.sectionTitle, { color: theme.colors.title }]}>About</Text>
          </View>
          <View style={[styles.sectionBody, { backgroundColor: theme.colors.surfaceAlt, borderColor: theme.colors.border }]}>
            {renderSettingRow('💡', 'About & Help', null, () => router.push('/about'))}
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.colors.body }]}>DaySprout v1.0.0</Text>
          <Text style={[styles.footerSubtext, { color: theme.colors.body }]}>A beautifully simple way to track countdowns</Text>
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
      paddingHorizontal: 24,
      paddingVertical: 16,
    },
    headerTitle: {
      ...theme.typography.h1,
      textAlign: 'center',
      flexShrink: 1,
    },
    scrollContent: {
      paddingBottom: 60,
    },
    sectionCard: {
      marginHorizontal: 20,
      marginBottom: 20,
    },
    profileCard: {
      borderRadius: theme.radii.xl,
      alignItems: 'center',
      paddingVertical: theme.spacing['2xl'],
    },
    avatarContainer: {
      width: 96,
      height: 96,
      borderRadius: 48,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: theme.spacing.lg,
      borderWidth: 4,
    },
    avatarEmoji: {
      fontSize: 42,
    },
    userName: {
      ...theme.typography.h2,
      marginBottom: theme.spacing.xs,
      textAlign: 'center',
      flexShrink: 1,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    sectionEmoji: {
      fontSize: 20,
      marginRight: 8,
    },
    sectionTitle: {
      ...theme.typography.h3,
    },
    sectionBody: {
      borderRadius: theme.radii.xl,
      paddingHorizontal: theme.spacing.xs,
      paddingVertical: theme.spacing.xs,
      borderWidth: 1,
    },
    settingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: theme.radii.lg,
      paddingVertical: theme.spacing.lg,
      paddingHorizontal: theme.spacing.lg + 2,
      marginVertical: theme.spacing.xs,
    },
    settingLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      minWidth: 0,
    },
    emojiBadge: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emoji: {
      fontSize: 20,
    },
    settingTitle: {
      ...theme.typography.body,
      marginLeft: theme.spacing.md + 2,
      fontWeight: '600',
      flexShrink: 1,
    },
    footer: {
      alignItems: 'center',
      paddingVertical: 30,
    },
    footerText: {
      ...theme.typography.bodySmall,
      marginBottom: theme.spacing.xs,
      textAlign: 'center',
    },
    footerSubtext: {
      ...theme.typography.caption,
      opacity: 0.6,
      textAlign: 'center',
    },
  });
