import React from 'react';
import Svg, { Path, Circle, Rect, G, Line, Polygon, Ellipse, Defs, LinearGradient, Stop } from 'react-native-svg';

/**
 * Premium Category Icons - Rich & Detailed Design
 * 高级事件分类图标 - 丰富而精致的设计
 * - 透明背景，无边框
 * - 细节丰富，具有层次感
 * - 使用APP主色调（Teal #2BA29A）及其配色方案
 * - 每个图标都独特地体现其分类特色
 */

// 图标颜色配置 - 基于APP主色调的丰富配色方案
const ICON_COLORS = {
  // 生活类
  life: { primary: '#2BA29A', secondary: '#1D8B84', accent: '#3DBDB4' },
  home: { primary: '#34D399', secondary: '#059669', accent: '#6EE7B7' },

  // 工作学习类
  work: { primary: '#1D6F6A', secondary: '#164E4A', accent: '#2B9089' },
  study: { primary: '#818CF8', secondary: '#6366F1', accent: '#A5B4FC' },

  // 情感类
  love: { primary: '#FF6B9D', secondary: '#EC4899', accent: '#FDA4AF' },
  celebration: { primary: '#FB923C', secondary: '#F97316', accent: '#FDBA74' },
  birthday: { primary: '#C084FC', secondary: '#A855F7', accent: '#D8B4FE' },

  // 成就类
  graduation: { primary: '#2BA29A', secondary: '#1D8B84', accent: '#FBBF24' },

  // 旅行交通类
  flight: { primary: '#60A5FA', secondary: '#3B82F6', accent: '#93C5FD' },
  travel: { primary: '#2BA29A', secondary: '#1D8B84', accent: '#3DBDB4' },
  drive: { primary: '#F87171', secondary: '#EF4444', accent: '#FCA5A5' },

  // 运动健身类
  fitness: { primary: '#F87171', secondary: '#DC2626', accent: '#FCA5A5' },
  swimming: { primary: '#60A5FA', secondary: '#3B82F6', accent: '#93C5FD' },
  soccer: { primary: '#34D399', secondary: '#10B981', accent: '#6EE7B7' },
  basketball: { primary: '#FB923C', secondary: '#F97316', accent: '#FDBA74' },
  yoga: { primary: '#C084FC', secondary: '#A855F7', accent: '#D8B4FE' },
  running: { primary: '#F87171', secondary: '#EF4444', accent: '#FCA5A5' },

  // 娱乐类
  game: { primary: '#FBBF24', secondary: '#F59E0B', accent: '#FCD34D' },
  music: { primary: '#C084FC', secondary: '#A855F7', accent: '#D8B4FE' },
  movie: { primary: '#818CF8', secondary: '#6366F1', accent: '#A5B4FC' },
  reading: { primary: '#2BA29A', secondary: '#1D8B84', accent: '#3DBDB4' },

  // 美食类
  eating: { primary: '#FB923C', secondary: '#F97316', accent: '#FDBA74' },
  cooking: { primary: '#F87171', secondary: '#EF4444', accent: '#FCA5A5' },
  coffee: { primary: '#A78BFA', secondary: '#8B5CF6', accent: '#C4B5FD' },

  // 户外活动类
  hiking: { primary: '#34D399', secondary: '#10B981', accent: '#6EE7B7' },
  camping: { primary: '#FB923C', secondary: '#F97316', accent: '#FDBA74' },
  walk: { primary: '#34D399', secondary: '#10B981', accent: '#6EE7B7' },

  // 艺术创作类
  art: { primary: '#FF6B9D', secondary: '#EC4899', accent: '#FDA4AF' },
  photography: { primary: '#818CF8', secondary: '#6366F1', accent: '#A5B4FC' },

  // 社交类
  phone: { primary: '#60A5FA', secondary: '#3B82F6', accent: '#93C5FD' },
  meeting: { primary: '#1D6F6A', secondary: '#164E4A', accent: '#2B9089' },

  // 健康类
  medical: { primary: '#F87171', secondary: '#EF4444', accent: '#FCA5A5' },
  meditation: { primary: '#C084FC', secondary: '#A855F7', accent: '#D8B4FE' },

  // 购物类
  shopping: { primary: '#FB923C', secondary: '#F97316', accent: '#FDBA74' },

  // 宠物类
  pet: { primary: '#FBBF24', secondary: '#F59E0B', accent: '#FCD34D' },

  // 日常活动类
  bath: { primary: '#60A5FA', secondary: '#3B82F6', accent: '#93C5FD' },
  sleep: { primary: '#818CF8', secondary: '#6366F1', accent: '#A5B4FC' },
  breakfast: { primary: '#FB923C', secondary: '#F97316', accent: '#FDBA74' },
  lunch: { primary: '#34D399', secondary: '#10B981', accent: '#6EE7B7' },
  dinner: { primary: '#C084FC', secondary: '#A855F7', accent: '#D8B4FE' },

  // 学习工作类
  homework: { primary: '#818CF8', secondary: '#6366F1', accent: '#A5B4FC' },
  exam: { primary: '#F87171', secondary: '#EF4444', accent: '#FCA5A5' },

  // 社交类
  date: { primary: '#FF6B9D', secondary: '#EC4899', accent: '#FDA4AF' },
  party: { primary: '#FB923C', secondary: '#F97316', accent: '#FDBA74' },
  friend: { primary: '#FBBF24', secondary: '#F59E0B', accent: '#FCD34D' },

  // 健康美容类
  dental: { primary: '#60A5FA', secondary: '#3B82F6', accent: '#93C5FD' },
  haircut: { primary: '#C084FC', secondary: '#A855F7', accent: '#D8B4FE' },
  spa: { primary: '#FF6B9D', secondary: '#EC4899', accent: '#FDA4AF' },

  // 交通类
  bus: { primary: '#FBBF24', secondary: '#F59E0B', accent: '#FCD34D' },
  train: { primary: '#818CF8', secondary: '#6366F1', accent: '#A5B4FC' },
  bike: { primary: '#34D399', secondary: '#10B981', accent: '#6EE7B7' },

  // 娱乐类
  tv: { primary: '#818CF8', secondary: '#6366F1', accent: '#A5B4FC' },
  concert: { primary: '#C084FC', secondary: '#A855F7', accent: '#D8B4FE' },

  // 家务类
  cleaning: { primary: '#60A5FA', secondary: '#3B82F6', accent: '#93C5FD' },
  laundry: { primary: '#34D399', secondary: '#10B981', accent: '#6EE7B7' },
};

// 图标包装器 - 透明背景，支持渐变效果
const IconWrapper = ({ children, size = 80, colors, useGradient = false }) => {
  const scale = size / 80;
  const iconSize = 40 * scale;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {useGradient && (
        <Defs>
          <LinearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={colors.primary} stopOpacity="1" />
            <Stop offset="100%" stopColor={colors.secondary} stopOpacity="1" />
          </LinearGradient>
        </Defs>
      )}
      <G transform={`translate(${(size - iconSize) / 2}, ${(size - iconSize) / 2}) scale(${iconSize / 24})`}>
        {children}
      </G>
    </Svg>
  );
};

// 生活 - Life (优雅的家庭场景)
export const LifeIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.life;
  return (
    <IconWrapper size={size} colors={colors}>
      <Path
        d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        fill={colors.primary}
        fillOpacity="0.85"
        stroke={colors.secondary}
        strokeWidth="1.5"
      />
      <Path d="M9 22V12h6v10" fill={colors.accent} fillOpacity="0.9" />
      <Circle cx="10.5" cy="15" r="0.8" fill={colors.secondary} />
      <Rect x="5" y="12" width="2" height="3" rx="0.3" fill={colors.accent} fillOpacity="0.7" />
      <Rect x="17" y="12" width="2" height="3" rx="0.3" fill={colors.accent} fillOpacity="0.7" />
      <Path d="M12 2l2 2-2 2-2-2z" fill={colors.accent} fillOpacity="0.8" />
    </IconWrapper>
  );
};

// 工作 - Work (专业的办公场景)
export const WorkIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.work;
  return (
    <IconWrapper size={size} colors={colors}>
      <Rect x="3" y="7" width="18" height="13" rx="1.5" fill={colors.primary} fillOpacity="0.85" />
      <Path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" stroke={colors.secondary} strokeWidth="2" fill="none" />
      <Rect x="7" y="11" width="10" height="1.5" rx="0.5" fill="#FFFFFF" fillOpacity="0.9" />
      <Rect x="7" y="14" width="7" height="1" rx="0.3" fill="#FFFFFF" fillOpacity="0.7" />
      <Rect x="7" y="16" width="5" height="1" rx="0.3" fill="#FFFFFF" fillOpacity="0.5" />
      <Circle cx="19" cy="17" r="3" fill={colors.accent} fillOpacity="0.9" />
      <Path d="M19 15v2m0 2h.01" stroke="#FFFFFF" strokeWidth="1" fill="none" />
    </IconWrapper>
  );
};

// 爱情 - Love (精致的爱心设计)
export const LoveIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.love;
  return (
    <IconWrapper size={size} colors={colors}>
      <Path
        d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
        fill={colors.primary}
        fillOpacity="0.9"
      />
      <Path
        d="M12 7c-1.5-1.5-4-1.5-5.5 0"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      <Circle cx="9" cy="9" r="1" fill="#FFFFFF" fillOpacity="0.8" />
      <Circle cx="15" cy="9" r="1" fill="#FFFFFF" fillOpacity="0.8" />
    </IconWrapper>
  );
};

// 庆祝节日 - Celebration (烟花派对)
export const CelebrationIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.celebration;
  return (
    <IconWrapper size={size} colors={colors}>
      <Circle cx="12" cy="12" r="4" fill={colors.primary} fillOpacity="0.9" />
      <Path d="M12 2v4m0 12v4M2 12h4m12 0h4" stroke={colors.primary} strokeWidth="2" />
      <Path d="M5 5l3 3m8-3l-3 3M5 19l3-3m8 3l-3-3" stroke={colors.accent} strokeWidth="2" />
      <Circle cx="12" cy="6" r="1.5" fill={colors.accent} fillOpacity="0.9" />
      <Circle cx="18" cy="12" r="1.5" fill={colors.accent} fillOpacity="0.9" />
      <Circle cx="12" cy="18" r="1.5" fill={colors.accent} fillOpacity="0.9" />
      <Circle cx="6" cy="12" r="1.5" fill={colors.accent} fillOpacity="0.9" />
      <Circle cx="12" cy="12" r="2" fill="#FFFFFF" fillOpacity="0.9" />
    </IconWrapper>
  );
};

// 生日 - Birthday (精美生日蛋糕)
export const BirthdayIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.birthday;
  return (
    <IconWrapper size={size} colors={colors}>
      <Path d="M7 8h10v10a2 2 0 01-2 2H9a2 2 0 01-2-2V8z" fill={colors.primary} fillOpacity="0.85" />
      <Rect x="6" y="15" width="12" height="3" rx="1" fill={colors.accent} fillOpacity="0.9" />
      <Path d="M10 8V5m4 3V5" stroke={colors.secondary} strokeWidth="1.5" />
      <Path d="M10 3l.5-1.5L10 0m4 3l.5-1.5L14 0" stroke={colors.accent} strokeWidth="1" fill="none" />
      <Circle cx="9" cy="11" r="0.7" fill="#FFFFFF" />
      <Circle cx="12" cy="11" r="0.7" fill="#FFFFFF" />
      <Circle cx="15" cy="11" r="0.7" fill="#FFFFFF" />
      <Rect x="8" y="18" width="8" height="1" rx="0.5" fill="#FFFFFF" fillOpacity="0.7" />
    </IconWrapper>
  );
};

// 毕业 - Graduation (学士帽与证书)
export const GraduationIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.graduation;
  return (
    <IconWrapper size={size} colors={colors}>
      <Path d="M2 10l10-5 10 5-10 5-10-5z" fill={colors.primary} fillOpacity="0.9" />
      <Path d="M6 12v5a2 2 0 002 2h8a2 2 0 002-2v-5" stroke={colors.secondary} strokeWidth="1.5" fill="none" />
      <Rect x="18" y="12" width="4" height="8" rx="1" fill={colors.accent} fillOpacity="0.8" />
      <Path d="M12 15v3" stroke={colors.secondary} strokeWidth="1.5" />
      <Circle cx="12" cy="19" r="1.5" fill={colors.accent} />
      <Path d="M20 13l.5-.5" stroke={colors.accent} strokeWidth="1" />
    </IconWrapper>
  );
};

// 飞机航班 - Flight (现代飞机)
export const FlightIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.flight;
  return (
    <IconWrapper size={size} colors={colors}>
      <Path
        d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
        fill={colors.primary}
        fillOpacity="0.9"
      />
      <Ellipse cx="12" cy="10" rx="6" ry="1.5" fill={colors.accent} fillOpacity="0.5" />
      <Circle cx="8" cy="12" r="0.8" fill="#FFFFFF" />
      <Circle cx="12" cy="11" r="0.8" fill="#FFFFFF" />
      <Circle cx="16" cy="12" r="0.8" fill="#FFFFFF" />
    </IconWrapper>
  );
};

// 居家 - Home (温馨的家)
export const HomeIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.home;
  return (
    <IconWrapper size={size} colors={colors}>
      <Path d="M3 12l9-9 9 9" stroke={colors.secondary} strokeWidth="2" fill="none" />
      <Path d="M5 10v10a2 2 0 002 2h10a2 2 0 002-2V10" fill={colors.primary} fillOpacity="0.85" />
      <Rect x="9" y="14" width="6" height="7" fill={colors.accent} fillOpacity="0.9" />
      <Circle cx="11" cy="17" r="0.5" fill={colors.secondary} />
      <Rect x="7" y="11" width="2" height="3" rx="0.3" fill={colors.accent} fillOpacity="0.7" />
      <Rect x="15" y="11" width="2" height="3" rx="0.3" fill={colors.accent} fillOpacity="0.7" />
    </IconWrapper>
  );
};

// 健身 - Fitness (运动哑铃)
export const FitnessIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.fitness;
  return (
    <IconWrapper size={size} colors={colors}>
      <Rect x="6" y="9" width="12" height="6" rx="1" fill={colors.primary} fillOpacity="0.85" />
      <Path d="M3 10l3-1v6l-3-1V10z" fill={colors.accent} fillOpacity="0.9" />
      <Path d="M21 10l-3-1v6l3-1V10z" fill={colors.accent} fillOpacity="0.9" />
      <Rect x="2" y="9.5" width="2" height="5" rx="0.8" fill={colors.secondary} />
      <Rect x="20" y="9.5" width="2" height="5" rx="0.8" fill={colors.secondary} />
      <Line x1="12" y1="9" x2="12" y2="15" stroke="#FFFFFF" strokeWidth="1.5" />
      <Circle cx="12" cy="12" r="1.5" fill="#FFFFFF" fillOpacity="0.9" />
    </IconWrapper>
  );
};

// 学习 - Study (读书笔记)
export const StudyIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.study;
  return (
    <IconWrapper size={size} colors={colors}>
      <Path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke={colors.secondary} strokeWidth="1.5" fill="none" />
      <Path d="M6.5 3H20v18H6.5A2.5 2.5 0 014 18.5v-13A2.5 2.5 0 016.5 3z" fill={colors.primary} fillOpacity="0.85" />
      <Rect x="9" y="7" width="8" height="1.5" rx="0.5" fill="#FFFFFF" fillOpacity="0.9" />
      <Rect x="9" y="11" width="8" height="1" rx="0.3" fill="#FFFFFF" fillOpacity="0.7" />
      <Rect x="9" y="14" width="5" height="1" rx="0.3" fill="#FFFFFF" fillOpacity="0.5" />
      <Path d="M6.5 6v12" stroke={colors.accent} strokeWidth="1" />
      <Circle cx="11" cy="7.7" r="0.5" fill={colors.accent} />
    </IconWrapper>
  );
};

// 游戏 - Game (游戏手柄)
export const GameIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.game;
  return (
    <IconWrapper size={size} colors={colors}>
      <Rect x="4" y="7" width="16" height="10" rx="2" fill={colors.primary} fillOpacity="0.9" />
      <Path d="M7 11h3m-1.5-1.5v3" stroke={colors.secondary} strokeWidth="1.5" />
      <Circle cx="16" cy="10" r="1" fill={colors.secondary} />
      <Circle cx="18" cy="12" r="1" fill={colors.secondary} />
      <Circle cx="14" cy="12" r="1" fill={colors.accent} />
      <Circle cx="16" cy="14" r="1" fill={colors.accent} />
      <Ellipse cx="12" cy="7" rx="8" ry="1" fill={colors.accent} fillOpacity="0.5" />
    </IconWrapper>
  );
};

// 听音乐 - Music (音符耳机)
export const MusicIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.music;
  return (
    <IconWrapper size={size} colors={colors}>
      <Path d="M9 18V5l12-2v13" stroke={colors.secondary} strokeWidth="2" fill="none" />
      <Circle cx="6" cy="18" r="3" fill={colors.primary} fillOpacity="0.9" />
      <Circle cx="18" cy="16" r="3" fill={colors.primary} fillOpacity="0.9" />
      <Circle cx="6" cy="18" r="1.5" fill="#FFFFFF" />
      <Circle cx="18" cy="16" r="1.5" fill="#FFFFFF" />
      <Path d="M9 8l12-2" stroke={colors.accent} strokeWidth="1.5" />
    </IconWrapper>
  );
};

// 吃饭 - Eating (精美餐具)
export const EatingIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.eating;
  return (
    <IconWrapper size={size} colors={colors}>
      <Path d="M3 2v7a2 2 0 002 2h2a2 2 0 002-2V2" fill={colors.primary} fillOpacity="0.85" />
      <Path d="M6 2v20" stroke={colors.secondary} strokeWidth="2" />
      <Path d="M21 15V2a5 5 0 00-5 5v6a2 2 0 002 2h3z" fill={colors.primary} fillOpacity="0.85" />
      <Path d="M21 15v7" stroke={colors.secondary} strokeWidth="2" />
      <Ellipse cx="12" cy="20" rx="7" ry="1.5" fill={colors.accent} fillOpacity="0.5" />
      <Circle cx="5" cy="6" r="0.8" fill={colors.accent} />
      <Circle cx="18.5" cy="8" r="0.8" fill={colors.accent} />
    </IconWrapper>
  );
};

// 喝咖啡 - Coffee (咖啡杯冒热气)
export const CoffeeIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.coffee;
  return (
    <IconWrapper size={size} colors={colors}>
      <Path d="M2 9h16v8a2 2 0 01-2 2H4a2 2 0 01-2-2V9z" fill={colors.primary} fillOpacity="0.85" />
      <Path d="M18 9h1a4 4 0 010 8h-1" stroke={colors.secondary} strokeWidth="2" fill="none" />
      <Path d="M6 2c0 2 1 3 1 5M10 2c0 2 1 3 1 5M14 2c0 2 1 3 1 5" stroke={colors.accent} strokeWidth="1.5" fill="none" />
      <Ellipse cx="10" cy="13" rx="3" ry="1" fill={colors.accent} fillOpacity="0.6" />
      <Path d="M4 17h12" stroke={colors.accent} strokeWidth="1" />
    </IconWrapper>
  );
};

// 游玩 - Travel (地球仪旅行)
export const TravelIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.travel;
  return (
    <IconWrapper size={size} colors={colors}>
      <Circle cx="12" cy="12" r="10" fill={colors.primary} fillOpacity="0.85" />
      <Path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke={colors.secondary} strokeWidth="1.5" fill="none" />
      <Circle cx="12" cy="12" r="2" fill="#FFFFFF" />
      <Path d="M12 2l2 3-2 2-2-2z" fill={colors.accent} fillOpacity="0.8" />
    </IconWrapper>
  );
};

// 散步 - Walk (行走的人)
export const WalkIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.walk;
  return (
    <IconWrapper size={size} colors={colors}>
      <Circle cx="12" cy="4" r="2" fill={colors.primary} fillOpacity="0.9" />
      <Path d="M10 8l2-2 2 2v8l-2 2" stroke={colors.secondary} strokeWidth="2" fill="none" />
      <Path d="M14 14l4 4m-12-4l4 4" stroke={colors.primary} strokeWidth="2" />
      <Path d="M10 12h4" stroke={colors.accent} strokeWidth="1.5" />
      <Circle cx="16" cy="19" r="1" fill={colors.accent} />
      <Circle cx="8" cy="19" r="1" fill={colors.accent} />
    </IconWrapper>
  );
};

// 画画 - Art (调色板画笔)
export const ArtIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.art;
  return (
    <IconWrapper size={size} colors={colors}>
      <Path
        d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"
        fill={colors.primary}
        fillOpacity="0.85"
      />
      <Circle cx="6.5" cy="11.5" r="1.5" fill="#FFFFFF" />
      <Circle cx="9.5" cy="7.5" r="1.5" fill={colors.accent} />
      <Circle cx="14.5" cy="7.5" r="1.5" fill={colors.secondary} />
      <Circle cx="17.5" cy="11.5" r="1.5" fill="#FBBF24" />
    </IconWrapper>
  );
};

// 玩手机 - Phone (智能手机)
export const PhoneIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.phone;
  return (
    <IconWrapper size={size} colors={colors}>
      <Rect x="5" y="2" width="14" height="20" rx="2" fill={colors.primary} fillOpacity="0.85" />
      <Rect x="7" y="5" width="10" height="13" rx="1" fill="#FFFFFF" fillOpacity="0.95" />
      <Rect x="9" y="5" width="6" height="0.8" rx="0.4" fill={colors.accent} />
      <Circle cx="12" cy="20" r="1" fill={colors.accent} />
      <Rect x="9" y="8" width="3" height="3" rx="0.5" fill={colors.accent} fillOpacity="0.3" />
      <Rect x="13" y="8" width="3" height="3" rx="0.5" fill={colors.accent} fillOpacity="0.3" />
      <Rect x="9" y="12" width="7" height="1" rx="0.3" fill={colors.accent} fillOpacity="0.5" />
      <Rect x="9" y="14" width="5" height="1" rx="0.3" fill={colors.accent} fillOpacity="0.3" />
    </IconWrapper>
  );
};

// 踢足球 - Soccer (足球特写)
export const SoccerIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.soccer;
  return (
    <IconWrapper size={size} colors={colors}>
      <Circle cx="12" cy="12" r="10" fill={colors.primary} fillOpacity="0.85" />
      <Path
        d="M12 2l2.5 5 5.5.5-4 4 1 5.5-5-2.5-5 2.5 1-5.5-4-4 5.5-.5z"
        fill="#FFFFFF"
        fillOpacity="0.9"
      />
      <Polygon
        points="12,7 14,10 18,10.5 15,13.5 15.5,17.5 12,15.5 8.5,17.5 9,13.5 6,10.5 10,10"
        stroke={colors.secondary}
        strokeWidth="1"
        fill="none"
      />
    </IconWrapper>
  );
};

// 打篮球 - Basketball (篮球特写)
export const BasketballIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.basketball;
  return (
    <IconWrapper size={size} colors={colors}>
      <Circle cx="12" cy="12" r="10" fill={colors.primary} fillOpacity="0.85" />
      <Path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10M12 2a15.3 15.3 0 00-4 10 15.3 15.3 0 004 10" stroke={colors.secondary} strokeWidth="1.5" fill="none" />
      <Line x1="2" y1="12" x2="22" y2="12" stroke={colors.secondary} strokeWidth="1.5" />
      <Path d="M6 6c4 4 8 4 12 0M6 18c4-4 8-4 12 0" stroke={colors.accent} strokeWidth="1" fill="none" />
    </IconWrapper>
  );
};

// 游泳 - Swimming (游泳者)
export const SwimmingIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.swimming;
  return (
    <IconWrapper size={size} colors={colors}>
      <Circle cx="16" cy="6" r="2" fill={colors.primary} fillOpacity="0.9" />
      <Path d="M4 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0" stroke={colors.primary} strokeWidth="2" fill="none" />
      <Path d="M4 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0" stroke={colors.accent} strokeWidth="2" fill="none" />
      <Path d="M4 20c2-2 4-2 6 0s4 2 6 0 4-2 6 0" stroke={colors.accent} strokeWidth="1.5" fill="none" opacity="0.5" />
      <Path d="M10 8l6-2v4l-6 2z" fill={colors.secondary} fillOpacity="0.8" />
    </IconWrapper>
  );
};

// 跑步 - Running (跑步者)
export const RunningIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.running;
  return (
    <IconWrapper size={size} colors={colors}>
      <Circle cx="14" cy="4" r="2" fill={colors.primary} fillOpacity="0.9" />
      <Path d="M10 8l4-2 4 4-2 6 3 4" stroke={colors.primary} strokeWidth="2" fill="none" />
      <Path d="M10 8l-4 8m8-4l4 2" stroke={colors.secondary} strokeWidth="2" fill="none" />
      <Circle cx="6" cy="17" r="1" fill={colors.accent} />
      <Circle cx="19" cy="22" r="1" fill={colors.accent} />
      <Path d="M14 10h4" stroke={colors.accent} strokeWidth="1.5" />
    </IconWrapper>
  );
};

// 瑜伽 - Yoga (瑜伽姿势)
export const YogaIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.yoga;
  return (
    <IconWrapper size={size} colors={colors}>
      <Circle cx="12" cy="5" r="2" fill={colors.primary} fillOpacity="0.9" />
      <Path d="M12 8v6" stroke={colors.primary} strokeWidth="2" />
      <Path d="M6 12l6 2 6-2" stroke={colors.secondary} strokeWidth="2" fill="none" />
      <Path d="M8 16l-2 6m12-6l2 6" stroke={colors.primary} strokeWidth="2" />
      <Circle cx="6" cy="22" r="1" fill={colors.accent} />
      <Circle cx="18" cy="22" r="1" fill={colors.accent} />
      <Path d="M10 10h4" stroke={colors.accent} strokeWidth="1.5" />
    </IconWrapper>
  );
};

// 阅读 - Reading (打开的书)
export const ReadingIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.reading;
  return (
    <IconWrapper size={size} colors={colors}>
      <Path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2V3z" fill={colors.primary} fillOpacity="0.85" />
      <Path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7V3z" fill={colors.secondary} fillOpacity="0.85" />
      <Path d="M12 7v14" stroke={colors.accent} strokeWidth="2" />
      <Rect x="4" y="7" width="5" height="1" rx="0.3" fill="#FFFFFF" fillOpacity="0.7" />
      <Rect x="4" y="10" width="4" height="0.8" rx="0.3" fill="#FFFFFF" fillOpacity="0.5" />
      <Rect x="15" y="7" width="5" height="1" rx="0.3" fill="#FFFFFF" fillOpacity="0.7" />
      <Rect x="16" y="10" width="4" height="0.8" rx="0.3" fill="#FFFFFF" fillOpacity="0.5" />
    </IconWrapper>
  );
};

// 看电影 - Movie (电影胶片)
export const MovieIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.movie;
  return (
    <IconWrapper size={size} colors={colors}>
      <Rect x="2" y="6" width="20" height="12" rx="2" fill={colors.primary} fillOpacity="0.85" />
      <Rect x="5" y="9" width="14" height="6" rx="1" fill={colors.accent} fillOpacity="0.9" />
      <Rect x="3" y="7" width="1.5" height="2" fill={colors.secondary} />
      <Rect x="3" y="10" width="1.5" height="2" fill={colors.secondary} />
      <Rect x="3" y="13" width="1.5" height="2" fill={colors.secondary} />
      <Rect x="3" y="16" width="1.5" height="1" fill={colors.secondary} />
      <Rect x="19.5" y="7" width="1.5" height="2" fill={colors.secondary} />
      <Rect x="19.5" y="10" width="1.5" height="2" fill={colors.secondary} />
      <Rect x="19.5" y="13" width="1.5" height="2" fill={colors.secondary} />
      <Rect x="19.5" y="16" width="1.5" height="1" fill={colors.secondary} />
      <Path d="M10 10l4 2-4 2z" fill="#FFFFFF" />
    </IconWrapper>
  );
};

// 烹饪 - Cooking (厨师帽与锅)
export const CookingIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.cooking;
  return (
    <IconWrapper size={size} colors={colors}>
      <Path d="M6 10h12v8a2 2 0 01-2 2H8a2 2 0 01-2-2v-8z" fill={colors.primary} fillOpacity="0.85" />
      <Path d="M8 10V8a4 4 0 018 0v2" stroke={colors.secondary} strokeWidth="2" fill="none" />
      <Ellipse cx="12" cy="10" rx="7" ry="1.5" fill={colors.accent} fillOpacity="0.7" />
      <Path d="M9 6c0-1 1-2 1-3m4 3c0-1 1-2 1-3" stroke={colors.accent} strokeWidth="1.5" fill="none" />
      <Circle cx="10" cy="14" r="1" fill={colors.accent} />
      <Circle cx="14" cy="14" r="1" fill={colors.accent} />
      <Path d="M10 16h4" stroke="#FFFFFF" strokeWidth="1.5" />
    </IconWrapper>
  );
};

// 开车 - Drive (汽车)
export const DriveIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.drive;
  return (
    <IconWrapper size={size} colors={colors}>
      <Path d="M5 11l2-5h10l2 5" stroke={colors.secondary} strokeWidth="2" fill="none" />
      <Rect x="2" y="11" width="20" height="7" rx="2" fill={colors.primary} fillOpacity="0.85" />
      <Circle cx="7" cy="18" r="2" fill={colors.secondary} />
      <Circle cx="17" cy="18" r="2" fill={colors.secondary} />
      <Rect x="6" y="8" width="3" height="3" rx="0.5" fill={colors.accent} fillOpacity="0.7" />
      <Rect x="10" y="8" width="4" height="3" rx="0.5" fill={colors.accent} fillOpacity="0.7" />
      <Rect x="15" y="8" width="3" height="3" rx="0.5" fill={colors.accent} fillOpacity="0.7" />
      <Circle cx="7" cy="18" r="1" fill="#FFFFFF" />
      <Circle cx="17" cy="18" r="1" fill="#FFFFFF" />
    </IconWrapper>
  );
};

// 徒步 - Hiking (登山)
export const HikingIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.hiking;
  return (
    <IconWrapper size={size} colors={colors}>
      <Circle cx="14" cy="4" r="2" fill={colors.primary} fillOpacity="0.9" />
      <Path d="M10 8l4-2 2 4-2 6 2 6" stroke={colors.primary} strokeWidth="2" fill="none" />
      <Path d="M10 8l-2 8 4 4" stroke={colors.secondary} strokeWidth="2" fill="none" />
      <Path d="M8 8l-4 2" stroke={colors.accent} strokeWidth="2" />
      <Path d="M2 18l4-4 4 4 4-4 4 4 4-4" stroke={colors.accent} strokeWidth="1.5" fill="none" opacity="0.5" />
      <Circle cx="6" cy="21" r="1" fill={colors.accent} />
      <Circle cx="16" cy="22" r="1" fill={colors.accent} />
    </IconWrapper>
  );
};

// 露营 - Camping (帐篷)
export const CampingIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.camping;
  return (
    <IconWrapper size={size} colors={colors}>
      <Path d="M2 20l10-16 10 16z" fill={colors.primary} fillOpacity="0.85" />
      <Path d="M2 20l10-16 10 16H2z" stroke={colors.secondary} strokeWidth="1.5" fill="none" />
      <Path d="M12 4v16" stroke={colors.accent} strokeWidth="1.5" />
      <Path d="M7 13l5 7 5-7" fill={colors.accent} fillOpacity="0.5" />
      <Path d="M2 20h20" stroke={colors.secondary} strokeWidth="2" />
      <Circle cx="12" cy="8" r="1" fill={colors.accent} />
    </IconWrapper>
  );
};

// 摄影 - Photography (相机)
export const PhotographyIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.photography;
  return (
    <IconWrapper size={size} colors={colors}>
      <Path d="M7 6h10l2 2h2a2 2 0 012 2v8a2 2 0 01-2 2H3a2 2 0 01-2-2v-8a2 2 0 012-2h2l2-2z" fill={colors.primary} fillOpacity="0.85" />
      <Circle cx="12" cy="13" r="4" fill={colors.accent} fillOpacity="0.9" />
      <Circle cx="12" cy="13" r="2.5" fill={colors.secondary} />
      <Circle cx="18" cy="10" r="1" fill={colors.accent} />
      <Rect x="9" y="3" width="6" height="3" rx="1" fill={colors.secondary} fillOpacity="0.7" />
    </IconWrapper>
  );
};

// 购物 - Shopping (购物袋)
export const ShoppingIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.shopping;
  return (
    <IconWrapper size={size} colors={colors}>
      <Path d="M6 8h12l1 12H5L6 8z" fill={colors.primary} fillOpacity="0.85" />
      <Path d="M9 8V6a3 3 0 016 0v2" stroke={colors.secondary} strokeWidth="2" fill="none" />
      <Rect x="8" y="11" width="3" height="2" rx="0.5" fill={colors.accent} fillOpacity="0.7" />
      <Rect x="13" y="11" width="3" height="2" rx="0.5" fill={colors.accent} fillOpacity="0.7" />
      <Path d="M8 14h8" stroke="#FFFFFF" strokeWidth="1" opacity="0.5" />
      <Circle cx="10" cy="16" r="0.8" fill={colors.accent} />
      <Circle cx="14" cy="16" r="0.8" fill={colors.accent} />
    </IconWrapper>
  );
};

// 宠物 - Pet (宠物爪印)
export const PetIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.pet;
  return (
    <IconWrapper size={size} colors={colors}>
      <Ellipse cx="12" cy="15" rx="3" ry="4" fill={colors.primary} fillOpacity="0.9" />
      <Ellipse cx="8" cy="9" rx="2" ry="2.5" fill={colors.primary} fillOpacity="0.9" />
      <Ellipse cx="16" cy="9" rx="2" ry="2.5" fill={colors.primary} fillOpacity="0.9" />
      <Ellipse cx="6" cy="13" rx="1.5" ry="2" fill={colors.accent} fillOpacity="0.9" />
      <Ellipse cx="18" cy="13" rx="1.5" ry="2" fill={colors.accent} fillOpacity="0.9" />
      <Circle cx="11" cy="14" r="0.5" fill="#FFFFFF" />
      <Circle cx="13" cy="14" r="0.5" fill="#FFFFFF" />
      <Path d="M10.5 16c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5" stroke="#FFFFFF" strokeWidth="1" fill="none" />
    </IconWrapper>
  );
};

// 冥想 - Meditation (冥想姿势)
export const MeditationIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.meditation;
  return (
    <IconWrapper size={size} colors={colors}>
      <Circle cx="12" cy="6" r="2" fill={colors.primary} fillOpacity="0.9" />
      <Path d="M12 9v4" stroke={colors.primary} strokeWidth="2" />
      <Path d="M6 13l6 0 6 0" stroke={colors.secondary} strokeWidth="2" />
      <Path d="M8 15c-1 2-2 4-2 6m12-6c1 2 2 4 2 6" stroke={colors.primary} strokeWidth="2" fill="none" />
      <Circle cx="6" cy="21" r="1" fill={colors.accent} />
      <Circle cx="18" cy="21" r="1" fill={colors.accent} />
      <Path d="M9 11c0-1 1-2 3-2s3 1 3 2" stroke={colors.accent} strokeWidth="1" fill="none" />
      <Circle cx="12" cy="5" r="0.5" fill={colors.accent} />
    </IconWrapper>
  );
};

// 医疗 - Medical (医疗十字)
export const MedicalIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.medical;
  return (
    <IconWrapper size={size} colors={colors}>
      <Rect x="3" y="3" width="18" height="18" rx="2" fill={colors.primary} fillOpacity="0.85" />
      <Path d="M12 7v10M7 12h10" stroke="#FFFFFF" strokeWidth="3" />
      <Rect x="10" y="5" width="4" height="14" rx="1" fill="#FFFFFF" fillOpacity="0.9" />
      <Rect x="5" y="10" width="14" height="4" rx="1" fill="#FFFFFF" fillOpacity="0.9" />
      <Circle cx="12" cy="12" r="2" fill={colors.accent} />
    </IconWrapper>
  );
};

// 会议 - Meeting (会议桌)
export const MeetingIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.meeting;
  return (
    <IconWrapper size={size} colors={colors}>
      <Rect x="2" y="10" width="20" height="8" rx="1" fill={colors.primary} fillOpacity="0.85" />
      <Circle cx="6" cy="6" r="2" fill={colors.secondary} fillOpacity="0.9" />
      <Circle cx="12" cy="6" r="2" fill={colors.secondary} fillOpacity="0.9" />
      <Circle cx="18" cy="6" r="2" fill={colors.secondary} fillOpacity="0.9" />
      <Path d="M6 8v2m6-2v2m6-2v2" stroke={colors.secondary} strokeWidth="1.5" />
      <Rect x="8" y="13" width="8" height="1" rx="0.3" fill={colors.accent} fillOpacity="0.7" />
      <Rect x="9" y="15" width="6" height="0.8" rx="0.3" fill={colors.accent} fillOpacity="0.5" />
    </IconWrapper>
  );
};

// 洗澡 - Bath (淋浴喷头)
export const BathIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.bath;
  return (
    <IconWrapper size={size} colors={colors}>
      <Path d="M9 2l1-1 1 1v3l-1 1-1-1V2z" fill={colors.secondary} fillOpacity="0.9" />
      <Circle cx="10" cy="3" r="1" fill={colors.accent} />
      <Path d="M8 8h4a2 2 0 012 2v1H6v-1a2 2 0 012-2z" fill={colors.primary} fillOpacity="0.85" />
      <Line x1="7" y1="13" x2="7" y2="18" stroke={colors.accent} strokeWidth="1.5" opacity="0.7" />
      <Line x1="10" y1="13" x2="10" y2="19" stroke={colors.accent} strokeWidth="1.5" opacity="0.7" />
      <Line x1="13" y1="13" x2="13" y2="18" stroke={colors.accent} strokeWidth="1.5" opacity="0.7" />
      <Circle cx="7" cy="19" r="0.8" fill={colors.accent} opacity="0.6" />
      <Circle cx="10" cy="20" r="0.8" fill={colors.accent} opacity="0.6" />
      <Circle cx="13" cy="19" r="0.8" fill={colors.accent} opacity="0.6" />
      <Circle cx="9" cy="15" r="0.5" fill={colors.primary} opacity="0.4" />
      <Circle cx="11" cy="16" r="0.5" fill={colors.primary} opacity="0.4" />
    </IconWrapper>
  );
};

// 睡觉 - Sleep (月亮与枕头)
export const SleepIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.sleep;
  return (
    <IconWrapper size={size} colors={colors}>
      <Path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill={colors.primary} fillOpacity="0.85" />
      <Path d="M9 2h2m3 0h2m-5 3h1.5m2 0H16" stroke={colors.accent} strokeWidth="1.5" opacity="0.6" />
      <Rect x="2" y="18" width="10" height="4" rx="1" fill={colors.secondary} fillOpacity="0.7" />
      <Ellipse cx="7" cy="18" rx="4" ry="1" fill={colors.accent} fillOpacity="0.5" />
      <Circle cx="16" cy="10" r="0.8" fill="#FFFFFF" opacity="0.6" />
      <Circle cx="14" cy="13" r="0.6" fill="#FFFFFF" opacity="0.4" />
    </IconWrapper>
  );
};

// 早餐 - Breakfast (面包与牛奶)
export const BreakfastIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.breakfast;
  return (
    <IconWrapper size={size} colors={colors}>
      <Path d="M3 8h8a2 2 0 012 2v6a2 2 0 01-2 2H3V8z" fill={colors.primary} fillOpacity="0.85" />
      <Path d="M13 10h2a2 2 0 012 2v2a2 2 0 01-2 2h-2" stroke={colors.secondary} strokeWidth="2" fill="none" />
      <Ellipse cx="7" cy="8" rx="4" ry="1" fill={colors.accent} fillOpacity="0.6" />
      <Path d="M5 11h4M5 14h3" stroke="#FFFFFF" strokeWidth="1" opacity="0.5" />
      <Rect x="16" y="6" width="5" height="8" rx="1" fill={colors.accent} fillOpacity="0.8" />
      <Path d="M18 4c0 1 .5 2 .5 2s.5-1 .5-2" stroke={colors.accent} strokeWidth="1" fill="none" />
      <Circle cx="18.5" cy="10" r="0.5" fill="#FFFFFF" opacity="0.7" />
    </IconWrapper>
  );
};

// 午餐 - Lunch (饭盒)
export const LunchIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.lunch;
  return (
    <IconWrapper size={size} colors={colors}>
      <Rect x="4" y="8" width="16" height="12" rx="2" fill={colors.primary} fillOpacity="0.85" />
      <Rect x="6" y="10" width="5" height="6" rx="1" fill={colors.accent} fillOpacity="0.7" />
      <Rect x="13" y="10" width="5" height="6" rx="1" fill={colors.secondary} fillOpacity="0.7" />
      <Path d="M4 13h16" stroke={colors.secondary} strokeWidth="1.5" />
      <Circle cx="8.5" cy="12" r="0.8" fill="#FFFFFF" opacity="0.6" />
      <Circle cx="15.5" cy="12" r="0.8" fill="#FFFFFF" opacity="0.6" />
      <Rect x="10" y="4" width="4" height="4" rx="1" fill={colors.accent} fillOpacity="0.8" />
      <Path d="M12 4v-2" stroke={colors.accent} strokeWidth="1.5" />
    </IconWrapper>
  );
};

// 晚餐 - Dinner (餐盘)
export const DinnerIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.dinner;
  return (
    <IconWrapper size={size} colors={colors}>
      <Circle cx="12" cy="13" r="9" fill={colors.primary} fillOpacity="0.85" />
      <Circle cx="12" cy="13" r="6" fill={colors.accent} fillOpacity="0.7" />
      <Path d="M3 2v5a2 2 0 002 2h1a2 2 0 002-2V2M6 2v20" stroke={colors.secondary} strokeWidth="2" />
      <Path d="M21 15V2a5 5 0 00-5 5v4" stroke={colors.secondary} strokeWidth="2" fill="none" />
      <Path d="M21 11v11" stroke={colors.secondary} strokeWidth="2" />
      <Circle cx="12" cy="13" r="2" fill="#FFFFFF" opacity="0.5" />
    </IconWrapper>
  );
};

// 作业 - Homework (铅笔与纸)
export const HomeworkIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.homework;
  return (
    <IconWrapper size={size} colors={colors}>
      <Rect x="5" y="2" width="14" height="20" rx="1" fill={colors.primary} fillOpacity="0.85" />
      <Rect x="8" y="6" width="8" height="1.5" rx="0.5" fill="#FFFFFF" fillOpacity="0.7" />
      <Rect x="8" y="10" width="8" height="1" rx="0.3" fill="#FFFFFF" fillOpacity="0.5" />
      <Rect x="8" y="13" width="6" height="1" rx="0.3" fill="#FFFFFF" fillOpacity="0.5" />
      <Path d="M14 16l5-5 2 2-5 5-2.5.5.5-2.5z" fill={colors.accent} fillOpacity="0.9" />
      <Circle cx="19" cy="13" r="1" fill={colors.secondary} />
      <Path d="M17 18l-1 1" stroke={colors.secondary} strokeWidth="1" />
    </IconWrapper>
  );
};

// 考试 - Exam (试卷与笔)
export const ExamIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.exam;
  return (
    <IconWrapper size={size} colors={colors}>
      <Rect x="4" y="3" width="16" height="18" rx="1" fill={colors.primary} fillOpacity="0.85" />
      <Rect x="7" y="7" width="10" height="1.5" rx="0.5" fill="#FFFFFF" fillOpacity="0.9" />
      <Rect x="7" y="11" width="10" height="1" rx="0.3" fill="#FFFFFF" fillOpacity="0.7" />
      <Rect x="7" y="14" width="8" height="1" rx="0.3" fill="#FFFFFF" fillOpacity="0.7" />
      <Circle cx="8" cy="17.5" r="1.2" fill={colors.accent} fillOpacity="0.9" />
      <Path d="M7 17.5l.8.8L10 16" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
      <Rect x="11" y="17" width="5" height="1" rx="0.3" fill="#FFFFFF" fillOpacity="0.5" />
      <Path d="M18 2l1-1 1 1v2l-1 1-1-1V2z" fill={colors.accent} />
    </IconWrapper>
  );
};

// 约会 - Date (玫瑰花)
export const DateIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.date;
  return (
    <IconWrapper size={size} colors={colors}>
      <Circle cx="12" cy="8" r="4" fill={colors.primary} fillOpacity="0.9" />
      <Circle cx="9" cy="7" r="2" fill={colors.primary} fillOpacity="0.8" />
      <Circle cx="15" cy="7" r="2" fill={colors.primary} fillOpacity="0.8" />
      <Circle cx="10" cy="10" r="1.5" fill={colors.accent} fillOpacity="0.9" />
      <Circle cx="14" cy="10" r="1.5" fill={colors.accent} fillOpacity="0.9" />
      <Path d="M12 12v10" stroke={colors.secondary} strokeWidth="2" />
      <Path d="M10 15c1-.5 2-.5 3 0M9 18c1.5-1 3-1 4.5 0" stroke={colors.secondary} strokeWidth="1" fill="none" />
      <Ellipse cx="11" cy="17" rx="1" ry="2" fill={colors.accent} fillOpacity="0.6" transform="rotate(-20 11 17)" />
      <Ellipse cx="13" cy="19" rx="1" ry="2" fill={colors.accent} fillOpacity="0.6" transform="rotate(20 13 19)" />
    </IconWrapper>
  );
};

// 派对 - Party (气球)
export const PartyIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.party;
  return (
    <IconWrapper size={size} colors={colors}>
      <Ellipse cx="8" cy="8" rx="3" ry="4" fill={colors.primary} fillOpacity="0.9" />
      <Ellipse cx="16" cy="7" rx="3" ry="4" fill={colors.accent} fillOpacity="0.9" />
      <Ellipse cx="12" cy="10" rx="3" ry="4" fill={colors.secondary} fillOpacity="0.9" />
      <Path d="M8 12c0 2-1 4-1 4M16 11c0 2 1 4 1 4M12 14c0 2 0 4 0 4" stroke={colors.secondary} strokeWidth="1.5" fill="none" />
      <Circle cx="7" cy="16" r="0.8" fill={colors.accent} />
      <Circle cx="17" cy="15" r="0.8" fill={colors.primary} />
      <Circle cx="12" cy="18" r="0.8" fill={colors.accent} />
      <Path d="M6 6l-1-2M10 5l1-2M14 5l-1-2M18 6l1-2" stroke={colors.accent} strokeWidth="1" opacity="0.6" />
    </IconWrapper>
  );
};

// 朋友 - Friend (两个人)
export const FriendIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.friend;
  return (
    <IconWrapper size={size} colors={colors}>
      <Circle cx="9" cy="7" r="3" fill={colors.primary} fillOpacity="0.9" />
      <Circle cx="15" cy="7" r="3" fill={colors.accent} fillOpacity="0.9" />
      <Path d="M5 21v-2a4 4 0 014-4h0a4 4 0 014 4v2" fill={colors.primary} fillOpacity="0.85" />
      <Path d="M11 21v-2a4 4 0 014-4h0a4 4 0 014 4v2" fill={colors.accent} fillOpacity="0.85" />
      <Circle cx="8.5" cy="6.5" r="0.5" fill="#FFFFFF" />
      <Circle cx="9.5" cy="6.5" r="0.5" fill="#FFFFFF" />
      <Circle cx="14.5" cy="6.5" r="0.5" fill="#FFFFFF" />
      <Circle cx="15.5" cy="6.5" r="0.5" fill="#FFFFFF" />
    </IconWrapper>
  );
};

// 牙医 - Dental (牙齿)
export const DentalIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.dental;
  return (
    <IconWrapper size={size} colors={colors}>
      <Path d="M8 3c-2 0-3 2-3 4v6c0 2 1 5 2 7 1 2 2 2 2 2s1 0 2-2c1-2 1-3 1-4V8c0-2-1-5-4-5z" fill={colors.primary} fillOpacity="0.85" />
      <Path d="M16 3c2 0 3 2 3 4v6c0 2-1 5-2 7-1 2-2 2-2 2s-1 0-2-2c-1-2-1-3-1-4V8c0-2 1-5 4-5z" fill={colors.primary} fillOpacity="0.85" />
      <Path d="M10 8h4" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.5" />
      <Circle cx="9" cy="6" r="0.8" fill="#FFFFFF" opacity="0.7" />
      <Circle cx="15" cy="6" r="0.8" fill="#FFFFFF" opacity="0.7" />
      <Path d="M8 10v3M16 10v3" stroke={colors.accent} strokeWidth="1" />
    </IconWrapper>
  );
};

// 理发 - Haircut (剪刀)
export const HaircutIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.haircut;
  return (
    <IconWrapper size={size} colors={colors}>
      <Circle cx="6" cy="6" r="3" fill={colors.primary} fillOpacity="0.85" />
      <Circle cx="6" cy="18" r="3" fill={colors.primary} fillOpacity="0.85" />
      <Path d="M8.5 8.5l7 7M8.5 15.5l7-7" stroke={colors.secondary} strokeWidth="2" />
      <Circle cx="12" cy="12" r="1.5" fill={colors.accent} />
      <Path d="M15.5 8.5l5.5-5.5M15.5 15.5l5.5 5.5" stroke={colors.accent} strokeWidth="2" />
      <Circle cx="19" cy="5" r="1" fill={colors.accent} />
      <Circle cx="19" cy="19" r="1" fill={colors.accent} />
    </IconWrapper>
  );
};

// 水疗 - Spa (莲花)
export const SpaIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.spa;
  return (
    <IconWrapper size={size} colors={colors}>
      <Path d="M12 22c5-3 7-6 7-10a7 7 0 00-14 0c0 4 2 7 7 10z" fill={colors.primary} fillOpacity="0.85" />
      <Ellipse cx="8" cy="12" rx="2" ry="4" fill={colors.accent} fillOpacity="0.7" transform="rotate(-20 8 12)" />
      <Ellipse cx="16" cy="12" rx="2" ry="4" fill={colors.accent} fillOpacity="0.7" transform="rotate(20 16 12)" />
      <Ellipse cx="12" cy="10" rx="2" ry="4" fill={colors.secondary} fillOpacity="0.8" />
      <Circle cx="12" cy="12" r="1.5" fill="#FFFFFF" opacity="0.8" />
      <Path d="M9 16c1-1 2-1 3 0s2 1 3 0" stroke="#FFFFFF" strokeWidth="1" fill="none" opacity="0.6" />
    </IconWrapper>
  );
};

// 公交 - Bus (公交车)
export const BusIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.bus;
  return (
    <IconWrapper size={size} colors={colors}>
      <Rect x="4" y="4" width="16" height="14" rx="2" fill={colors.primary} fillOpacity="0.85" />
      <Rect x="6" y="7" width="12" height="6" rx="1" fill={colors.accent} fillOpacity="0.7" />
      <Path d="M4 14h16" stroke={colors.secondary} strokeWidth="1.5" />
      <Circle cx="8" cy="18" r="1.5" fill={colors.secondary} />
      <Circle cx="16" cy="18" r="1.5" fill={colors.secondary} />
      <Rect x="6" y="7" width="5" height="6" rx="0.5" fill="#FFFFFF" fillOpacity="0.3" />
      <Rect x="13" y="7" width="5" height="6" rx="0.5" fill="#FFFFFF" fillOpacity="0.3" />
      <Path d="M10 2h4v2h-4V2z" fill={colors.accent} fillOpacity="0.8" />
    </IconWrapper>
  );
};

// 火车 - Train (火车)
export const TrainIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.train;
  return (
    <IconWrapper size={size} colors={colors}>
      <Rect x="4" y="4" width="16" height="14" rx="2" fill={colors.primary} fillOpacity="0.85" />
      <Rect x="6" y="7" width="12" height="6" rx="1" fill={colors.accent} fillOpacity="0.7" />
      <Path d="M12 7v6" stroke={colors.secondary} strokeWidth="1.5" />
      <Circle cx="8" cy="16" r="1.5" fill={colors.secondary} />
      <Circle cx="16" cy="16" r="1.5" fill={colors.secondary} />
      <Path d="M4 18l-2 3M20 18l2 3" stroke={colors.secondary} strokeWidth="2" />
      <Rect x="10" y="2" width="4" height="2" rx="0.5" fill={colors.accent} fillOpacity="0.8" />
      <Circle cx="9" cy="10" r="0.8" fill="#FFFFFF" opacity="0.6" />
      <Circle cx="15" cy="10" r="0.8" fill="#FFFFFF" opacity="0.6" />
    </IconWrapper>
  );
};

// 骑车 - Bike (自行车)
export const BikeIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.bike;
  return (
    <IconWrapper size={size} colors={colors}>
      <Circle cx="6" cy="18" r="4" stroke={colors.primary} strokeWidth="2" fill="none" />
      <Circle cx="18" cy="18" r="4" stroke={colors.primary} strokeWidth="2" fill="none" />
      <Path d="M12 2l-2 6h4l2 4-4 2" stroke={colors.secondary} strokeWidth="2" fill="none" />
      <Circle cx="12" cy="8" r="1.5" fill={colors.accent} />
      <Path d="M6 18l6-6 6 6" stroke={colors.accent} strokeWidth="1.5" fill="none" />
      <Circle cx="6" cy="18" r="1.5" fill={colors.accent} />
      <Circle cx="18" cy="18" r="1.5" fill={colors.accent} />
    </IconWrapper>
  );
};

// 看电视 - TV (电视机)
export const TVIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.tv;
  return (
    <IconWrapper size={size} colors={colors}>
      <Rect x="2" y="7" width="20" height="14" rx="2" fill={colors.primary} fillOpacity="0.85" />
      <Rect x="4" y="9" width="16" height="10" rx="1" fill={colors.accent} fillOpacity="0.9" />
      <Path d="M8 3l4 4 4-4" stroke={colors.secondary} strokeWidth="2" fill="none" />
      <Circle cx="18" cy="18" r="0.8" fill={colors.secondary} />
      <Rect x="9" y="12" width="6" height="4" rx="0.5" fill="#FFFFFF" fillOpacity="0.3" />
      <Path d="M10 14l3 1.5-3 1.5V14z" fill="#FFFFFF" opacity="0.7" />
    </IconWrapper>
  );
};

// 音乐会 - Concert (麦克风)
export const ConcertIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.concert;
  return (
    <IconWrapper size={size} colors={colors}>
      <Rect x="9" y="2" width="6" height="10" rx="3" fill={colors.primary} fillOpacity="0.85" />
      <Path d="M12 12v4M8 16h8a2 2 0 012 2v2H6v-2a2 2 0 012-2z" fill={colors.secondary} fillOpacity="0.85" />
      <Path d="M12 20v2" stroke={colors.accent} strokeWidth="2" />
      <Rect x="10" y="4" width="1.5" height="6" rx="0.5" fill="#FFFFFF" fillOpacity="0.3" />
      <Rect x="12.5" y="4" width="1.5" height="6" rx="0.5" fill="#FFFFFF" fillOpacity="0.3" />
      <Path d="M6 8c0-1 1-2 1-3M18 8c0-1-1-2-1-3" stroke={colors.accent} strokeWidth="1.5" fill="none" />
    </IconWrapper>
  );
};

// 打扫 - Cleaning (扫帚)
export const CleaningIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.cleaning;
  return (
    <IconWrapper size={size} colors={colors}>
      <Path d="M12 2v8" stroke={colors.secondary} strokeWidth="2" />
      <Path d="M8 10h8l-1 12H9l-1-12z" fill={colors.primary} fillOpacity="0.85" />
      <Path d="M10 14v6M12 14v6M14 14v6" stroke={colors.accent} strokeWidth="1.5" opacity="0.7" />
      <Ellipse cx="12" cy="10" rx="4" ry="1" fill={colors.accent} fillOpacity="0.8" />
      <Circle cx="12" cy="3" r="1" fill={colors.accent} />
      <Path d="M9 16l6 0" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
    </IconWrapper>
  );
};

// 洗衣 - Laundry (洗衣机)
export const LaundryIcon = ({ size = 80, color }) => {
  const colors = ICON_COLORS.laundry;
  return (
    <IconWrapper size={size} colors={colors}>
      <Rect x="4" y="2" width="16" height="20" rx="2" fill={colors.primary} fillOpacity="0.85" />
      <Circle cx="12" cy="14" r="6" fill={colors.accent} fillOpacity="0.7" />
      <Circle cx="12" cy="14" r="4" stroke={colors.secondary} strokeWidth="1.5" fill="none" />
      <Circle cx="8" cy="5" r="1" fill={colors.accent} />
      <Circle cx="12" cy="5" r="1" fill={colors.accent} />
      <Circle cx="16" cy="5" r="1" fill={colors.secondary} />
      <Path d="M10 12c1-1 2-1 3 0M9 15c1.5-1 3-1 4.5 0" stroke="#FFFFFF" strokeWidth="1" fill="none" opacity="0.5" />
    </IconWrapper>
  );
};

// Icon registry
export const CATEGORY_ICONS = {
  life: LifeIcon,
  work: WorkIcon,
  love: LoveIcon,
  celebration: CelebrationIcon,
  birthday: BirthdayIcon,
  graduation: GraduationIcon,
  flight: FlightIcon,
  home: HomeIcon,
  fitness: FitnessIcon,
  study: StudyIcon,
  game: GameIcon,
  music: MusicIcon,
  eating: EatingIcon,
  coffee: CoffeeIcon,
  travel: TravelIcon,
  walk: WalkIcon,
  art: ArtIcon,
  phone: PhoneIcon,
  soccer: SoccerIcon,
  basketball: BasketballIcon,
  swimming: SwimmingIcon,
  reading: ReadingIcon,
  movie: MovieIcon,
  cooking: CookingIcon,
  drive: DriveIcon,
  hiking: HikingIcon,
  camping: CampingIcon,
  photography: PhotographyIcon,
  shopping: ShoppingIcon,
  pet: PetIcon,
  meditation: MeditationIcon,
  medical: MedicalIcon,
  meeting: MeetingIcon,
  running: RunningIcon,
  yoga: YogaIcon,
  bath: BathIcon,
  sleep: SleepIcon,
  breakfast: BreakfastIcon,
  lunch: LunchIcon,
  dinner: DinnerIcon,
  homework: HomeworkIcon,
  exam: ExamIcon,
  date: DateIcon,
  party: PartyIcon,
  friend: FriendIcon,
  dental: DentalIcon,
  haircut: HaircutIcon,
  spa: SpaIcon,
  bus: BusIcon,
  train: TrainIcon,
  bike: BikeIcon,
  tv: TVIcon,
  concert: ConcertIcon,
  cleaning: CleaningIcon,
  laundry: LaundryIcon,
};

// Icon metadata with enhanced labels - 按使用频率和重要性排序
export const CATEGORY_ICON_METADATA = [
  // 日常生活类（最常用）
  { key: 'life', label: '生活日常', icon: LifeIcon },
  { key: 'sleep', label: '睡觉休息', icon: SleepIcon },
  { key: 'bath', label: '洗澡沐浴', icon: BathIcon },
  { key: 'eating', label: '用餐聚餐', icon: EatingIcon },
  { key: 'breakfast', label: '吃早餐', icon: BreakfastIcon },
  { key: 'lunch', label: '吃午餐', icon: LunchIcon },
  { key: 'dinner', label: '吃晚餐', icon: DinnerIcon },
  { key: 'coffee', label: '咖啡下午茶', icon: CoffeeIcon },

  // 工作学习类
  { key: 'work', label: '工作办公', icon: WorkIcon },
  { key: 'meeting', label: '会议商谈', icon: MeetingIcon },
  { key: 'study', label: '学习进修', icon: StudyIcon },
  { key: 'reading', label: '阅读看书', icon: ReadingIcon },
  { key: 'homework', label: '做作业', icon: HomeworkIcon },
  { key: 'exam', label: '考试测验', icon: ExamIcon },

  // 社交情感类
  { key: 'love', label: '恋爱约会', icon: LoveIcon },
  { key: 'date', label: '浪漫约会', icon: DateIcon },
  { key: 'friend', label: '朋友聚会', icon: FriendIcon },
  { key: 'party', label: '派对聚会', icon: PartyIcon },
  { key: 'celebration', label: '庆祝节日', icon: CelebrationIcon },
  { key: 'birthday', label: '生日派对', icon: BirthdayIcon },
  { key: 'graduation', label: '毕业典礼', icon: GraduationIcon },

  // 运动健身类
  { key: 'fitness', label: '健身锻炼', icon: FitnessIcon },
  { key: 'running', label: '跑步训练', icon: RunningIcon },
  { key: 'yoga', label: '瑜伽冥想', icon: YogaIcon },
  { key: 'swimming', label: '游泳戏水', icon: SwimmingIcon },
  { key: 'soccer', label: '踢足球', icon: SoccerIcon },
  { key: 'basketball', label: '打篮球', icon: BasketballIcon },
  { key: 'walk', label: '散步遛弯', icon: WalkIcon },

  // 旅行交通类
  { key: 'travel', label: '旅行出游', icon: TravelIcon },
  { key: 'flight', label: '飞机航班', icon: FlightIcon },
  { key: 'drive', label: '开车自驾', icon: DriveIcon },
  { key: 'bus', label: '坐公交', icon: BusIcon },
  { key: 'train', label: '坐火车', icon: TrainIcon },
  { key: 'bike', label: '骑自行车', icon: BikeIcon },
  { key: 'hiking', label: '徒步登山', icon: HikingIcon },
  { key: 'camping', label: '露营野营', icon: CampingIcon },

  // 居家生活类
  { key: 'home', label: '居家休息', icon: HomeIcon },
  { key: 'cooking', label: '烹饪做饭', icon: CookingIcon },
  { key: 'cleaning', label: '打扫卫生', icon: CleaningIcon },
  { key: 'laundry', label: '洗衣服', icon: LaundryIcon },

  // 娱乐休闲类
  { key: 'game', label: '游戏娱乐', icon: GameIcon },
  { key: 'music', label: '听音乐', icon: MusicIcon },
  { key: 'movie', label: '看电影', icon: MovieIcon },
  { key: 'tv', label: '看电视', icon: TVIcon },
  { key: 'concert', label: '音乐会', icon: ConcertIcon },
  { key: 'art', label: '艺术创作', icon: ArtIcon },
  { key: 'photography', label: '摄影拍照', icon: PhotographyIcon },
  { key: 'phone', label: '玩手机', icon: PhoneIcon },

  // 健康美容类
  { key: 'medical', label: '医疗健康', icon: MedicalIcon },
  { key: 'dental', label: '看牙医', icon: DentalIcon },
  { key: 'haircut', label: '理发美发', icon: HaircutIcon },
  { key: 'spa', label: '水疗按摩', icon: SpaIcon },
  { key: 'meditation', label: '冥想放松', icon: MeditationIcon },

  // 其他活动类
  { key: 'shopping', label: '购物消费', icon: ShoppingIcon },
  { key: 'pet', label: '宠物陪伴', icon: PetIcon },
];

export const getIconComponent = (key) => {
  return CATEGORY_ICONS[key] || LifeIcon;
};

export const getIconColor = (key) => {
  const iconColors = ICON_COLORS[key];
  return iconColors ? iconColors.primary : ICON_COLORS.life.primary;
};

export const getIconColors = (key) => {
  return ICON_COLORS[key] || ICON_COLORS.life;
};
