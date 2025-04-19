'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import * as tf from '@tensorflow/tfjs'
import * as posenet from '@tensorflow-models/posenet'

interface ARContextType {
  isARActive: boolean
  toggleAR: () => void
  currentSceneData: any
  setCurrentSceneData: (data: any) => void
  detectedObjects: any[]
  setDetectedObjects: (objects: any[]) => void
  isLoading: boolean
  error: string | null
}

const ARContext = createContext<ARContextType | undefined>(undefined)

export function ARProvider({ children }: { children: React.ReactNode }) {
  const [isARActive, setIsARActive] = useState(false)
  const [currentSceneData, setCurrentSceneData] = useState(null)
  const [detectedObjects, setDetectedObjects] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [net, setNet] = useState<posenet.PoseNet | null>(null)

  useEffect(() => {
    async function loadModels() {
      try {
        setIsLoading(true)
        await tf.ready()
        const loadedNet = await posenet.load({
          architecture: 'MobileNetV1',
          outputStride: 16,
          inputResolution: { width: 640, height: 480 },
          multiplier: 0.75
        })
        setNet(loadedNet)
      } catch (err) {
        setError('Failed to load AR models')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadModels()
  }, [])

  const toggleAR = () => {
    setIsARActive(!isARActive)
  }

  const value = {
    isARActive,
    toggleAR,
    currentSceneData,
    setCurrentSceneData,
    detectedObjects,
    setDetectedObjects,
    isLoading,
    error
  }

  return <ARContext.Provider value={value}>{children}</ARContext.Provider>
}

export function useAR() {
  const context = useContext(ARContext)
  if (context === undefined) {
    throw new Error('useAR must be used within an ARProvider')
  }
  return context
} 