import { useEffect, useState } from 'react'
import sanityClient from '../sanityClient'

const query = `*[_type == "siteSettings"][0]{
  aboutText
}`

export default function useSiteSettings() {
  const [settings, setSettings] = useState({ aboutText: '' })

  useEffect(() => {
    let active = true

    sanityClient.fetch(query)
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
