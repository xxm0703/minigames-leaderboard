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
    .insert([score])
    .select()
    .single()

  if (error) {
    console.error('Error adding score:', error)
    return null
  }

  return data
} 