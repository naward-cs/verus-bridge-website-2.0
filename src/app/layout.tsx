import { Inter, Roboto } from 'next/font/google';
import localFont from 'next/font/local'

import type {Metadata} from 'next'

import './_styles/globals.css'

import {Next13NProgress} from 'nextjs13-progress'



import { cn } from '@/lib/utils/tailwindUtil';
import Navbar from '@/components/navbar/navbar';
import { Providers } from '@/components/providers';





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
      path: './_styles/fonts/geomanist-regular-webfont.woff2',
      weight: '400',
    },
    {
      path: './_styles/fonts/geomanist-medium-webfont.woff2',
      weight: '500',
    },
    {
      path: './_styles/fonts/geomanist-bold-webfont.woff2',
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
//TODO: need to add a safety boundary to error on unsupported chains
export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'relative flex min-h-screen flex-col justify-center font-geo antialiased',
          inter.variable,
          geoFont.variable,
          roboto.variable
        )}
      >
        <Providers>
          <Navbar />
          {children}
          <Next13NProgress />
        </Providers>
      </body>
    </html>
  )
}