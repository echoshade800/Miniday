// 尝试导入 react-native-image-colors，支持多种导出方式
let getColors;
try {
  const imageColorsModule = require('react-native-image-colors');
  // 支持命名导出、默认导出或对象方法
  getColors = imageColorsModule.getColors || 
              imageColorsModule.default?.getColors || 
              imageColorsModule.default ||
              (imageColorsModule.default && typeof imageColorsModule.default === 'function' ? imageColorsModule.default : null);
} catch (e) {
  // 如果导入失败，getColors 保持为 undefined，会在函数中处理
  console.warn('react-native-image-colors not available:', e.message);
}

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

/**
 * 检测图片的主要颜色（白色或黑色）
 * 根据图片的平均亮度来判断主要颜色
 * @param {string} imageUri - 图片的 URI
 * @returns {Promise<'#000000' | '#FFFFFF'>} 返回建议的字体颜色
 */
export const detectImageTextColor = async (imageUri) => {
  try {
    if (!getColors || typeof getColors !== 'function') {
      console.warn('getColors is not available from react-native-image-colors');
      return DEFAULT_COUNTER_TEXT_COLOR;
    }
    
    const colors = await getColors(imageUri, {
      fallback: '#808080', // 默认灰色
      cache: true,
      key: imageUri,
    });

    // react-native-image-colors 可能返回不同格式的对象
    // 处理平台特定的格式（iOS/Android）
    let colorObj = colors;
    if (colors.platform === 'ios' && colors.colors) {
      colorObj = colors.colors;
    } else if (colors.platform === 'android' && colors.dominant) {
      colorObj = colors;
    }

    // 获取主要颜色，尝试多种可能的属性名
    let dominantColor = 
      colorObj.dominant || 
      colorObj.vibrant || 
      colorObj.muted || 
      colorObj.lightVibrant || 
      colorObj.lightMuted ||
      colorObj.average ||
      '#808080';

    // 将颜色转换为 RGB
    const rgb = hexToRgb(dominantColor);
    if (!rgb) {
      // 如果无法解析颜色，返回默认值
      return DEFAULT_COUNTER_TEXT_COLOR;
    }

    // 计算亮度 (使用相对亮度公式)
    // L = 0.299*R + 0.587*G + 0.114*B
    const brightness = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;

    // 如果亮度大于 0.5，说明图片较亮（白色背景），使用黑色文字
    // 如果亮度小于等于 0.5，说明图片较暗（黑色背景），使用白色文字
    return brightness > 0.5 ? '#000000' : '#FFFFFF';
  } catch (error) {
    console.error('Error detecting image color:', error);
    // 如果检测失败，返回默认值
    return DEFAULT_COUNTER_TEXT_COLOR;
  }
};

/**
 * 将十六进制颜色转换为 RGB
 * @param {string} hex - 十六进制颜色值
 * @returns {{r: number, g: number, b: number} | null}
 */
const hexToRgb = (hex) => {
  if (!hex) return null;
  
  // 移除 # 号
  const cleanHex = hex.replace('#', '');
  
  // 处理 3 位十六进制
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);
    return { r, g, b };
  }
  
  // 处理 6 位十六进制
  if (cleanHex.length === 6) {
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return { r, g, b };
  }
  
  return null;
};

