# 图标资源使用说明

## 图标切图步骤

### 1. 准备图标大图
确保你有一张包含28个图标的大图，排列为4列×7行的网格。

### 2. 安装依赖
切图脚本需要Python和PIL库：
```bash
pip install Pillow
```

### 3. 运行切图脚本
```bash
# 基本用法
python scripts/split_icons.py <图片路径>

# 指定输出目录
python scripts/split_icons.py <图片路径> assets/icons
```

### 4. 验证结果
切图完成后，`assets/icons/` 目录下应该有28个PNG文件：
- `icon_work.png`
- `icon_love.png`
- `icon_celebration.png`
- ... 等等

## 图标命名映射

| iconKey | 文件名 | 说明 |
|---------|--------|------|
| `work` | `icon_work.png` | 工作（公文包） |
| `love` | `icon_love.png` | 爱情（玫瑰 + 爱心） |
| `celebration` | `icon_celebration.png` | 庆祝/聚会（拉炮） |
| `graduation` | `icon_graduation.png` | 毕业（学位帽） |
| `fitness` | `icon_fitness.png` | 健身（杠铃） |
| `home` | `icon_home.png` | 居家（小房子） |
| `music` | `icon_music.png` | 听音乐（耳机） |
| `eating` | `icon_meal.png` | 吃饭（刀叉） |
| `game` | `icon_game.png` | 游戏（游戏手柄） |
| `coffee` | `icon_breakfast.png` | 吃早餐/简餐（碗和勺子） |
| `pizza` | `icon_pizza.png` | 吃披萨（披萨片） |
| `travel` | `icon_beach.png` | 游玩/海边度假（沙滩 + 太阳伞） |
| `moon` | `icon_moon.png` | 赏月/夜晚（弯月 + 星星） |
| `picnic` | `icon_picnic.png` | 野餐/野炊（野餐篮） |
| `thinking` | `icon_think.png` | 思考（人物头像 + 思考姿势） |
| `soccer` | `icon_soccer.png` | 踢足球（足球） |
| `walk` | `icon_walk.png` | 散步（行走的脚/腿） |
| `art` | `icon_paint.png` | 画画（调色盘+画笔） |
| `phone` | `icon_phone.png` | 玩手机（手拿手机） |
| `flight` | `icon_flight.png` | 飞机航班（飞机） |
| `archery` | `icon_target.png` | 射箭/目标（靶心 + 箭） |
| `swimming` | `icon_swim.png` | 游泳（人在水里） |
| `flower` | `icon_flower.png` | 赏花（花朵） |
| `study` | `icon_study.png` | 学习/办公桌（书桌 + 台灯） |
| `life` | `icon_life.png` | 生活 |
| `birthday` | `icon_birthday.png` | 生日 |
| `toilet` | `icon_toilet.png` | 上厕所 |

## 图标优先级

`CategoryIcon` 组件按以下优先级显示图标：

1. **PNG图片** (最高优先级) - 如果 `assets/icons/` 中有对应的PNG文件
2. **SVG图标** - 如果 `CategoryIcons.js` 中有对应的SVG组件
3. **Emoji** - 作为最后的回退方案

## 注意事项

- PNG图标会自动应用圆形裁剪
- 图标尺寸会根据 `size` prop 自动缩放
- 如果PNG图标不存在，会自动回退到SVG或Emoji
- 所有图标资源都通过 `iconMapping.js` 统一管理

