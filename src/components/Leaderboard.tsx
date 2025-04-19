import React, { useState } from 'react'

interface Score {
  id: string
  playerName: string
  gameName: string
  time: number
  date: string // YYYY-MM-DD format
}

interface LeaderboardProps {
  gameName: string
  scores: Score[]
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ gameName, scores }) => {
  const [selectedDate, setSelectedDate] = useState<string>('')

  // Get unique dates from scores
  const dates = Array.from(new Set(scores.map(score => score.date)))
    .sort()
    .reverse()

  // Filter scores by selected date
  const filteredScores = selectedDate
    ? scores.filter(score => score.date === selectedDate)
    : scores

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">{gameName} Leaderboard</h2>
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">All Time</option>
          {dates.map((date) => (
            <option key={date} value={date}>
              {new Date(date).toLocaleDateString()}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredScores.map((score, index) => (
              <tr key={score.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{score.playerName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{score.time.toFixed(2)}s</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(score.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 