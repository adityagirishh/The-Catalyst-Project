'use client'
import { useState, useEffect } from 'react'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import Landing from './components/Landing'
import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [showLanding, setShowLanding] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user has already seen the landing page
    const hasSeenLanding = sessionStorage.getItem('hasSeenLanding')
    if (hasSeenLanding === 'true') {
      setShowLanding(false)
    }
    setIsLoading(false)
  }, [])

  const handleEnterApp = () => {
    // Remember that user has seen the landing
    sessionStorage.setItem('hasSeenLanding', 'true')
    setShowLanding(false)
  }

  if (isLoading) {
    return (
      <html lang="en">
        <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh',
            background: '#000',
            color: '#fff',
            fontFamily: 'system-ui'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{
                width: '20px',
                height: '20px',
                border: '2px solid #4ecdc4',
                borderTop: '2px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              Loading...
            </div>
          </div>
          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
          <Analytics />
        </body>
      </html>
    )
  }

  return (
    <html lang="en">
      <head>
        <title>The Catalyst Project</title>
        <meta name="description" content="Exploring multidimensional optimization spaces with cutting-edge algorithms" />
        <meta name="generator" content="v0.app" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {showLanding ? (
          <Landing onEnterApp={handleEnterApp} />
        ) : (
          children
        )}
        <Analytics />
      </body>
    </html>
  )
}