import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import StorageUtils from '../../utils/StorageUtils';

/**
 * Profile & Settings Screen
 * Purpose: User profile, app settings, and preferences
 *
 * Features:
 * - User info display (stub)
 * - App preferences toggles (stub)
 * - Data export option (stub)
 * - Navigation to About & Help
 *
 * To extend:
 * - Implement real user authentication
 * - Add functional settings (dark mode, notifications)
 * - Implement actual data export/import
 * - Add cloud sync options
 */

export default function ProfileScreen() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [defaultReminder, setDefaultReminder] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const data = await StorageUtils.getUserData();
    setUserData(data);
  };

  const renderSettingRow = (icon, title, value, onPress) => (
    <TouchableOpacity style={styles.settingRow} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.settingLeft}>
        <Ionicons name={icon} size={24} color="#2196F3" />
        <Text style={styles.settingTitle}>{title}</Text>
      </View>
      {typeof value === 'boolean' ? (
        <View style={[styles.toggle, value && styles.toggleActive]}>
          <View style={[styles.toggleThumb, value && styles.toggleThumbActive]} />
        </View>
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#999" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView>
        <View style={styles.section}>
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person" size={48} color="#2196F3" />
            </View>
            <Text style={styles.userName}>
              {userData?.userName || 'Guest User'}
            </Text>
            <Text style={styles.userEmail}>
              {userData?.email || 'No email set'}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          {renderSettingRow(
            'moon-outline',
            'Dark Theme',
            darkMode,
            () => setDarkMode(!darkMode)
          )}
          {renderSettingRow(
            'notifications-outline',
            'Default Reminder',
            defaultReminder,
            () => setDefaultReminder(!defaultReminder)
          )}
          {renderSettingRow(
            'folder-outline',
            'Preferred Category',
            null,
            () => {}
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data</Text>
          {renderSettingRow(
            'download-outline',
            'Export Data',
            null,
            () => {}
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          {renderSettingRow(
            'information-circle-outline',
            'About & Help',
            null,
            () => router.push('/about')
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Mini Days v1.0.0</Text>
          <Text style={styles.footerSubtext}>
            A beautifully simple way to track countdowns
          </Text>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
    paddingHorizontal: 20,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  profileCard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 32,
    marginHorizontal: 20,
    borderRadius: 12,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#999',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#333',
    marginLeft: 16,
  },
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ddd',
    padding: 2,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: '#2196F3',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#ccc',
    textAlign: 'center',
  },
});
