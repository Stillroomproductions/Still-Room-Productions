import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure, singletonIds, singletonTypes} from './structure'

export default defineConfig({
  name: 'default',
  title: 'still-room-productions',

  projectId: 'tk6o47ip',
  dataset: 'production',

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
