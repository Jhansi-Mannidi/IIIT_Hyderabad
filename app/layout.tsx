import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'VoltusWave UMS — University Management System',
  description:
    'Analytics-first enterprise dashboard for institutional leadership — academic, financial, and administrative intelligence for IIIT.',
  generator: 'VoltusWave',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#1F3864',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} bg-[#F6F8FB]`}>
      <body className="font-sans antialiased min-h-screen bg-[#F6F8FB] text-[#0F1722]">
        {children}
      </body>
    </html>
  )
}
