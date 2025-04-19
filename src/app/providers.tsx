'use client'

import { QueryClient, QueryClientProvider } from 'react-query'
import { SessionProvider } from 'next-auth/react'
import { ARProvider } from '@/context/ARContext'
import { VideoPlayerProvider } from '@/context/VideoPlayerContext'

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ARProvider>
          <VideoPlayerProvider>
            {children}
          </VideoPlayerProvider>
        </ARProvider>
      </SessionProvider>
    </QueryClientProvider>
  )
} 