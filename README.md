# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

## Setup

1. Clone the repo
2. Create a `.env` file in the root directory
3. Add your Spoonacular API key:

VITE_SPOONACULAR_KEY=your_api_key_here

4. Run:
npm install
npm run dev

# Recipe Search Application

A modern recipe search application built with Vue and Vite using the Spoonacular API.

Users can:
- Search for recipes
- Filter results by cuisine
- View paginated results (5 per page)
- View detailed recipe information including ingredients, health info, and cooking instructions

---

## Tech Stack

- Vue 3
- Vite
- Vue Router
- Axios
- Spoonacular API

---

## Features

### Home Page
- Search input
- Search button (Enter key supported)
- Cuisine filter
- Paginated results (5 per page)
- Recipe name and image display
- Click to navigate to recipe detail page

### Recipe Detail Page
- Recipe name
- Recipe image
- Health information (vegan, dairy-free, gluten-free)
- Ingredient list (name + measure)
- Cooking instructions

---

## Setup Instructions

1. Clone the repository

2. Install dependencies
