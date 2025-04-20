import React from 'react'

export interface GeneralStatisticsProps {
  wins: number
  losses: number
  draws: number
}

export const GeneralStatistics: React.FC<GeneralStatisticsProps> = ({ wins, losses, draws }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium mb-4">General Statistics</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-100 text-blue-800 rounded-lg p-4 shadow">
          <h4 className="text-xl font-bold">{wins}</h4>
          <p className="text-sm font-medium">Wins</p>
        </div>
        <div className="bg-red-100 text-red-800 rounded-lg p-4 shadow">
          <h4 className="text-xl font-bold">{losses}</h4>
          <p className="text-sm font-medium">Losses</p>
        </div>
        <div className="bg-gray-100 text-gray-800 rounded-lg p-4 shadow">
          <h4 className="text-xl font-bold">{draws}</h4>
          <p className="text-sm font-medium">Draws</p>
        </div>
      </div>
    </div>
  )
}
export default GeneralStatistics