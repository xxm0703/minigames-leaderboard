import React from 'react'
import { PlayerStats } from '../services/scores'

interface PerGameStatisticsProps {
  statsPerGame: PlayerStats[]
}

const PerGameStatistics: React.FC<PerGameStatisticsProps> = ({ statsPerGame }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium">Statistics Per Game</h3>
      <table className="min-w-full divide-y divide-gray-200 mt-4">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Game</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wins</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Losses</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Draws</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {statsPerGame.map((stat) => (
            <tr key={stat.gameName}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stat.gameName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stat.wins}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stat.losses}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stat.draws}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PerGameStatistics