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
import { computed, watch, onMounted, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useDate } from 'vuetify'
import { shallowRef } from 'vue'
import { ref } from 'vue'
import axios from 'axios'
import LanguageSwitcher from './../components/LanguageSwitcher.vue'
import BaseCurrencySelector from './../components/BaseCurrencySelector.vue'
import DatePicker from './../components/DatePicker.vue'
import ExchangeRateTable from './../components/ExchangeRateTable.vue'
import ExchangeRateChart from './../components/ExchangeRateChart.vue'
  
const store = useStore()
let baseCurrencyValue = computed(() => store.state.baseCurrency)
const selectedDateValue  = computed(() => store.state.selectedDate)
const nowDate = computed(() => store.state.nowDate)
watch(
  [baseCurrencyValue, selectedDateValue],
  ([newCurrency, newDate], [oldCurrency, oldDate]) => {
    newDate
    if (newCurrency && newDate && (newCurrency !== oldCurrency || newDate !== oldDate)) {
      store.dispatch('fetchExchangeRates');
    }
  }
);
</script>
