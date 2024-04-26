import './globals.css'

import type { Metadata } from 'next'
import { Playfair_Display as PlayfairDisplay } from 'next/font/google'

const playfairDisplay = PlayfairDisplay({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SVG Path Text',
  description: 'SVG Path Text',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={playfairDisplay.className}>{children}</body>
    </html>
  )
}
