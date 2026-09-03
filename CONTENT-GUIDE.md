# Content guide

How to change images and text on stillroomproductions.com yourself, in Sanity.
No developer needed for anything in this guide.

Changes appear on the live site about a minute after you press **Publish**.

---

## 1. Recommended image sizes

Upload the largest version you have — the site makes its own smaller copies
automatically, and a too-small image cannot be improved after the fact.

| Where | Shape on the site | Upload at least | Ideal |
|---|---|---|---|
| Homepage background | Fills the whole screen | 1920 × 1080 | 2560 × 1440 |
| Work listing thumbnail | Wide landscape (16:10) | 1600 × 1000 | 2000 × 1250 |
| Film page stills | Shown at their own shape | 1600 wide | 2400 wide |
| **Film poster** | **Portrait, shown whole** | **1000 × 1500** | **1400 × 2000** |
| About photograph | Landscape (3:2) | 1200 × 800 | 1800 × 1200 |

JPG for photographs, PNG for posters with text. Keep files under about 5MB.

---

## 2. The hotspot — choosing what stays in frame

Some slots on the site are a **fixed shape**. The homepage background fills
the screen; the Work listing is wide landscape. When your photo is a different
shape to the slot, something has to be cut off.

By default the site keeps the middle, which is why portraits sometimes lost
the top of someone's head. The hotspot lets you choose what is kept instead.

**To set one:**

1. Upload your image as usual.
2. Hover over it and click the **crop icon**.
3. Drag the **circle** over the part that must always stay visible — usually
   a face.
4. Optionally drag the **rectangle** to trim the edges.
5. Press **Publish**.

The site keeps that point in frame at every screen size, on desktop and
mobile.

**This now works on every page.** It previously worked only on the Work
listing and was silently ignored on film pages, the About photo and the
homepage — so a picture you fixed in one place still looked wrong in another.

**Where the hotspot matters:**

| Slot | Does the hotspot do anything? |
|---|---|
| Homepage background | **Yes** — fills the screen, so it crops |
| Work listing thumbnail | **Yes** — forced to a wide shape |
| About photograph | **Yes** — forced to landscape |
| Film page stills | No — shown at their natural shape |
| Film poster | No — always shown whole, never cropped |

---

## 3. Film posters

Your posters are the **vertical** designs with the film title and credits on
them. They are not the same as film stills, and the site treats them
differently.

**To add one:** open the film under **Films & Projects**, find
**Film Poster (portrait)**, upload, and publish.

Where it appears on the film page:

```
1. Hero still (landscape)  +  cast & credits
2. POSTER  (portrait, centred)      ← new
3. Gallery stills
```

The site guarantees the poster is:

- shown at its **own shape**, never stretched or squashed
- **never cropped** — the title and credits block always stay readable
- **never used** as the hero image or a thumbnail
- centred, and scaled down on smaller screens

Put only portrait posters here. A landscape image will still display, but it
will look out of place in a slot designed for a vertical poster.

---

## 4. Trailer or teaser video

Each film can show one video, above the poster.

**To add one:** open the film under **Films & Projects**, then:

1. Paste the Vimeo or YouTube link into **Trailer / Teaser URL**
2. Pick **Trailer** or **Teaser** under **Video Heading** — this is the
   wording shown above the video
3. Publish

Leave the URL empty and **no video section appears at all** — no gap, no
placeholder.

Any normal share link works: `vimeo.com/123456789`, `youtu.be/abc123`, a
YouTube watch link, or a link with a start time or share code on the end.
An unlisted Vimeo video works too, as long as you copy the full link
including its private code.

The video **never plays on its own** — a visitor has to press play.

## 5. Film stills

Each film takes up to 3 images under **Project Images**:

- the **first** is the thumbnail on the Work listing (set a hotspot on this one)
- the **others** appear on the film's own page at their natural shape

Leaving a slot empty is fine — the site skips it rather than leaving a gap.

---

## 6. Homepage and About images

In the Sanity sidebar you will see **Homepage**, **About Page** and
**Contact Page** as single entries. Click one and it opens straight into the
edit form.

Both the homepage background and the About photograph are now set and fully
under your control — upload a new image in the Studio at any time and it
replaces what is there.

The images currently in place were taken from the existing photography, as
starting points. Replace them whenever you have something you prefer, and set
a hotspot on each so the framing is yours.

All 8 film posters are uploaded and appear on their film pages.

---

## 7. What still needs a developer

- The logo in the site header (drawn in code, not an image file)
- The browser-tab icon
- The picture shown when a link to the site is shared on WhatsApp or LinkedIn

These rarely change, which is why they are not wired to Sanity.
