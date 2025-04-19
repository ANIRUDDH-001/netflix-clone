'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface VideoPlayerContextType {
  currentTime: number
  duration: number
  isPlaying: boolean
  volume: number
  isMuted: boolean
  playbackRate: number
  setCurrentTime: (time: number) => void
  setDuration: (duration: number) => void
  setIsPlaying: (isPlaying: boolean) => void
  setVolume: (volume: number) => void
  setIsMuted: (isMuted: boolean) => void
  setPlaybackRate: (rate: number) => void
  togglePlay: () => void
  toggleMute: () => void
  seekTo: (time: number) => void
}

const VideoPlayerContext = createContext<VideoPlayerContextType | undefined>(undefined)

export function VideoPlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const seekTo = (time: number) => {
    setCurrentTime(time)
  }

  const value = {
    currentTime,
    duration,
    isPlaying,
    volume,
    isMuted,
    playbackRate,
    setCurrentTime,
    setDuration,
    setIsPlaying,
    setVolume,
    setIsMuted,
    setPlaybackRate,
    togglePlay,
    toggleMute,
    seekTo
  }

  return <VideoPlayerContext.Provider value={value}>{children}</VideoPlayerContext.Provider>
}

export function useVideoPlayer() {
  const context = useContext(VideoPlayerContext)
  if (context === undefined) {
    throw new Error('useVideoPlayer must be used within a VideoPlayerProvider')
  }
  return context
} 