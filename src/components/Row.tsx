'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

interface RowProps {
  title: string
  onSelect: (content: any) => void
}

export function Row({ title, onSelect }: RowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState(false)

  const handleClick = (direction: 'left' | 'right') => {
    setIsMoved(true)
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current
      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth

      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  // Mock data - replace with actual API data
  const movies = Array(10).fill({
    title: 'Movie Title',
    imageUrl: '/movie-poster.jpg',
    year: 2023,
    rating: 'PG-13',
    duration: '2h 30m',
    type: 'movie'
  })

  return (
    <div className="space-y-2 md:space-y-4">
      <h2 className="text-xl md:text-2xl font-bold text-white px-4 md:px-12">
        {title}
      </h2>
      <div className="group relative">
        <ChevronLeftIcon
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            !isMoved && 'hidden'
          }`}
          onClick={() => handleClick('left')}
        />
        <div
          ref={rowRef}
          className="flex items-center space-x-2 overflow-x-scroll scrollbar-hide md:space-x-4 md:p-2 px-4 md:px-12"
        >
          {movies.map((movie, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
              onClick={() => onSelect(movie)}
            >
              <Image
                src={movie.imageUrl}
                alt={movie.title}
                fill
                className="rounded object-cover"
              />
            </motion.div>
          ))}
        </div>
        <ChevronRightIcon
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
          onClick={() => handleClick('right')}
        />
      </div>
    </div>
  )
} 