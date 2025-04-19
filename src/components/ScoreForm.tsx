import React, { use, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

interface Score {
  id: string
  playerName: string
  gameName: string
  time: number
  date: string
}

interface ScoreFormProps {
  gameName: string
  onSubmit: (score: Omit<Score, 'id' | 'date'>) => void
}

export const ScoreForm: React.FC<ScoreFormProps> = ({ gameName, onSubmit }) => {
  const [newScore, setNewScore] = useState({
    playerName: '',
    time: '',
  })

  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      playerName: user?.user_metadata?.display_name || user?.email || 'Anonymous',
      gameName,
      time: parseFloat(newScore.time),
    })
    setNewScore({ playerName: '', time: '' })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Submit Score for {gameName}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Time (seconds)</label>
          <input
            type="number"
            step="0.01"
            value={newScore.time}
            onChange={(e) => setNewScore({ ...newScore, time: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit Score
        </button>
      </form>
    </div>
  )
} 