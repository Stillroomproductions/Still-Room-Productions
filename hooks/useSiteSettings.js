'use client'

import { useEffect, useState } from 'react'
import { client } from '../lib/sanityClient'
import { getSiteSettings } from '../lib/queries'

/**
 * Client-side hook for fetching site settings.
 * NOTE: Primary data fetching is now done server-side in page components.
 * This hook is kept for any future client-only use cases.
 */
export default function useSiteSettings() {
  const [settings, setSettings] = useState({ aboutText: '' })

  useEffect(() => {
    let active = true

    client.fetch(getSiteSettings)
      .then((data) => {
        if (active && data) {
          setSettings({ aboutText: data.aboutText || '' })
        }
      })
      .catch(() => {
        if (active) {
          setSettings({ aboutText: '' })
        }
      })

    return () => {
      active = false
    }
  }, [])

  return settings
}
