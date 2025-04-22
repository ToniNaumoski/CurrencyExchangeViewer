// store/index.ts
import { createStore } from './vuex'
import type { State } from './types'

export const store = createStore<State>({
  state: {
    baseCurrency: 'EUR',
    nowDate: new Date().toISOString().slice(0, 10),
    selectedDate: null,
    rates: null,
    loading: false,
    error: '',
    loadingChart: false,
    chartRated: null,
    chartError: false,
    chartLoading: false,
    chartStartDate: null,
    chartEndDate: null
  },
  
  mutations: {
    setBaseCurrency(state: State, currency: string) {
      state.baseCurrency = currency
    },
    setSelectedDate(state: State, date: string) {
      state.selectedDate = date
    },
    setNowDate(state: State) {
      state.nowDate = new Date().toISOString().slice(0, 10)
    },
    setRates(state: State, rates: Record<string, number>) {
      state.rates = rates
    },
    setChartRates(state: State, rates: Record<string, number>) {
      state.chartRated = rates
    },
    setLoading(state: State, loading: boolean) {
      state.loading = loading
    },
    setChartLoading(state: State, loading: boolean) {
      state.chartLoading = loading
    },
    setError(state: State, error: string) {
      state.error = error
    },
    setChartError(state: State, error: boolean) {
      state.chartError = error
    },
    setChartStartDate(state: State, date: string) {
      state.chartStartDate = date
    },
    setChartEndDate(state: State, date: string) {
      state.chartEndDate = date
    }
  },
  
  actions: {
    async fetchExchangeRates({ commit, state }: { commit: any; state: State }) {
      commit('setLoading', true)
      commit('setError', '')
      try {
        const response = await fetch(
          `https://api.frankfurter.dev/v1/${state.selectedDate}?base=${state.baseCurrency}&symbols=AUD,BGN,BRL,CAD,CHF,CNY,CZK,DKK,EUR,GBP,HKD,JPY,KRW,MXN,NOK,NZD,SEK,SGD,USD,ZAR`
        )
        const data = await response.json()
        console.log('data from the store', data)
        commit('setRates', data.rates)
      } catch (error) {
        commit('setError', 'Failed to fetch exchange rates.')
      } finally {
        commit('setLoading', false)
      }
    },
    async fetchLastFiveDaysRates({ commit, state }: { commit: any; state: State }) {
      commit('setChartLoading', true)
      commit('setChartError', false)
      try {
        // Calculate dates for the last 3 days
        const today = new Date()
        const threeDaysAgo = new Date(today)
        threeDaysAgo.setDate(today.getDate() - 5)
        
        const endDate = today.toISOString().split('T')[0]
        const startDate = threeDaysAgo.toISOString().split('T')[0]
        
        const response = await fetch(
          `https://api.frankfurter.dev/v1/${startDate}..${endDate}?base=${state.baseCurrency}&symbols=AUD,CAD,CHF,CZK,GBP,HKD`
        )
        const data = await response.json()
        
        const filteredRates: Record<string, Record<string, number>> = {}
        
        const allDates = Object.keys(data.rates).sort()
        

        allDates.forEach(date => {
          filteredRates[date] = data.rates[date]
        })
        
        commit('setChartRates', filteredRates)
        commit('setChartStartDate', allDates[0])
        commit('setChartEndDate', allDates[allDates.length - 1])
      } catch (error) {
        console.error('Error fetching last 5 days rates:', error)
        commit('setChartError', true)
      } finally {
        commit('setChartLoading', false)
      }
    },
    async fetchDateRangeRates({ commit, state }: { commit: any; state: State }, { startDate, endDate }: { startDate: string; endDate: string }) {
      commit('setChartLoading', true)
      commit('setChartError', false)
      try {
        // Create date range string
        const dateRange = `${startDate}..${endDate}`
        
        console.log('Fetching rates for date range:', dateRange)
        
        const response = await fetch(
          `https://api.frankfurter.dev/v1/${dateRange}?base=${state.baseCurrency}&symbols=AUD,CAD,CHF,CZK,GBP,HKD`
        )
        const data = await response.json()
        console.log('Date range data:', data)
        
        // Filter to get only the last 3 days
        const filteredRates: Record<string, Record<string, number>> = {}
        
        // Get all dates from the API response
        const allDates = Object.keys(data.rates).sort()
        
        // If we have more than 3 days, take only the last 3
        const datesToUse = allDates.length > 3 ? allDates.slice(-3) : allDates
        
        // Create a new object with only the dates we want
        datesToUse.forEach(date => {
          filteredRates[date] = data.rates[date]
        })
        
        commit('setChartRates', filteredRates)
        commit('setChartStartDate', datesToUse[0])
        commit('setChartEndDate', datesToUse[datesToUse.length - 1])
      } catch (error) {
        console.error('Error fetching date range rates:', error)
        commit('setChartError', true)
      } finally {
        commit('setChartLoading', false)
      }
    }
  },
  
  getters: {
    nowDate: (state: State) => state.nowDate,
    baseCurrency: (state: State) => state.baseCurrency,
    selectedDate: (state: State) => state.selectedDate,
    rates: (state: State) => state.rates,
    loading: (state: State) => state.loading,
    error: (state: State) => state.error,
    loadingChart: (state: State) => state.loadingChart,
    chartRated: (state: State) => state.chartRated,
    chartError: (state: State) => state.chartError,
    chartLoading: (state: State) => state.chartLoading,
    chartStartDate: (state: State) => state.chartStartDate,
    chartEndDate: (state: State) => state.chartEndDate
  },
  
})