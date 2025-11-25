// components/CategoryIcons.js

import React from "react";
import {
  Briefcase,
  BookOpen,
  Trophy,
  Heart,
  Cake,
  Users,
  Activity,
  Dumbbell,
  Plane,
  Utensils,
  Music,
  Film,
  Gamepad2,
  ShoppingBag,
  Coffee,
  Book,
  PenTool,
  Palette,
  Camera,
  Code,
  Phone,
  Mail,
  Calendar,
  Clock,
  Star,
  Gift,
  Car,
  Bike,
  Footprints,
  Waves,
  Home,
  Building,
  GraduationCap,
  Stethoscope,
  Scissors,
  Sparkles,
  Target,
  Zap,
  Compass,
  MapPin,
  Globe,
  Sun,
  Moon,
  Cloud,
} from "lucide-react-native";

// Icon wrapper component that accepts size and color props
function IconWrapper({ IconComponent, size = 24, color = "#000", strokeWidth = 2 }) {
  if (!IconComponent) {
    console.warn('IconComponent is undefined');
    return null;
  }
  return <IconComponent size={size} color={color} strokeWidth={strokeWidth} />;
}

// Icon definitions - focused on "important days" with realistic icons
export const ICON_DEFINITIONS = {
  // Growth category
  life: {
    component: (props) => <IconWrapper IconComponent={Sun} {...props} />,
    accentColor: "#FFA726",
  },
  work: {
    component: (props) => <IconWrapper IconComponent={Briefcase} {...props} />,
    accentColor: "#4CAF50",
  },
  study: {
    component: (props) => <IconWrapper IconComponent={BookOpen} {...props} />,
    accentColor: "#5C6BC0",
  },
  achievement: {
    component: (props) => <IconWrapper IconComponent={Trophy} {...props} />,
    accentColor: "#FFD54F",
  },
  // Emotion category
  anniversary: {
    component: (props) => <IconWrapper IconComponent={Gift} {...props} />,
    accentColor: "#FF8A65",
  },
  love: {
    component: (props) => <IconWrapper IconComponent={Heart} {...props} />,
    accentColor: "#E53935",
  },
  birthday: {
    component: (props) => <IconWrapper IconComponent={Cake} {...props} />,
    accentColor: "#FF7043",
  },
  family: {
    component: (props) => <IconWrapper IconComponent={Users} {...props} />,
    accentColor: "#FFCDD2",
  },
  // Sport category
  sport: {
    component: (props) => <IconWrapper IconComponent={Activity} {...props} />,
    accentColor: "#00A6FF",
  },
  fitness: {
    component: (props) => <IconWrapper IconComponent={Dumbbell} {...props} />,
    accentColor: "#F06292",
  },
  // Life category
  travel: {
    component: (props) => <IconWrapper IconComponent={Plane} {...props} />,
    accentColor: "#00A6FF",
  },
  party: {
    component: (props) => <IconWrapper IconComponent={Sparkles} {...props} />,
    accentColor: "#FF7043",
  },
  food: {
    component: (props) => <IconWrapper IconComponent={Utensils} {...props} />,
    accentColor: "#FFB800",
  },
  // Custom icons - more options
  music: {
    component: (props) => <IconWrapper IconComponent={Music} {...props} />,
    accentColor: "#9C27B0",
  },
  film: {
    component: (props) => <IconWrapper IconComponent={Film} {...props} />,
    accentColor: "#673AB7",
  },
  game: {
    component: (props) => <IconWrapper IconComponent={Gamepad2} {...props} />,
    accentColor: "#E91E63",
  },
  shopping: {
    component: (props) => <IconWrapper IconComponent={ShoppingBag} {...props} />,
    accentColor: "#FF5722",
  },
  coffee: {
    component: (props) => <IconWrapper IconComponent={Coffee} {...props} />,
    accentColor: "#795548",
  },
  reading: {
    component: (props) => <IconWrapper IconComponent={Book} {...props} />,
    accentColor: "#3F51B5",
  },
  writing: {
    component: (props) => <IconWrapper IconComponent={PenTool} {...props} />,
    accentColor: "#009688",
  },
  art: {
    component: (props) => <IconWrapper IconComponent={Palette} {...props} />,
    accentColor: "#FF9800",
  },
  photography: {
    component: (props) => <IconWrapper IconComponent={Camera} {...props} />,
    accentColor: "#607D8B",
  },
  coding: {
    component: (props) => <IconWrapper IconComponent={Code} {...props} />,
    accentColor: "#00BCD4",
  },
  meeting: {
    component: (props) => <IconWrapper IconComponent={Users} {...props} />,
    accentColor: "#2196F3",
  },
  phone: {
    component: (props) => <IconWrapper IconComponent={Phone} {...props} />,
    accentColor: "#4CAF50",
  },
  email: {
    component: (props) => <IconWrapper IconComponent={Mail} {...props} />,
    accentColor: "#FFC107",
  },
  calendar: {
    component: (props) => <IconWrapper IconComponent={Calendar} {...props} />,
    accentColor: "#F44336",
  },
  time: {
    component: (props) => <IconWrapper IconComponent={Clock} {...props} />,
    accentColor: "#9E9E9E",
  },
  star: {
    component: (props) => <IconWrapper IconComponent={Star} {...props} />,
    accentColor: "#FFD700",
  },
  gift: {
    component: (props) => <IconWrapper IconComponent={Gift} {...props} />,
    accentColor: "#E91E63",
  },
  car: {
    component: (props) => <IconWrapper IconComponent={Car} {...props} />,
    accentColor: "#FF6B6B",
  },
  bike: {
    component: (props) => <IconWrapper IconComponent={Bike} {...props} />,
    accentColor: "#4ECDC4",
  },
  running: {
    component: (props) => <IconWrapper IconComponent={Footprints} {...props} />,
    accentColor: "#45B7D1",
  },
  swimming: {
    component: (props) => <IconWrapper IconComponent={Waves} {...props} />,
    accentColor: "#00A6FF",
  },
  home: {
    component: (props) => <IconWrapper IconComponent={Home} {...props} />,
    accentColor: "#8B4513",
  },
  building: {
    component: (props) => <IconWrapper IconComponent={Building} {...props} />,
    accentColor: "#708090",
  },
  graduation: {
    component: (props) => <IconWrapper IconComponent={GraduationCap} {...props} />,
    accentColor: "#9370DB",
  },
  business: {
    component: (props) => <IconWrapper IconComponent={Briefcase} {...props} />,
    accentColor: "#2E7D32",
  },
  medical: {
    component: (props) => <IconWrapper IconComponent={Stethoscope} {...props} />,
    accentColor: "#C62828",
  },
  haircut: {
    component: (props) => <IconWrapper IconComponent={Scissors} {...props} />,
    accentColor: "#F06292",
  },
  sparkles: {
    component: (props) => <IconWrapper IconComponent={Sparkles} {...props} />,
    accentColor: "#FFD700",
  },
  target: {
    component: (props) => <IconWrapper IconComponent={Target} {...props} />,
    accentColor: "#FF5252",
  },
  energy: {
    component: (props) => <IconWrapper IconComponent={Zap} {...props} />,
    accentColor: "#FFC107",
  },
  compass: {
    component: (props) => <IconWrapper IconComponent={Compass} {...props} />,
    accentColor: "#00BCD4",
  },
  location: {
    component: (props) => <IconWrapper IconComponent={MapPin} {...props} />,
    accentColor: "#E53935",
  },
  globe: {
    component: (props) => <IconWrapper IconComponent={Globe} {...props} />,
    accentColor: "#1976D2",
  },
  sun: {
    component: (props) => <IconWrapper IconComponent={Sun} {...props} />,
    accentColor: "#FFA726",
  },
  moon: {
    component: (props) => <IconWrapper IconComponent={Moon} {...props} />,
    accentColor: "#5C6BC0",
  },
  cloud: {
    component: (props) => <IconWrapper IconComponent={Cloud} {...props} />,
    accentColor: "#90A4AE",
  },
};

export const ICON_GROUPS = [
  {
    key: "growth",
    label: "Growth",
    iconKeys: ["work", "study", "achievement"],
  },
  {
    key: "emotion",
    label: "Emotion",
    iconKeys: ["love", "anniversary", "birthday", "family"],
  },
  {
    key: "sport",
    label: "Sport",
    iconKeys: ["sport", "fitness"],
  },
  {
    key: "life",
    label: "Life",
    iconKeys: ["travel", "party", "food"],
  },
];

export const ICON_LABELS = {
  // Growth category
  life: "Life",
  work: "Work",
  study: "Study",
  achievement: "Goal",
  // Emotion category
  love: "Love",
  anniversary: "Anniversary",
  birthday: "Birthday",
  family: "Family",
  // Sport category
  sport: "Sport",
  fitness: "Fitness",
  // Life category
  travel: "Travel",
  party: "Party",
  food: "Food",
  // Custom icon labels
  music: "Music",
  film: "Film",
  game: "Game",
  shopping: "Shop",
  coffee: "Coffee",
  reading: "Read",
  writing: "Write",
  art: "Art",
  photography: "Photo",
  coding: "Code",
  meeting: "Meet",
  phone: "Call",
  email: "Mail",
  calendar: "Date",
  time: "Time",
  star: "Star",
  gift: "Gift",
  car: "Car",
  bike: "Bike",
  running: "Run",
  swimming: "Swim",
  home: "Home",
  building: "Office",
  graduation: "Grad",
  business: "Biz",
  medical: "Health",
  haircut: "Hair",
  sparkles: "Magic",
  target: "Target",
  energy: "Power",
  compass: "Explore",
  location: "Place",
  globe: "World",
  sun: "Sun",
  moon: "Moon",
  cloud: "Cloud",
};

// Custom icon keys - icons available in the custom section
export const CUSTOM_ICON_KEYS = [
  "music",
  "film",
  "game",
  "shopping",
  "coffee",
  "reading",
  "writing",
  "art",
  "photography",
  "coding",
  "meeting",
  "phone",
  "email",
  "calendar",
  "time",
  "star",
  "gift",
  "car",
  "bike",
  "running",
  "swimming",
  "home",
  "building",
  "graduation",
  "business",
  "medical",
  "haircut",
  "sparkles",
  "target",
  "energy",
  "compass",
  "location",
  "globe",
  "sun",
  "moon",
  "cloud",
];

export const CATEGORY_ICON_METADATA = ICON_GROUPS.flatMap((group) =>
  group.iconKeys.map((key) => ({
    key,
    label: ICON_LABELS[key] || key,
    groupKey: group.key,
    groupLabel: group.label,
  }))
).concat(
  CUSTOM_ICON_KEYS.map((key) => ({
    key,
    label: ICON_LABELS[key] || key,
    groupKey: "custom",
    groupLabel: "Custom",
  }))
);

// ⭐ 必须使用命名导出，不要 default
export function getIconDefinition(iconKey) {
  return ICON_DEFINITIONS[iconKey] || null;
}
