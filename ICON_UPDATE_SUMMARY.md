# 图标更新总结（2025 版）

## 概述
MiniDay 的事件分类图标现已切换到一整套极简线稿风 PNG：浅灰圆底 + 石墨描边，完全由脚本绘制，便于随时批量生成、保持一致性。

## 视觉要点
- **浅灰圆形底板**：128×128 画布、96px 直径圆形底板，天然契合账本/理财 UI。
- **6px 石墨色描边**：统一线宽与颜色（#6A707A），完全线稿，无彩色填充。
- **一致的几何基线**：所有 pictogram 均锁定在同一留白/baseline 上，缩放至 20–48px 仍然清晰。
- **直观寓意**：学习=展开的书、健身=杠铃、生日=蛋糕蜡烛、通勤=巴士、娱乐=游戏手柄等。

## 生成 & 同步流程
```
cd /Users/hushunbang/Desktop/miniapp/Miniday
python3 -m pip install pillow          # 首次需要
python3 scripts/generate_flat_event_icons.py
python3 scripts/sync_event_icons_to_ios.py
```
- `generate_flat_event_icons.py` 会覆盖 `assets/icons/icon_<key>.png`
- `sync_event_icons_to_ios.py` 会把同名 PNG 拷贝到 `ios/Assets.xcassets/EventIcons`

## 代码触点
- `assets/icons/iconMapping.js`：React Native 端的唯一资源映射。
- `components/CategoryIcon.js`：PNG 自带底板，组件仅负责设定尺寸；SVG / emoji 仍作为回退。
- `components/CategoryIcons.js` & `IconPicker.js`：使用 `iconMapping` 提供的 PNG。
- `utils/eventStorage.js`：内置 28 个默认分类，`iconKey` 已覆盖全量图标。

## 文件清单（28 个）
```
icon_life.png        icon_music.png       icon_phone.png
icon_work.png        icon_eating.png      icon_soccer.png
icon_love.png        icon_pizza.png       icon_basketball.png
icon_celebration.png icon_coffee.png      icon_archery.png
icon_birthday.png    icon_toilet.png      icon_swimming.png
icon_graduation.png  icon_moon.png        icon_flower.png
icon_flight.png      icon_walk.png
icon_travel.png      icon_picnic.png
icon_home.png        icon_thinking.png
icon_fitness.png     icon_art.png
icon_study.png       icon_game.png
```

## 验收清单
- [x] `assets/icons/` 中的 PNG 全部由脚本生成、无手工改动
- [x] iOS `EventIcons` 资源夹已同步最新版 PNG
- [x] `CategoryIcon` 渲染 PNG 时不再叠加圆形背景
- [x] Icon Picker / Category 列表中 28 个分类均可正确显示
- [x] 暗黑/浅色模式下对比检查通过

## 后续扩展
1. 在 `generate_flat_event_icons.py` 里新增绘制函数并注册到 `ICON_DRAWERS`
2. 运行上述两个脚本生成 & 同步资产
3. 视需要更新 `DEFAULT_CATEGORIES` / 文案 / Docs

---

**最近更新**：2025-11-24（灰底线稿风刷新）

