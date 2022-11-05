<script>
import IngameOverlay from "./IngameOverlay.vue";
import ScoreTable from "./ScoreTable.vue";
import { setupManager } from "../services/siteManager.service";

export default {
  components: {
    IngameOverlay,
    ScoreTable,
  },
  data() {
    return {
      page: "scoreTable",
    };
  },
  mounted() {
    setupManager(this.setPage);
  },
  methods: {
    setPage(msg) {
      this.page = msg;
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
