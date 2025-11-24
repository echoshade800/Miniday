# 图标替换快速开始指南

## 🚀 快速开始（3步）

### 步骤1：安装依赖
```bash
python3 -m pip install pillow
```

### 步骤2：一键生成 PNG
```bash
python3 scripts/generate_flat_event_icons.py
```
> 生成 28 个带青绿色底板 + 阴影的 128×128 PNG，并覆盖 `assets/icons/icon_<key>.png`

### 步骤3：同步到 iOS 资源
```bash
python3 scripts/sync_event_icons_to_ios.py
```
> 将同名 PNG 拷贝进 `ios/Assets.xcassets/EventIcons`

### 步骤4：重启 App
```bash
npm run dev
```

## 📋 图标文件清单

生成完成后，`assets/icons/` 目录应该包含以下 28 个文件：

```
icon_life.png
icon_work.png
icon_love.png
icon_celebration.png
icon_birthday.png
icon_graduation.png
icon_flight.png
icon_travel.png
icon_home.png
icon_fitness.png
icon_study.png
icon_game.png
icon_music.png
icon_eating.png
icon_pizza.png
icon_coffee.png
icon_toilet.png
icon_moon.png
icon_walk.png
icon_picnic.png
icon_thinking.png
icon_art.png
icon_phone.png
icon_soccer.png
icon_basketball.png
icon_archery.png
icon_swimming.png
icon_flower.png
```

## 🔍 验证

运行切图脚本后，检查文件：
```bash
ls -la assets/icons/*.png | wc -l
# 应该输出 28
```

## 📖 详细文档

更多信息请查看：
- `PNG_ICON_INTEGRATION.md` - 完整集成指南
- `assets/icons/README.md` - 图标使用说明

