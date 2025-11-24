# Flat Icon Source of Truth

The emoji-era art has been replaced with a unified flat icon family. Every PNG in
`assets/icons` is procedurally generated so we can regenerate or extend the set in
seconds without hunting for design files.

## Generate / Refresh

```
python3 scripts/generate_flat_event_icons.py
python3 scripts/sync_event_icons_to_ios.py   # 同步给 SwiftUI
```

Requirements:

- Python 3.9+
- Pillow (`python3 -m pip install pillow`)

The generator now outputs **128×128** PNG tiles that share:

- 柔和的浅灰圆形底板（对齐账本/预算类 UI 的极简风）
- 单一石墨色描边（6px，`#6A707A`）勾勒线稿
- 无填充、仅线条的符号，缩小到 20–48px 依然清晰
- 统一的留白与基线，任何新类别都可快速追加

Running the script overwrites every `icon_<key>.png` file so the palette stays
perfectly consistent across the app and the SwiftUI asset catalog. The sync script
mirrors the exact files into `ios/Assets.xcassets/EventIcons`.

## Icon Inventory

| iconKey | 文件 | 语义 |
| --- | --- | --- |
| `life` | `icon_life.png` | 生活（叶子） |
| `work` | `icon_work.png` | 工作（公文包） |
| `love` | `icon_love.png` | 爱情（线稿爱心） |
| `celebration` | `icon_celebration.png` | 庆祝/节日（彩带拉炮） |
| `birthday` | `icon_birthday.png` | 生日（蛋糕+蜡烛） |
| `graduation` | `icon_graduation.png` | 毕业（学士帽 + 流苏） |
| `flight` | `icon_flight.png` | 飞机航班（飞机剪影） |
| `travel` | `icon_travel.png` | 交通 / 通勤（巴士轮廓） |
| `home` | `icon_home.png` | 居家（小房子） |
| `fitness` | `icon_fitness.png` | 健身（哑铃） |
| `study` | `icon_study.png` | 学习（打开的书） |
| `game` | `icon_game.png` | 游戏（手柄） |
| `music` | `icon_music.png` | 听音乐（音符） |
| `eating` | `icon_eating.png` | 吃饭（餐罩 + 餐具） |
| `pizza` | `icon_pizza.png` | 吃披萨（三角披萨） |
| `coffee` | `icon_coffee.png` | 喝咖啡（马克杯） |
| `toilet` | `icon_toilet.png` | 上厕所（马桶） |
| `moon` | `icon_moon.png` | 赏月（月牙 + 星星） |
| `walk` | `icon_walk.png` | 散步（运动鞋） |
| `picnic` | `icon_picnic.png` | 野炊 / 野餐（篮子 + 手柄） |
| `thinking` | `icon_thinking.png` | 思考（侧脸 + 思考泡泡） |
| `art` | `icon_art.png` | 画画（调色盘 + 画笔） |
| `phone` | `icon_phone.png` | 玩手机（手机） |
| `soccer` | `icon_soccer.png` | 踢足球（足球） |
| `basketball` | `icon_basketball.png` | 打篮球（篮球） |
| `archery` | `icon_archery.png` | 射箭（靶心 + 箭） |
| `swimming` | `icon_swimming.png` | 游泳（泳者 + 波浪） |
| `flower` | `icon_flower.png` | 赏花（花朵） |

Use `assets/icons/iconMapping.js` as the single source of truth for `iconKey →
require()` bindings inside React Native. Running the generator keeps the mapping
valid: the script writes each PNG with the `icon_<key>.png` convention.

## SwiftUI / Native Consumers

Icons are mirrored into `ios/Assets.xcassets/EventIcons` so a future SwiftUI
target can reference `Image("EventIcons/icon_love")` (or similar). See
`PNG_ICON_INTEGRATION.md` for the end-to-end flow.

