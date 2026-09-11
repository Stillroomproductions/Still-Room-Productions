import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Still Room Productions — Independent Film Production'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{
        background: '#0a0a0a',
        width: '100%', height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px',
        fontFamily: 'Georgia, serif',
        position: 'relative',
      }}>
        {/* Top border line */}
        <div style={{ position: 'absolute', top: 60, left: 60, right: 60, height: 1, background: '#333' }} />

        {/* Logo mark placeholder */}
        <div style={{ color: '#ffffff', fontSize: 13, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 32, color: '#666' }}>
          ✦
        </div>

        {/* Company name */}
        <div style={{ color: '#ffffff', fontSize: 52, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 400, textAlign: 'center', lineHeight: 1.2 }}>
          Still Room Productions
        </div>

        {/* Tagline */}
        <div style={{ color: '#888', fontSize: 18, letterSpacing: '0.25em', marginTop: 24, textTransform: 'uppercase', textAlign: 'center' }}>
          Independent Film Production · London
        </div>

        {/* Bottom line */}
        <div style={{ position: 'absolute', bottom: 60, left: 60, right: 60, height: 1, background: '#333' }} />

        {/* URL */}
        <div style={{ position: 'absolute', bottom: 36, color: '#444', fontSize: 13, letterSpacing: '0.1em' }}>
          stillroomproductions.com
        </div>
      </div>
    ),
    { ...size }
  )
}
