# Changing images yourself

Everything below is done in Sanity. No developer needed.

## Setting where an image crops (the "hotspot")

Every image slot on the site is a fixed shape — the Work listing is wide
landscape, for example. When your photograph is a different shape to the
slot, something has to be cut off. By default the site keeps the middle,
which is why portraits sometimes lost the top of someone's head.

The hotspot is how you choose what is kept instead:

1. Open the film (or page) in Sanity and upload your image as usual.
2. Hover the image and click the **crop icon**.
3. Drag the **circle** over the part that must always stay visible — usually
   a face.
4. Optionally drag the **rectangle** to trim the edges.
5. Publish.

The site keeps that point in frame at every screen size, desktop and mobile.

**This now works everywhere.** It previously worked only on the Work listing
page and was silently ignored on film pages, the About photo and the homepage
background — so an image fixed in one place still looked wrong in another.
That inconsistency is fixed.

Changes appear on the site within about a minute of publishing.

## The Homepage and About images

In the Sanity sidebar you will now see **Homepage**, **About Page**,
**Contact Page** and **Site Settings** as single entries. Click one and it
opens straight into the edit form.

Previously these were set up as if you might have many homepages, so they
appeared as empty lists rather than editable pages — and none had ever been
created. That is why the homepage background and About photograph could not
be changed from Sanity: there was no document to put them in, and the site
was falling back to images built into the code.

> **One-off setup step:** those page entries still need creating once, which
> requires a Sanity write token. Either run
> `scripts/createPageDocuments.mjs` (instructions are at the top of the file),
> or ask a developer to run it once. After that, everything is editable by
> you.

Until a homepage background is uploaded, the site uses a built-in fallback
image. The About section simply shows no photograph until you upload one —
it previously showed an unrelated stock photo of a hospital sign, which was
not something you could change.

## Film images

Each film takes up to 3 images:

- the **first** is used on the Work listing page
- the **others** appear on the film's own page

Set a hotspot on each one. Leaving an image slot empty is fine — the site
skips it rather than leaving a gap.

One previous behaviour is worth knowing about: the film "The Consultation"
had special handling written into the code that picked different images for
it, triggered by matching its title exactly. Renaming the film in Sanity
would have silently changed its page. That has been removed — all films now
behave the same way, and the ordering comes from your image list.

## What still needs a developer

- The logo in the site header (drawn in code, not an image file)
- The browser-tab icon
- The picture shown when someone shares a link to the site on WhatsApp,
  LinkedIn or Slack

These rarely change, which is why they are not wired to Sanity.

## Housekeeping

The project carries about 49MB of old image files that nothing uses — 17 of
the 19 files in `public/images`, including several duplicates. They do not
slow the site down for visitors, but they make the project confusing for any
future developer. They have been left in place: some look like earlier
versions of your film artwork, so please confirm you have the originals
stored safely before anyone deletes them.
