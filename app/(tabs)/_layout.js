import { useEffect, useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

function TabIcon({ name, color, focused, size }) {
  const scale = useRef(new Animated.Value(focused ? 1 : 0.95)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1 : 0.95,
      speed: 20,
      bounciness: 8,
      useNativeDriver: true,
    }).start();
  }, [focused, scale]);

  return (
    <AnimatedIcon
      name={name}
      size={size}
      color={color}
      style={{ transform: [{ scale }] }}
    />
  );
}

export default function TabLayout() {
  const theme = useTheme();
  const tabBarStyle = useMemo(
    () => ({
      position: 'absolute',
      marginHorizontal: 20,
      marginBottom: 20,
      borderRadius: 28,
      backgroundColor: theme.colors.surface,
      height: 70,
      paddingBottom: 8,
      paddingTop: 6,
      ...theme.shadow.soft,
    }),
    [theme]
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarStyle,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon name="home" color={color} focused={focused} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="countdowns"
        options={{
          title: 'Countdowns',
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon name="grid-outline" color={color} focused={focused} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon name="person" color={color} focused={focused} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
