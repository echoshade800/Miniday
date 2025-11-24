import React from 'react';
import Svg, { Path, Circle, Rect, G, Line, Polygon, Ellipse } from 'react-native-svg';

/**
 * Category Icons - Premium Transparent Style
 * 高级透明风格图标，符合APP主色调
 * - 透明背景
 * - 粗线条（2.5px 描边）
 * - 使用APP主色调（Teal #2BA29A）及其配色
 * - 精致、现代的视觉效果
 */

// 图标颜色配置 - 符合APP主色调的透明背景设计
const ICON_COLORS = {
  life: '#2BA29A',        // Teal - 生活
  work: '#1D6F6A',        // Dark Teal - 工作
  love: '#FF6B9D',        // Soft Pink - 爱情
  celebration: '#FB923C', // Orange - 庆祝
  birthday: '#C084FC',    // Lavender - 生日
  graduation: '#2BA29A',  // Teal - 毕业
  flight: '#60A5FA',      // Sky Blue - 飞机
  home: '#34D399',        // Emerald - 居家
  fitness: '#F87171',     // Coral - 健身
  study: '#818CF8',       // Indigo - 学习
  game: '#FBBF24',        // Amber - 游戏
  music: '#C084FC',       // Lavender - 音乐
  eating: '#FB923C',      // Orange - 吃饭
  pizza: '#FBBF24',       // Amber - 披萨
  coffee: '#A78BFA',      // Purple - 咖啡
  toilet: '#64748B',      // Slate - 厕所
  travel: '#2BA29A',      // Teal - 游玩
  moon: '#818CF8',        // Indigo - 赏月
  walk: '#34D399',        // Emerald - 散步
  picnic: '#FB923C',      // Orange - 野炊
  thinking: '#A78BFA',    // Purple - 思考
  art: '#FF6B9D',         // Soft Pink - 画画
  phone: '#60A5FA',       // Sky Blue - 手机
  soccer: '#34D399',      // Emerald - 足球
  basketball: '#F87171',  // Coral - 篮球
  archery: '#FBBF24',     // Amber - 射箭
  swimming: '#60A5FA',    // Sky Blue - 游泳
  flower: '#FF6B9D',      // Soft Pink - 赏花
};

// 扁平风格图标包装器 - 透明背景
const FlatIconWrapper = ({ children, size = 80, bgColor = 'transparent', iconColor, strokeWidth = 2.5 }) => {
  // 计算缩放比例，使图标内容适应不同尺寸
  const scale = size / 80;
  const iconSize = 28 * scale; // 增大图标内容区域以获得更好的视觉效果

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* 图标内容 - 居中显示 */}
      <G
        transform={`translate(${(size - iconSize) / 2}, ${(size - iconSize) / 2}) scale(${iconSize / 24})`}
        stroke={iconColor || '#2BA29A'}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={iconColor || '#2BA29A'}>
        {children}
      </G>
    </Svg>
  );
};

// 生活 - Life (房子)
export const LifeIcon = ({ size = 80, color }) => {
  const iconColor = color || ICON_COLORS.life;
  return (
    <FlatIconWrapper size={size} iconColor={iconColor}>
      <Path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" fill="none" />
      <Rect x="9" y="14" width="6" height="7" fill={iconColor} fillOpacity="0.8" />
      <Circle cx="7" cy="10" r="1.5" fill={iconColor} fillOpacity="0.9" />
      <Circle cx="17" cy="10" r="1.5" fill={iconColor} fillOpacity="0.9" />
    </FlatIconWrapper>
  );
};

// 工作 - Work (公文包)
export const WorkIcon = ({ size = 80, color }) => {
  const iconColor = color || ICON_COLORS.work;
  return (
    <FlatIconWrapper size={size} iconColor={iconColor}>
      <Rect x="3" y="7" width="18" height="14" rx="2" fill={iconColor} fillOpacity="0.8" />
      <Path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" fill="none" />
      <Rect x="6" y="11" width="12" height="2" rx="1" fill="#FFFFFF" fillOpacity="0.9" />
      <Rect x="6" y="15" width="8" height="1.5" rx="0.5" fill="#FFFFFF" fillOpacity="0.9" />
    </FlatIconWrapper>
  );
};

// 爱情 - Love (爱心)
export const LoveIcon = ({ size = 80, color }) => {
  const iconColor = color || ICON_COLORS.love;
  return (
    <FlatIconWrapper size={size} iconColor={iconColor}>
      <Path 
        d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" 
        fill={iconColor} 
        fillOpacity="0.9" 
      />
      <Circle cx="10" cy="8" r="1.5" fill="#FFFFFF" fillOpacity="0.8" />
      <Circle cx="14" cy="8" r="1.5" fill="#FFFFFF" fillOpacity="0.8" />
    </FlatIconWrapper>
  );
};

// 庆祝节日 - Celebration (派对)
export const CelebrationIcon = ({ size = 80, color }) => {
  const iconColor = color || ICON_COLORS.celebration;
  return (
    <FlatIconWrapper size={size} iconColor={iconColor}>
      <Path d="M12 2v4m0 0l-2-2m2 2l2-2" fill="none" />
      <Path d="M8 8l-2 2 2 2 2-2-2-2z" fill={iconColor} fillOpacity="0.9" />
      <Path d="M16 8l-2 2 2 2 2-2-2-2z" fill={iconColor} fillOpacity="0.9" />
      <Path d="M12 10v8" fill="none" />
      <Circle cx="8" cy="16" r="2" fill={iconColor} fillOpacity="0.9" />
      <Circle cx="12" cy="18" r="2" fill={iconColor} fillOpacity="0.9" />
      <Circle cx="16" cy="16" r="2" fill={iconColor} fillOpacity="0.9" />
    </FlatIconWrapper>
  );
};

// 生日 - Birthday (蛋糕)
export const BirthdayIcon = ({ size = 80, color }) => {
  const iconColor = color || ICON_COLORS.birthday;
  return (
    <FlatIconWrapper size={size} iconColor={iconColor}>
      <Path d="M6 8h12v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8z" fill={iconColor} fillOpacity="0.9" />
      <Path d="M12 2v6m0 0l-2-2m2 2l2-2" fill="none" />
      <Path d="M8 10v2m4-2v2m4-2v2" fill="none" />
      <Circle cx="8" cy="11" r="0.5" fill="#FFFFFF" />
      <Circle cx="12" cy="11" r="0.5" fill="#FFFFFF" />
      <Circle cx="16" cy="11" r="0.5" fill="#FFFFFF" />
      <Rect x="7" y="14" width="10" height="2" rx="1" fill="#FFFFFF" fillOpacity="0.9" />
    </FlatIconWrapper>
  );
};

// 毕业 - Graduation (毕业帽)
export const GraduationIcon = ({ size = 80, color }) => {
  const iconColor = color || ICON_COLORS.graduation;
  return (
    <FlatIconWrapper size={size} iconColor={iconColor}>
      <Path d="M22 10l-10-5L2 10l10 5 10-5z" fill={iconColor} fillOpacity="0.9" />
      <Path d="M6 12v5c0 1.1.9 2 2 2h1a2 2 0 002-2v-5" fill="none" />
      <Path d="M18 12v5c0 1.1-.9 2-2 2h-1a2 2 0 01-2-2v-5" fill="none" />
      <Circle cx="12" cy="10" r="1" fill="#FFFFFF" />
      <Path d="M12 15v2" fill="none" />
      <Circle cx="12" cy="18" r="1" fill={iconColor} fillOpacity="0.9" />
      <Rect x="16" y="14" width="4" height="6" rx="1" fill={iconColor} fillOpacity="0.7" />
    </FlatIconWrapper>
  );
};

// 飞机航班 - Flight (飞机)
export const FlightIcon = ({ size = 80, color }) => {
  const iconColor = color || ICON_COLORS.flight;
  return (
    <FlatIconWrapper size={size} iconColor={iconColor}>
      <Path 
        d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" 
        fill={iconColor} 
        fillOpacity="0.9" 
      />
      <Circle cx="13" cy="11" r="1" fill="#FFFFFF" />
      <Circle cx="15" cy="11" r="1" fill="#FFFFFF" />
      <Circle cx="17" cy="11" r="1" fill="#FFFFFF" />
    </FlatIconWrapper>
  );
};

// 居家 - Home (房子)
export const HomeIcon = ({ size = 80, color }) => {
  const iconColor = color || ICON_COLORS.home;
  return (
    <FlatIconWrapper size={size} iconColor={iconColor}>
      <Path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" fill="none" />
      <Rect x="9" y="14" width="6" height="7" fill={iconColor} fillOpacity="0.8" />
      <Circle cx="10.5" cy="17.5" r="0.5" fill="#FFFFFF" />
    </FlatIconWrapper>
  );
};

// 健身 - Fitness (哑铃)
export const FitnessIcon = ({ size = 80, color }) => {
  const iconColor = color || ICON_COLORS.fitness;
  return (
    <FlatIconWrapper size={size} iconColor={iconColor}>
      <Rect x="6.5" y="6.5" width="11" height="11" rx="1" fill={iconColor} fillOpacity="0.9" />
      <Path d="M3 9l3.5-2.5v11L3 15V9z" fill={iconColor} fillOpacity="0.9" />
      <Path d="M21 9l-3.5-2.5v11L21 15V9z" fill={iconColor} fillOpacity="0.9" />
      <Rect x="2" y="8" width="2" height="8" rx="1" fill={iconColor} fillOpacity="0.9" />
      <Rect x="20" y="8" width="2" height="8" rx="1" fill={iconColor} fillOpacity="0.9" />
      <Line x1="12" y1="7" x2="12" y2="17" fill="none" />
    </FlatIconWrapper>
  );
};

// 学习 - Study (书本)
export const StudyIcon = ({ size = 80, color }) => {
  const iconColor = color || ICON_COLORS.study;
  return (
    <FlatIconWrapper size={size} iconColor={iconColor}>
      <Path d="M4 19.5A2.5 2.5 0 016.5 17H20" fill="none" />
      <Path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" fill={iconColor} fillOpacity="0.9" />
      <Path d="M8 7h8M8 11h8M8 15h4" fill="none" />
      <Line x1="6.5" y1="6" x2="6.5" y2="18" fill="none" />
      <Circle cx="10" cy="7" r="0.5" fill="#FFFFFF" />
      <Circle cx="10" cy="11" r="0.5" fill="#FFFFFF" />
    </FlatIconWrapper>
  );
};

// 游戏 - Game (游戏手柄)
export const GameIcon = ({ size = 80, color }) => {
  const iconColor = color || ICON_COLORS.game;
  return (
    <FlatIconWrapper size={size} iconColor={iconColor}>
      <Rect x="4" y="6" width="16" height="12" rx="2" fill={iconColor} fillOpacity="0.9" />
      <Path d="M6 12h4m-2-2v4" fill="none" />
      <Circle cx="15" cy="11" r="1" fill="#FFFFFF" />
      <Circle cx="18" cy="13" r="1" fill="#FFFFFF" />
      <Circle cx="12" cy="12" r="1.5" fill="#FFFFFF" />
      <Rect x="8" y="8" width="8" height="1" rx="0.5" fill="#FFFFFF" fillOpacity="0.9" />
    </FlatIconWrapper>
  );
};

// 听音乐 - Music (耳机)
export const MusicIcon = ({ size = 80, color }) => {
  const iconColor = color || ICON_COLORS.music;
  return (
    <FlatIconWrapper size={size} iconColor={iconColor}>
      <Path d="M9 18V5l12-2v13" fill={iconColor} fillOpacity="0.9" />
      <Circle cx="6" cy="18" r="3" fill={iconColor} fillOpacity="0.9" />
      <Circle cx="18" cy="16" r="3" fill={iconColor} fillOpacity="0.9" />
      <Line x1="9" y1="5" x2="9" y2="18" fill="none" />
      <Line x1="21" y1="3" x2="21" y2="16" fill="none" />
      <Circle cx="6" cy="18" r="1.5" fill="#FFFFFF" />
      <Circle cx="18" cy="16" r="1.5" fill="#FFFFFF" />
    </FlatIconWrapper>
  );
};

// 吃饭 - Eating (餐具)
export const EatingIcon = ({ size = 80, color }) => {
  const iconColor = color || ICON_COLORS.eating;
  return (
    <FlatIconWrapper size={size} iconColor={iconColor}>
      <Path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" fill={iconColor} fillOpacity="0.9" />
      <Path d="M7 2v20" fill="none" />
      <Path d="M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3z" fill={iconColor} fillOpacity="0.9" />
      <Path d="M21 15v7" fill="none" />
      <Ellipse cx="12" cy="20" rx="6" ry="1.5" fill={iconColor} fillOpacity="0.7" />
      <Circle cx="5" cy="6" r="1" fill="#FFFFFF" />
      <Circle cx="19" cy="8" r="1" fill="#FFFFFF" />
    </FlatIconWrapper>
  );
};

// 吃披萨 - Pizza (披萨)
export const PizzaIcon = ({ size = 80, color }) => {
  const iconColor = color || ICON_COLORS.pizza;
  return (
    <FlatIconWrapper size={size} iconColor={iconColor}>
      <Path d="M12 2L2 7l10 5 10-5-10-5z" fill={iconColor} fillOpacity="0.9" />
      <Path d="M2 17l10 5 10-5M2 12l10 5 10-5" fill="none" />
      <Circle cx="7" cy="9" r="1.5" fill="#FFFFFF" />
      <Circle cx="12" cy="12" r="1.5" fill="#FFFFFF" />
      <Circle cx="17" cy="9" r="1.5" fill="#FFFFFF" />
      <Circle cx="9" cy="14" r="1" fill="#FFFFFF" />
      <Circle cx="15" cy="14" r="1" fill="#FFFFFF" />
    </FlatIconWrapper>
  );
};

// 喝咖啡 - Coffee (咖啡杯)
export const CoffeeIcon = ({ size = 80, color }) => {
  const iconColor = color || ICON_COLORS.coffee;
  return (
    <FlatIconWrapper size={size} iconColor={iconColor}>
      <Path d="M2 8h16v9a2 2 0 01-2 2H4a2 2 0 01-2-2V8z" fill={iconColor} fillOpacity="0.9" />
      <Path d="M18 8h1a4 4 0 010 8h-1" fill="none" />
      <Line x1="6" y1="1" x2="6" y2="4" fill="none" />
      <Line x1="10" y1="1" x2="10" y2="4" fill="none" />
      <Line x1="14" y1="1" x2="14" y2="4" fill="none" />
      <Ellipse cx="10" cy="12" rx="2" ry="1" fill="#FFFFFF" fillOpacity="0.9" />
    </FlatIconWrapper>
  );
};

// 上厕所 - Toilet (马桶)
export const ToiletIcon = ({ size = 80, color }) => {
  const iconColor = color || ICON_COLORS.toilet;
  return (
    <FlatIconWrapper size={size} iconColor={iconColor}>
      <Rect x="9" y="2" width="6" height="4" rx="1" fill={iconColor} fillOpacity="0.9" />
      <Path d="M6 6h12v14a2 2 0 01-2 2H8a2 2 0 01-2-2V6z" fill={iconColor} fillOpacity="0.9" />
      <Path d="M8 10h8M8 14h8" fill="none" />
      <Ellipse cx="12" cy="18" rx="4" ry="1.5" fill={iconColor} fillOpacity="0.7" />
      <Circle cx="10" cy="12" r="0.5" fill="#FFFFFF" />
      <Circle cx="14" cy="12" r="0.5" fill="#FFFFFF" />
    </FlatIconWrapper>
  );
};

// 游玩 - Travel (指南针)
export const TravelIcon = ({ size = 80, color }) => {
  const iconColor = color || ICON_COLORS.travel;
  return (
    <FlatIconWrapper size={size} iconColor={iconColor}>
      <Circle cx="12" cy="12" r="10" fill={iconColor} fillOpacity="0.9" />
      <Circle cx="12" cy="12" r="8" fill="none" />
      <Path d="M12 6v6l4 2" fill="none" />
      <Line x1="12" y1="2" x2="12" y2="4" fill="none" />
      <Line x1="12" y1="20" x2="12" y2="22" fill="none" />
      <Line x1="2" y1="12" x2="4" y2="12" fill="none" />
      <Line x1="20" y1="12" x2="22" y2="12" fill="none" />
      <Circle cx="12" cy="12" r="2" fill="#FFFFFF" />
    </FlatIconWrapper>
  );
};

// 赏月 - Moon (月亮)
export const MoonIcon = ({ size = 80, color }) => {
  const iconColor = color || ICON_COLORS.moon;
  return (
    <FlatIconWrapper size={size} iconColor={iconColor}>
      <Path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill={iconColor} fillOpacity="0.9" />
      <Circle cx="18" cy="6" r="1" fill="#FFFFFF" />
      <Circle cx="20" cy="9" r="0.8" fill="#FFFFFF" />
      <Circle cx="17" cy="9" r="0.6" fill="#FFFFFF" />
    </FlatIconWrapper>
  );
};

// 散步 - Walk (脚印)
export const WalkIcon = ({ size = 80, color }) => {
  const iconColor = color || ICON_COLORS.walk;
  return (
    <FlatIconWrapper size={size} iconColor={iconColor}>
      <Path d="M4 18c1-1 1.5-2.5 1.5-4 0-1.5-.5-3-1.5-4" fill={iconColor} fillOpacity="0.9" />
      <Path d="M8 14c1-1 1.5-2.5 1.5-4 0-1.5-.5-3-1.5-4" fill={iconColor} fillOpacity="0.9" />
      <Path d="M12 10c1-1 1.5-2.5 1.5-4 0-1.5-.5-3-1.5-4" fill={iconColor} fillOpacity="0.9" />
      <Path d="M16 14c1-1 1.5-2.5 1.5-4 0-1.5-.5-3-1.5-4" fill={iconColor} fillOpacity="0.9" />
      <Path d="M20 18c1-1 1.5-2.5 1.5-4 0-1.5-.5-3-1.5-4" fill={iconColor} fillOpacity="0.9" />
      <Circle cx="5" cy="16" r="1" fill="#FFFFFF" />
      <Circle cx="9" cy="12" r="1" fill="#FFFFFF" />
      <Circle cx="13" cy="8" r="1" fill="#FFFFFF" />
      <Circle cx="17" cy="12" r="1" fill="#FFFFFF" />
      <Circle cx="21" cy="16" r="1" fill="#FFFFFF" />
    </FlatIconWrapper>
  );
};

// 野炊 - Picnic (篝火)
export const PicnicIcon = ({ size = 80, color }) => {
  const iconColor = color || ICON_COLORS.picnic;
  return (
    <FlatIconWrapper size={size} iconColor={iconColor}>
      <Path d="M12 2v4" fill="none" />
      <Path d="M8 6h8" fill="none" />
      <Path d="M10 10l-2 8h8l-2-8" fill={iconColor} fillOpacity="0.9" />
      <Path d="M12 10v8" fill="none" />
      <Path d="M9 14h6" fill="none" />
      <Circle cx="10" cy="12" r="1" fill="#FFFFFF" />
      <Circle cx="14" cy="12" r="1" fill="#FFFFFF" />
    </FlatIconWrapper>
  );
};

// 思考 - Thinking (灯泡)
export const ThinkingIcon = ({ size = 80, color }) => {
  const iconColor = color || ICON_COLORS.thinking;
  return (
    <FlatIconWrapper size={size} iconColor={iconColor}>
      <Path d="M12 3a6 6 0 016 6c0 2.5-1.5 4.5-3.5 6H9.5C7.5 13.5 6 11.5 6 9a6 6 0 016-6z" fill={iconColor} fillOpacity="0.9" />
      <Path d="M9 21h6" fill="none" />
      <Path d="M12 11v2" fill="none" />
      <Path d="M10 9h4" fill="none" />
      <Circle cx="12" cy="9" r="1" fill="#FFFFFF" />
    </FlatIconWrapper>
  );
};

// 画画 - Art (调色板)
export const ArtIcon = ({ size = 80, color }) => {
  const iconColor = color || ICON_COLORS.art;
  return (
    <FlatIconWrapper size={size} iconColor={iconColor}>
      <Path 
        d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" 
        fill={iconColor} 
        fillOpacity="0.9" 
      />
      <Circle cx="13.5" cy="6.5" r="2" fill="#FFFFFF" />
      <Circle cx="17.5" cy="10.5" r="2" fill="#FFFFFF" />
      <Circle cx="8.5" cy="7.5" r="2" fill="#FFFFFF" />
      <Circle cx="6.5" cy="12.5" r="2" fill="#FFFFFF" />
    </FlatIconWrapper>
  );
};

// 玩手机 - Phone (手机)
export const PhoneIcon = ({ size = 80, color }) => {
  const iconColor = color || ICON_COLORS.phone;
  return (
    <FlatIconWrapper size={size} iconColor={iconColor}>
      <Rect x="5" y="2" width="14" height="20" rx="2" fill={iconColor} fillOpacity="0.9" />
      <Rect x="7" y="5" width="10" height="12" rx="1" fill="#FFFFFF" fillOpacity="0.9" />
      <Line x1="12" y1="18" x2="12.01" y2="18" fill="none" />
      <Rect x="9" y="5" width="6" height="1" rx="0.5" fill={iconColor} fillOpacity="0.7" />
      <Circle cx="10" cy="11" r="1" fill={iconColor} fillOpacity="0.5" />
      <Circle cx="14" cy="11" r="1" fill={iconColor} fillOpacity="0.5" />
      <Rect x="10" y="13" width="4" height="2" rx="1" fill={iconColor} fillOpacity="0.5" />
    </FlatIconWrapper>
  );
};

// 踢足球 - Soccer (足球)
export const SoccerIcon = ({ size = 80, color }) => {
  const iconColor = color || ICON_COLORS.soccer;
  return (
    <FlatIconWrapper size={size} iconColor={iconColor}>
      <Circle cx="12" cy="12" r="10" fill={iconColor} fillOpacity="0.9" />
      <Path 
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
        fill="#FFFFFF" 
        fillOpacity="0.3" 
      />
      <Polygon 
        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" 
        fill="none" 
      />
      <Circle cx="12" cy="12" r="2" fill="#FFFFFF" />
    </FlatIconWrapper>
  );
};

// 打篮球 - Basketball (篮球)
export const BasketballIcon = ({ size = 80, color }) => {
  const iconColor = color || ICON_COLORS.basketball;
  return (
    <FlatIconWrapper size={size} iconColor={iconColor}>
      <Circle cx="12" cy="12" r="10" fill={iconColor} fillOpacity="0.9" />
      <Path 
        d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10M12 2a15.3 15.3 0 00-4 10 15.3 15.3 0 004 10" 
        fill="none" 
      />
      <Line x1="2" y1="12" x2="22" y2="12" fill="none" />
      <Circle cx="12" cy="12" r="2" fill="#FFFFFF" />
    </FlatIconWrapper>
  );
};

// 射箭 - Archery (靶心)
export const ArcheryIcon = ({ size = 80, color }) => {
  const iconColor = color || ICON_COLORS.archery;
  return (
    <FlatIconWrapper size={size} iconColor={iconColor}>
      <Circle cx="12" cy="12" r="10" fill={iconColor} fillOpacity="0.9" />
      <Circle cx="12" cy="12" r="7" fill="#FFFFFF" fillOpacity="0.5" />
      <Circle cx="12" cy="12" r="4" fill={iconColor} fillOpacity="0.7" />
      <Circle cx="12" cy="12" r="2" fill="#FFFFFF" />
      <Path d="M12 2v4M12 18v4M2 12h4M18 12h4" fill="none" />
      <Circle cx="12" cy="12" r="1" fill={iconColor} />
    </FlatIconWrapper>
  );
};

// 游泳 - Swimming (波浪)
export const SwimmingIcon = ({ size = 80, color }) => {
  const iconColor = color || ICON_COLORS.swimming;
  return (
    <FlatIconWrapper size={size} iconColor={iconColor}>
      <Path d="M2 12c2-2 6-2 8 0s6 2 8 0" fill={iconColor} fillOpacity="0.9" />
      <Path d="M2 16c2-2 6-2 8 0s6 2 8 0" fill={iconColor} fillOpacity="0.9" />
      <Path d="M2 20c2-2 6-2 8 0s6 2 8 0" fill={iconColor} fillOpacity="0.9" />
      <Circle cx="8" cy="14" r="2" fill="#FFFFFF" />
      <Circle cx="16" cy="18" r="2" fill="#FFFFFF" />
    </FlatIconWrapper>
  );
};

// 赏花 - Flower (花朵)
export const FlowerIcon = ({ size = 80, color }) => {
  const iconColor = color || ICON_COLORS.flower;
  return (
    <FlatIconWrapper size={size} iconColor={iconColor}>
      <Circle cx="12" cy="12" r="3" fill={iconColor} fillOpacity="0.9" />
      <Path d="M12 2v4M12 18v4M2 12h4M18 12h4" fill="none" />
      <Path d="M5.64 5.64l2.83 2.83M15.53 15.53l2.83 2.83M5.64 18.36l2.83-2.83M15.53 8.47l2.83-2.83" fill="none" />
      <Ellipse cx="12" cy="6" rx="2" ry="3" fill={iconColor} fillOpacity="0.9" />
      <Ellipse cx="12" cy="18" rx="2" ry="3" fill={iconColor} fillOpacity="0.9" />
      <Ellipse cx="6" cy="12" rx="3" ry="2" fill={iconColor} fillOpacity="0.9" />
      <Ellipse cx="18" cy="12" rx="3" ry="2" fill={iconColor} fillOpacity="0.9" />
      <Circle cx="12" cy="12" r="1.5" fill="#FFFFFF" />
    </FlatIconWrapper>
  );
};

// Icon registry - maps icon keys to components
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
  pizza: PizzaIcon,
  coffee: CoffeeIcon,
  toilet: ToiletIcon,
  travel: TravelIcon,
  moon: MoonIcon,
  walk: WalkIcon,
  picnic: PicnicIcon,
  thinking: ThinkingIcon,
  art: ArtIcon,
  phone: PhoneIcon,
  soccer: SoccerIcon,
  basketball: BasketballIcon,
  archery: ArcheryIcon,
  swimming: SwimmingIcon,
  flower: FlowerIcon,
};

// Icon metadata with labels
export const CATEGORY_ICON_METADATA = [
  { key: 'life', label: '生活', icon: LifeIcon },
  { key: 'work', label: '工作', icon: WorkIcon },
  { key: 'love', label: '爱情', icon: LoveIcon },
  { key: 'celebration', label: '庆祝节日', icon: CelebrationIcon },
  { key: 'birthday', label: '生日', icon: BirthdayIcon },
  { key: 'graduation', label: '毕业', icon: GraduationIcon },
  { key: 'flight', label: '飞机航班', icon: FlightIcon },
  { key: 'home', label: '居家', icon: HomeIcon },
  { key: 'fitness', label: '健身', icon: FitnessIcon },
  { key: 'study', label: '学习', icon: StudyIcon },
  { key: 'game', label: '游戏', icon: GameIcon },
  { key: 'music', label: '听音乐', icon: MusicIcon },
  { key: 'eating', label: '吃饭', icon: EatingIcon },
  { key: 'pizza', label: '吃披萨', icon: PizzaIcon },
  { key: 'coffee', label: '喝咖啡', icon: CoffeeIcon },
  { key: 'toilet', label: '上厕所', icon: ToiletIcon },
  { key: 'travel', label: '游玩', icon: TravelIcon },
  { key: 'moon', label: '赏月', icon: MoonIcon },
  { key: 'walk', label: '散步', icon: WalkIcon },
  { key: 'picnic', label: '野炊', icon: PicnicIcon },
  { key: 'thinking', label: '思考', icon: ThinkingIcon },
  { key: 'art', label: '画画', icon: ArtIcon },
  { key: 'phone', label: '玩手机', icon: PhoneIcon },
  { key: 'soccer', label: '踢足球', icon: SoccerIcon },
  { key: 'basketball', label: '打篮球', icon: BasketballIcon },
  { key: 'archery', label: '射箭', icon: ArcheryIcon },
  { key: 'swimming', label: '游泳', icon: SwimmingIcon },
  { key: 'flower', label: '赏花', icon: FlowerIcon },
];

// Helper to get icon component by key
export const getIconComponent = (key) => {
  return CATEGORY_ICONS[key] || LifeIcon;
};

// Helper to get icon color by key
export const getIconColor = (key) => {
  return ICON_COLORS[key] || ICON_COLORS.life;
};
