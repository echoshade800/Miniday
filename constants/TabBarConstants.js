/**
 * TabBar Constants
 * Centralized constants for TabBar height and spacing
 */

// Base TabBar height (without safe area)
export const TAB_BAR_BASE_HEIGHT = 70;

// TabBar padding
export const TAB_BAR_PADDING_TOP = 6;
export const TAB_BAR_PADDING_BOTTOM = 8;

/**
 * Calculate total TabBar height including safe area
 * @param {number} safeAreaBottom - Bottom safe area inset
 * @returns {number} Total TabBar height
 */
export const getTabBarTotalHeight = (safeAreaBottom = 0) => {
  return TAB_BAR_BASE_HEIGHT + safeAreaBottom;
};

