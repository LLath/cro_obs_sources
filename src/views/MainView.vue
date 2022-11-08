<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <div>
    <RouterLink
      v-for="route in $router.options.routes"
      :key="route.path"
      :to="route.path"
      >{{ route.name }}</RouterLink
    >
  </div>
</template>

<style scoped>
div {
  display: flex;
}
a {
  display: block;
  text-align: center;
  padding: 1rem;
  margin: 1rem;
  background-color: grey;
  color: white;
  text-decoration: none;
  width: 25%;
}
</style>
