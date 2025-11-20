import { useRef } from 'react';
import { Animated, TouchableOpacity } from 'react-native';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function AnimatedScaleTouchable({
  children,
  style,
  activeScale = 0.95,
  disabledScale = 1,
  ...props
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (value) => {
    Animated.spring(scale, {
      toValue: value,
      speed: 30,
      bounciness: 8,
      useNativeDriver: true,
    }).start();
  };

  return (
    <AnimatedTouchable
      activeOpacity={0.9}
      {...props}
      style={[
        style,
        {
          transform: [{ scale }],
        },
      ]}
      onPressIn={(event) => {
        if (!props.disabled) {
          animateTo(activeScale);
        }
        props.onPressIn?.(event);
      }}
      onPressOut={(event) => {
        animateTo(disabledScale);
        props.onPressOut?.(event);
      }}>
      {children}
    </AnimatedTouchable>
  );
}

