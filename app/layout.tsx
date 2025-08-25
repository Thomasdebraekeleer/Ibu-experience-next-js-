import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import GSAPProvider from '@/providers/GSAPProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'IBU Experience',
  description: 'Découvrez des expériences uniques avec IBU',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="h-full">

      <body style={{ margin: 0, padding: 0 }} className={`${inter.className} bg-canvas text-ink antialiased`}>
        <GSAPProvider>
          {children}
        </GSAPProvider>
      </body>
    </html>
  )
}
