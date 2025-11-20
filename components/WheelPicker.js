import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';

const ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 5;
const WHEEL_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

/**
 * iOS-style Wheel Picker Component
 */
export default function WheelPicker({
  value,
  onChange,
  items,
  style,
  itemStyle,
  selectedItemStyle,
}) {
  const scrollViewRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const index = items.findIndex((item) => item.value === value);
    if (index !== -1) {
      setSelectedIndex(index);
      scrollToIndex(index, false);
    }
  }, [value, items]);

  const scrollToIndex = (index, animated = true) => {
    if (scrollViewRef.current) {
      const y = index * ITEM_HEIGHT;
      scrollViewRef.current.scrollTo({
        y,
        animated,
      });
    }
  };

  const handleScroll = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    const clampedIndex = Math.max(0, Math.min(index, items.length - 1));

    if (clampedIndex !== selectedIndex) {
      setSelectedIndex(clampedIndex);
      if (onChange) {
        onChange(items[clampedIndex].value);
      }
    }
  };

  const handleMomentumScrollEnd = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    const clampedIndex = Math.max(0, Math.min(index, items.length - 1));
    scrollToIndex(clampedIndex, true);
  };

  return (
    <View style={[styles.container, style]}>
      <View
        pointerEvents="none"
        style={[
          styles.selectionIndicator,
          {
            borderTopColor: theme.colors.accent,
            borderBottomColor: theme.colors.accent,
            backgroundColor: theme.colors.accentLight,
          },
        ]}
      />
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingTop: ITEM_HEIGHT * 2,
            paddingBottom: ITEM_HEIGHT * 2,
          },
        ]}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}>
        {items.map((item, index) => {
          const isSelected = index === selectedIndex;
          return (
            <View
              key={item.value}
              style={[
                styles.item,
                { height: ITEM_HEIGHT },
                itemStyle,
                isSelected && [
                  styles.selectedItem,
                  { backgroundColor: theme.colors.accentLight, borderColor: theme.colors.accent },
                  selectedItemStyle,
                ],
              ]}>
              <Text
                style={[
                  styles.itemText,
                  { color: isSelected ? theme.colors.title : theme.colors.body },
                  isSelected && styles.selectedItemText,
                ]}>
                {item.label}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: WHEEL_HEIGHT,
    position: 'relative',
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
  },
  item: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 20,
    fontWeight: '400',
  },
  selectedItem: {
    borderRadius: 12,
    borderWidth: 1,
  },
  selectedItemText: {
    fontWeight: '600',
    fontSize: 22,
  },
  selectionIndicator: {
    position: 'absolute',
    top: ITEM_HEIGHT * 2,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
    opacity: 0.2,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    zIndex: -1,
  },
});

