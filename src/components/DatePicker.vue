<template>
  <div class="d-flex justify-center align-center">
    <v-date-input
      v-model="selectedDate"
      :label="$t('pickDate')"
      :max="store.state.nowDate"
      :style="{
        maxWidth: '500px'
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import { store } from '../store'

const selectedDate = ref<string | null>(null)

watch(selectedDate, (val) => {
  if (val) {
    updateSelectedDate(val)
  }
})

function updateSelectedDate(dateStr: string) {
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const formattedDate = `${year}-${month}-${day}`
  store.commit('setSelectedDate', formattedDate)
}
</script>
