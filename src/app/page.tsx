'use client'

import React, { useState, useEffect } from 'react'
import { GameSelector } from '../components/GameSelector'
import { ScoreForm } from '../components/ScoreForm'
import { Leaderboard } from '../components/Leaderboard'
import { getScores, addScore, Score } from '../services/scores'

export default function Home() {
  const [selectedGame, setSelectedGame] = useState<string>('')
  const [scores, setScores] = useState<Score[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadScores()
  }, [selectedGame])

  const loadScores = async () => {
    setLoading(true)
    const fetchedScores = await getScores(selectedGame)
    setScores(fetchedScores)
    setLoading(false)
  }

  const handleScoreSubmit = async (scoreData: Omit<Score, 'id' | 'date'>) => {
    const newScore = {
      ...scoreData,
      date: new Date().toISOString().split('T')[0],
    }
    
    const savedScore = await addScore(newScore)
    if (savedScore) {
      setScores([...scores, savedScore])
    }
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

          {loading ? (
            <div className="text-center py-8">Loading scores...</div>
          ) : (
            <Leaderboard 
              gameName={selectedGame}
              scores={gameScores}
            />
          )}
        </>
      )}
    </div>
  )
} 