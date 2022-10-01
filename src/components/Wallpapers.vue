<script>
export default {
  data() {
    return {
      wallpaperUrl: "",
    };
  },
  async beforeRouteUpdate(to, from) {
    console.log(to, from);
  },
  mounted() {},
  watch: {
    "$route.params.url"(current) {
      console.log(current);
    },
    wallpaperUrl(current) {
      console.log(current);
    },
  },
  methods: {},
};
</script>

<template>
  <div>
    <img :src="'../assets/wallpapers/'" :alt="wallpaperUrl" />
  </div>
</template>

<style scoped>
img {
  display: none;
  padding: 0;
  width: 100%;
  height: 100%;
}
.active {
  display: block;
}
</style>
