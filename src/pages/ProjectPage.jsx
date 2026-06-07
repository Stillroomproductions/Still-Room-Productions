import { useState, useEffect } from 'react'
import { client } from '../sanityClient'
import { urlFor } from '../sanityClient'
import { MOCK_PROJECTS } from '../hooks/useProjects'

const query = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  type,
  status,
  description,
  slug,
  images,
  cast,
  trailerUrl,
  festivalSelections
}`

function getEmbedUrl(url) {
  if (!url) return null
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const id = url.split('v=')[1]?.split('&')[0] || url.split('/').pop()
    return `https://www.youtube.com/embed/${id}`
  }
  if (url.includes('vimeo.com')) {
    const id = url.split('/').pop()
    return `https://player.vimeo.com/video/${id}`
  }
  return null
}

export default function ProjectPage({ slug, onBack }) {
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(query, { slug })
      .then(data => {
        if (data) {
          setProject(data)
        } else {
          const mock = MOCK_PROJECTS.find(p => p.slug?.current === slug)
          setProject(mock || null)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Project fetch failed:', err)
        const mock = MOCK_PROJECTS.find(p => p.slug?.current === slug)
        setProject(mock || null)
        setLoading(false)
      })
    window.scrollTo(0, 0)
  }, [slug])

  if (loading) return <div>Loading...</div>
  if (!project) return <div>Project not found</div>

  const embedUrl = getEmbedUrl(project.trailerUrl)

  return (
    <div id="project-detail" style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      <div className="container" style={{ paddingTop: '80px' }}>

        {/* Back link */}
        <button onClick={onBack} className="back-link" style={{ background: 'none', border: 'none', color: '#fff', fontSize: '14px', cursor: 'pointer', marginBottom: '40px', padding: 0 }}>
          ←   Work
        </button>

        {/* Status */}
        <div className="project-status" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px', opacity: 0.7 }}>
          SHORT FILM
        </div>

        {/* Title */}
        <h1 className="project-title" style={{ fontSize: '48px', fontWeight: 300, letterSpacing: '-1px', marginBottom: '16px', lineHeight: 1.2 }}>
          {project.title}
        </h1>

        {/* Written & Directed credit */}
        <p style={{
          fontSize: '13px',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#7a6e5f',
          marginBottom: '32px',
          fontFamily: '"Barlow Condensed", sans-serif',
          fontWeight: 200,
        }}>
          Written & Directed by Gerald Gyimah
        </p>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '40px' }} />

        {/* Synopsis */}
        {project.description && (
          <div className="project-synopsis" style={{ fontSize: '16px', lineHeight: 1.8, marginBottom: '48px', maxWidth: '800px', opacity: 0.9 }}>
            {project.description}
          </div>
        )}

        {/* First image (main film still) */}
        {project.images?.[0] && (
          <div className="project-hero-image" style={{ marginBottom: '100px', aspectRatio: '16/9', overflow: 'hidden' }}>
            <img src={urlFor(project.images[0]).url()} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}

        {/* Cast */}
        {project.cast?.length > 0 && (
          <div className="project-cast" style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px', opacity: 0.7 }}>
              Cast
            </h2>
            {project.cast.map((member, i) => (
              <div key={i} className="cast-member" style={{ fontSize: '16px', marginBottom: '12px', opacity: 0.9 }}>
                {member.actorName}{member.characterName ? ` as ${member.characterName}` : ''}
              </div>
            ))}
          </div>
        )}

        {/* Second image (people/characters) */}
        {project.images?.[1] && (
          <div className="project-image" style={{ marginBottom: '60px', aspectRatio: '16/9', overflow: 'hidden' }}>
            <img src={urlFor(project.images[1]).url()} alt={`${project.title} image 2`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}

        {/* Third image */}
        {project.images?.[2] && (
          <div className="project-image" style={{ marginBottom: '60px', aspectRatio: '16/9', overflow: 'hidden' }}>
            <img src={urlFor(project.images[2]).url()} alt={`${project.title} image 3`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}

        {/* Festival Selections */}
        {project.festivalSelections?.length > 0 && (
          <div className="project-festivals" style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px', opacity: 0.7 }}>
              Selected
            </h2>
            {project.festivalSelections.map((festival, i) => (
              <div key={i} className="festival" style={{ fontSize: '16px', marginBottom: '12px', opacity: 0.9 }}>
                {festival}
              </div>
            ))}
          </div>
        )}

        {/* Trailer */}
        {embedUrl && (
          <div className="project-trailer" style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px', opacity: 0.7 }}>
              Trailer
            </h2>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
              <iframe
                src={embedUrl}
                frameBorder="0"
                allow="autoplay; fullscreen"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              />
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
