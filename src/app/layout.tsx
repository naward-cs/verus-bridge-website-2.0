import {Inter, Roboto} from 'next/font/google'
import localFont from 'next/font/local'

import type {Metadata} from 'next'

import './globals.css'

import {cn} from '@/lib/utils/tailwindUtil'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})
const roboto = Roboto({
  weight: '500',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-robo',
})
const geoFont = localFont({
  src: [
    {
      path: '../styles/fonts/geomanist-regular-webfont.woff2',
      weight: '400',
    },
    {
      path: '../styles/fonts/geomanist-medium-webfont.woff2',
      weight: '500',
    },
    {
      path: '../styles/fonts/geomanist-bold-webfont.woff2',
      weight: '700',
    },
  ],
  variable: '--font-geo',
  preload: true,
  fallback: ['sans-serif'],
})

//TODO: add description
export const metadata: Metadata = {
  title: 'Verus Ethereum Bridge',
  robots: {
    index: false, //will change
    follow: false, //will change
  },
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'font-geo relative flex min-h-screen flex-col justify-center antialiased',
          inter.variable,
          geoFont.variable,
          roboto.variable
        )}
      >
        {children}
      </body>
    </html>
  )
}
