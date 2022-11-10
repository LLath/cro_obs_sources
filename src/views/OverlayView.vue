<script>
import IngameOverlay from "./IngameOverlay.vue";
import ScoreTable from "./ScoreTable.vue";
import { setupPage } from "../services/socketManager.service";

export default {
  components: {
    IngameOverlay,
    ScoreTable,
  },
  data() {
    return {
      page: "ingame",
    };
  },
  mounted() {
    setupPage(this.setPage);
    if (localStorage.page) {
      this.page = localStorage.page;
    }
  },
  methods: {
    setPage(msg) {
      this.page = msg;
      localStorage.page = msg;
    },
  },
  watch: {
    page(current) {
      console.log("Watch", current);
    },
  },
};
</script>

<template>
  <IngameOverlay v-if="page === 'ingame'" />
  <ScoreTable v-if="page === 'scoreTable'" />
</template>

<style></style>
