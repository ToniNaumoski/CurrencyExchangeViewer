<template>
   <v-container >
     <v-row >
      <v-col cols="12" md="12">
          <LanguageSwitcher />
        </v-col>
      </v-row>
      </v-container>
      <v-container>
        <v-row>
        <v-col cols="12" md="12">
          <DatePicker
           />
          </v-col>
        </v-row>
      </v-container>
      <v-container >
        <v-row>
        <v-col cols="12" md="12">
          <BaseCurrencySelector />
        </v-col>
      </v-row>
    </v-container >
    <v-container >
      <v-row>
        <v-col cols="12" md="12">
          <ExchangeRateTable  />
        </v-col>
      </v-row>
  </v-container>
  <v-container >
      <v-row>
        <v-col cols="12" md="12">
          <ExchangeRateChart  />
        </v-col>
      </v-row>
  </v-container>
    
</template>
  
<script setup lang="ts">
import { computed, watch, onMounted } from 'vue'
import { store } from '../store'
import LanguageSwitcher from './../components/LanguageSwitcher.vue'
import BaseCurrencySelector from './../components/BaseCurrencySelector.vue'
import DatePicker from './../components/DatePicker.vue'
import ExchangeRateTable from './../components/ExchangeRateTable.vue'
import ExchangeRateChart from './../components/ExchangeRateChart.vue'
  
let baseCurrencyValue = computed(() => store.state.baseCurrency)
const selectedDateValue  = computed(() => store.state.selectedDate)

// Initialize the chart with last 3 days data when the component is mounted
onMounted(() => {
  store.dispatch('fetchLastThreeDaysRates');
});

watch(
  [baseCurrencyValue, selectedDateValue],
  ([newCurrency, newDate], [oldCurrency, oldDate]) => {
    if (newCurrency && newDate && (newCurrency !== oldCurrency || newDate !== oldDate)) {
      store.dispatch('fetchExchangeRates');
    }
  }
);
</script>
