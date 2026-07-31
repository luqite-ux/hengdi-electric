from __future__ import annotations

import json
import sys
from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter


def source_name(page: int) -> str:
    return f"企业资料_{page:02d}.png"


def normalized_crop(image: Image.Image, crop: list[float]) -> tuple[int, int, int, int]:
    width, height = image.size
    left, top, right, bottom = crop
    return (
        round(width * left),
        round(height * top),
        round(width * right),
        round(height * bottom),
    )


def process(source_dir: Path, project_dir: Path) -> None:
    manifest_path = project_dir / "scripts" / "catalog-assets.json"
    entries = json.loads(manifest_path.read_text(encoding="utf-8"))

    for entry in entries:
        source = source_dir / source_name(entry["sourcePage"])
        if not source.exists():
            raise FileNotFoundError(source)

        with Image.open(source) as original:
            image = original.convert("RGB").crop(normalized_crop(original, entry["crop"]))
            image.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
            image = ImageEnhance.Contrast(image).enhance(1.04)
            image = ImageEnhance.Sharpness(image).enhance(1.08)
            image = image.filter(ImageFilter.UnsharpMask(radius=0.6, percent=35, threshold=4))

            output = project_dir / "public" / entry["output"]
            output.parent.mkdir(parents=True, exist_ok=True)
            if output.suffix.lower() == ".png":
                image.save(output, "PNG", optimize=True)
            else:
                image.save(output, "WEBP", quality=90, method=6)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit("Usage: process-catalog-assets.py <source-directory> <project-directory>")
    process(Path(sys.argv[1]), Path(sys.argv[2]))
