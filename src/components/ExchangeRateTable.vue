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
  import { computed, watch } from 'vue'
 import { useStore } from 'vuex'
 import { useI18n } from 'vue-i18n'
 const store = useStore()
 const emptyTableData = computed(() => store.state.emptyTableData)
 const rates = computed(() => store.state.rates)
 const loading = computed(() => store.state.loading)
 const error = computed(() => store.state.error)

const { locale, messages } = useI18n()

const currencyTable = computed(() => {
  const rates = store.state.rates || {}
  const currentLocale = locale.value === 'en-US' ? 'en-US' : 'mk-MK'
  const localeCurrencies = messages.value[currentLocale]?.currencies || {}

  return Object.entries(rates).map(([code, rate]) => {
    const currencyInfo = localeCurrencies[code] || {}
    return {
      code,
      name: currencyInfo.name || 'N/A',
      country: currencyInfo.country || 'N/A',
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