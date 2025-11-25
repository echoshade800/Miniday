// components/CategoryIcon.js

import React, { memo } from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { getIconDefinition } from "./CategoryIcons";

function clampSize(size) {
  if (!size) return 24;
  return Math.min(48, Math.max(16, size));
}

const CategoryIcon = memo(({ iconKey, size = 24 }) => {
  const theme = useTheme();
  const clampedSize = clampSize(size);

  const definition = iconKey ? getIconDefinition(iconKey) : null;

  // 如果 definition 不存在，返回一个空占位，避免错误
  if (!definition) {
    return <View style={{ width: clampedSize, height: clampedSize }} />;
  }

  const IconComponent = definition.component;
  const accentColor = definition.accentColor ?? "#999";

  return (
    <IconComponent size={clampedSize} color={accentColor} />
  );
});

export default CategoryIcon;
