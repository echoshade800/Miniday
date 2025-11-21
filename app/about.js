import { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AnimatedScaleTouchable from '../components/AnimatedScaleTouchable';
import { useTheme } from '../hooks/useTheme';

/**
 * About & Help Screen
 * Purpose: App information, version, FAQ, and support
 *
 * Features:
 * - App description
 * - Version info
 * - FAQ section (stub)
 * - Contact support (stub)
 * - Rate app (stub)
 *
 * To extend:
 * - Add real FAQ content
 * - Implement contact form
 * - Add in-app rating
 * - Add changelog/release notes
 * - Add tutorial/walkthrough
 */

export default function AboutScreen() {
  const router = useRouter();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const renderInfoRow = (icon, title, subtitle, onPress) => (
    <AnimatedScaleTouchable style={styles.infoRow} onPress={onPress} disabled={!onPress}>
      <View style={styles.infoLeft}>
        <Ionicons name={icon} size={24} color={theme.colors.primary} />
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoTitle} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
          {subtitle && (
            <Text style={styles.infoSubtitle} numberOfLines={1} ellipsizeMode="tail">
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={theme.colors.body} />
    </AnimatedScaleTouchable>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <AnimatedScaleTouchable style={styles.headerAction} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.title} />
        </AnimatedScaleTouchable>
        <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">
          About & Help
        </Text>
        <View style={styles.headerAction}>
          <Ionicons name="arrow-back" size={24} color="transparent" />
        </View>
      </View>

      <ScrollView style={styles.content}>
        <LinearGradient colors={[theme.colors.card, theme.colors.accentLight]} style={styles.heroSection}>
          <View style={styles.iconContainer}>
            <Ionicons name="calendar" size={64} color={theme.colors.primary} />
          </View>
          <Text style={styles.appName}>DaySprout</Text>
          <Text style={styles.emojiDecor}>✨ 💗 🎀</Text>
          <Text style={styles.appTagline}>
            A beautifully simple way to track countdowns, anniversaries, and important
            dates.
          </Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </LinearGradient>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color={theme.colors.primary} />
              <Text style={styles.featureText}>Track unlimited countdowns</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color={theme.colors.primary} />
              <Text style={styles.featureText}>Organize by custom categories</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color={theme.colors.primary} />
              <Text style={styles.featureText}>Pin important events</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color={theme.colors.primary} />
              <Text style={styles.featureText}>Set up repeating events</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color={theme.colors.primary} />
              <Text style={styles.featureText}>Morning reminders at 8:00 AM</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color={theme.colors.primary} />
              <Text style={styles.featureText}>Offline-first storage</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          {renderInfoRow('help-circle-outline', 'FAQ', 'Frequently asked questions', () => router.push('/faq'))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Made with ❤️ for counting days</Text>
          <Text style={styles.copyright}>© 2024 DaySprout. All rights reserved.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: theme.colors.surface,
    },
    headerTitle: {
      ...theme.typography.h2,
      color: theme.colors.text,
      textAlign: 'center',
      flex: 1,
      flexShrink: 1,
      marginHorizontal: theme.spacing.md,
    },
    headerAction: {
      paddingHorizontal: theme.spacing.xs,
      paddingVertical: theme.spacing.xs,
      flexShrink: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      flex: 1,
    },
    heroSection: {
      alignItems: 'center',
      paddingVertical: 40,
      marginHorizontal: 20,
      marginTop: 20,
      marginBottom: 20,
      borderRadius: theme.radii.xl,
      ...theme.shadow.soft,
    },
    iconContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: 'rgba(255,255,255,0.5)',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    appName: {
      ...theme.typography.h1,
      fontSize: 32,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    emojiDecor: {
      fontSize: 24,
      marginBottom: 12,
    },
    appTagline: {
      ...theme.typography.body,
      color: theme.colors.textMuted,
      textAlign: 'center',
      paddingHorizontal: theme.spacing['2xl'],
      marginBottom: theme.spacing.lg,
      fontWeight: '500',
    },
    version: {
      ...theme.typography.bodySmall,
      color: theme.colors.textMuted,
      opacity: 0.8,
    },
    section: {
      marginBottom: theme.spacing.xl,
    },
    sectionTitle: {
      ...theme.typography.caption,
      fontWeight: '700',
      color: theme.colors.textMuted,
      paddingHorizontal: theme.spacing.xl,
      marginBottom: theme.spacing.md,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    featureList: {
      backgroundColor: theme.colors.surface,
      paddingVertical: 8,
      marginHorizontal: 20,
      borderRadius: theme.radii.lg,
      ...theme.shadow.soft,
    },
    featureItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 20,
    },
    featureText: {
      ...theme.typography.bodySmall,
      color: theme.colors.text,
      marginLeft: theme.spacing.md,
      fontWeight: '500',
      flex: 1,
      flexShrink: 1,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.surface,
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      marginHorizontal: 20,
      borderRadius: theme.radii.lg,
      marginBottom: 8,
      ...theme.shadow.soft,
    },
    infoLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    infoTextContainer: {
      marginLeft: 16,
      flex: 1,
    },
    infoTitle: {
      ...theme.typography.body,
      color: theme.colors.text,
      marginBottom: 2,
      fontWeight: '600',
      flexShrink: 1,
    },
    infoSubtitle: {
      ...theme.typography.bodySmall,
      color: theme.colors.textMuted,
      flexShrink: 1,
    },
    footer: {
      alignItems: 'center',
      paddingVertical: theme.spacing['2xl'],
    },
    footerText: {
      ...theme.typography.bodySmall,
      color: theme.colors.textMuted,
      marginBottom: theme.spacing.sm,
    },
    copyright: {
      ...theme.typography.caption,
      color: theme.colors.textMuted,
      opacity: 0.6,
    },
  });
