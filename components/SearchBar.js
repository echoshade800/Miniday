import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { useAppStore } from '../store/useAppStore';

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search...',
  onClear,
  style,
}) {
  const theme = useTheme();
  const themeMode = useAppStore((state) => state.themeMode);
  const isDarkMode = themeMode === 'dark';
  const placeholderColor = theme.colors.placeholder || theme.colors.textMuted || '#9CA3AF';
  const iconColor = isDarkMode ? theme.colors.textMuted || '#9CA3AF' : placeholderColor;
  const searchContainerStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    height: theme.input.height + 8,
    borderRadius: theme.radii.full,
    borderWidth: theme.input.borderWidth,
    backgroundColor: isDarkMode ? theme.colors.card : theme.colors.surfaceAlt,
    borderColor: isDarkMode ? theme.colors.border : theme.colors.divider,
    ...(isDarkMode
      ? {
          shadowColor: '#000',
          shadowOpacity: 0.25,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 4 },
          elevation: 4,
        }
      : null),
  };

  const inputStyle = {
    flex: 1,
    ...theme.typography.body,
    fontWeight: '500',
    color: theme.colors.text,
  };

  return (
    <View style={[searchContainerStyle, style]}>
      <Ionicons
        name="search"
        size={20}
        color={iconColor}
        style={{ marginRight: theme.spacing.sm }}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        style={inputStyle}
      />
      {value?.length > 0 && (
        <TouchableOpacity
          onPress={() => {
            onChangeText('');
            onClear?.();
          }}>
          <Ionicons name="close-circle" size={20} color={iconColor} />
        </TouchableOpacity>
      )}
    </View>
  );
}

