/**
 * Studio navigation.
 *
 * Hero, About, Contact and Work are single pages, not collections. Left as
 * ordinary document types they show up as empty lists with a "create new"
 * button, which is why no hero or about document ever existed — the site
 * silently fell back to hardcoded images instead.
 *
 * Listing them as singletons means each one is always present, opens straight
 * into the edit form, and cannot be duplicated by accident.
 */

const SINGLETONS = [
  { id: 'hero', type: 'hero', title: 'Homepage' },
  { id: 'about', type: 'about', title: 'About Page' },
  { id: 'contact', type: 'contact', title: 'Contact Page' },
  { id: 'siteSettings', type: 'siteSettings', title: 'Site Settings' },
]

export const singletonIds = new Set(SINGLETONS.map((s) => s.id))
export const singletonTypes = new Set(SINGLETONS.map((s) => s.type))

export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      ...SINGLETONS.map(({ id, type, title }) =>
        S.listItem()
          .title(title)
          .id(id)
          .child(S.document().schemaType(type).documentId(id).title(title))
      ),
      S.divider(),
      S.documentTypeListItem('project').title('Films & Projects'),
      S.divider(),
      // Anything not covered above (e.g. legacy types) stays reachable.
      ...S.documentTypeListItems().filter(
        (item) => !['hero', 'about', 'contact', 'siteSettings', 'project'].includes(item.getId())
      ),
    ])
