'use client'

import { useState, useEffect } from 'react'
import { useAR } from '@/context/ARContext'
import { motion } from 'framer-motion'
import { CameraIcon, XMarkIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline'

interface ARControlsProps {
  isVisible: boolean
  onToggle: () => void
  isLoading: boolean
}

export function ARControls({ isVisible, onToggle, isLoading }: ARControlsProps) {
  const [showHelp, setShowHelp] = useState(false)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const { currentSceneData, setDetectedObjects } = useAR()

  useEffect(() => {
    if (isCameraActive) {
      // Initialize camera and AR detection
      const initializeCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true })
          const video = document.createElement('video')
          video.srcObject = stream
          video.play()

          // Process video frames for AR detection
          const processFrame = () => {
            if (video.readyState === video.HAVE_ENOUGH_DATA) {
              // Process frame for object detection
              // This is where you would integrate with TensorFlow.js or other AR libraries
              // For now, we'll just simulate detection
              setDetectedObjects([
                {
                  id: 1,
                  type: 'actor',
                  name: 'Sample Actor',
                  position: { x: 50, y: 50 },
                  confidence: 0.95
                }
              ])
            }
            requestAnimationFrame(processFrame)
          }
          processFrame()
        } catch (error) {
          console.error('Error accessing camera:', error)
        }
      }

      initializeCamera()
    }
  }, [isCameraActive, setDetectedObjects])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-end space-y-4"
      >
        {/* Main AR Controls */}
        <div className="flex space-x-4">
          <button
            onClick={() => setIsCameraActive(!isCameraActive)}
            className={`p-3 rounded-full ${
              isCameraActive ? 'bg-red-600' : 'bg-gray-800'
            } text-white hover:bg-opacity-80 transition`}
          >
            <CameraIcon className="h-6 w-6" />
          </button>

          <button
            onClick={onToggle}
            className="p-3 rounded-full bg-gray-800 text-white hover:bg-opacity-80 transition"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          <button
            onClick={() => setShowHelp(!showHelp)}
            className="p-3 rounded-full bg-gray-800 text-white hover:bg-opacity-80 transition"
          >
            <QuestionMarkCircleIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Help Panel */}
        {showHelp && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black bg-opacity-90 text-white p-4 rounded-lg max-w-xs"
          >
            <h3 className="font-bold mb-2">AR X-Ray Help</h3>
            <ul className="text-sm space-y-2">
              <li>• Point your camera at the screen to activate AR features</li>
              <li>• Tap on AR markers to see more information</li>
              <li>• Use gestures to interact with AR elements</li>
              <li>• Enable/disable specific AR features in settings</li>
            </ul>
          </motion.div>
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-black bg-opacity-90 text-white p-4 rounded-lg"
          >
            <p className="text-sm">Loading AR features...</p>
          </motion.div>
        )}

        {/* AR Scene Information */}
        {currentSceneData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black bg-opacity-90 text-white p-4 rounded-lg max-w-xs"
          >
            <h3 className="font-bold mb-2">Current Scene</h3>
            <p className="text-sm">{currentSceneData.description}</p>
            <div className="mt-2 space-y-1">
              {currentSceneData.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
} 