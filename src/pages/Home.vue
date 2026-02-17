<template>
  <div class="home-page">
    <h1>Recipe Search</h1>

    <!-- Search Controls -->
    <div class="search-controls">
      <input
        v-model="query"
        @keyup.enter="search"
        placeholder="Search recipes..."
      />
      <select v-model="cuisine">
        <option value="">All Cuisines</option>
        <option value="Italian">Italian</option>
        <option value="Mexican">Mexican</option>
        <option value="Indian">Indian</option>
        <option value="Chinese">Chinese</option>
        <option value="American">American</option>
      </select>
      <button @click="search">Search</button>
    </div>

    <!-- Error Message -->
    <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>

    <!-- Loading Text -->
    <p v-if="loading && !errorMessage" class="loading-text">Loading recipes...</p>

    <!-- Recipe Grid -->
    <div class="recipe-grid">
      <!-- Skeleton placeholders while loading -->
      <SkeletonCard v-if="loading && !errorMessage" v-for="n in RESULTS_PER_PAGE" :key="n" />

      <!-- Fade-in RecipeCards when data is loaded -->
      <div
        v-else
        v-for="(recipe, index) in recipes"
        :key="recipe.id"
        class="fade-in"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <RecipeCard :recipe="recipe" />
      </div>
    </div>

    <!-- Pagination -->
    <div class="pagination-wrapper" v-if="totalResults > RESULTS_PER_PAGE && !errorMessage">
      <Pagination
        :page="currentPage"
        :total-results="totalResults"
        @change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import RecipeCard from '../components/RecipeCard.vue'
import SkeletonCard from '../components/SkeletonCard.vue'
import Pagination from '../components/Pagination.vue'
import axios from 'axios'

// Reactive state
const query = ref('')
const cuisine = ref('')
const recipes = ref([])
const loading = ref(false)
const currentPage = ref(1)
const totalResults = ref(0)
const errorMessage = ref('')

// Constants
const API_KEY = import.meta.env.VITE_SPOONACULAR_KEY
const RESULTS_PER_PAGE = 5

// Search function
const search = async () => {
  loading.value = true
  errorMessage.value = ''
  recipes.value = []
  totalResults.value = 0

  try {
    const offset = (currentPage.value - 1) * RESULTS_PER_PAGE
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query.value}&cuisine=${cuisine.value}&number=${RESULTS_PER_PAGE}&offset=${offset}&apiKey=${API_KEY}`
    const response = await axios.get(url)

    recipes.value = response.data.results || []
    totalResults.value = response.data.totalResults || 0

    if (recipes.value.length === 0) {
      errorMessage.value = 'No recipes found for this search.'
    }
  } catch (error) {
    console.error(error)

    // Handle Spoonacular quota or other API errors
    if (error.response && error.response.data) {
      const msg = error.response.data.message || ''
      if (error.response.status === 402 || msg.toLowerCase().includes('quota')) {
        errorMessage.value = 'Your Spoonacular API quota has been reached. Please try again later.'
      } else {
        errorMessage.value = msg || 'An error occurred while fetching recipes.'
      }
    } else {
      errorMessage.value = error.message || 'An unexpected error occurred.'
    }
  } finally {
    loading.value = false
  }
}

// Handle pagination change
const handlePageChange = (page) => {
  currentPage.value = page
  search()
}
</script>

<style>
.error-text {
  color: red;
  font-weight: bold;
  margin-top: 10px;
}

.loading-text {
  color: #666;
  font-style: italic;
  margin-top: 10px;
}

</style>