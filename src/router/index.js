import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import RecipeDetail from '../pages/RecipeDetail.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/recipe/:id', component: RecipeDetail }
]

const router = createRouter({
  history: createWebHistory('/recipe-app/'), // base = repo name
  routes,
})

export default router