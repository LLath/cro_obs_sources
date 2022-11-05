<script>
import { MAPS } from "../services/owMaps.service";

export default {
  props: ["title"],
  data() {
    return {
      chosenMaps: new Set(),
      MAPS,
      filteredMaps: [],
      isMapSearch: false,
    };
  },
  methods: {
    searchMap() {
      this.filteredMaps = this.MAPS.filter(
        (map) => map.toLowerCase().indexOf(this.mapContext.toLowerCase()) > -1
      );
      this.isMapSearch = true;
    },
    handleMapClick({ target }) {
      if (this.chosenMaps.size >= 6) {
        console.log("DEBUG: maps are full");
        return;
      }
      this.chosenMaps.add(target.innerHTML);
    },
    removeMap({ target: { innerHTML } }) {
      this.chosenMaps.delete(innerHTML);
    },
  },
};
</script>

<template>
  <div>
    <h2>{{ title }}</h2>
    <input type="text" v-model="mapContext" @input="searchMap" />
    <ul v-if="isMapSearch">
      <li v-for="result in filteredMaps" :key="result" @click="handleMapClick">
        {{ result }}
      </li>
    </ul>
  </div>
  <div>
    Chosen Maps
    <span>{{ chosenMaps.size }} / 6</span>
    <ul>
      <li v-for="map in chosenMaps" :key="map" @click="removeMap">
        {{ map }}
      </li>
    </ul>
  </div>
</template>

<style></style>
