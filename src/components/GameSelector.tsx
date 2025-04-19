import React from 'react'

interface GameSelectorProps {
  selectedGame: string
  onGameSelect: (game: string) => void
}

const GAMES = ['Queens', 'Tango', 'Zip']

export const GameSelector: React.FC<GameSelectorProps> = ({ selectedGame, onGameSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Select a Game</h2>
      <select
        value={selectedGame}
        onChange={(e) => onGameSelect(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value="">Choose a game</option>
        {GAMES.map((game) => (
          <option key={game} value={game}>{game}</option>
        ))}
      </select>
    </div>
  )
} 