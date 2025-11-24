import { Image } from 'react-native';
import { getIconImage, hasIconImage } from '../assets/icons/iconMapping';

/**
 * Category icon definitions sourced from the light-green PNG sprite sheet.
 * Each icon stays monochrome so we can tint it with the MiniDays pastel green palette.
 */

const DEFAULT_ICON_SIZE = 32;
const LIGHT_GREEN_PALETTE = [
  '#C8F4E3',
  '#BDF1DD',
  '#B2EFD7',
  '#A7ECD1',
  '#9DE9CB',
  '#92E7C5',
  '#87E4BF',
  '#7CE1B9',
  '#71DFB3',
  '#66DCAE',
  '#5BD9A8',
  '#51D6A2',
  '#46D49C',
  '#3BD196',
  '#30CE90',
  '#25CC8A',
  '#1AC984',
  '#0FC67E',
  '#04C478',
  '#00C173',
  '#00BC6D',
  '#00B667',
  '#00B161',
  '#00AB5B',
];

const ICON_CONFIGS = [
  { key: 'life', label: '生活', accentColor: '#FFC857' },
  { key: 'work', label: '工作', accentColor: '#FF9F1C' },
  { key: 'love', label: '爱情', accentColor: '#FF5D8F' },
  { key: 'celebration', label: '庆祝 / 节日', accentColor: '#8A63FF' },
  { key: 'birthday', label: '生日', accentColor: '#FF8CC0' },
  { key: 'graduation', label: '毕业', accentColor: '#2D3047' },
  { key: 'flight', label: '飞机航班', accentColor: '#4CC9F0' },
  { key: 'travel', label: '游玩', accentColor: '#00B4D8' },
  { key: 'home', label: '居家', accentColor: '#FF7F11' },
  { key: 'fitness', label: '健身', accentColor: '#4CAF50' },
  { key: 'study', label: '学习', accentColor: '#F3722C' },
  { key: 'game', label: '游戏', accentColor: '#2EC4B6' },
  { key: 'music', label: '听音乐', accentColor: '#7B5CFB' },
  { key: 'eating', label: '吃饭', accentColor: '#FFD166' },
  { key: 'pizza', label: '吃披萨', accentColor: '#F4A261' },
  { key: 'coffee', label: '喝咖啡', accentColor: '#B56576' },
  { key: 'toilet', label: '上厕所', accentColor: '#A3CEF1' },
  { key: 'moon', label: '赏月', accentColor: '#FFD166' },
  { key: 'walk', label: '散步', accentColor: '#A7C957' },
  { key: 'picnic', label: '野炊', accentColor: '#F4A259' },
  { key: 'flower', label: '赏花', accentColor: '#FF99C8' },
  { key: 'thinking', label: '思考', accentColor: '#FFDDD2' },
  { key: 'art', label: '画画', accentColor: '#F4E285' },
  { key: 'phone', label: '玩手机', accentColor: '#1F7A8C' },
  { key: 'soccer', label: '踢足球', accentColor: '#1B1B1F' },
  { key: 'basketball', label: '打篮球', accentColor: '#F28482' },
  { key: 'archery', label: '射箭', accentColor: '#FF5D8F' },
  { key: 'swimming', label: '游泳', accentColor: '#00BBF9' },
];

const createPngIcon = (iconKey) => {
  const source = getIconImage(iconKey);

  const PngIcon = ({ size = DEFAULT_ICON_SIZE }) => {
    if (!source) {
      return null;
    }
    return (
      <Image
        source={source}
        resizeMode="contain"
        style={{
          width: size,
          height: size,
        }}
      />
    );
  };

  PngIcon.displayName = `${iconKey}-png-icon`;
  return PngIcon;
};

const ICON_LIBRARY = ICON_CONFIGS.reduce((acc, config, index) => {
  const accentColor = config.accentColor || LIGHT_GREEN_PALETTE[index % LIGHT_GREEN_PALETTE.length];

  acc[config.key] = {
    label: config.label,
    accentColor,
    component: hasIconImage(config.key) ? createPngIcon(config.key) : null,
  };

  return acc;
}, {});

export const CATEGORY_ICON_METADATA = Object.entries(ICON_LIBRARY).map(([key, value]) => ({
  key,
  label: value.label,
  icon: value.component,
  accentColor: value.accentColor,
}));

export const CATEGORY_ICONS = Object.fromEntries(
  Object.entries(ICON_LIBRARY).map(([key, value]) => [key, value.component])
);

export const CATEGORY_ICON_ACCENTS = Object.fromEntries(
  Object.entries(ICON_LIBRARY).map(([key, value]) => [key, value.accentColor])
);

export const getIconDefinition = (key) => {
  return ICON_LIBRARY[key] || ICON_LIBRARY.life;
};

export const getIconComponent = (key) => {
  return getIconDefinition(key).component;
};

export const getIconColor = (key) => {
  return getIconDefinition(key).accentColor;
};
