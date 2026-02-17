<template>
  <div class="pagination">
    <button @click="$emit('change', page - 1)" :disabled="page <= 1">Prev</button>
    <span>Page {{ page }}</span>
    <button @click="$emit('change', page + 1)" :disabled="page * 5 >= totalResults">Next</button>
  </div>
</template>

<script setup>
const props = defineProps({
  page: Number,
  totalResults: Number
})
</script>