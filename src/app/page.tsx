'use client'

import { useState, useEffect } from 'react'
import { useAR } from '@/context/ARContext'
import { useVideoPlayer } from '@/context/VideoPlayerContext'
import { motion } from 'framer-motion'
import { Hero } from '@/components/Hero'
import { Row } from '@/components/Row'
import { Navbar } from '@/components/Navbar'
import { ARControls } from '@/components/ARControls'
import { VideoPlayer } from '@/components/VideoPlayer'

export default function Home() {
  const { isARActive, toggleAR, isLoading: isARLoading } = useAR()
  const { isPlaying } = useVideoPlayer()
  const [showPlayer, setShowPlayer] = useState(false)
  const [selectedContent, setSelectedContent] = useState(null)

  const handleContentSelect = (content: any) => {
    setSelectedContent(content)
    setShowPlayer(true)
  }

  return (
    <main className="relative min-h-screen bg-netflix-black">
      <Navbar />
      
      {!showPlayer ? (
        <>
          <Hero onSelect={handleContentSelect} />
          <div className="space-y-8 pb-20">
            <Row title="Trending Now" onSelect={handleContentSelect} />
            <Row title="Popular on Netflix" onSelect={handleContentSelect} />
            <Row title="Continue Watching" onSelect={handleContentSelect} />
            <Row title="New Releases" onSelect={handleContentSelect} />
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50"
        >
          <VideoPlayer
            content={selectedContent}
            onClose={() => setShowPlayer(false)}
          />
          {isARActive && (
            <ARControls
              isVisible={isPlaying}
              onToggle={toggleAR}
              isLoading={isARLoading}
            />
          )}
        </motion.div>
      )}
    </main>
  )
} 