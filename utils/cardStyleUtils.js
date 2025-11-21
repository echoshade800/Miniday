export const DEFAULT_COUNTER_TEXT_COLOR = '#000000';
export const DEFAULT_BACKGROUND_CONTRAST = 0.35;
export const TEXT_COLOR_OPTIONS = ['#000000', '#FFFFFF'];

const normalizeHex = (color) => (typeof color === 'string' ? color.trim().toLowerCase() : '');

export const clampContrast = (value) => {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return DEFAULT_BACKGROUND_CONTRAST;
  }
  if (value < 0) return 0;
  if (value > 0.85) return 0.85;
  return value;
};

export const getEventTextColor = (event) => event?.counterTextColor || DEFAULT_COUNTER_TEXT_COLOR;

export const getEventContrast = (event) =>
  clampContrast(typeof event?.backgroundContrast === 'number' ? event.backgroundContrast : DEFAULT_BACKGROUND_CONTRAST);

export const isLightTextColor = (color) => {
  const normalized = normalizeHex(color);
  return normalized === '#ffffff' || normalized === 'white';
};

export const getCardOverlayColor = (textColor, contrast) => {
  const alpha = clampContrast(contrast);
  const useDarkOverlay = isLightTextColor(textColor);
  const channel = useDarkOverlay ? 0 : 255;
  return `rgba(${channel}, ${channel}, ${channel}, ${alpha})`;
};

