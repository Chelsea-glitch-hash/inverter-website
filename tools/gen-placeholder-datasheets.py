#!/usr/bin/env python3
"""
Generate single-page placeholder datasheet PDFs for all products.

Why placeholders: the download pipeline (DownloadCard component +
download_datasheet GA4 event + /downloads/ stable URLs) must be verifiable
before real datasheets exist. These PDFs contain NO technical parameters —
they only identify the model and point to the contact page.

Replace each file at the SAME URL with the official datasheet later:
  public/downloads/{sku-lowercase}-datasheet.pdf

Usage:
    python tools/gen-placeholder-datasheets.py
"""

import os

# (sku, name, category label)
PRODUCTS = [
    ("HV-5000", "5kW Hybrid Solar Inverter", "Hybrid Inverters"),
    ("HV-8000", "8kW Hybrid Solar Inverter", "Hybrid Inverters"),
    ("GT-3000", "3kW Grid-Tie Solar Inverter", "Grid-Tie Inverters"),
    ("GT-10000", "10kW Three-Phase Grid-Tie Inverter", "Grid-Tie Inverters"),
    ("OG-3500", "3.5kW Off-Grid Power Inverter", "Off-Grid Inverters"),
    ("OG-6000", "6kW Off-Grid Power Inverter", "Off-Grid Inverters"),
    ("ACC-WIFI", "Wi-Fi Monitoring Dongle", "Accessories"),
]

BRAND = "BrandCo"  # placeholder brand, matches src/config.ts SITE.name

OUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "downloads")


def esc(s: str) -> str:
    return s.replace("\\", r"\\").replace("(", r"\(").replace(")", r"\)")


def make_pdf(lines: list[tuple[str, str, int, float, float]]) -> bytes:
    """lines: (text, font_key, size, x, y) with font_key F1 (regular) / F2 (bold)."""
    parts = []
    for text, font, size, x, y in lines:
        parts.append(f"BT /{font} {size} Tf {x} {y} Td ({esc(text)}) Tj ET")
    content = "\n".join(parts).encode("latin-1")

    objects = [
        b"<< /Type /Catalog /Pages 2 0 R >>",
        b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
        b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] "
        b"/Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>",
        b"<< /Length " + str(len(content)).encode() + b" >>\nstream\n" + content + b"\nendstream",
        b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
        b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    ]

    out = bytearray(b"%PDF-1.4\n")
    offsets = []
    for i, obj in enumerate(objects, start=1):
        offsets.append(len(out))
        out += f"{i} 0 obj\n".encode() + obj + b"\nendobj\n"

    xref_pos = len(out)
    out += f"xref\n0 {len(objects) + 1}\n".encode()
    out += b"0000000000 65535 f \n"
    for off in offsets:
        out += f"{off:010d} 00000 n \n".encode()
    out += (
        f"trailer\n<< /Size {len(objects) + 1} /Root 1 0 R >>\n"
        f"startxref\n{xref_pos}\n%%EOF\n"
    ).encode()
    return bytes(out)


def build_lines(sku: str, name: str, category: str) -> list[tuple[str, str, int, float, float]]:
    intro = [
        "This is a placeholder datasheet. The full specification sheet with",
        "detailed electrical parameters, drawings and certification details",
        "is available on request.",
    ]
    lines = [
        (BRAND + " - Inverter Manufacturer", "F2", 15, 72, 740),
        (name, "F2", 22, 72, 690),
        (f"Model: {sku}    Category: {category}", "F1", 13, 72, 660),
        ("DATASHEET - PLACEHOLDER", "F2", 13, 72, 615),
    ]
    y = 580
    for line in intro:
        lines.append((line, "F1", 11, 72, y))
        y -= 18
    lines += [
        ("Request the full datasheet and pricing:", "F2", 12, 72, y - 20),
        ("www.your-domain.com/contact/", "F1", 12, 72, y - 40),
        ("OEM / ODM branding is available for volume orders.", "F1", 11, 72, y - 70),
        (
            "Placeholder generated from the site template (2026-09).",
            "F1",
            9,
            72,
            80,
        ),
        (
            "Replace this file at the same URL with the official datasheet PDF.",
            "F1",
            9,
            72,
            66,
        ),
    ]
    return lines


def main() -> None:
    os.makedirs(OUT_DIR, exist_ok=True)
    for sku, name, category in PRODUCTS:
        pdf = make_pdf(build_lines(sku, name, category))
        path = os.path.join(OUT_DIR, f"{sku.lower()}-datasheet.pdf")
        with open(path, "wb") as f:
            f.write(pdf)
        print(f"wrote {path} ({len(pdf)} bytes)")


if __name__ == "__main__":
    main()
