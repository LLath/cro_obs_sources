<script>
export default {
  data() {
    return {
      isImageShowing: true,
      timeout: 5000,
      isButtonShowing: true,
      isActive: false,
    };
  },
  created() {
    // addEventListener("hashchange", () => this.showImage());
  },
  mounted() {
    if (localStorage.isActive === "true") {
      this.isActive = localStorage.isActive;
    }
  },
  watch: {
    isImageShowing(current, previous) {
      console.log(current, previous);
      // this.showImage()
    },
    isActive(current) {
      if (localStorage.isActive !== current) {
        localStorage.isActive = current;
      }
      this.showImage();
    },
  },
  methods: {
    testFn() {
      window.location.replace(
        "http://127.0.0.1:3000/cro_obs_sources/crologo/#active"
      );
    },
    showImage() {
      setInterval(() => {
        this.isImageShowing = !this.isImageShowing;
        // window.location.replace(
        //   "http://127.0.0.1:3000/cro_obs_sources/crologo/"
        // );
      }, this.timeout);
    },
  },
};
</script>

<template>
  <div>
    <button @click="isActive = true" v-if="!isActive">Activate</button>
    <img
      src="../assets/Cro_White_transparent.webp"
      alt="Cro Logo white"
      v-bind:class="{ active: isImageShowing }"
    />
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
