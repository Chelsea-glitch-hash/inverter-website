"""Move the 23 new products' image folders to match their new category.

Slug list is read straight out of src/data/products.ts (not typed by hand), so
the folders moved and the paths referenced can never drift apart.
"""
import os
import re
import shutil

PRODUCTS = r'D:\projects\inverter-website\src\data\products.ts'
PUBLIC = r'D:\projects\inverter-website\public\images\products'
OLD_CAT = 'off-grid-inverters'
NEW_CAT = 'off-grid-solar-inverters'

src = open(PRODUCTS, encoding='utf-8').read()
refs = re.findall(
    r'images: \["images/products/%s/([^/"]+)/' % NEW_CAT, src
)
refs = sorted(set(refs))
assert len(refs) == 23, f'expected 23 slugs, found {len(refs)}'

dst_root = os.path.join(PUBLIC, NEW_CAT)
os.makedirs(dst_root, exist_ok=True)

moved, already = [], []
for slug in refs:
    src_dir = os.path.join(PUBLIC, OLD_CAT, slug)
    dst_dir = os.path.join(dst_root, slug)
    if os.path.isdir(dst_dir):
        already.append(slug)
        continue
    assert os.path.isdir(src_dir), f'missing source folder: {src_dir}'
    assert os.path.isfile(os.path.join(src_dir, 'main.jpg')), f'no main.jpg in {src_dir}'
    shutil.move(src_dir, dst_dir)
    moved.append(slug)

print('moved:', len(moved))
if already:
    print('already at destination:', already)

left_old = sorted(os.listdir(os.path.join(PUBLIC, OLD_CAT)))
left_new = sorted(os.listdir(dst_root))
print('old category folders:', len(left_old))
print('new category folders:', len(left_new))
