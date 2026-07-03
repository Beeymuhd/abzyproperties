import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Providers } from './providers'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Abzy Properties - Premium Real Estate in Abuja',
  description: 'Discover verified property listings in Abuja. Browse homes, offices, and land with real-time search, Google Maps integration, and instant communication tools. Your trusted partner for smart property investment.',
  generator: 'v0.app',
  keywords: 'real estate, properties, Abuja, listings, land, homes, verified properties',
  openGraph: {
    title: 'Abzy Properties - Premium Real Estate in Abuja',
    description: 'Discover verified property listings in Abuja with real-time search and instant communication.',
    type: 'website',
  },
    verification: {
    google: 'jlJp_AACqHBmCCX9DdSHcFL-q7rMttgwgAdbiZMgDro',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
