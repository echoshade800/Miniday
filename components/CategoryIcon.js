import { memo, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ICON_VARIANTS_LIGHT = [
  {
    gradient: ['#FFF4F4', '#FFE2F4'],
    stroke: 'rgba(255, 255, 255, 0.85)',
    glow: 'rgba(255, 183, 213, 0.5)',
    highlight: 'rgba(255, 255, 255, 0.75)',
    glyphColor: '#4C3B48',
  },
  {
    gradient: ['#F1F7FF', '#E0ECFF'],
    stroke: 'rgba(255, 255, 255, 0.85)',
    glow: 'rgba(164, 202, 255, 0.45)',
    highlight: 'rgba(255, 255, 255, 0.8)',
    glyphColor: '#1E2A3B',
  },
  {
    gradient: ['#F0FFF8', '#DAF7E9'],
    stroke: 'rgba(255, 255, 255, 0.85)',
    glow: 'rgba(147, 231, 197, 0.4)',
    highlight: 'rgba(255, 255, 255, 0.78)',
    glyphColor: '#1F3A2C',
  },
  {
    gradient: ['#FDF5E6', '#FFE5C7'],
    stroke: 'rgba(255, 255, 255, 0.9)',
    glow: 'rgba(255, 202, 138, 0.45)',
    highlight: 'rgba(255, 255, 255, 0.75)',
    glyphColor: '#4E3523',
  },
  {
    gradient: ['#F4F0FF', '#E3DAFF'],
    stroke: 'rgba(255, 255, 255, 0.85)',
    glow: 'rgba(176, 154, 255, 0.45)',
    highlight: 'rgba(255, 255, 255, 0.82)',
    glyphColor: '#2F2642',
  },
];

const ICON_VARIANTS_DARK = [
  {
    gradient: ['#3A2E4F', '#1F1A2F'],
    stroke: 'rgba(255, 255, 255, 0.05)',
    glow: 'rgba(157, 121, 255, 0.35)',
    highlight: 'rgba(255, 255, 255, 0.15)',
    glyphColor: '#F5F3FF',
  },
  {
    gradient: ['#233445', '#111A24'],
    stroke: 'rgba(255, 255, 255, 0.04)',
    glow: 'rgba(128, 187, 255, 0.35)',
    highlight: 'rgba(255, 255, 255, 0.1)',
    glyphColor: '#F0F7FF',
  },
  {
    gradient: ['#1F2F2A', '#0F1915'],
    stroke: 'rgba(255, 255, 255, 0.04)',
    glow: 'rgba(118, 214, 181, 0.28)',
    highlight: 'rgba(255, 255, 255, 0.08)',
    glyphColor: '#E8FFF4',
  },
  {
    gradient: ['#3B2D1F', '#1C130C'],
    stroke: 'rgba(255, 255, 255, 0.05)',
    glow: 'rgba(255, 190, 130, 0.3)',
    highlight: 'rgba(255, 255, 255, 0.08)',
    glyphColor: '#FFF4EA',
  },
  {
    gradient: ['#2E1E2D', '#190F1B'],
    stroke: 'rgba(255, 255, 255, 0.05)',
    glow: 'rgba(255, 143, 206, 0.28)',
    highlight: 'rgba(255, 255, 255, 0.08)',
    glyphColor: '#FFE9F5',
  },
];

const clampSize = (size) => Math.max(36, Math.min(size, 72));

const hashString = (value = '') => {
  if (!value) return 0;
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const CategoryIcon = memo(
  ({
    label = '',
    glyph = '🧁',
    size = 56,
    variantKey,
    isDark = false,
  }) => {
    const clampedSize = clampSize(size);
    const variants = isDark ? ICON_VARIANTS_DARK : ICON_VARIANTS_LIGHT;
    const index = useMemo(() => {
      const key = variantKey || label || glyph;
      return hashString(key) % variants.length;
    }, [glyph, label, variantKey, variants.length]);
    const variant = variants[index];
    const glyphSize = clampedSize * 0.48;

    return (
      <View style={[styles.wrapper, { width: clampedSize, height: clampedSize }]}>
        <View
          style={[
            styles.glow,
            {
              backgroundColor: variant.glow,
              shadowColor: variant.glow,
              width: clampedSize * 0.82,
              height: clampedSize * 0.82,
              borderRadius: (clampedSize * 0.82) / 2,
            },
          ]}
        />
        <LinearGradient
          colors={variant.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.gradient,
            {
              width: clampedSize,
              height: clampedSize,
              borderRadius: clampedSize / 2,
              borderColor: variant.stroke,
            },
          ]}>
          <View
            style={[
              styles.highlight,
              {
                backgroundColor: variant.highlight,
                width: clampedSize * 0.9,
                height: clampedSize * 0.45,
                borderRadius: clampedSize / 2,
              },
            ]}
          />
          <Text
            style={[
              styles.glyph,
              { fontSize: glyphSize, color: variant.glyphColor || '#1F1F1F' },
            ]}>
            {glyph}
          </Text>
        </LinearGradient>
      </View>
    );
  }
);

CategoryIcon.displayName = 'CategoryIcon';

export default CategoryIcon;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    opacity: 0.7,
    shadowOpacity: 0.65,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
  },
  gradient: {
    borderWidth: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  highlight: {
    position: 'absolute',
    top: 4,
    opacity: 0.6,
  },
  glyph: {
    textAlign: 'center',
    includeFontPadding: false,
  },
});

