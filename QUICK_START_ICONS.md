# 图标替换快速开始指南

## 🚀 快速开始（3步）

### 步骤1：准备图片
确保你有一张包含28个图标的大图（4列×7行）

### 步骤2：运行切图脚本
```bash
# 安装依赖（如果还没有）
pip install Pillow

# 运行切图脚本（替换为你的图片路径）
python scripts/split_icons.py <你的图片路径> assets/icons
```

### 步骤3：重启App
```bash
npm run dev
```

## ⚠️ 重要提示

**在运行切图脚本之前，App可能会报错**，因为 `iconMapping.js` 中的 `require()` 语句会尝试加载不存在的PNG文件。

**解决方法：**
1. 先运行切图脚本生成所有PNG文件
2. 或者暂时注释掉 `iconMapping.js` 中的映射，等切图完成后再取消注释

## 📋 图标文件清单

切图完成后，`assets/icons/` 目录应该包含以下28个文件：

```
icon_work.png
icon_love.png
icon_celebration.png
icon_graduation.png
icon_fitness.png
icon_home.png
icon_music.png
icon_meal.png
icon_game.png
icon_breakfast.png
icon_pizza.png
icon_beach.png
icon_moon.png
icon_picnic.png
icon_think.png
icon_soccer.png
icon_walk.png
icon_paint.png
icon_phone.png
icon_flight.png
icon_target.png
icon_swim.png
icon_flower.png
icon_study.png
icon_life.png
icon_birthday.png
icon_toilet.png
icon_basketball.png
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

