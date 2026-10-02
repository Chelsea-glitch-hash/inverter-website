# -*- coding: utf-8 -*-
"""
nibianqitupian.pdf 产品图处理：
1. 提取嵌入的高分辨率产品照片（11 个型号位）
2. 对 PDF 内无真实照片的 2 个卡片（SCMK 3K-24V / VII 10.5KW）做 600DPI 高清渲染截图
3. 统一处理为网站规格：1200x1200 白底正方形 JPG（<=200KB）
输出: .pdf-work/web/<slug>.jpg
"""
import pymupdf
from PIL import Image
import io, os

SRC = r'C:\Users\w11\Desktop\nibianqitupian.pdf'
OUT = r'D:\projects\inverter-website\.pdf-work'
WEB = os.path.join(OUT, 'web')
os.makedirs(WEB, exist_ok=True)

doc = pymupdf.open(SRC)
page = doc[0]

# (slug, 来源类型, 参数)
# 类型 xref: 提取嵌入原图; 类型 crop: 按 PDF 坐标渲染
JOBS = [
    ('vm-1k-3k',            'xref', 440),
    ('sc-ps-3k-mks-ii-5k',  'xref', 135),
    ('scmk-3k-24v',         'crop', (396, 144, 486, 279)),
    ('sc-vm-iii-3kw-5kw',   'xref', 461),
    ('vmiv-3kw-5kw',        'xref', 110),
    ('sc-max-8kw-11kw',     'xref', 616),
    ('vm-iv-4kbox-6kbox',   'xref', 164),
    ('vm-iv-4-2kw-6-2kw',   'xref', 155),
    ('vii-5kw',             'xref', 144),
    ('sc-max-8kwii-11kwii', 'xref', 74),
    ('vmii-plus-3kw-5kw',   'xref', 450),
    ('vii-10-5kw',          'crop', (864, 366, 951, 476)),
]

def load_source(job):
    slug, kind, arg = job
    if kind == 'xref':
        info = doc.extract_image(arg)
        return Image.open(io.BytesIO(info['image'])), 'xref%d' % arg
    else:
        pix = page.get_pixmap(clip=pymupdf.Rect(*arg), dpi=600)
        return Image.open(io.BytesIO(pix.tobytes('png'))), 'crop600dpi'

def to_square_web(img):
    """白底正方形 pad -> 1200x1200 -> JPG"""
    if img.mode in ('RGBA', 'LA', 'P'):
        img = img.convert('RGBA')
        bg = Image.new('RGB', img.size, (255, 255, 255))
        bg.paste(img, mask=img.split()[-1])
        img = bg
    elif img.mode != 'RGB':
        img = img.convert('RGB')
    side = max(img.size)
    sq = Image.new('RGB', (side, side), (255, 255, 255))
    sq.paste(img, ((side - img.width) // 2, (side - img.height) // 2))
    sq = sq.resize((1200, 1200), Image.LANCZOS)
    return sq

report = []
for job in JOBS:
    slug = job[0]
    img, src = load_source(job)
    orig_size = img.size
    web = to_square_web(img)
    path = os.path.join(WEB, slug + '.jpg')
    q = 88
    web.save(path, 'JPEG', quality=q)
    while os.path.getsize(path) > 200 * 1024 and q > 60:
        q -= 6
        web.save(path, 'JPEG', quality=q)
    kb = os.path.getsize(path) // 1024
    report.append((slug, src, orig_size, kb))

print('%-22s %-10s %-14s %s' % ('slug', '来源', '原始分辨率', 'web JPG'))
for slug, src, size, kb in report:
    print('%-22s %-10s %dx%d      %dKB q88-60' % (slug, src, size[0], size[1], kb))
