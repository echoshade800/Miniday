import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../store/useAppStore';

/**
 * Create Category Screen
 * Purpose: Add new custom countdown categories
 *
 * Features:
 * - Category name input
 * - Emoji/icon selection
 * - Save and return to categories list
 *
 * To extend:
 * - Add more icon options
 * - Add custom color selection
 * - Add category templates
 * - Add category sorting order
 */

const EMOJI_OPTIONS = [
  '🌟', '💼', '🎉', '❤️', '🎂', '🎓',
  '✈️', '🏠', '💪', '📚', '🎮', '🎵',
  '🍕', '☕', '🌈', '⭐', '🔥', '💡',
  '🎨', '📱', '⚽', '🎯', '🌸', '🌙',
];

export default function CreateCategoryScreen() {
  const router = useRouter();
  const { addCategory } = useAppStore();
  const [name, setName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('🌟');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a category name');
      return;
    }

    setLoading(true);

    try {
      await addCategory({
        name: name.trim(),
        icon: selectedIcon,
      });

      router.back();
    } catch (error) {
      Alert.alert('Error', 'Failed to create category. Please try again.');
      console.error('Create category error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Category</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.field}>
          <Text style={styles.label}>Category Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Health, Travel, Study"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Icon</Text>
          <View style={styles.iconGrid}>
            {EMOJI_OPTIONS.map((emoji) => (
              <TouchableOpacity
                key={emoji}
                style={[
                  styles.iconButton,
                  selectedIcon === emoji && styles.iconButtonActive,
                ]}
                onPress={() => setSelectedIcon(emoji)}>
                <Text style={styles.iconEmoji}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.saveButton, loading && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={loading}
          activeOpacity={0.8}>
          <Text style={styles.saveButtonText}>
            {loading ? 'Creating...' : 'Create Category'}
          </Text>
        </TouchableOpacity>
      </View>
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
  field: {
    backgroundColor: '#fff',
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  iconButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#f5f5f5',
  },
  iconButtonActive: {
    backgroundColor: '#E3F2FD',
    borderColor: '#2196F3',
  },
  iconEmoji: {
    fontSize: 28,
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  saveButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
