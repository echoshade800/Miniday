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
};

// Icon metadata with enhanced labels
export const CATEGORY_ICON_METADATA = [
  { key: 'life', label: '生活日常', icon: LifeIcon },
  { key: 'work', label: '工作办公', icon: WorkIcon },
  { key: 'meeting', label: '会议商谈', icon: MeetingIcon },
  { key: 'study', label: '学习进修', icon: StudyIcon },
  { key: 'reading', label: '阅读看书', icon: ReadingIcon },

  { key: 'love', label: '恋爱约会', icon: LoveIcon },
  { key: 'celebration', label: '庆祝节日', icon: CelebrationIcon },
  { key: 'birthday', label: '生日派对', icon: BirthdayIcon },
  { key: 'graduation', label: '毕业典礼', icon: GraduationIcon },

  { key: 'fitness', label: '健身锻炼', icon: FitnessIcon },
  { key: 'running', label: '跑步训练', icon: RunningIcon },
  { key: 'yoga', label: '瑜伽冥想', icon: YogaIcon },
  { key: 'swimming', label: '游泳戏水', icon: SwimmingIcon },
  { key: 'soccer', label: '踢足球', icon: SoccerIcon },
  { key: 'basketball', label: '打篮球', icon: BasketballIcon },

  { key: 'travel', label: '旅行出游', icon: TravelIcon },
  { key: 'flight', label: '飞机航班', icon: FlightIcon },
  { key: 'drive', label: '开车自驾', icon: DriveIcon },
  { key: 'hiking', label: '徒步登山', icon: HikingIcon },
  { key: 'camping', label: '露营野营', icon: CampingIcon },
  { key: 'walk', label: '散步遛弯', icon: WalkIcon },

  { key: 'home', label: '居家休息', icon: HomeIcon },
  { key: 'cooking', label: '烹饪做饭', icon: CookingIcon },
  { key: 'eating', label: '用餐聚餐', icon: EatingIcon },
  { key: 'coffee', label: '咖啡下午茶', icon: CoffeeIcon },

  { key: 'game', label: '游戏娱乐', icon: GameIcon },
  { key: 'music', label: '听音乐', icon: MusicIcon },
  { key: 'movie', label: '看电影', icon: MovieIcon },
  { key: 'art', label: '艺术创作', icon: ArtIcon },
  { key: 'photography', label: '摄影拍照', icon: PhotographyIcon },
  { key: 'phone', label: '玩手机', icon: PhoneIcon },

  { key: 'shopping', label: '购物消费', icon: ShoppingIcon },
  { key: 'pet', label: '宠物陪伴', icon: PetIcon },
  { key: 'meditation', label: '冥想放松', icon: MeditationIcon },
  { key: 'medical', label: '医疗健康', icon: MedicalIcon },
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
