import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import GSAPProvider from '@/providers/GSAPProvider'
import '@/styles/globals.css'

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
    <html lang="fr">

      <body className={inter.className}>
        <GSAPProvider>
          {children}
        </GSAPProvider>
      </body>
    </html>
  )
}
