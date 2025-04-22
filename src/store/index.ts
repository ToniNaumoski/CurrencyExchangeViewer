// store/index.ts
import { createStore } from 'vuex';
import type { ActionContext } from 'vuex/types/index.js';


export default createStore({  
  state: {
    baseCurrency: 'EUR',
    nowDate: new Date().toISOString().slice(0, 10), 
    selectedDate: null,
    rates: null,
    loading: false,
    error: '',
    loadingChart:false,
    chartRated:null,
    chartError:false,
    chartLoading:false
  },
  
  mutations: {
    setBaseCurrency(state: { baseCurrency: string }, currency: string) {
      state.baseCurrency = currency
    },
    setSelectedDate(state: { selectedDate: string }, date: string) {
      state.selectedDate = date
    },
    setNowDate(state: { nowDate: string }) {
        state.nowDate = new Date().toISOString().slice(0, 10)
    },
    setRates(state: { rates: Record<string, number> }, rates: Record<string, number>) {
      state.rates = rates
    },
    setChartRates(state: { chartRated: Record<string, number> }, rates: Record<string, number>) {
      state.chartRated = rates
    },
    setLoading(state: { loading: boolean }, loading: boolean) {
      state.loading = loading
    },
    setChartLoading(state: { chartLoading: boolean }, loading: boolean) {
      state.chartLoading = loading
    },
    setError(state: { error: string }, error: string) {
      state.error = error
    },
    setChartError(state: { chartError: string }, error: string) {
      state.chartError = error
    },
  },
  
  actions: {
    async fetchExchangeRates({ commit, state }: ActionContext<any, any>) {
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
    async fetchExchangeRatesFromDates({ commit }: ActionContext<any, any>) {
      commit('setChartLoading', true)
      commit('setChartError', '')
      try {
        const response = await fetch(
          'https://api.frankfurter.dev/v1/2025-04-15..2025-04-18?symbols=AUD,CAD,CHF,CZK,GBP,HKD'
        )
        const data = await response.json()
        commit('setChartRates', data.rates)
      } catch (error) {
        commit('setChartError', 'Failed to fetch exchange rates.')
      } finally {
        commit('setChartLoading', false)
      }
    },
    
  },
  
  getters: {
    nowDate: (state: { nowDate: any }) => state.nowDate,
    baseCurrency: (state: { baseCurrency: any }) => state.baseCurrency,
    selectedDate: (state: { selectedDate: any }) => state.selectedDate,
    rates: (state: { rates: any }) => state.rates,
    loading: (state: { loading: any }) => state.loading,
    error: (state: { error: any }) => state.error,
    loadingChart: (state: { loadingChart: any }) => state.loadingChart,
    chartRated: (state: { chartRated: any }) => state.chartRated,
    chartError: (state: { chartError: any }) => state.chartError,
    chartLoading: (state: { chartLoading: any }) => state.chartLoading,
  },
  
})