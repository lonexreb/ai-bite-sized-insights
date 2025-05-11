import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

interface Insight {
  id: string
  title: string
  content: string
  created_at: string
}

export default function InsightsList() {
  const [insights, setInsights] = useState<Insight[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchInsights()
  }, [])

  async function fetchInsights() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('insights')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }

      setInsights(data || [])
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading insights...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">AI Insights</h2>
      {insights.length === 0 ? (
        <p>No insights yet. Add some to get started!</p>
      ) : (
        <div className="grid gap-4">
          {insights.map((insight) => (
            <div key={insight.id} className="p-4 border rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold">{insight.title}</h3>
              <p className="mt-2 text-gray-600">{insight.content}</p>
              <p className="mt-2 text-sm text-gray-500">
                {new Date(insight.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 