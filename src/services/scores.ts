import { supabase } from '../lib/supabase'

export interface Score {
  id: string
  playerName: string
  gameName: string
  time: number
  date: string
}

export const getScores = async (gameName?: string): Promise<Score[]> => {
  let query = supabase
    .from('scores')
    .select('*')
    .order('date', { ascending: false })
    .order('time', { ascending: true })

  if (gameName) {
    query = query.eq('gameName', gameName)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching scores:', error)
    return []
  }

  return data || []
}

export const addScore = async (score: Omit<Score, 'id'>): Promise<Score | null> => {
  const { data, error } = await supabase
    .from('scores')
    .upsert(score, { onConflict: "playerName, gameName, date" })
    .select()
    .single()

  if (error) {
    console.error('Error adding score:', error)
    return null
  }

  return data
}

export interface PlayerStats {
  gameName: string
  wins: number
  losses: number
  draws: number
}

export const getPlayerStats = async (currentUser: string, opponent: string): Promise<PlayerStats[]> => {
  let query = supabase
    .from('scores')
    .select('*')
    .in('playerName', [currentUser, opponent])
    .order('date', { ascending: false })
    .order('time', { ascending: true })

  const { data, error } = await query

  if (error) {
    console.error('Error fetching scores for stats calculation:', error)
    return []
  }

  if (!data || data.length === 0) {
    return []
  }

  console.log('Fetched scores for stats calculation:', data)

  // Group scores by gameName
  const groupedByGame = data.reduce((acc, score) => {
    if (!acc[score.gameName]) {
      acc[score.gameName] = []
    }
    acc[score.gameName].push(score)
    return acc
  }, {} as Record<string, Score[]>)

  // Calculate stats per game
  const statsPerGame: PlayerStats[] = []

  for (const gameName in groupedByGame) {
    const scores = groupedByGame[gameName]

    // Group scores by date within each game
    const groupedByDate = scores.reduce((acc, score) => {
      const key = score.date
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(score)
      return acc
    }, {} as Record<string, Score[]>)

    let wins = 0
    let losses = 0
    let draws = 0

    for (const date in groupedByDate) {
      const scoresForDate = groupedByDate[date]
      if (scoresForDate.length === 2) {
        const userScore = scoresForDate.find((s) => s.playerName === currentUser)
        const opponentScore = scoresForDate.find((s) => s.playerName === opponent)

        if (userScore && opponentScore) {
          if (userScore.time < opponentScore.time) {
            wins++
          } else if (userScore.time > opponentScore.time) {
            losses++
          } else {
            draws++
          }
        }
      }
    }
    if (wins !== 0 || losses !== 0 || draws !== 0) {
      statsPerGame.push({ gameName, wins, losses, draws })
    }
  }

  return statsPerGame
}