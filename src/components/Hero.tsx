'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { PlayIcon, InformationCircleIcon } from '@heroicons/react/24/solid'

interface HeroProps {
  onSelect: (content: any) => void
}

export function Hero({ onSelect }: HeroProps) {
  const [currentContent, setCurrentContent] = useState({
    title: 'Stranger Things',
    description: 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying forces in order to get him back.',
    imageUrl: '/hero-banner.jpg',
    type: 'series',
    year: 2023,
    rating: 'TV-14',
    duration: '3 Seasons',
    genres: ['Sci-Fi', 'Horror', 'Drama']
  })

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <Image
          src={currentContent.imageUrl}
          alt={currentContent.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-netflix-black" />
      </div>

      <div className="relative h-full flex flex-col justify-center px-4 md:px-12 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {currentContent.title}
          </h1>
          <div className="flex items-center space-x-4 text-gray-300 mb-4">
            <span>{currentContent.year}</span>
            <span>•</span>
            <span>{currentContent.rating}</span>
            <span>•</span>
            <span>{currentContent.duration}</span>
          </div>
          <p className="text-lg text-gray-300 mb-6">
            {currentContent.description}
          </p>
          <div className="flex space-x-4">
            <button
              onClick={() => onSelect(currentContent)}
              className="flex items-center px-6 py-2 bg-white text-black rounded hover:bg-opacity-80 transition"
            >
              <PlayIcon className="h-6 w-6 mr-2" />
              Play
            </button>
            <button className="flex items-center px-6 py-2 bg-gray-600 bg-opacity-70 text-white rounded hover:bg-opacity-50 transition">
              <InformationCircleIcon className="h-6 w-6 mr-2" />
              More Info
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 