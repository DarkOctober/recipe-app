<template>
  <div>
    <!-- Theme Toggle -->
<div class="theme-toggle">
  <div class="switch" @click="toggleTheme" :class="theme">
    <div class="toggle-ball">
      <span class="icon">
        <svg v-if="theme === 'light'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M12 4.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15zm0-2a9.5 9.5 0 110 19 9.5 9.5 0 010-19z"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
        </svg>
      </span>
    </div>
  </div>
</div>

    <!-- Main app content -->
    <router-view />
  </div>
</template>

<script setup>
import { ref, watchEffect, onMounted } from 'vue'

const theme = ref('light')

// Apply theme to document body
const applyTheme = (mode) => {
  document.documentElement.setAttribute('data-theme', mode)
  localStorage.setItem('data-theme', mode)
}

// Load saved preference on app mount
onMounted(() => {
  const savedTheme = localStorage.getItem('data-theme')
  if (savedTheme !== null) {
    theme.value = savedTheme
  } else {
    // Optional: default to system preference
    theme.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
})

watchEffect(() => {
  document.documentElement.setAttribute('data-theme', theme.value)
})

// Toggle between light and dark mode
const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('data-theme', theme.value)
}
</script>

<style>
.theme-toggle {
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
  background-color: var(--bg-color);
}
</style>