#!/usr/bin/env python3
"""
Programmatically render the minimalist line icon family for MiniDay.

New design principles (2025-11 refresh):
- 128×128 canvas with a soft gray circle as the backdrop
- Neutral graphite strokes with uniform thickness for all pictograms
- Transparent interiors (line art only) for a clean, ledger-style appearance
- Geometry that stays legible in the 20–48 px range on mobile
"""

import math
from pathlib import Path

from PIL import Image, ImageDraw

SIZE = 128
STROKE = 6
ICON_COLOR = "#6A707A"
PLATE_FILL = "#F3F4F7"
PLATE_OUTLINE = "#E0E4EA"
PLATE_RADIUS = 48

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "assets" / "icons"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def rgba(value, alpha=255):
    value = value.lstrip("#")
    r = int(value[0:2], 16)
    g = int(value[2:4], 16)
    b = int(value[4:6], 16)
    return (r, g, b, alpha)


def create_canvas():
    img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img, "RGBA")
    return img, draw


def rounded_rect(draw, xy, radius, fill, outline, width):
    draw.rounded_rectangle(
        xy, radius=radius, fill=fill, outline=outline, width=width
    )


def draw_plate(draw):
    circle = (16, 16, SIZE - 16, SIZE - 16)
    draw.ellipse(circle, fill=rgba(PLATE_FILL), outline=rgba(PLATE_OUTLINE), width=4)


def with_plate(drawer):
    def wrapped(draw):
        draw_plate(draw)
        drawer(draw)

    return wrapped


def draw_life(draw):
    leaf = (36, 26, 92, 104)
    draw.ellipse(leaf, outline=rgba(ICON_COLOR), width=STROKE)
    draw.line((64, 30, 64, 102), fill=rgba(ICON_COLOR), width=STROKE)
    draw.line((64, 66, 90, 46), fill=rgba(ICON_COLOR), width=STROKE)
    draw.line((64, 78, 40, 54), fill=rgba(ICON_COLOR), width=STROKE)


def draw_work(draw):
    rounded_rect(
        draw,
        (30, 56, 98, 100),
        12,
        fill=None,
        outline=rgba(ICON_COLOR),
        width=STROKE,
    )
    rounded_rect(
        draw,
        (44, 40, 84, 56),
        10,
        fill=None,
        outline=rgba(ICON_COLOR),
        width=STROKE,
    )
    draw.line((30, 76, 98, 76), fill=rgba(ICON_COLOR), width=STROKE - 1)
    draw.line((54, 76, 54, 92), fill=rgba(ICON_COLOR), width=STROKE - 1)
    draw.line((74, 76, 74, 92), fill=rgba(ICON_COLOR), width=STROKE - 1)


def draw_love(draw):
    heart = [
        (40, 52),
        (36, 72),
        (64, 104),
        (92, 72),
        (88, 52),
        (64, 64),
        (40, 52),
    ]
    draw.line(heart, fill=rgba(ICON_COLOR), width=STROKE)


def draw_celebration(draw):
    draw.polygon(
        [(36, 88), (52, 36), (92, 104)],
        fill=None,
        outline=rgba(ICON_COLOR),
        width=STROKE,
    )
    draw.line((52, 36, 94, 28), fill=rgba(ICON_COLOR), width=STROKE - 1)
    draw.line((48, 46, 32, 32), fill=rgba(ICON_COLOR), width=STROKE - 1)
    draw.arc((70, 18, 110, 58), 200, 300, fill=rgba(ICON_COLOR), width=STROKE - 1)


def draw_birthday(draw):
    rounded_rect(
        draw,
        (34, 70, 94, 106),
        10,
        fill=None,
        outline=rgba(ICON_COLOR),
        width=STROKE,
    )
    draw.line((34, 86, 94, 86), fill=rgba(ICON_COLOR), width=STROKE - 1)
    for offset in (44, 64, 84):
        draw.line((offset, 52, offset, 70), fill=rgba(ICON_COLOR), width=STROKE)
        draw.ellipse(
            (offset - 6, 44, offset + 6, 56),
            outline=rgba(ICON_COLOR),
            width=STROKE,
        )


def draw_graduation(draw):
    draw.polygon(
        [(28, 60), (64, 42), (100, 60), (64, 78), (28, 60)],
        outline=rgba(ICON_COLOR),
        fill=None,
        width=STROKE,
    )
    draw.rectangle((48, 78, 80, 92), outline=rgba(ICON_COLOR), fill=None, width=STROKE)
    draw.line((64, 52, 64, 102), fill=rgba(ICON_COLOR), width=STROKE - 1)
    draw.ellipse((64, 102, 72, 110), outline=rgba(ICON_COLOR), width=STROKE)


def draw_flight(draw):
    fuselage = [(28, 78), (92, 52), (86, 40), (108, 32), (96, 60), (36, 86)]
    draw.line(fuselage, fill=rgba(ICON_COLOR), width=STROKE)
    draw.line((44, 82, 54, 106), fill=rgba(ICON_COLOR), width=STROKE)
    draw.line((72, 66, 102, 82), fill=rgba(ICON_COLOR), width=STROKE - 1)


def draw_travel(draw):
    bus = (34, 48, 102, 94)
    rounded_rect(
        draw,
        bus,
        20,
        fill=None,
        outline=rgba(ICON_COLOR),
        width=STROKE,
    )
    draw.line((34, 72, 102, 72), fill=rgba(ICON_COLOR), width=STROKE - 1)
    draw.line((48, 56, 48, 68), fill=rgba(ICON_COLOR), width=STROKE - 1)
    draw.line((72, 56, 72, 68), fill=rgba(ICON_COLOR), width=STROKE - 1)
    for center in (52, 84):
        draw.ellipse(
            (center - 12, 90, center + 12, 114),
            outline=rgba(ICON_COLOR),
            width=STROKE,
        )


def draw_home(draw):
    draw.polygon(
        [(32, 76), (64, 44), (96, 76), (96, 110), (32, 110), (32, 76)],
        outline=rgba(ICON_COLOR),
        fill=None,
        width=STROKE,
    )
    draw.line((32, 76, 96, 76), fill=rgba(ICON_COLOR), width=STROKE)
    draw.rectangle((58, 84, 70, 110), outline=rgba(ICON_COLOR), width=STROKE)


def draw_fitness(draw):
    draw.line((24, 70, 48, 70), fill=rgba(ICON_COLOR), width=STROKE)
    draw.line((80, 70, 104, 70), fill=rgba(ICON_COLOR), width=STROKE)
    rounded_rect(
        draw,
        (36, 52, 92, 88),
        12,
        fill=None,
        outline=rgba(ICON_COLOR),
        width=STROKE,
    )
    draw.line((56, 52, 56, 88), fill=rgba(ICON_COLOR), width=STROKE)
    draw.line((72, 52, 72, 88), fill=rgba(ICON_COLOR), width=STROKE)


def draw_study(draw):
    left = (32, 48, 64, 108)
    right = (64, 48, 96, 108)
    rounded_rect(
        draw, left, 12, fill=None, outline=rgba(ICON_COLOR), width=STROKE
    )
    rounded_rect(
        draw, right, 12, fill=None, outline=rgba(ICON_COLOR), width=STROKE
    )
    draw.line((48, 60, 48, 108), fill=rgba(ICON_COLOR), width=STROKE - 1)
    draw.line((80, 60, 80, 108), fill=rgba(ICON_COLOR), width=STROKE - 1)
    draw.line((32, 70, 96, 70), fill=rgba(ICON_COLOR), width=STROKE - 1)


def draw_game(draw):
    rounded_rect(
        draw,
        (30, 72, 98, 104),
        20,
        fill=None,
        outline=rgba(ICON_COLOR),
        width=STROKE,
    )
    draw.line((46, 88, 62, 88), fill=rgba(ICON_COLOR), width=STROKE)
    draw.line((54, 80, 54, 96), fill=rgba(ICON_COLOR), width=STROKE)
    draw.ellipse((74, 82, 86, 94), outline=rgba(ICON_COLOR), width=STROKE)
    draw.ellipse((90, 82, 102, 94), outline=rgba(ICON_COLOR), width=STROKE)


def draw_music(draw):
    draw.line((46, 34, 46, 94), fill=rgba(ICON_COLOR), width=STROKE)
    draw.line((46, 34, 94, 26), fill=rgba(ICON_COLOR), width=STROKE)
    draw.line((94, 26, 94, 76), fill=rgba(ICON_COLOR), width=STROKE)
    draw.ellipse((30, 84, 56, 106), outline=rgba(ICON_COLOR), width=STROKE)
    draw.ellipse((78, 74, 104, 96), outline=rgba(ICON_COLOR), width=STROKE)


def draw_eating(draw):
    draw.line((36, 30, 36, 100), fill=rgba(ICON_COLOR), width=STROKE)
    for offset in (-8, -2, 4, 10):
        draw.line((36 + offset, 30, 36 + offset, 48), fill=rgba(ICON_COLOR), width=STROKE - 1)
    draw.line((96, 28, 96, 104), fill=rgba(ICON_COLOR), width=STROKE)
    draw.arc((34, 60, 100, 112), 0, 180, fill=rgba(ICON_COLOR), width=STROKE)
    draw.line((38, 110, 96, 110), fill=rgba(ICON_COLOR), width=STROKE)


def draw_pizza(draw):
    slice_points = [(40, 36), (96, 60), (52, 110)]
    draw.polygon(
        slice_points,
        fill=None,
        outline=rgba(ICON_COLOR),
        width=STROKE,
    )
    draw.line((62, 70, 72, 96), fill=rgba(ICON_COLOR), width=STROKE - 1)
    draw.line((54, 86, 78, 74), fill=rgba(ICON_COLOR), width=STROKE - 1)
    for x, y in [(60, 56), (74, 64), (64, 84)]:
        draw.ellipse(
            (x - 4, y - 4, x + 4, y + 4), outline=rgba(ICON_COLOR), width=STROKE - 2
        )


def draw_coffee(draw):
    rounded_rect(
        draw,
        (36, 48, 96, 104),
        18,
        fill=None,
        outline=rgba(ICON_COLOR),
        width=STROKE,
    )
    draw.line((36, 78, 96, 78), fill=rgba(ICON_COLOR), width=STROKE - 1)
    draw.arc((92, 58, 118, 94), 270, 450, fill=rgba(ICON_COLOR), width=STROKE)
    draw.arc((44, 24, 72, 52), 0, 90, fill=rgba(ICON_COLOR), width=STROKE - 1)


def draw_toilet(draw):
    draw.rectangle((42, 32, 90, 60), outline=rgba(ICON_COLOR), width=STROKE)
    rounded_rect(
        draw,
        (32, 58, 98, 112),
        24,
        fill=None,
        outline=rgba(ICON_COLOR),
        width=STROKE,
    )
    draw.line((64, 60, 64, 112), fill=rgba(ICON_COLOR), width=STROKE)


def draw_moon(draw):
    draw.arc((30, 26, 98, 94), 40, 320, fill=rgba(ICON_COLOR), width=STROKE)
    draw.arc((44, 26, 112, 94), 40, 320, fill=rgba(ICON_COLOR), width=STROKE)
    for x, y in [(38, 30), (98, 22), (102, 60)]:
        draw.line((x, y, x + 6, y + 10), fill=rgba(ICON_COLOR), width=STROKE - 2)
        draw.line((x + 6, y, x, y + 10), fill=rgba(ICON_COLOR), width=STROKE - 2)


def draw_walk(draw):
    outline = [(26, 86), (42, 56), (74, 56), (102, 90), (108, 110), (22, 110), (26, 86)]
    draw.line(outline, fill=rgba(ICON_COLOR), width=STROKE)
    draw.line((46, 80, 86, 80), fill=rgba(ICON_COLOR), width=STROKE - 1)
    draw.line((30, 102, 106, 102), fill=rgba(ICON_COLOR), width=STROKE - 1)


def draw_picnic(draw):
    basket = (30, 70, 98, 112)
    rounded_rect(
        draw,
        basket,
        18,
        fill=None,
        outline=rgba(ICON_COLOR),
        width=STROKE,
    )
    draw.line((30, 90, 98, 90), fill=rgba(ICON_COLOR), width=STROKE - 1)
    draw.line((30, 100, 98, 100), fill=rgba(ICON_COLOR), width=STROKE - 1)
    draw.line((46, 70, 78, 36), fill=rgba(ICON_COLOR), width=STROKE)
    draw.line((62, 70, 62, 36), fill=rgba(ICON_COLOR), width=STROKE)


def draw_thinking(draw):
    head = (40, 40, 100, 100)
    draw.ellipse(head, outline=rgba(ICON_COLOR), width=STROKE)
    draw.line((64, 100, 64, 116), fill=rgba(ICON_COLOR), width=STROKE)
    draw.ellipse((26, 102, 44, 120), outline=rgba(ICON_COLOR), width=STROKE - 1)
    draw.ellipse((16, 120, 32, 132), outline=rgba(ICON_COLOR), width=STROKE - 2)


def draw_art(draw):
    draw.ellipse((28, 40, 108, 116), outline=rgba(ICON_COLOR), width=STROKE)
    for hole in [(80, 50, 96, 66), (96, 70, 112, 86), (68, 84, 84, 100)]:
        draw.ellipse(hole, outline=rgba(ICON_COLOR), width=STROKE - 1)
    draw.line((44, 78, 70, 118), fill=rgba(ICON_COLOR), width=STROKE - 1)
    draw.line((50, 84, 76, 44), fill=rgba(ICON_COLOR), width=STROKE - 1)


def draw_phone(draw):
    rounded_rect(
        draw,
        (40, 22, 88, 118),
        18,
        fill=None,
        outline=rgba(ICON_COLOR),
        width=STROKE,
    )
    draw.line((40, 92, 88, 92), fill=rgba(ICON_COLOR), width=STROKE - 1)
    draw.ellipse((58, 100, 70, 112), outline=rgba(ICON_COLOR), width=STROKE - 1)


def draw_soccer(draw):
    draw.ellipse((30, 30, 98, 98), outline=rgba(ICON_COLOR), width=STROKE)
    pentagon = [(64, 40), (82, 54), (74, 80), (54, 80), (46, 54), (64, 40)]
    draw.line(pentagon, fill=rgba(ICON_COLOR), width=STROKE - 1)
    for segment in [
        ((64, 40), (40, 64)),
        ((64, 40), (88, 64)),
        ((54, 80), (40, 104)),
        ((74, 80), (88, 104)),
    ]:
        draw.line(segment, fill=rgba(ICON_COLOR), width=STROKE - 1)


def draw_basketball(draw):
    draw.ellipse((30, 30, 98, 98), outline=rgba(ICON_COLOR), width=STROKE)
    draw.line((30, 64, 98, 64), fill=rgba(ICON_COLOR), width=STROKE - 1)
    draw.arc((18, 32, 86, 122), 270, 430, fill=rgba(ICON_COLOR), width=STROKE - 1)
    draw.arc((42, 18, 120, 86), 90, 250, fill=rgba(ICON_COLOR), width=STROKE - 1)


def draw_archery(draw):
    draw.ellipse((30, 30, 100, 100), outline=rgba(ICON_COLOR), width=STROKE)
    draw.ellipse((42, 42, 88, 88), outline=rgba(ICON_COLOR), width=STROKE - 1)
    draw.ellipse((54, 54, 76, 76), outline=rgba(ICON_COLOR), width=STROKE - 1)
    draw.line((82, 28, 118, 64), fill=rgba(ICON_COLOR), width=STROKE)
    draw.polygon(
        [(118, 64), (104, 48), (126, 50)],
        outline=rgba(ICON_COLOR),
        fill=None,
    )


def draw_swimming(draw):
    draw.arc((20, 96, 112, 128), 200, 340, fill=rgba(ICON_COLOR), width=STROKE - 1)
    draw.arc((28, 86, 120, 118), 200, 340, fill=rgba(ICON_COLOR), width=STROKE - 1)
    draw.line((38, 72, 64, 64), fill=rgba(ICON_COLOR), width=STROKE)
    draw.arc((50, 56, 90, 96), 180, 300, fill=rgba(ICON_COLOR), width=STROKE)
    draw.ellipse((76, 62, 92, 78), outline=rgba(ICON_COLOR), width=STROKE - 1)


def draw_flower(draw):
    petals = [
        (64 - 12, 28, 64 + 12, 60),
        (64 - 12, 68, 64 + 12, 100),
        (34, 50, 70, 86),
        (58, 50, 94, 86),
    ]
    for box in petals:
        draw.ellipse(box, outline=rgba(ICON_COLOR), width=STROKE - 1)
    draw.ellipse((52, 58, 76, 82), outline=rgba(ICON_COLOR), width=STROKE)
    draw.line((64, 82, 64, 120), fill=rgba(ICON_COLOR), width=STROKE)
    draw.line((64, 96, 48, 116), fill=rgba(ICON_COLOR), width=STROKE - 1)
    draw.line((64, 102, 82, 120), fill=rgba(ICON_COLOR), width=STROKE - 1)


RAW_ICON_DRAWERS = {
    "life": draw_life,
    "work": draw_work,
    "love": draw_love,
    "celebration": draw_celebration,
    "birthday": draw_birthday,
    "graduation": draw_graduation,
    "flight": draw_flight,
    "travel": draw_travel,
    "home": draw_home,
    "fitness": draw_fitness,
    "study": draw_study,
    "game": draw_game,
    "music": draw_music,
    "eating": draw_eating,
    "pizza": draw_pizza,
    "coffee": draw_coffee,
    "toilet": draw_toilet,
    "moon": draw_moon,
    "walk": draw_walk,
    "picnic": draw_picnic,
    "thinking": draw_thinking,
    "art": draw_art,
    "phone": draw_phone,
    "soccer": draw_soccer,
    "basketball": draw_basketball,
    "archery": draw_archery,
    "swimming": draw_swimming,
    "flower": draw_flower,
}

ICON_DRAWERS = {key: with_plate(drawer) for key, drawer in RAW_ICON_DRAWERS.items()}


def main():
    for key, drawer in ICON_DRAWERS.items():
        img, draw = create_canvas()
        drawer(draw)
        output_path = OUTPUT_DIR / f"icon_{key}.png"
        img.save(output_path, "PNG")
        print(f"✔ Generated {output_path.name}")


if __name__ == "__main__":
    main()

