import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'
import './globals.css'
import GSAPProvider from '@/providers/GSAPProvider'

const archivo = Archivo({
  subsets: ['latin'],
  weight: 'variable',
  style: ['normal'],
  display: 'swap',
  variable: '--font-archivo',
})

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
    <html lang="fr" className={`h-full ${archivo.variable}`}>
      <body style={{ margin: 0, padding: 0 }} className="bg-canvas text-ink antialiased">
        <GSAPProvider>
          {children}
        </GSAPProvider>
      </body>
    </html>
  )
}
