<template>
  <div class="d-flex justify-center align-center">
    <v-date-input
    v-model="selectedDate"
    :label="$t('pickDate')"
    :max="nowDate"
    :style="{
        maxWidth: '500px'
     }"
  />
</div>
  </template>
  <script setup lang="ts">
  import { computed, watch, onMounted, ref } from 'vue'
  import { useStore } from 'vuex'
  const store = useStore()
  let selectedDate = ref(null)
  watch(selectedDate, (val) => {
  updateSelectedDate(val)
})

function updateSelectedDate(selectedDate) {
const date = new Date(selectedDate);
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
const day = String(date.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;
store.commit('setSelectedDate', formattedDate)
}
</script>
