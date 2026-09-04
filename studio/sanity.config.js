import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure, singletonIds, singletonTypes} from './structure'

export default defineConfig({
  name: 'default',
  title: 'still-room-productions',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'tk6o47ip',
  // Which dataset this Studio edits. Defaults to production so nothing
  // changes for anyone who has not set the variable; set
  // SANITY_STUDIO_DATASET=staging (see studio/.env.staging) to work safely
  // against staging instead of the live site's content.
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
    // Keep the one-off pages out of the global "create new" menu so they
    // cannot be duplicated — they are edited in place from the sidebar.
    templates: (prev) => prev.filter((t) => !singletonTypes.has(t.schemaType)),
  },

  document: {
    // Singletons can be edited and published, but not created or deleted.
    actions: (prev, {schemaType, documentId}) =>
      singletonTypes.has(schemaType) || singletonIds.has(documentId)
        ? prev.filter(({action}) => !['duplicate', 'delete', 'unpublish'].includes(action))
        : prev,
  },
})
