// components/CategoryIcon.js

import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { getIconDefinition } from "./CategoryIcons";

function clampSize(size) {
  if (!size) return 24;
  return Math.min(48, Math.max(16, size));
}

const CategoryIcon = memo(({ 
  iconKey, 
  size = 24,
  // 接受但不使用这些 props，避免真机上的警告
  glyph,
  label,
  variantKey,
  isDark,
  ...otherProps 
}) => {
  const clampedSize = clampSize(size);

  // 防御性检查：确保 iconKey 存在
  if (!iconKey) {
    return <View style={{ width: clampedSize, height: clampedSize }} />;
  }

  try {
    const definition = getIconDefinition(iconKey);

    // 如果 definition 不存在，返回一个空占位，避免错误
    if (!definition) {
      console.warn(`Icon definition not found for key: ${iconKey}`);
      return <View style={{ width: clampedSize, height: clampedSize }} />;
    }

    const IconComponent = definition.component;

    // 确保 IconComponent 存在且是函数
    if (!IconComponent || typeof IconComponent !== 'function') {
      console.warn(`Invalid IconComponent for key: ${iconKey}`);
      return <View style={{ width: clampedSize, height: clampedSize }} />;
    }

    const accentColor = definition.accentColor ?? "#999";

    // 使用 try-catch 包裹图标渲染，防止崩溃
    try {
      return (
        <View style={styles.iconContainer}>
          <IconComponent size={clampedSize} color={accentColor} strokeWidth={2.6} />
        </View>
      );
    } catch (renderError) {
      console.error(`Error rendering icon for key: ${iconKey}`, renderError);
      return <View style={{ width: clampedSize, height: clampedSize }} />;
    }
  } catch (error) {
    // 捕获所有可能的错误，防止应用崩溃
    console.error(`Error in CategoryIcon for key: ${iconKey}`, error);
    return <View style={{ width: clampedSize, height: clampedSize }} />;
  }
});

CategoryIcon.displayName = 'CategoryIcon';

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CategoryIcon;
