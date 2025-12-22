import type { Metadata } from 'next'
import localFont from 'next/font/local'

import { cn } from '@/utilities/ui'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import  Footer  from '@/components/Footer'
import  Header  from  '@/components/Header'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

// Load Made Saonara font for headings
// Path is relative to src/app/(frontend)/layout.tsx -> needs to go up 3 levels
const madeSaonara = localFont({
  src: [
    {
      path: '../../../public/fonts/MADE-SAONARA.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-made-saonara',
  display: 'swap',
})

// Load DM Sans font for body text
const dmSans = localFont({
  src: [
    {
      path: '../../../public/fonts/DMSans-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/DMSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/DMSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/DMSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-dm-sans',
  display: 'swap',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html 
      className={cn(dmSans.variable, madeSaonara.variable)} 
      lang="en" 
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          {/* Wrap header with high z-index */}
          <div className="relative z-50">
            <Header />
          </div>
          
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'PicoClick | Luxury Wedding Photography & Films',
    template: '%s | PicoClick'
  },
  description: 'Luxury wedding photography and cinematography. We capture your love story with artistry, emotion, and precision—creating timeless memories that last forever.',
  openGraph: mergeOpenGraph({
    title: 'PicoClick | Luxury Wedding Photography & Films',
    description: 'Luxury wedding photography and cinematography. We capture your love story with artistry, emotion, and precision—creating timeless memories that last forever.',
  }),
}