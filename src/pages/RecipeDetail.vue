<template>
  <div class="recipe-detail">
    <!-- Sticky Back Button -->
    <div class="back-button-wrapper">
      <button @click="goBack">← Back to search</button>
    </div>

    <!-- Loading / Error -->
    <p v-if="loading" class="loading-text">Loading recipe...</p>
    <p v-else-if="error" class="error-text">{{ error }}</p>

    <!-- Recipe Content -->
    <div v-else class="recipe-content fade-in">
      <h1>{{ recipe.title }}</h1>
      <img :src="recipe.image" :alt="recipe.title" />

      <!-- Health Info Tags -->
      <div class="health-tags">
        <span v-if="recipe.vegan">Vegan</span>
        <span v-if="recipe.dairyFree">Dairy-Free</span>
        <span v-if="recipe.glutenFree">Gluten-Free</span>
      </div>

      <!-- Nutrition Info -->
      <h2>Nutrition</h2>
      <ul class="nutrition-list">
        <li>
          Calories: {{ recipe.nutrition?.nutrients.find(n => n.name === 'Calories')?.amount || 'N/A' }} kcal
        </li>
        <li>
          Protein: {{ recipe.nutrition?.nutrients.find(n => n.name === 'Protein')?.amount || 'N/A' }} g
        </li>
        <li>
          Carbs: {{ recipe.nutrition?.nutrients.find(n => n.name === 'Carbohydrates')?.amount || 'N/A' }} g
        </li>
        <li>
          Fat: {{ recipe.nutrition?.nutrients.find(n => n.name === 'Fat')?.amount || 'N/A' }} g
        </li>
      </ul>

      <!-- Ingredients with images -->
      <h2>Ingredients</h2>
<ul class="ingredient-list">
  <li v-for="ing in recipe.extendedIngredients" :key="ing.id" class="ingredient-item">
    <div class="ingredient-content">
      <img
        v-if="ing.image"
        :src="`https://spoonacular.com/cdn/ingredients_100x100/${ing.image}`"
        :alt="ing.name"
        class="ingredient-image"
      />
      <span class="ingredient-text">
        {{ ing.name }} — {{ ing.measures.us.amount }} {{ ing.measures.us.unitShort }}
      </span>
    </div>
  </li>
</ul>
      <!-- Instructions -->
      <h2>Instructions</h2>
      <div v-html="recipe.instructions"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const recipe = ref({})
const loading = ref(true)
const error = ref('')

// API key from .env
const API_KEY = import.meta.env.VITE_SPOONACULAR_KEY

// Fetch recipe detail from Spoonacular API
const fetchRecipe = async () => {
  loading.value = true
  try {
    const id = route.params.id
    const url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${API_KEY}`
    const response = await axios.get(url)
    recipe.value = response.data
  } catch (err) {
    console.error(err)
    error.value = 'Failed to load recipe.'
  } finally {
    loading.value = false
  }
}

// Navigate back to home
const goBack = () => {
  router.push('/').then(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
}

// Fetch recipe on mount
onMounted(() => fetchRecipe())
</script>