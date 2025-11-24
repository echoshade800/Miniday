#!/usr/bin/env python3
"""
Copy the freshly generated PNG icons into the iOS asset catalog so SwiftUI can
use the exact same artwork as React Native.
"""

import json
import shutil
from pathlib import Path

from generate_flat_event_icons import ICON_DRAWERS

ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "assets" / "icons"
ASSET_DIR = ROOT / "ios" / "Assets.xcassets" / "EventIcons"


def ensure_imageset(key: str):
    imageset_dir = ASSET_DIR / f"icon_{key}.imageset"
    imageset_dir.mkdir(parents=True, exist_ok=True)

    contents = {
        "images": [
            {"idiom": "universal", "filename": f"icon_{key}.png", "scale": "1x"},
            {"idiom": "universal", "scale": "2x"},
            {"idiom": "universal", "scale": "3x"},
        ],
        "info": {"version": 1, "author": "xcode"},
    }

    contents_path = imageset_dir / "Contents.json"
    contents_path.write_text(json.dumps(contents, indent=2) + "\n", encoding="utf-8")
    return imageset_dir / f"icon_{key}.png"


def main():
    for key in ICON_DRAWERS.keys():
        source = SOURCE_DIR / f"icon_{key}.png"
        if not source.exists():
            raise FileNotFoundError(f"Source icon missing: {source}")
        target = ensure_imageset(key)
        shutil.copy2(source, target)
        print(f"✔ Synced {source.name} → {target.relative_to(ROOT)}")


if __name__ == "__main__":
    main()

