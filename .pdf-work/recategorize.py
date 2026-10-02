"""Move INV-013..INV-035 from off-grid-inverters to off-grid-solar-inverters.

The 23 new models are contiguous at the tail of the PRODUCTS array (INV-013 is
the first), and every block declares `category:` after `id:`, so splitting the
file at the first `id: "INV-013"` puts exactly the 23 category lines that must
change into the tail half.

Read/written as BYTES: the file uses CRLF line endings and text-mode writing
would silently convert the whole file to LF.
"""
PATH = r'D:\projects\inverter-website\src\data\products.ts'
OLD_CAT = 'category: "off-grid-inverters"'
NEW_CAT = 'category: "off-grid-solar-inverters"'
OLD_IMG = 'images/products/off-grid-inverters/'
NEW_IMG = 'images/products/off-grid-solar-inverters/'

# Documentation example in the Product.images doc block: make it generic so it
# does not name one category (and so it stops counting as a real image path).
DOC_OLD = '"images/products/off-grid-inverters/<slug>/01.webp"'
DOC_NEW = '"images/products/<category>/<slug>/01.webp"'

raw = open(PATH, 'rb').read()
src = raw.decode('utf-8')

assert src.count(DOC_OLD) == 1, f'expected 1 doc example, found {src.count(DOC_OLD)}'
src = src.replace(DOC_OLD, DOC_NEW)

anchor = src.index('id: "INV-013"')
head, tail = src[:anchor], src[anchor:]

# Guard: the split must land exactly on INV-013.
assert 'id: "INV-014"' in tail, 'INV-014 not in tail — anchor is wrong'
assert 'id: "INV-012"' in head, 'INV-012 not in head — anchor is wrong'
assert 'id: "INV-013"' not in head, 'INV-013 leaked into head'

moved_cat = tail.count(OLD_CAT)
moved_img = tail.count(OLD_IMG)
assert moved_cat == 23, f'expected 23 category lines in tail, found {moved_cat}'
assert moved_img == 23, f'expected 23 image paths in tail, found {moved_img}'

tail = tail.replace(OLD_CAT, NEW_CAT).replace(OLD_IMG, NEW_IMG)
out = head + tail

# Validate in memory BEFORE writing, so a bad transform never reaches disk.
assert out.count(NEW_CAT) == 23, f'{out.count(NEW_CAT)} new-category lines after transform'
assert out.count(OLD_CAT) == 12, f'{out.count(OLD_CAT)} old-category lines after transform'
assert out.count(NEW_IMG) == 23, f'{out.count(NEW_IMG)} new image paths after transform'
assert out.count(OLD_IMG) == 12, f'{out.count(OLD_IMG)} old image paths after transform'
# "off-grid-inverters" (18) -> "off-grid-solar-inverters" (24) is +6 chars, in
# 23 category lines and 23 image paths. The doc-example edit above is already
# baked into BOTH `src` and `out`, so it cancels out of this delta.
expected_delta = 23 * (len(NEW_CAT) - len(OLD_CAT)) + 23 * (len(NEW_IMG) - len(OLD_IMG))
assert len(out) - len(src) == expected_delta, (
    f'length delta {len(out) - len(src)}, expected {expected_delta}'
)
assert out.count('id: "INV-') == 35, 'product count changed'
assert out.count('\r\n') == src.count('\r\n'), 'line-ending count changed'

open(PATH, 'wb').write(out.encode('utf-8'))
print('written: 23 category lines + 23 image paths moved; CRLF preserved')
