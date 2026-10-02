# PDF 产品资料核对单（nibianqitupian.pdf）

> 来源：Residential Off-Grid Solar Inverter Series（产品系列页 05/06）
> 提取时间：2026-10-01 · 提取方式：嵌入原图直接抽取 + 坐标定位参数文本
> **此文档供人工核对，确认后才会写入 `src/data/products.ts`**

## 一、图片提取结果（12 张，均已转为 1200×1200 白底 JPG ≤130KB）

| # | 产品 | 图片来源 | 原始分辨率 | 质量评估 |
|---|---|---|---|---|
| 1 | VM 1.5K / 3K | PDF 嵌入原图 | 2373×3052 | ✅ 优 |
| 2 | SC-PS 3K / MKS II 5K | PDF 嵌入原图 | 2390×3592 | ✅ 优 |
| 3 | SCMK 3K-24V | ⚠️ PDF 内无真实照片（矢量图形+显示面板贴片），600DPI 渲染截图 | 750×1125 | ✅ 可用 |
| 4 | SC-VM III 3.5KW / 5.5KW | PDF 嵌入原图 | 2524×3482 | ✅ 优 |
| 5 | VMIV 3.6KW / 5.6KW | PDF 嵌入原图 | 538×692 | ⚠️ 中等 |
| 6 | SC-MAX 8KW / 11KW | PDF 嵌入原图 | 498×677 | ⚠️ 中等 |
| 7 | VM IV 4K BOX / 6K BOX | PDF 嵌入原图 | 333×459 | ⚠️ 偏低（放大后会软） |
| 8 | VM IV 4.2KW / 6.2KW | PDF 嵌入原图 | 2564×3585 | ✅ 优 |
| 9 | VII 5KW | PDF 嵌入原图 | 2103×2934 | ✅ 优 |
| 10 | VMIV 4KW / 6KW | 与 #5 同一张图（PDF 原本就复用） | 538×692 | ⚠️ 中等 |
| 11 | VII 10.5KW | ⚠️ PDF 内只有 79×86px 低清小图，600DPI 渲染 | 725×917 | ❌ 偏糊，**建议向厂家要原图** |
| 12 | SC-MAX 8KWII / 11KWII | PDF 嵌入原图 | 589×736 | ⚠️ 中等 |
| 13 | VMII Plus 3.5KW / 5.5KW | PDF 嵌入原图 | 2314×3208 | ✅ 优 |

## 二、参数提取结果（13 个型号位，30 个 SKU 变体）

每张卡片规格为 5 行：Power / MPPT Range @Operating Voltage / Battery Voltage / Product Size / Net Weight。
"="（PDF 原注记）表示与相邻列相同。

### 1. VM 1.5K / 3K
| | VM 1.5K | VM 3K |
|---|---|---|
| Power | 1500VA/1500W | 3000VA/3000W |
| MPPT | 90–430Vdc | 同左 |
| Battery | 12V | 24V |
| Size | 348×270×95mm | 同左 |
| Weight | 4kg | 5kg |

### 2. SC-PS 3K / MKS II 5K
| | SC-PS 3K | MKS II 5K |
|---|---|---|
| Power | 3000VA/2400W | 5000VA/5000W |
| MPPT | **30–32Vdc ⚠️疑似笔误** | 120–430Vdc |
| Battery | 24V | 48V |
| Size | 355×272×100mm | 480×310×125mm |
| Weight | 6.9kg | 11kg |

### 3. SCMK 3K-24V（单型号）
3000VA/2400W · MPPT 30–80Vdc · 24V · 468×295×120mm · 11kg

### 4. SC-VM III 3.5KW / 5.5KW
| | 3.5KW | 5.5KW |
|---|---|---|
| Power | 3500VA/3500W | 5500VA/5500W |
| MPPT | 120–450Vdc | 同左 |
| Battery | 24V | 48V |
| Size | 465×305×110mm | 同左 |
| Weight | 9.5kg | 10.5kg |

### 5. VMIV 3.6KW / 5.6KW
| | 3.6KW | 5.6KW |
|---|---|---|
| Power | 3600VA/3600W | 5600VA/5600W |
| MPPT | 120–450Vdc | 同左 |
| Battery | 24V | 48V |
| Size | 422.8×313.6×119mm | 同左 |
| Weight | 9.2kg | 10.5kg |

### 6. SC-MAX 8KW / 11KW
| | 8KW | 11KW |
|---|---|---|
| Power | 8000VA/8000W | 11000VA/11000W |
| MPPT | 80–450Vdc | 同左 |
| Battery | 48V | 同左 |
| Size | 600×425×150mm | 同左 |
| Weight | 19kg | 同左（"="） |

### 7. VM IV 4K BOX / 6K BOX
| | 4K BOX | 6K BOX |
|---|---|---|
| Power | 4000VA/4000W | 6000VA/6000W |
| MPPT | 60–450Vdc | 同左 |
| Battery | 24V | 48V |
| Size | 470×305×125mm | 同左 |
| Weight | 9kg | 10kg |

### 8. VM IV 4.2KW / 6.2KW
| | 4.2KW | 6.2KW |
|---|---|---|
| Power | 4200VA/4200W | **62000VA/62000W ⚠️应为 6200VA/6200W** |
| MPPT | 60–450Vdc | 同左 |
| Battery | 24V | 48V |
| Size | 470×305×125mm | 同左 |
| Weight | 9kg | 10kg |

### 9. VII 5KW（单型号）
5000VA/5000W · MPPT 120–430Vdc · 48V · 480×310×125mm · 12kg

### 10. VMIV 4KW / 6KW（图片与 VMIV 3.6KW 相同）
| | 4KW | 6KW |
|---|---|---|
| Power | 4000VA/4000W | 6000VA/6000W |
| MPPT | 60–450Vdc | 同左 |
| Battery | 24V | 48V |
| Size | 470×305×125mm | 同左 |
| Weight | 9kg | 10kg |

### 11. VII 10.5KW（单型号）
10500VA/10500W · MPPT 90–500Vdc · 48V · 537×390×130mm · 14.45kg

### 12. SC-MAX 8KWII / 11KWII
| | 8KWII | 11KWII |
|---|---|---|
| Power | 8000VA/8000W | 11000VA/11000W |
| MPPT | 80–450Vdc | 同左 |
| Battery | 48V | 同左 |
| Size | 600×425×150mm | 同左 |
| Weight | 20kg | 21kg |

### 13. VMII Plus 3.5KW / 5.5KW
| | 3.5KW | 5.5KW |
|---|---|---|
| Power | 3500VA/3500W | 5500VA/5500W |
| MPPT | 120–450Vdc | 120–430Vdc |
| Battery | 24V | 48V |
| Size | 465×305×110mm | 同左 |
| Weight | 9.5kg | 10.5kg |

## 三、需要你确认的问题

1. **SC-PS 3K 的 MPPT "30Vdc~32Vdc"** —— 几乎可以肯定是 PDF 笔误（对照 SCMK 3K-24V 的 30–80Vdc）。按原文写入还是修正为 30–80Vdc？
2. **VM IV 6.2KW 的 Power "62000VA/62000W"** —— 明显多了一个 0，按 6200VA/6200W 写入？
3. **VII 10.5KW 的产品图**是 PDF 里 79×86px 小图拉伸的，效果偏差 —— 是否能拿到这台机器的实拍原图？
4. **SCMK 3K-24V** 在 PDF 里没有实拍照（矢量示意+贴片），当前用 600DPI 渲染图 —— 可接受还是要原图？
5. **这 13 个系列与现有 12 个产品（INV-001~012）是不同产品线** —— 是全部 13 个都新增，还是先挑重点型号？
6. 命名确认：网站 slug 我按 `vm-1500-3000`、`sc-ps-3000-mks-ii-5000` 这类风格生成（现有目录风格为 `900w-pure-sine-wave`），有没有官网既定的型号命名规则？

## 四、提取产物位置

- 网站规格图（1200×1200）：`.pdf-work/web/*.jpg`（12 张）
- 原始嵌入图：`.pdf-work/img_x*.png`
- 整页渲染图：`.pdf-work/page_full.png`、`.pdf-work/contact_sheet.png`
