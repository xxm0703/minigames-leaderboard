"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getPlayerStats } from '../../../services/scores'
import { PlayerStats } from '../../../services/scores'
import { useAuth } from '../../../contexts/AuthContext'
import {GeneralStatisticsProps, GeneralStatistics} from '../../../components/GeneralStatistics'
import PerGameStatistics from '../../../components/PerGameStatistics'

const H2HPage = () => {
  const params = useParams<{ playerName: string }>()
  const [stats, setStats] = useState<GeneralStatisticsProps>()
  const [statsPerGame, setStatsPerGame] = useState<PlayerStats[]>([])
  const { user } = useAuth()

  useEffect(() => {
    getPlayerStats(user?.user_metadata?.display_name, params.playerName).then((data) => {
      setStatsPerGame(data)
      const wins = data.reduce((acc, game) => acc + game.wins, 0)
      const losses = data.reduce((acc, game) => acc + game.losses, 0)
      const draws = data.reduce((acc, game) => acc + game.draws, 0)
      setStats({ wins, losses, draws })
    })
  }, [params.playerName])

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold">
        H2H Statistics for <span className="font-bold">{params.playerName}</span>
      </h2>

      {stats && (
        <GeneralStatistics wins={stats.wins} losses={stats.losses} draws={stats.draws} />
      )}

      {statsPerGame.length > 0 && (
        <PerGameStatistics statsPerGame={statsPerGame} />
      )}
    </div>
  )
}

export default H2HPage