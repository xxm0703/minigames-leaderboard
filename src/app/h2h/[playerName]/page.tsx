"use client"

import { useEffect, useState } from 'react'
import { useSearchParams, useParams } from 'next/navigation'
import { getPlayerStats } from '../../../services/scores'
import { getScores } from '../../../services/scores'
import { Score, PlayerStats } from '../../../services/scores' // Import the types
import { useAuth } from '../../../contexts/AuthContext'

const H2HPage = () => {
  const params = useParams<{ playerName: string }>() // Get dynamic route parameters
  const playerName = params.playerName // Extract playerName from the route
  const [stats, setStats] = useState<PlayerStats>() // State for per-game statistics
  const [statsPerGame, setStatsPerGame] = useState<PlayerStats[]>([]) // State for per-game statistics
  const { user } = useAuth()

  useEffect(() => {

      // Fetch H2H statistics
      getPlayerStats(user?.user_metadata?.display_name, playerName).then((data) => {
        console.log('H2H Statistics:', data)
        setStatsPerGame(data)
        const wins = data.reduce((acc, game) => acc + game.wins, 0)
        const losses = data.reduce((acc, game) => acc + game.losses, 0)
        const draws = data.reduce((acc, game) => acc + game.draws, 0)
        setStats({ gameName: '', wins, losses, draws })

      })
  
  }, [playerName])

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold">Head-to-Head Statistics for {playerName}</h2>

      {/* Display H2H statistics */}
      {stats && (
        <div className="mt-4">
          <h3 className="text-lg font-medium">Statistics</h3>
          <ul className="list-disc list-inside">
            <li>Wins: {stats.wins}</li>
            <li>Losses: {stats.losses}</li>
            <li>Draws: {stats.draws}</li>
          </ul>
        </div>
      )}

      {/* Display scores */}
      <table className="min-w-full divide-y divide-gray-200 mt-4">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Game</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wins</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Losses</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {statsPerGame.map((score) => (
            <tr key={score.gameName}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{score.gameName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{score.wins}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{score.losses}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default H2HPage