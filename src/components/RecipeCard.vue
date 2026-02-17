<template>
  <!-- Clickable card navigates to recipe detail -->
  <div class="recipe-card" @click="goToDetail" style="cursor:pointer;">
    <img :src="recipe.image" :alt="recipe.title" />
    <h3>{{ recipe.title }}</h3>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const props = defineProps(['recipe'])
const router = useRouter()

// Navigate to dynamic recipe page
const goToDetail = () => {
  router.push(`/recipe/${props.recipe.id}`)
}
</script>