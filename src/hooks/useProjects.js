import { useEffect, useState } from 'react'
import { client as sanityClient } from '../sanityClient'

const query = `*[_type == "project" && visibleOnSite == true] | order(displayOrder asc){
  _id,
  title,
  type,
  status,
  description,
  director,
  producer,
  "image": mainImage,
  trailerUrl,
  festivalSelections,
  pressQuotes
}`

export default function useProjects() {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true

    sanityClient.fetch(query)
      .then((data) => {
        if (active) {
          setProjects(data || [])
          setIsLoading(false)
        }
      })
      .catch(() => {
        if (active) {
          setProjects([])
          setIsLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [])

  return { projects, isLoading }
}
