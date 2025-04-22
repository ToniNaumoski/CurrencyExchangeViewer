export interface State {
  baseCurrency: string
  nowDate: string
  selectedDate: string | null
  rates: Record<string, number> | null
  loading: boolean
  error: string
  loadingChart: boolean
  chartRated: Record<string, number> | null
  chartError: boolean
  chartLoading: boolean
  chartStartDate: string | null
  chartEndDate: string | null
} 