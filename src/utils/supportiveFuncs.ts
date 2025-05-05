interface RateData {
  base: string
  date: string
  rates: Record<string, number>
}

export function isRateData(data: unknown): data is RateData {
  return (
    typeof data === 'object' && 
    data !== null &&
    'base' in data && 
    typeof data.base === 'string' &&
    'date' in data && 
    typeof data.date === 'string' &&
    'rates' in data && 
    typeof data.rates === 'object' &&
    data.rates !== null
  )
}
