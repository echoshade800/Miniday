// Light theme (MiniDays neutral + teal accent)
export const LIGHT_THEME = {
  colors: {
    primary: '#2BA29A', // MiniDays teal accent
    primaryLight: '#D3F2EF',
    primaryDark: '#1D6F6A',
    accent: '#2BA29A',
    accentLight: '#D3F2EF',
    accentDark: '#1D6F6A',
    background: '#F7F7F9', // Soft neutral background
    card: '#FFFFFF',
    cardBackground: '#FFFFFF',
    border: '#E6E6E6',
    divider: '#E6E6E6',
    text: '#1A1A1A',
    title: '#1A1A1A',
    body: '#333333',
    textMuted: '#666666',
    placeholder: '#A0A0A0',
    primaryText: '#1A1A1A',
    secondaryText: '#333333',
    danger: '#D64545',
    success: '#2E8B57',
    surface: '#FFFFFF',
    surfaceAlt: '#F9F9FB',
    input: '#FFFFFF',
    shadow: 'rgba(26, 26, 26, 0.04)',
  },
  radii: {
    xs: 6,
    sm: 8,
    md: 12,
    lg: 18,
    xl: 24,
    full: 9999,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    '2xl': 32,
  },
  typography: {
    // 仅定义字号、行高和权重，使用系统默认无衬线英文字体
    h1: { fontSize: 28, fontWeight: '700', lineHeight: 34 },
    h2: { fontSize: 22, fontWeight: '600', lineHeight: 28 },
    h3: { fontSize: 18, fontWeight: '600', lineHeight: 24 },
    body: { fontSize: 16, fontWeight: '400', lineHeight: 22 },
    bodySmall: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
    caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
  },
  shadow: {
    card: {
      shadowColor: '#1A1A1A',
      shadowOpacity: 0.05,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    soft: {
      shadowColor: '#1A1A1A',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 3,
      elevation: 1,
    },
    floating: {
      shadowColor: '#1A1A1A',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.05,
      shadowRadius: 6,
      elevation: 3,
    },
  },
  input: {
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
  },
  button: {
    height: 44,
    borderRadius: 18,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
};

// Dark theme (iOS style - sync primary color scheme)
export const DARK_THEME = {
  colors: {
    primary: '#818CF8',      // Lighter indigo for dark mode
    primaryLight: '#A5B4FC',
    primaryDark: '#6366F1',
    accent: '#FB923C',        // Lighter orange for dark mode
    background: '#000000',    // Pure black
    card: '#1C1C1E',         // Dark card background
    border: '#38383A',        // Dark border
    text: '#FFFFFF',          // White text
    textMuted: '#9CA3AF',    // Light gray text
    danger: '#F87171',
    success: '#34D399',
    // 向后兼容的别名
    surface: '#1C1C1E',
    surfaceAlt: '#2C2C2E',
    title: '#FFFFFF',
    body: '#9CA3AF',
    shadow: '#000000',
    input: '#2C2C2E',
  },
  radii: {
    xs: 6,
    sm: 8,
    md: 12,
    lg: 18,
    xl: 24,
    full: 9999,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    '2xl': 32,
  },
  typography: {
    h1: { fontSize: 28, fontWeight: '700', lineHeight: 34 },
    h2: { fontSize: 22, fontWeight: '600', lineHeight: 28 },
    h3: { fontSize: 18, fontWeight: '600', lineHeight: 24 },
    body: { fontSize: 16, fontWeight: '400', lineHeight: 22 },
    bodySmall: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
    caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
  },
  shadow: {
    card: {
    shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
      elevation: 3,
    },
    soft: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 3,
    },
    floating: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.4,
      shadowRadius: 20,
      elevation: 10,
    },
  },
  input: {
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
  },
  button: {
    height: 44,
    borderRadius: 9999,
    paddingHorizontal: 20,
  },
};

// Get theme based on dark mode
export const getTheme = (isDark = false) => {
  return isDark ? DARK_THEME : LIGHT_THEME;
};

// Default export for backward compatibility (light theme)
export const THEME = getTheme(false);

// Card variants (neutral colors)
export const CARD_VARIANTS_LIGHT = [
  { backgroundColor: '#FFFFFF', accentColor: '#EEF4F3' }, // Pure card
  { backgroundColor: '#FAFBFD', accentColor: '#EAEFF4' }, // Cool gray
  { backgroundColor: '#FDFBFA', accentColor: '#F2EDEA' }, // Warm neutral
  { backgroundColor: '#FAFDFD', accentColor: '#E6F2F1' }, // Teal tint
  { backgroundColor: '#FBFAFD', accentColor: '#EEE8F4' }, // Lavender tint
];

export const CARD_VARIANTS_DARK = [
  { backgroundColor: '#2C2C2E', accentColor: '#3A3A3C' }, // Dark gray
  { backgroundColor: '#2A2A2C', accentColor: '#38383A' }, // Slightly different dark gray
  { backgroundColor: '#2E2E30', accentColor: '#3C3C3E' }, // Another dark gray variant
  { backgroundColor: '#2B2B2D', accentColor: '#39393B' }, // Yet another variant
  { backgroundColor: '#2D2D2F', accentColor: '#3B3B3D' }, // Final variant
];

export const getCardVariants = (isDark = false) => {
  return isDark ? CARD_VARIANTS_DARK : CARD_VARIANTS_LIGHT;
};

export const CARD_VARIANTS = CARD_VARIANTS_LIGHT; // For backward compatibility

// Category gradients (neutral colors)
export const CATEGORY_GRADIENTS_LIGHT = [
  ['#FFFFFF', '#EEF4F3'],
  ['#FFFFFF', '#F1F5F9'],
  ['#FFFFFF', '#F6F1EE'],
  ['#FFFFFF', '#E8F3F2'],
  ['#FFFFFF', '#F0F3F7'],
];

export const CATEGORY_GRADIENTS_DARK = [
  ['#2C2C2E', '#3A3A3C'], // Dark gray gradient
  ['#2A2A2C', '#38383A'], // Dark gray gradient variant
  ['#2E2E30', '#3C3C3E'], // Dark gray gradient variant
  ['#2B2B2D', '#39393B'], // Dark gray gradient variant
  ['#2D2D2F', '#3B3B3D'], // Dark gray gradient variant
];

export const getCategoryGradients = (isDark = false) => {
  return isDark ? CATEGORY_GRADIENTS_DARK : CATEGORY_GRADIENTS_LIGHT;
};

export const CATEGORY_GRADIENTS = CATEGORY_GRADIENTS_LIGHT; // For backward compatibility

export const SECTION_EMOJIS = {
  avatar: '😊',
  preferences: '⚙️',
  data: '💾',
  about: '✨',
};

export const TAB_ICON_MAP = {
  index: 'home',
  countdowns: 'calendar',
  add: 'add-circle',
  profile: 'person',
};

export const getPastelCard = (key = '', isDark = false) => {
  const variants = getCardVariants(isDark);
  if (!key) return variants[0];
  const hash = key.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return variants[hash % variants.length];
};

export const getCategoryGradient = (index = 0, isDark = false) => {
  const gradients = getCategoryGradients(isDark);
  return gradients[index % gradients.length];
};

export const getEmojiForCategory = (categories = [], categoryId) => {
  if (!categoryId || !categories?.length) {
    return '🧁';
  }
  const category = categories.find((cat) => cat.id === categoryId);
  return category?.icon || '🧁';
};

export const getIconKeyForCategory = (categories = [], categoryId) => {
  if (!categoryId || !categories?.length) {
    return null;
  }
  const category = categories.find((cat) => cat.id === categoryId);
  return category?.iconKey || null;
};

