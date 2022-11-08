<script>
import { RouterLink } from "vue-router";
export default {
  components: [RouterLink],
  data() {
    return {
      routes: this.$router.options.routes,
    };
  },
};
</script>
<template>
  <div>
    <RouterLink v-for="route in routes" :key="route.path" :to="route.path">{{
      route.name
    }}</RouterLink>
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
