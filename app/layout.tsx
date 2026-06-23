import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { InteractionProvider } from '@/components/ums/InteractionProvider'
import { MotionProvider } from '@/components/ums/MotionProvider'
import { ThemeProvider } from '@/components/ums/ThemeProvider'
import { AnimatedNumberProvider } from '@/components/ums/AnimatedNumberProvider'
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
  colorScheme: 'light dark',
  themeColor: '#1F3864',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen bg-background text-foreground">
        <ThemeProvider>
          <MotionProvider>
            <InteractionProvider>
              <AnimatedNumberProvider />
              {children}
            </InteractionProvider>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
