import hero from './hero'
import about from './about'
import contact from './contact'
import project from './project'
import siteSettings from './siteSettings'

// 'film' and 'work' were removed: both had zero documents in the dataset and
// nothing on the site read them. The site's films are 'project' documents.
// Two overlapping types for the same thing made the Studio confusing to use.
export const schemaTypes = [hero, about, contact, project, siteSettings]
