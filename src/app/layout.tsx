import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '../contexts/AuthContext'
import Header from '../components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mini Games Leaderboard',
  description: 'Track and compare your mini-game scores with friends',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <main className="min-h-screen bg-gray-100">
            <Header />
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
} 