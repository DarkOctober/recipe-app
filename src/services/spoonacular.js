import axios from 'axios'

// Base instance for Spoonacular API
const api = axios.create({
  baseURL: 'https://api.spoonacular.com/recipes',
  params: {
    apiKey: import.meta.env.VITE_SPOONACULAR_KEY
  }
})

/**
 * Search recipes
 * @param {string} query - search query
 * @param {string} cuisine - optional cuisine filter
 * @param {number} offset - pagination offset
 */
export function searchRecipes(query, cuisine = '', offset = 0) {
  return api.get('/complexSearch', {
    params: {
      query,
      cuisine,
      number: 5,   // 5 results per page
      offset
    }
  })
}

/**
 * Get recipe details by ID
 * @param {number|string} id - recipe ID
 */
export function getRecipeDetails(id) {
  return api.get(`/${id}/information`)
}