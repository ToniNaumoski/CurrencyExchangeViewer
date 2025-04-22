<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, onMounted } from 'vue'

import HomeView from './views/HomeView.vue'
const { locale } = useI18n()
const currentLocale = ref<string>('en-US'); // or another default value
onMounted(() => {
  const savedLocale = localStorage.getItem('userLocale')
  const browserLang = navigator.language 
  if (['en-US', 'mk-MK'].includes(savedLocale!)) {
    currentLocale.value = savedLocale!;
} else if (['en-US', 'mk-MK'].includes(browserLang)) {
    currentLocale.value = browserLang;
} else {
    currentLocale.value = 'en-US';
}

  // Apply to i18n system
  locale.value = currentLocale.value
})

</script>
<template>
  <HomeView  />
</template>

