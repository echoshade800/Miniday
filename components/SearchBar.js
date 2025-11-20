import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search...',
  onClear,
  style,
}) {
  const theme = useTheme();
  const searchContainerStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    height: theme.input.height + 8,
    borderRadius: theme.radii.full,
    borderWidth: theme.input.borderWidth,
    backgroundColor: theme.colors.surfaceAlt,
    borderColor: theme.colors.divider,
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
        color={theme.colors.placeholder}
        style={{ marginRight: theme.spacing.sm }}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.placeholder}
        style={inputStyle}
      />
      {value?.length > 0 && (
        <TouchableOpacity
          onPress={() => {
            onChangeText('');
            onClear?.();
          }}>
          <Ionicons name="close-circle" size={20} color={theme.colors.placeholder} />
        </TouchableOpacity>
      )}
    </View>
  );
}

