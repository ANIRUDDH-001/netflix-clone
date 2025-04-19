'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAR } from '@/context/ARContext'
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { toggleAR } = useAR()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-500 ${
      isScrolled ? 'bg-netflix-black' : 'bg-gradient-to-b from-black/70 to-transparent'
    }`}>
      <div className="flex items-center justify-between px-4 py-4 md:px-12">
        <div className="flex items-center space-x-8">
          <Link href="/">
            <Image
              src="/netflix-logo.png"
              alt="Netflix"
              width={92}
              height={24}
              className="cursor-pointer"
            />
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-sm font-medium text-white hover:text-gray-300">
              Home
            </Link>
            <Link href="/tv" className="text-sm font-medium text-white hover:text-gray-300">
              TV Shows
            </Link>
            <Link href="/movies" className="text-sm font-medium text-white hover:text-gray-300">
              Movies
            </Link>
            <Link href="/new" className="text-sm font-medium text-white hover:text-gray-300">
              New & Popular
            </Link>
            <Link href="/my-list" className="text-sm font-medium text-white hover:text-gray-300">
              My List
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleAR}
            className="text-sm font-medium text-white hover:text-gray-300"
          >
            AR X-Ray
          </button>
          <button className="text-white hover:text-gray-300">
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>
          <button className="text-white hover:text-gray-300">
            <BellIcon className="h-6 w-6" />
          </button>
          <Link href="/account">
            <Image
              src="/default-avatar.png"
              alt="Account"
              width={32}
              height={32}
              className="rounded cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </nav>
  )
} 