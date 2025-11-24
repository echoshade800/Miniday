/**
 * Icon Mapping - PNG图标资源映射
 * 将iconKey映射到对应的PNG图片资源
 */

// 图标资源映射表
export const ICON_IMAGE_MAP = {
  // 基础分类
  life: require('./icon_life.png'),
  work: require('./icon_work.png'),
  love: require('./icon_love.png'),
  celebration: require('./icon_celebration.png'),
  birthday: require('./icon_birthday.png'),
  graduation: require('./icon_graduation.png'),
  home: require('./icon_home.png'),

  // 交通与出行
  flight: require('./icon_flight.png'),
  travel: require('./icon_travel.png'),

  // 生活方式
  fitness: require('./icon_fitness.png'),
  study: require('./icon_study.png'),
  music: require('./icon_music.png'),
  game: require('./icon_game.png'),
  phone: require('./icon_phone.png'),
  art: require('./icon_art.png'),
  thinking: require('./icon_thinking.png'),

  // 饮食
  eating: require('./icon_eating.png'),
  pizza: require('./icon_pizza.png'),
  coffee: require('./icon_coffee.png'),

  // 休闲活动
  moon: require('./icon_moon.png'),
  picnic: require('./icon_picnic.png'),
  flower: require('./icon_flower.png'),
  walk: require('./icon_walk.png'),

  // 运动
  soccer: require('./icon_soccer.png'),
  basketball: require('./icon_basketball.png'),
  archery: require('./icon_archery.png'),
  swimming: require('./icon_swimming.png'),

  // 其他
  toilet: require('./icon_toilet.png'),
};

/**
 * 获取图标图片资源
 * @param {string} iconKey - 图标键名
 * @returns {number} - require()返回的资源ID，如果不存在则返回null
 */
export const getIconImage = (iconKey) => {
  return ICON_IMAGE_MAP[iconKey] || null;
};

/**
 * 检查图标是否存在
 * @param {string} iconKey - 图标键名
 * @returns {boolean}
 */
export const hasIconImage = (iconKey) => {
  return !!ICON_IMAGE_MAP[iconKey];
};

/**
 * 所有可用的图标键列表
 */
export const AVAILABLE_ICON_KEYS = Object.keys(ICON_IMAGE_MAP);

