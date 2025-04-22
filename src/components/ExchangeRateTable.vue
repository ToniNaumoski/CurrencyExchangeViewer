<template>
  <div v-if="!rates" class="text-center">
    No data available.
    Select a date.
  </div>
  <div v-if="error" class="text-center">
     {{ error }}
  </div>
  <div style="overflow-x: auto; width: 100%;" class="d-flex align-center justify-center">
  <v-skeleton-loader
    :loading="loading"
    type="list-item-two-line">
  <div v-if="rates">      
  <v-data-table-virtual
    :headers="headers"
    :items="currencyTable"
    height="400"
    item-value="name"
    fixed-header
  ></v-data-table-virtual>
</div>  
</v-skeleton-loader>
</div>
</template>
<script setup lang="ts">
  import { computed } from 'vue'
  import { store } from '../store'
  import { useI18n } from 'vue-i18n'
  
  const rates = computed(() => store.state.rates)
  const loading = computed(() => store.state.loading)
  const error = computed(() => store.state.error)

  const { locale, messages } = useI18n()

  interface CurrencyInfo {
    name: string;
    country: string;
  }

  interface LocaleMessages {
    currencies: Record<string, CurrencyInfo>;
  }

  const currencyTable = computed(() => {
    const rates = store.state.rates || {}
    const currentLocale = locale.value === 'en-US' ? 'en-US' : 'mk-MK'
    const rawMessages = messages.value[currentLocale]
    const localeMessages = (rawMessages as unknown as LocaleMessages) || { currencies: {} }
    const localeCurrencies = localeMessages.currencies || {}

    return Object.entries(rates).map(([code, rate]) => {
      const currencyInfo = localeCurrencies[code] || { name: 'N/A', country: 'N/A' }
      return {
        code,
        name: currencyInfo.name,
        country: currencyInfo.country,
        rate
      }
    })
  })

  const headers = [
    { title: 'Currency', key: 'code' },
    { title: 'Name', key: 'name' },
    { title: 'Country', key: 'country' },
    { title: 'Rate', key: 'rate' }
  ]
</script>