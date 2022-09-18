<script>
export default {
  data() {
    return {
      showImage: false,
    };
  },
  watch: {
    showImage(current, previous) {
      console.log(current, previous);
      setTimeout(() => {
        this.showImage = false;
      }, 2000);
    },
  },
  methods: {
    testFn() {
      this.showImage = !this.showImage;
    },
  },
};
</script>

<template>
  <div>
    <img
      src="../assets/Cro_White_transparent.webp"
      alt="Cro Logo white"
      v-bind:class="{ active: showImage }"
    />
    <button @click="testFn">Test</button>
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
