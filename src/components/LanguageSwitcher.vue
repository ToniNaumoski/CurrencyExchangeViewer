<template>
  <div class="d-flex align-center justify-center">
     <v-btn
      value="en"
      size="small"
      :color="currentLocale === 'en-US' ? 'primary' : 'grey'"
      @click="setLocale('en-US')"
      class="mx-1"
    >
      English
    </v-btn>
  <v-btn
      value="mk"
      size="small"
      :color="currentLocale === 'mk-MK' ? 'primary' : 'grey'"
      @click="setLocale('mk-MK')"
      class="mx-1"
    >
      Македонски
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const currentLocale = ref(locale.value)

onMounted(() => {
  console.log(locale)
  const savedLocale = localStorage.getItem('userLocale')
  const browserLang = navigator.language.substring(0, 2)
  
  if (savedLocale && ['en-US', 'mk-MK'].includes(savedLocale)) {
    currentLocale.value = savedLocale
  } else if (['en-US', 'mk-MK'].includes(browserLang)) {
    currentLocale.value = browserLang
  }
})

const setLocale = (newLocale: string) => {
  currentLocale.value = newLocale
  locale.value = newLocale
  localStorage.setItem('userLocale', newLocale)
}

watch(locale, (newVal) => {
  if (newVal !== currentLocale.value) {
    currentLocale.value = newVal
  }
})
</script>

<style scoped>
.language-toggle {
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.v-btn--active {
  font-weight: bold;
  background-color: rgba(var(--v-theme-primary), 0.2);
}
</style>