#!/usr/bin/env python3
"""
Download Bali blog images from Squarespace CDN.
Each image is downloaded at the highest available resolution.
"""

import os
import urllib.request
import urllib.error
import time

OUTPUT_DIR = "/Users/kristianeboe/Developer/boe-ventures/kristianeboe.me/public/blog/bali"

os.makedirs(OUTPUT_DIR, exist_ok=True)

# Format: (filename, base_squarespace_url, extension, use_format_param)
# For URLs without format params, use_format_param=False and just use the URL directly.
# Resolution priority: 2500w > 1500w > 1000w > original

IMAGES = [
    # ─── SOUTH BALI ───────────────────────────────────────────────────────────
    # Villa compound image (image-asset.png 1622x1180)
    (
        "south-bali-villa-01.jpg",
        "https://images.squarespace-cdn.com/content/v1/53b3ff8ce4b0e73ebe0b6f2b/1461408959462-AI4BROH562DAULGXYHQ7/image-asset.png",
        "2500w",
    ),
    # Gallery image 1 (20150928_164237.jpg 2322x4128)
    (
        "south-bali-pool-01.jpg",
        "https://images.squarespace-cdn.com/content/v1/53b3ff8ce4b0e73ebe0b6f2b/1461408552100-YS1SHDWDWSCBUE5FLS4L/20150928_164237.jpg",
        "2500w",
    ),
    # Gallery image 2 (IMG_0148.JPG 3264x2448)
    (
        "south-bali-pool-02.jpg",
        "https://images.squarespace-cdn.com/content/v1/53b3ff8ce4b0e73ebe0b6f2b/1461408677001-CXVT4WFX8433082ROKO7/IMG_0148.JPG",
        "2500w",
    ),

    # ─── ULUWATU ──────────────────────────────────────────────────────────────
    # GOPR2838.JPG (4000x3000) - temple at sunset
    (
        "uluwatu-temple-01.jpg",
        "https://images.squarespace-cdn.com/content/v1/53b3ff8ce4b0e73ebe0b6f2b/1460972385131-6BN9DVP5MAUQGC37ETGY/GOPR2838.JPG",
        "2500w",
    ),
    # Screen Shot 2016-04-18 at 19.41.59.png (3360x2100)
    (
        "uluwatu-sunset-01.jpg",
        "https://images.squarespace-cdn.com/content/v1/53b3ff8ce4b0e73ebe0b6f2b/1460972565563-RQPH97J14J0C5S11JDUT/Screen+Shot+2016-04-18+at+19.41.59.png",
        "2500w",
    ),
    # GOPR2840.JPG (4000x3000)
    (
        "uluwatu-temple-02.jpg",
        "https://images.squarespace-cdn.com/content/v1/53b3ff8ce4b0e73ebe0b6f2b/1460972414866-GEDU9RORN7O4BBU0CHHX/GOPR2840.JPG",
        "2500w",
    ),

    # ─── GILI TRAWANGAN ───────────────────────────────────────────────────────
    # into_water (360x202) - scuba diving image
    (
        "gili-diving-01.jpg",
        "https://images.squarespace-cdn.com/content/v1/53b3ff8ce4b0e73ebe0b6f2b/1460993047144-6WJ7H24O71GKMN0HXITQ/into_water",
        "1500w",
    ),
    # GOPR2875.JPG (4000x3000) - underwater
    (
        "gili-underwater-01.jpg",
        "https://images.squarespace-cdn.com/content/v1/53b3ff8ce4b0e73ebe0b6f2b/1460993861060-5R7OCO6CIQA9YVHJVMY8/GOPR2875.JPG",
        "2500w",
    ),
    # GOPR2884.JPG (4000x3000)
    (
        "gili-underwater-02.jpg",
        "https://images.squarespace-cdn.com/content/v1/53b3ff8ce4b0e73ebe0b6f2b/1460993919808-ACJVDGWXJY1E81HKAZ6I/GOPR2884.JPG",
        "2500w",
    ),
    # GOPR2882.JPG (4000x3000)
    (
        "gili-underwater-03.jpg",
        "https://images.squarespace-cdn.com/content/v1/53b3ff8ce4b0e73ebe0b6f2b/1460993893223-ATVFU1QN1U3V2KFHKWZT/GOPR2882.JPG",
        "2500w",
    ),
    # GOPR2885.JPG (4000x3000)
    (
        "gili-underwater-04.jpg",
        "https://images.squarespace-cdn.com/content/v1/53b3ff8ce4b0e73ebe0b6f2b/1460993945923-4ZYXOV1KM8014VP0PE2S/GOPR2885.JPG",
        "2500w",
    ),
    # GOPR2886.JPG (4000x3000)
    (
        "gili-underwater-05.jpg",
        "https://images.squarespace-cdn.com/content/v1/53b3ff8ce4b0e73ebe0b6f2b/1460993989664-7MHM8BQH4PY7DRC9ZIBK/GOPR2886.JPG",
        "2500w",
    ),

    # ─── AMED & TULAMBEN ──────────────────────────────────────────────────────
    # image-asset.jpeg (4000x3000) - USS Liberty dive
    (
        "amed-dive-01.jpg",
        "https://images.squarespace-cdn.com/content/v1/53b3ff8ce4b0e73ebe0b6f2b/1461411586186-198VDSP6CM8WZ8W2DODR/image-asset.jpeg",
        "2500w",
    ),
    # image-asset.png (1080x1080) - amed scenery
    (
        "amed-scenery-01.jpg",
        "https://images.squarespace-cdn.com/content/v1/53b3ff8ce4b0e73ebe0b6f2b/1461410486436-SD9HE15EKPIOYNGN8CUE/image-asset.png",
        "2500w",
    ),
    # image-asset.jpeg (4000x3000) - second dive image
    (
        "amed-dive-02.jpg",
        "https://images.squarespace-cdn.com/content/v1/53b3ff8ce4b0e73ebe0b6f2b/1461411101064-X6SQJYXVUIK8C3QZT3W6/image-asset.jpeg",
        "2500w",
    ),

    # ─── FROM NORTH TO SOUTH ─────────────────────────────────────────────────
    # image-asset.png (1838x1284) - route map
    (
        "north-south-map-01.jpg",
        "https://images.squarespace-cdn.com/content/v1/53b3ff8ce4b0e73ebe0b6f2b/1461412851487-LX4NV6NHZ1HSGOOIKQZY/image-asset.png",
        "2500w",
    ),
    # image-asset.jpeg (11022x1451) - Tirta Gangga panorama
    (
        "north-south-tirta-gangga-panorama.jpg",
        "https://images.squarespace-cdn.com/content/v1/53b3ff8ce4b0e73ebe0b6f2b/1461413934925-XTEL7WB5FYEGJ44NLGVI/image-asset.jpeg",
        "2500w",
    ),
    # 12120021_813374652101326_7505756448671689624_o.jpg (918x1632) - portraits with drivers
    (
        "north-south-drivers-01.jpg",
        "https://images.squarespace-cdn.com/content/v1/53b3ff8ce4b0e73ebe0b6f2b/1461414526290-I5VXK8Y9B2CXZT9LT7TY/12120021_813374652101326_7505756448671689624_o.jpg",
        "1500w",
    ),
    # 12068402_813374608767997_1098664453285967238_o.jpg (918x1632)
    (
        "north-south-drivers-02.jpg",
        "https://images.squarespace-cdn.com/content/v1/53b3ff8ce4b0e73ebe0b6f2b/1461414523142-02U8Z0ME5XGVPF4V0Y62/12068402_813374608767997_1098664453285967238_o.jpg",
        "1500w",
    ),
    # 12113548_813374542101337_8048848373735438791_o.jpg (918x1632)
    (
        "north-south-drivers-03.jpg",
        "https://images.squarespace-cdn.com/content/v1/53b3ff8ce4b0e73ebe0b6f2b/1461414528731-Q5DD0JMOPROF373RA2RJ/12113548_813374542101337_8048848373735438791_o.jpg",
        "1500w",
    ),

    # ─── BESAKIH TEMPLE ───────────────────────────────────────────────────────
    # image-asset.jpeg (4000x3000) - temple view 1
    (
        "besakih-temple-01.jpg",
        "https://images.squarespace-cdn.com/content/v1/53b3ff8ce4b0e73ebe0b6f2b/1461415571579-RF5IVS7I3WB73SUXN4PX/image-asset.jpeg",
        "2500w",
    ),
    # image-asset.jpeg (3096x4128) - dressed in sarong, portrait
    (
        "besakih-temple-02.jpg",
        "https://images.squarespace-cdn.com/content/v1/53b3ff8ce4b0e73ebe0b6f2b/1461415644785-521TL2N9G2JK1LI2CIKJ/image-asset.jpeg",
        "2500w",
    ),

    # ─── LIFE HACKS ───────────────────────────────────────────────────────────
    # image-asset.jpeg (1080x1320) - 50 cent meal
    (
        "life-hacks-street-food-01.jpg",
        "https://images.squarespace-cdn.com/content/v1/53b3ff8ce4b0e73ebe0b6f2b/1461415825768-X0ZOLXAIKLF6W6AZWSAW/image-asset.jpeg",
        "2500w",
    ),
]


def download_image(filename, base_url, resolution):
    """Download a single image at the requested resolution."""
    dest = os.path.join(OUTPUT_DIR, filename)

    if os.path.exists(dest):
        size = os.path.getsize(dest)
        if size > 10000:
            print(f"  SKIP  {filename} (already exists, {size:,} bytes)")
            return True

    url = f"{base_url}?format={resolution}"
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/120.0.0.0 Safari/537.36"
        ),
        "Referer": "https://www.kristianeboe.me/",
    }

    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=30) as response:
            data = response.read()
        with open(dest, "wb") as f:
            f.write(data)
        print(f"  OK    {filename}  ({len(data):,} bytes)  [{resolution}]")
        return True
    except urllib.error.HTTPError as e:
        # Try without format param as fallback
        if e.code in (403, 404):
            try:
                req2 = urllib.request.Request(base_url, headers=headers)
                with urllib.request.urlopen(req2, timeout=30) as response:
                    data = response.read()
                with open(dest, "wb") as f:
                    f.write(data)
                print(f"  OK    {filename}  ({len(data):,} bytes)  [original]")
                return True
            except Exception as e2:
                print(f"  FAIL  {filename} — {e2}")
                return False
        else:
            print(f"  FAIL  {filename} — HTTP {e.code}")
            return False
    except Exception as e:
        print(f"  FAIL  {filename} — {e}")
        return False


def main():
    print(f"Downloading {len(IMAGES)} images to {OUTPUT_DIR}\n")
    ok = 0
    fail = 0
    for filename, base_url, resolution in IMAGES:
        result = download_image(filename, base_url, resolution)
        if result:
            ok += 1
        else:
            fail += 1
        time.sleep(0.3)  # be polite to the CDN

    print(f"\nDone: {ok} succeeded, {fail} failed.")

    # List what we have now
    print("\nFiles in output directory:")
    for f in sorted(os.listdir(OUTPUT_DIR)):
        size = os.path.getsize(os.path.join(OUTPUT_DIR, f))
        print(f"  {f:50s}  {size:>10,} bytes")


if __name__ == "__main__":
    main()
