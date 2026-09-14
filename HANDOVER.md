# Ownership & handover checklist

Two websites, both built with the same tools (Next.js + Sanity, hosted on
Vercel):

| | Still Room Productions | Gerald Gyimah |
|---|---|---|
| Website | stillroomproductions.com | geraldgyimah.com |
| Sanity project ID | `tk6o47ip` | `yi82r3c7` |
| Code repository | github.com/Stillroomproductions/Still-Room-Productions | not yet located |

**These are two separate Sanity projects.** Checking one does not cover the
other — every check below needs doing twice.

---

## What was checked in the code, and what it showed

These are settled — no action needed:

- **No passwords, API keys or access tokens** anywhere in the code, and none
  in the full history either. Nothing was ever committed and later removed.
- **No previous developer's name or email** anywhere. The only email in the
  code is `info@stillroomproductions.com`.
- **No paid or private code libraries.** Everything used is free, public and
  industry-standard, so any competent developer can pick this up.
- **No analytics or tracking** installed, so there is no visitor data sitting
  in someone else's account. (It also means no visitor data is being
  collected at all — worth adding later if useful.)
- **No unusual deployment configuration** pointing anywhere odd.

## What could NOT be checked from the code

Ownership lives in **account logins**, which are invisible to the code. This
is the real handover risk, and each item below can only be settled by logging
in. This is the whole list.

### 1. Sanity — highest priority
Holds all text and every film image for both sites.

- Go to https://www.sanity.io/manage and log in with your own email.
- Confirm you can see **both** projects: `tk6o47ip` and `yi82r3c7`.
- Open each project's **Members** tab and confirm **you are Administrator**.
- Remove any previous developer who no longer needs access.

If a project is not listed when you log in, it sits inside a developer's
personal Sanity account and must be transferred to you.

### 2. Vercel (hosting) — controls whether the sites are online
- Log in at https://vercel.com and confirm both sites appear under your
  account, and that you are **Owner** of the team they belong to.
- While there, check **Settings → Environment Variables** for each site.
  One value, `REVALIDATION_SECRET`, is a password chosen by whoever set the
  site up. If a previous developer chose it, regenerate it — the same way
  you would change the locks on a house you have just bought.

### 3. GitHub — where the code lives
- The Still Room code is under an organisation account named
  "Stillroomproductions", which is the right arrangement.
- Confirm **you are an Owner** of that organisation, not just a member. If a
  developer's personal account is the sole owner, they can lock you out.
- Locate the repository for geraldgyimah.com — it was not found during this
  work and its ownership is entirely unverified.

### 4. Domain names — the most damaging to lose
- Find which registrar holds `stillroomproductions.com` and
  `geraldgyimah.com` (GoDaddy, Namecheap, 123-Reg, etc.).
- Confirm each account is in your name, with your email as the contact.
- Turn on auto-renew. A lapsed domain is far harder to recover than a
  website.

### 5. Google
- Check whether a Google Search Console or Analytics property already exists
  for either domain under a developer's login. There is an empty slot for a
  Search Console verification code in the settings, which suggests this may
  have been set up at some point.

---

## Suggested order

1. Sanity administrator access on **both** projects — your content lives there.
2. Domain registrar accounts — hardest to recover if lost.
3. Vercel ownership, and regenerate `REVALIDATION_SECRET`.
4. GitHub organisation ownership, and find the second repository.
5. Google properties.

Steps 1–3 are the ones that would genuinely disrupt the business if they went
wrong. They take about half an hour in total.
