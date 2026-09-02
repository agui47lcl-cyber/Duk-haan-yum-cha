# -*- coding: utf-8 -*-
"""
素材优化脚本：把 dimsums/ 里小工具用到的图片转成 WebP，输出到 dimsums-web/。

为什么需要这一步：
  原始素材是 1254px 的高清 PNG（共 40MB），而小工具离线包上限是 10MiB，
  建议值 2MiB。真机上茶点最大只显示约 120px、介绍卡约 350px，
  所以按 2 倍分辨率（桌面 480px / 介绍卡 720px / 背景桌 1000px）重切即可保证清晰。

用法：更新 dimsums/ 素材后执行  python3 scripts/optimize_dimsums.py
"""
import os
from PIL import Image

SRC = "dimsums"
DST = "dimsums-web"

# 桌上/菜单里的茶点图：12 款，最长边压到 480px（保留透明通道）
DISHES = [
    "xiajiao", "shaomai", "changfen", "hongmichang", "fengzhua",
    "jinqiandu", "paigu", "tingzaizhou", "chasibao", "liushabao",
    "nuomiji", "danta",
]

# 介绍卡视觉素材：最长边压到 720px（弹窗里约 350px 显示宽 × 2）
CARDS = [
    "xiajiao", "shaomai", "changfen", "fengzhao", "jinqiandu", "paigu",
    "tingzaizhou", "chashaobao", "liushabao", "nuomiji", "danta", "hongmichang",
]


def convert(src_path, dst_path, max_edge, quality=80):
    """打开图片 → 等比缩到 max_edge 内 → 存成 WebP（自动保留/丢弃透明通道）"""
    img = Image.open(src_path)
    has_alpha = img.mode in ("RGBA", "LA", "P") and "A" in img.convert("RGBA").getbands()
    img = img.convert("RGBA" if has_alpha else "RGB")
    img.thumbnail((max_edge, max_edge), Image.LANCZOS)
    img.save(dst_path, "WEBP", quality=quality, method=6)
    return os.path.getsize(dst_path)


def main():
    os.makedirs(DST, exist_ok=True)
    os.makedirs(os.path.join(DST, "guangfu-dim-sum-cards", "visual"), exist_ok=True)
    total = 0

    for name in DISHES:
        size = convert(
            os.path.join(SRC, name + ".png"),
            os.path.join(DST, name + ".webp"),
            480,
        )
        total += size
        print(f"{name}.webp  {size // 1024} KB")

    for name in CARDS:
        size = convert(
            os.path.join(SRC, "guangfu-dim-sum-cards", "visual", name + ".png"),
            os.path.join(DST, "guangfu-dim-sum-cards", "visual", name + ".webp"),
            720,
        )
        total += size
        print(f"visual/{name}.webp  {size // 1024} KB")

    # 页面背景（不透明）：宽 800px 足够 390px 视口的 2 倍图
    size = convert(os.path.join(SRC, "背景.png"), os.path.join(DST, "bg.webp"), 800)
    total += size
    print(f"bg.webp  {size // 1024} KB")

    # 圆桌（透明）：显示宽约 430px，留 2.5 倍余量
    size = convert(os.path.join(SRC, "圆桌.png"), os.path.join(DST, "table.webp"), 1080)
    total += size
    print(f"table.webp  {size // 1024} KB")

    print(f"\n合计 {total / 1024 / 1024:.2f} MB")


if __name__ == "__main__":
    main()
