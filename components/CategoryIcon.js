import { memo } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { getIconDefinition } from './CategoryIcons';
import { getIconImage } from '../assets/icons/iconMapping';

const clampSize = (size) => Math.max(36, Math.min(size, 72));

const hexToRgb = (hex = '#2BA29A') => {
  const normalized = hex.replace('#', '');
  const value = normalized.length === 3
    ? normalized.split('').map((char) => char + char).join('')
    : normalized;
  const int = parseInt(value, 16);
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
};

const hexToRgba = (hex, alpha = 1) => {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const adjustColor = (hex, amount = 0) => {
  if (!amount) {
    return hex;
  }
  const { r, g, b } = hexToRgb(hex);
  const target = amount < 0 ? 0 : 255;
  const factor = Math.min(Math.abs(amount), 1);
  const mix = (channel) => Math.round(channel + (target - channel) * factor);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
};

const CategoryIcon = memo(({ glyph = '🧁', iconKey, size = 56, isDark = false }) => {
  const theme = useTheme();
  const clampedSize = clampSize(size);
  const definition = iconKey ? getIconDefinition(iconKey) : null;
  const IconComponent = definition?.component;
  const accentColor = definition?.accentColor || theme.colors.primary;
  const iconTint = adjustColor(accentColor, isDark ? 0.2 : 0);
  const haloColor = hexToRgba(accentColor, isDark ? 0.22 : 0.12);
  const iconImage = iconKey ? getIconImage(iconKey) : null;

  if (iconImage) {
    return (
      <View style={[styles.wrapper, { width: clampedSize, height: clampedSize }]}>
        <Image
          source={iconImage}
          style={[styles.image, { width: clampedSize, height: clampedSize }]}
          resizeMode="contain"
        />
      </View>
    );
  }

  if (IconComponent) {
    return (
      <View style={[styles.wrapper, { width: clampedSize, height: clampedSize }]}>
        <View
          style={[
            styles.badge,
            {
              width: clampedSize,
              height: clampedSize,
              borderRadius: clampedSize / 2,
              borderColor: iconTint,
              backgroundColor: haloColor,
            },
          ]}>
          <IconComponent
            size={clampedSize * 0.62}
            color={iconTint}
            strokeWidth={2.6}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.wrapper, { width: clampedSize, height: clampedSize }]}>
      <View
        style={[
          styles.badge,
          {
            width: clampedSize,
            height: clampedSize,
            borderRadius: clampedSize / 2,
            borderColor: theme.colors.primary,
            backgroundColor: hexToRgba(theme.colors.primary, 0.08),
          },
        ]}>
        <Text style={[styles.glyph, { fontSize: clampedSize * 0.6 }]}>{glyph}</Text>
      </View>
    </View>
  );
});

CategoryIcon.displayName = 'CategoryIcon';

export default CategoryIcon;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glyph: {
    textAlign: 'center',
    includeFontPadding: false,
  },
});
