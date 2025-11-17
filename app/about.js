import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

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

  const renderInfoRow = (icon, title, subtitle) => (
    <TouchableOpacity style={styles.infoRow} activeOpacity={0.7}>
      <View style={styles.infoLeft}>
        <Ionicons name={icon} size={24} color="#2196F3" />
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoTitle}>{title}</Text>
          {subtitle && <Text style={styles.infoSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About & Help</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.heroSection}>
          <View style={styles.iconContainer}>
            <Ionicons name="calendar" size={64} color="#2196F3" />
          </View>
          <Text style={styles.appName}>Mini Days</Text>
          <Text style={styles.appTagline}>
            A beautifully simple way to track countdowns, anniversaries, and important
            dates.
          </Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.featureText}>Track unlimited countdowns</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.featureText}>Organize by custom categories</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.featureText}>Pin important events</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.featureText}>Set up repeating events</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.featureText}>Morning reminders at 8:00 AM</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.featureText}>Offline-first storage</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          {renderInfoRow('help-circle-outline', 'FAQ', 'Frequently asked questions')}
          {renderInfoRow('mail-outline', 'Contact Support', 'Get help from our team')}
          {renderInfoRow('star-outline', 'Rate This App', 'Share your feedback')}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal</Text>
          {renderInfoRow('shield-checkmark-outline', 'Privacy Policy', null)}
          {renderInfoRow('document-text-outline', 'Terms of Service', null)}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Made with ❤️ for counting days</Text>
          <Text style={styles.copyright}>© 2024 Mini Days. All rights reserved.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  heroSection: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 40,
    marginBottom: 20,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  appTagline: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 24,
    marginBottom: 16,
  },
  version: {
    fontSize: 14,
    color: '#999',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
    paddingHorizontal: 20,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  featureList: {
    backgroundColor: '#fff',
    paddingVertical: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  featureText: {
    fontSize: 15,
    color: '#333',
    marginLeft: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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
    fontSize: 16,
    color: '#333',
    marginBottom: 2,
  },
  infoSubtitle: {
    fontSize: 13,
    color: '#999',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  copyright: {
    fontSize: 12,
    color: '#ccc',
  },
});
