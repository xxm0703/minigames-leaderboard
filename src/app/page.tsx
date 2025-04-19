'use client'

import React, { useState } from 'react'
import { GameSelector } from '../components/GameSelector'
import { ScoreForm } from '../components/ScoreForm'
import { Leaderboard } from '../components/Leaderboard'

interface Score {
  id: string
  playerName: string
  gameName: string
  time: number
  date: string // This will be YYYY-MM-DD format
}

const GAMES = ['Game 1', 'Game 2', 'Game 3']

export default function Home() {
  const [selectedGame, setSelectedGame] = useState<string>('')
  const [scores, setScores] = useState<Score[]>([])

  const handleScoreSubmit = (scoreData: Omit<Score, 'id' | 'date'>) => {
    const newScore: Score = {
      id: Date.now().toString(),
      ...scoreData,
      date: new Date().toISOString().split('T')[0], // Store only the date part
    }
    setScores([...scores, newScore])
  }

  const gameScores = scores
    .filter(score => score.gameName === selectedGame)
    .sort((a, b) => a.time - b.time)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Mini Games Leaderboard</h1>
      
      <GameSelector 
        selectedGame={selectedGame}
        onGameSelect={setSelectedGame}
      />

      {selectedGame && (
        <>
          <ScoreForm 
            gameName={selectedGame}
            onSubmit={handleScoreSubmit}
          />

          <Leaderboard 
            gameName={selectedGame}
            scores={gameScores}
          />
        </>
      )}
    </div>
  )
} 