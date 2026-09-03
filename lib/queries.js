// ── Project queries (from old-code useProjects.js + project.js schema) ──
export const getAllProjects = `*[_type == "project" && visibleOnSite == true] | order(displayOrder asc){
  _id,
  title,
  type,
  status,
  description,
  director,
  producer,
  slug,
  "image": images[0]{
    ...,
    hotspot,
    crop
  },
  images[]{
    ...,
    hotspot,
    crop
  },
  cast,
  trailerUrl,
  trailerLabel,
  festivalSelections,
  pressQuotes,
  visibleOnSite,
  displayOrder
}`

export const getProjectBySlug = `*[_type == "project" && slug.current == $slug][0]{
  _id,
  _createdAt,
  _updatedAt,
  title,
  type,
  status,
  description,
  director,
  producer,
  genre,
  runtime,
  year,
  slug,
  images[]{
    ...,
    hotspot,
    crop
  },
  poster{
    ...,
    hotspot,
    crop
  },
  cast,
  trailerUrl,
  trailerLabel,
  festivalSelections,
  pressQuotes
}`

// ── Hero section (from hero.js schema) ──
export const getHero = `*[_type == "hero"][0]{
  heading,
  subheading,
  smallText,
  ctaText,
  ctaLink,
  heroImage{
    ...,
    hotspot,
    crop
  }
}`

// ── About page (from about.js schema) ──
export const getAbout = `*[_type == "about"][0]{
  title,
  content,
  image{
    ...,
    hotspot,
    crop
  },
  imageCaption
}`

// ── Contact page (from contact.js schema) ──
export const getContact = `*[_type == "contact"][0]{
  title,
  email,
  location,
  phone,
  message,
  socialLinks
}`

// ── Site settings (from siteSettings.js schema) ──
export const getSiteSettings = `*[_type == "siteSettings"][0]{
  aboutText
}`
