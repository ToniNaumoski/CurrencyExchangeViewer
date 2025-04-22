<template>
  <div class="d-flex align-center justify-center">
    <v-autocomplete
      v-model="selectedCurrency"
      :label="$t('currency.select')"
      :items="currencyOptions"
      item-title="displayText"
      :style="{
        maxWidth: '500px'
      }"
      item-value="code"
      variant="outlined"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { store } from '../store'

const { locale, messages } = useI18n()
const selectedCurrency = ref(store.state.baseCurrency)

watch(selectedCurrency, (val) => {
  store.commit('setBaseCurrency', val)
})

const currencyOptions = computed(() => {
  const currentLocale = locale.value === 'en-US' ? 'en-US' : 'mk-MK'
  const localeMessages = messages.value[currentLocale]
  
  if (!localeMessages || !localeMessages.currencies) {
    console.error('Currencies not found in messages:', localeMessages)
    return []
  }

  return Object.entries(localeMessages.currencies).map(([code, details]: [string, any]) => ({
    code,
    name: details.name,
    country: details.country,
    displayText: `${code} - ${details.name} - ${details.country}`
  }))
})
</script>