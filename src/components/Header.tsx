"use client"

import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'

const Header = () => {
  const { user, signOut } = useAuth()

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-white">
          <h1 className="text-2xl font-bold">Leaderboard</h1>
        </Link>

        {/* Hamburger Menu for Mobile */}
        <div className="block md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => {
              const menu = document.getElementById('mobile-menu')
              if (menu) menu.classList.toggle('hidden')
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          id="mobile-menu"
          className="hidden md:flex flex-col md:flex-row items-center gap-4 w-full md:w-auto mt-4 md:mt-0"
        >
          {user ? (
            <>
              <span className="text-center md:text-left">
                Welcome, {user.user_metadata?.display_name || user.email}
              </span>
              <button
                onClick={() => signOut()}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded w-full md:w-auto"
              >
                Sign Out
              </button>
            </>
          ) : (
            <a
              href="/login"
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded w-full md:w-auto text-center"
            >
              Sign In
            </a>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header