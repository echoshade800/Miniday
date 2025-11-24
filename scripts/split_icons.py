#!/usr/bin/env python3
"""
图标切图脚本
将包含28个图标的大图切分为独立的PNG文件

使用方法:
python scripts/split_icons.py <input_image_path> [output_dir]

例如:
python scripts/split_icons.py /path/to/icons.png assets/icons
"""

import sys
import os
from PIL import Image

# 图标映射：按4列7行的顺序
ICON_MAPPING = [
    # Row 1
    ('work', 'icon_work'),           # 工作（公文包）
    ('love', 'icon_love'),           # 爱情（玫瑰 + 爱心）
    ('celebration', 'icon_celebration'),  # 庆祝/聚会（拉炮）
    ('graduation', 'icon_graduation'),     # 毕业（学位帽）
    # Row 2
    ('fitness', 'icon_fitness'),     # 健身（杠铃）
    ('home', 'icon_home'),           # 居家（小房子）
    ('music', 'icon_music'),         # 听音乐（耳机）
    ('eating', 'icon_meal'),         # 吃饭（刀叉）
    # Row 3
    ('eating', 'icon_meal_steam'),   # 正餐/吃饭（有蒸汽的盘子）
    ('game', 'icon_game'),           # 游戏（游戏手柄）
    ('coffee', 'icon_breakfast'),    # 吃早餐/简餐（碗和勺子）
    ('pizza', 'icon_pizza'),        # 吃披萨（披萨片）
    # Row 4
    ('travel', 'icon_beach'),        # 游玩/海边度假（沙滩 + 太阳伞）
    ('moon', 'icon_moon'),           # 赏月/夜晚（弯月 + 星星）
    ('picnic', 'icon_picnic'),       # 野餐/野炊（野餐篮）
    ('thinking', 'icon_think'),      # 思考（人物头像 + 思考姿势）
    # Row 5
    ('soccer', 'icon_soccer'),       # 踢足球（足球）
    ('walk', 'icon_walk'),           # 散步（行走的脚/腿）
    ('art', 'icon_paint'),           # 画画（调色盘+画笔）
    ('phone', 'icon_phone'),        # 玩手机（手拿手机）
    # Row 6
    ('flight', 'icon_flight'),       # 飞机航班（飞机）
    ('archery', 'icon_target'),      # 射箭/目标（靶心 + 箭）
    ('swimming', 'icon_swim'),       # 游泳（人在水里）
    ('flower', 'icon_flower'),       # 赏花（花朵）
    # Row 7 (如果有额外的图标)
    ('study', 'icon_study'),         # 学习/办公桌（书桌 + 台灯）
    ('life', 'icon_life'),           # 生活（购物车或其他）
    ('birthday', 'icon_birthday'),   # 生日（如果有）
    ('toilet', 'icon_toilet'),       # 上厕所（如果有）
]

def split_icons(input_path, output_dir='assets/icons'):
    """
    将大图切分为28个独立图标
    
    Args:
        input_path: 输入图片路径
        output_dir: 输出目录
    """
    if not os.path.exists(input_path):
        print(f"错误: 找不到输入文件: {input_path}")
        return False
    
    # 创建输出目录
    os.makedirs(output_dir, exist_ok=True)
    
    # 打开图片
    try:
        img = Image.open(input_path)
        width, height = img.size
        print(f"输入图片尺寸: {width}x{height}")
    except Exception as e:
        print(f"错误: 无法打开图片: {e}")
        return False
    
    # 计算每个图标的尺寸
    # 假设是4列7行的网格
    cols = 4
    rows = 7
    
    icon_width = width // cols
    icon_height = height // rows
    
    print(f"每个图标尺寸: {icon_width}x{icon_height}")
    print(f"开始切图...")
    
    # 切图
    saved_count = 0
    for idx, (icon_key, filename) in enumerate(ICON_MAPPING):
        if idx >= cols * rows:
            break
        
        # 计算位置
        row = idx // cols
        col = idx % cols
        
        x = col * icon_width
        y = row * icon_height
        
        # 裁剪图标
        icon = img.crop((x, y, x + icon_width, y + icon_height))
        
        # 保存
        output_path = os.path.join(output_dir, f"{filename}.png")
        icon.save(output_path, 'PNG')
        saved_count += 1
        print(f"  [{saved_count}/{len(ICON_MAPPING)}] 保存: {output_path} ({icon_key})")
    
    print(f"\n完成! 共保存 {saved_count} 个图标到 {output_dir}")
    return True

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("使用方法: python scripts/split_icons.py <input_image_path> [output_dir]")
        print("\n示例:")
        print("  python scripts/split_icons.py /path/to/icons.png")
        print("  python scripts/split_icons.py /path/to/icons.png assets/icons")
        sys.exit(1)
    
    input_path = sys.argv[1]
    output_dir = sys.argv[2] if len(sys.argv) > 2 else 'assets/icons'
    
    success = split_icons(input_path, output_dir)
    sys.exit(0 if success else 1)

