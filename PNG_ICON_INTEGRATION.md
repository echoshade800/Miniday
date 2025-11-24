# PNG 图标体系

## 概览

- 扁平/线性混合风格、6px 深青描边、暖色填充
- 自带青绿色圆角方块 + 阴影，开箱即用
- 通过 `scripts/generate_flat_event_icons.py` 程序化生成，避免手动切图
- React Native 端使用 `assets/icons/icon_<key>.png`
- iOS/SwiftUI 端使用 `ios/Assets.xcassets/EventIcons/icon_<key>.imageset`

```
Miniday/
├─ assets/
│  └─ icons/
│     ├─ icon_life.png
│     ├─ icon_work.png
│     ├─ …
│     └─ iconMapping.js
├─ ios/
│  └─ Assets.xcassets/
│     └─ EventIcons/
│        ├─ Contents.json
│        └─ icon_life.imageset/
├─ components/
│  ├─ CategoryIcon.js
│  └─ CategoryIcons.js
└─ scripts/
   └─ generate_flat_event_icons.py
```

## 生成/刷新全部图标

```bash
cd /Users/hushunbang/Desktop/miniapp/Miniday
python3 -m pip install pillow   # 首次执行需要
python3 scripts/generate_flat_event_icons.py
python3 scripts/sync_event_icons_to_ios.py
```

- 输出带有圆角方块的 128×128 PNG，自动覆盖 `assets/icons/icon_<key>.png`
- `sync_event_icons_to_ios.py` 会把同名文件复制到每个 `.imageset`
- 若要新增图标，只需在 `ICON_DRAWERS` 中添加绘制函数并重新运行以上两条命令

## SwiftUI / Assets.xcassets

- `sync_event_icons_to_ios.py` 会确保 `ios/Assets.xcassets/EventIcons/icon_<key>.imageset` 中存在最新 PNG 和标准 `Contents.json`
- SwiftUI 可直接 `Image("EventIcons/icon_love").renderingMode(.original)`
- 目录结构与 React Native 共用同一套 PNG，确保双端视觉一致

## React Native 映射

`assets/icons/iconMapping.js` 是唯一的数据源：

```js
export const ICON_IMAGE_MAP = {
  life: require('./icon_life.png'),
  work: require('./icon_work.png'),
  // …
  flower: require('./icon_flower.png'),
};
```

`CategoryIcon`、`IconPicker`、`eventStorage` 全部通过 `iconKey` 访问此映射。

## 分类与图标对照表

| 分类 | iconKey | 资源文件 |
| --- | --- | --- |
| 生活 | `life` | `icon_life.png` |
| 工作 | `work` | `icon_work.png` |
| 爱情 | `love` | `icon_love.png` |
| 庆祝/节日 | `celebration` | `icon_celebration.png` |
| 生日 | `birthday` | `icon_birthday.png` |
| 毕业 | `graduation` | `icon_graduation.png` |
| 飞机航班 | `flight` | `icon_flight.png` |
| 游玩/旅行 | `travel` | `icon_travel.png` |
| 居家 | `home` | `icon_home.png` |
| 健身 | `fitness` | `icon_fitness.png` |
| 学习 | `study` | `icon_study.png` |
| 游戏 | `game` | `icon_game.png` |
| 听音乐 | `music` | `icon_music.png` |
| 吃饭 | `eating` | `icon_eating.png` |
| 吃披萨 | `pizza` | `icon_pizza.png` |
| 喝咖啡 | `coffee` | `icon_coffee.png` |
| 上厕所 | `toilet` | `icon_toilet.png` |
| 赏月 | `moon` | `icon_moon.png` |
| 散步 | `walk` | `icon_walk.png` |
| 野炊/野餐 | `picnic` | `icon_picnic.png` |
| 思考 | `thinking` | `icon_thinking.png` |
| 画画 | `art` | `icon_art.png` |
| 玩手机 | `phone` | `icon_phone.png` |
| 踢足球 | `soccer` | `icon_soccer.png` |
| 打篮球 | `basketball` | `icon_basketball.png` |
| 射箭 | `archery` | `icon_archery.png` |
| 游泳 | `swimming` | `icon_swimming.png` |
| 赏花 | `flower` | `icon_flower.png` |

## App 端集成要点

1. `CategoryIcon` 优先级：PNG > SVG > Emoji。PNG 自带底板，无需额外背景。
2. `CategoryIcons.js` 声明所有 iconKey + label + accentColor，用于选择器与统计。
3. `eventStorage` 默认 28 个分类，全部带上新的 `iconKey`。
4. 自定义分类：`IconPicker` 读取 `CATEGORY_ICON_METADATA`；只要 `iconKey` 命中 `iconMapping` 即可显示 PNG。

## 验收清单

- [ ] `assets/icons/` 下 28 个 PNG 最新生成
- [ ] `ios/Assets.xcassets/EventIcons` 与 PNG 同步
- [ ] `eventStorage` 默认分类包含上述 iconKey
- [ ] `CategoryIcon` 渲染不再给 PNG 上色（保留原彩）
- [ ] `IconPicker`, `CategoryList`, `Events` 页面全部展示新图标
- [ ] 暗色/亮色模式下对比测试通过

## 故障排除

| 问题 | 排查步骤 |
| --- | --- |
| 图标仍显示 emoji | 确认事件/category 的 `iconKey` 不为空；`iconMapping` 中是否存在对应 `require`；Metro 需重启缓存 |
| SwiftUI Image 找不到资源 | 检查 `ios/Assets.xcassets/EventIcons/...` 是否存在；如缺失重新执行同步脚本 |
| 图标风格不统一 | 勿手动修改 PNG，统一通过 `generate_flat_event_icons.py` 重新输出 |
| 添加新分类 | 1) 在脚本添加绘制函数 2) 运行脚本 3) 更新 `iconMapping` + `CategoryIcons.js` + `DEFAULT_CATEGORIES` |

## 版本

- 创建：2024
- 最近更新：2025-11-24（程序化平面彩色图标）

