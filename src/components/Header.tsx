"use client"

import { useAuth } from '../contexts/AuthContext'

const Header = () => {
  const { user, signOut } = useAuth()

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Leaderboard</h1>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span>Welcome, {user.user_metadata?.display_name || user.email}</span>
              <button
                onClick={() => signOut()}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              >
                Sign Out
              </button>
            </>
          ) : (
            <a href="/login" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
              Sign In
            </a>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header 