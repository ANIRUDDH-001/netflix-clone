'use client'

import { useRef, useState, useEffect } from 'react'
import { useVideoPlayer } from '@/context/VideoPlayerContext'
import { useAR } from '@/context/ARContext'
import { motion } from 'framer-motion'
import { XMarkIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline'
import { PlayIcon, PauseIcon, VolumeUpIcon, VolumeOffIcon } from '@heroicons/react/24/solid'

interface VideoPlayerProps {
  content: any
  onClose: () => void
}

export function VideoPlayer({ content, onClose }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const { 
    currentTime, 
    duration, 
    isPlaying, 
    volume, 
    isMuted,
    setCurrentTime,
    setDuration,
    setIsPlaying,
    setVolume,
    setIsMuted,
    togglePlay,
    toggleMute,
    seekTo
  } = useVideoPlayer()
  const { isARActive, currentSceneData } = useAR()

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = currentTime
      videoRef.current.volume = volume
      videoRef.current.muted = isMuted
      
      if (isPlaying) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }, [currentTime, volume, isMuted, isPlaying])

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    seekTo(time)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={() => setShowControls(true)}
    >
      <video
        ref={videoRef}
        src={content.videoUrl}
        className="w-full h-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={togglePlay}
      />

      {/* AR Overlay */}
      {isARActive && currentSceneData && (
        <div className="absolute inset-0 pointer-events-none">
          {/* AR Markers and Information */}
          {currentSceneData.markers.map((marker: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute"
              style={{
                left: `${marker.x}%`,
                top: `${marker.y}%`,
              }}
            >
              <div className="bg-black bg-opacity-75 text-white p-2 rounded-lg max-w-xs">
                <h3 className="font-bold">{marker.title}</h3>
                <p className="text-sm">{marker.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showControls && isHovered ? 1 : 0 }}
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
      >
        <div className="flex items-center space-x-4">
          <button onClick={togglePlay}>
            {isPlaying ? (
              <PauseIcon className="h-8 w-8 text-white" />
            ) : (
              <PlayIcon className="h-8 w-8 text-white" />
            )}
          </button>

          <div className="flex items-center space-x-2">
            <button onClick={toggleMute}>
              {isMuted ? (
                <VolumeOffIcon className="h-6 w-6 text-white" />
              ) : (
                <VolumeUpIcon className="h-6 w-6 text-white" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24"
            />
          </div>

          <div className="flex-1">
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="w-full"
            />
          </div>

          <button onClick={toggleFullscreen}>
            <ArrowsPointingOutIcon className="h-6 w-6 text-white" />
          </button>
        </div>
      </motion.div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300"
      >
        <XMarkIcon className="h-8 w-8" />
      </button>
    </div>
  )
} 