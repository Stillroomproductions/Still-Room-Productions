import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'tk6o47ip',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production'
  },
  /**
   * Which hosted Studio `sanity deploy` publishes to.
   *
   * Two separate Studios, so reviewing content can never touch the live site:
   *   still-room-productions          -> production  (Gerald's live content)
   *   still-room-productions-staging  -> staging     (work under review)
   *
   * Driven by SANITY_STUDIO_DATASET, which the npm scripts set, so deploying
   * the staging Studio cannot overwrite the production one by accident.
   */
  studioHost:
    (process.env.SANITY_STUDIO_DATASET || 'production') === 'staging'
      ? 'still-room-productions-staging'
      : 'still-room-productions',

  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,

    // Pins each dataset's deploy to its existing hosted app, so `sanity
    // deploy` never has to prompt for which app id to use.
    appId:
      (process.env.SANITY_STUDIO_DATASET || 'production') === 'staging'
        ? 'ep276yet3w3z116szdl4w644'
        : 'iowp2cxnlbhsm39ifmw1ydh5',
  }
})
