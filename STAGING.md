# Staging setup

Two datasets in the same Sanity project, so content can be changed and
reviewed without touching the live site.

| Dataset | Used by | Visible to the public? |
|---|---|---|
| `production` | stillroomproductions.com | **Yes — live** |
| `staging` | local dev / preview | No |

Both datasets sit in project `tk6o47ip` and **share one image store**, so a
picture uploaded in either is available to both. Only the documents differ.

---

## One-off step still required

The `staging` dataset does not exist yet. Creating one needs **Administrator**
rights on the Sanity project; the token in `.env.local` is an Editor, which
can read and write content but not create datasets.

Create it either way:

**In the browser** — [sanity.io/manage/project/tk6o47ip/datasets](https://www.sanity.io/manage/project/tk6o47ip/datasets)
→ *Add dataset* → name it `staging` → visibility **Public**.

**Or on the command line**, logged in as an administrator:

```bash
cd studio
npx sanity login
npx sanity dataset create staging --visibility public
```

Then copy the current live content across:

```bash
node scripts/syncDataset.mjs --from production --to staging
```

Everything else is already wired up.

---

## Daily use

**Editing content safely (the normal case):**

```bash
cd studio
npm run dev          # opens on :3333, pointed at staging
```

Anything changed here goes to `staging`. The live site does not move.

**Seeing those changes on the website:**

```bash
npm run dev:staging  # website on :3000, reading staging
```

**Editing live content deliberately:**

```bash
cd studio
npm run dev:production
```

The dataset in use is shown in the Studio's top bar. Check it before editing.

---

## Promoting staging to live

Once the changes look right in staging:

```bash
node scripts/syncDataset.mjs --from staging --to production --allow-production
```

The `--allow-production` flag is required on purpose: the script refuses to
write to the live dataset without it, so a mistyped command cannot overwrite
the real site.

Add `--dry-run` first to list exactly what would be copied, without writing
anything.

> **Note:** this copies *every* document, so anything deleted in staging but
> still present in production will come back. For a big content change, prefer
> re-syncing production → staging first so both start from the same place.

---

## Which dataset am I on?

| Command | Dataset |
|---|---|
| `studio: npm run dev` | staging |
| `studio: npm run dev:production` | production |
| `npm run dev` (website) | production |
| `npm run dev:staging` (website) | staging |
| Deployed site (Vercel) | production |

The deployed site is unaffected by all of this — it reads
`NEXT_PUBLIC_SANITY_DATASET` from the Vercel environment settings, which stays
`production`.
