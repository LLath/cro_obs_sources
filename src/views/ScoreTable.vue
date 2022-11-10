<script>
import { MAPS_MODE } from "../services/owMaps.service";
import { receiveMessage, sendMessage } from "../services/socketManager.service";
export default {
  data() {
    return {
      modes: {
        3: ["escort", "control", "push"],
        5: ["escort", "control", "push", "hybrid", "control"],
      },
      bestOf: 3,
      score: { left: [], right: [] },
      MAPS_MODE,
      teamNames: [],
      result: 0,
    };
  },
  computed: {
    compoundScore() {
      return [this.score.left, this.score.right];
    },
  },
  mounted() {
    sendMessage("mounted:scoreTable");
    receiveMessage("update:score", this.setScore);
  },
  methods: {
    setScore(scoreString) {
      console.log(scoreString);
      const { general, matchScore } = JSON.parse(scoreString);
      this.bestOf = general.bestOf;
      this.teamNames = [general.teamA, general.teamB];
      this.score = matchScore;
    },
  },
  watch: {
    compoundScore(current) {
      // console.log(current);
    },
  },
};
</script>

<template>
  <div class="content">
    <div class="tableContainer">
      <div class="tableRow tableHeader">
        <div class="header">2022 Croverwatch Fall invitational</div>
        <div class="header" v-for="mode in modes[bestOf]" :key="mode">
          <img
            :src="MAPS_MODE[mode].icon"
            alt="Overwatch push mode"
            srcset=""
          />
        </div>
        <div class="header"></div>
      </div>
      <div class="tableRow tableBody">
        <div class="body teamContainer">
          <span class="teamIcon defaultIcon"> </span>
          <div class="teamName">
            <span>EU/NA</span>
            <span>{{ teamNames[0] }}</span>
          </div>
        </div>
        <div class="body mapScore" v-for="n in bestOf" :key="n">
          {{ score.left[n - 1] || "-" }}
        </div>
        <div class="body result mapScore">
          <span class="resultBorder">|</span>{{ result }}
        </div>
      </div>
      <div class="tableRow tableBody">
        <div class="body teamContainer isSponsor">
          <span class="teamIcon croIcon"></span>
          <div class="teamName">
            <span>NA</span>
            <span>{{ teamNames[1] }}</span>
          </div>
        </div>
        <div class="body mapScore" v-for="n in bestOf" :key="n">
          {{ score.right[n - 1] || "-" }}
        </div>
        <div class="body result mapScore">
          <span class="resultBorder">|</span>
          {{ result }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  height: 100vh;
  /* background-image: url("../assets/Caster_Overlay.jpg"); */
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
.tableContainer {
  position: absolute;
  bottom: 8rem;
  left: 50%;
  transform: translate(-50%);
  border: 1px solid;
  box-shadow: rgba(223, 113, 0, 0.5) 5px 5px, rgba(223, 113, 0, 0.4) 10px 10px,
    rgba(223, 113, 0, 0.3) 15px 15px, rgba(223, 113, 0, 0.2) 20px 20px,
    rgba(223, 113, 0, 0.1) 25px 25px;
}

.tableContainer .tableRow:nth-child(2) {
  border-bottom: 1px solid black;
}

.tableRow {
  display: grid;
  grid-template-columns: 2.5fr repeat(4, 0.5fr);
  grid-template-rows: 1fr;
  gap: -1px;
  border-style: none;
  margin: 0;
  text-align: center;
}

.tableHeader {
  /* background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(223, 113, 0, 1) 100%
  ); */
  background-color: black;
}
.header {
  color: white;
  text-transform: uppercase;
  font-size: 0.7rem;

  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;

  padding: 0.1rem 0.2rem;
}
.header img {
  height: 1.2rem;
}
.tableBody {
  background-color: white;
  height: 2.5rem;
}

.mapScore {
  font-size: 1.3rem;
  font-weight: 600;

  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
}
.result {
  /* border-left: 1px solid black; */
}
.resultBorder {
  position: absolute;
  right: 2.5rem;
  padding-bottom: 0.2rem;
  font-weight: 100;
  font-size: 2rem;
  color: white;
  text-shadow: -1px 0 black;
}
.teamContainer {
  display: flex;
  justify-content: space-between;
}
.teamName {
  display: flex;
  flex-direction: column;
  text-align: left;
  flex-grow: 1;
  padding: 0 0.4rem;
}
.teamName span:nth-child(2) {
  font-size: 1.3rem;
  font-weight: bolder;
}
.isSponsor {
  /* background-color: #fdcc07; */
  background-color: rgba(223, 113, 0, 0.8);
}
.teamIcon {
  width: 3rem;
}
.defaultIcon {
  background-image: url("../assets/guests.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.croIcon {
  background-image: url("../assets/cro_black_transparent.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
