<script>
import { socket } from "../services/socketio.service";
import { sendMessage, receiveMessage } from "../services/socketManager.service";
import { TEAMS } from "../constants/owTeams";

export default {
  data() {
    return {
      data: { general: {}, ingameOverlay: {} },
      attackA: "attack",
      attackB: "defense",
      page: "ingame",
      TEAMS,
      showOverlay: true,
    };
  },
  mounted() {
    if (import.meta.env.DEV) {
      this.data = {
        general: {
          bestOf: 3,
          teamA: "Team A",
          teamB: "Team B",
        },
        ingameOverlay: {
          scoreA: 2,
          isAttack: "A",
          scoreB: 0,
          mapCount: 1,
          isPush: false,
        },
      };
    }
    sendMessage("mounted:ingameOverlay");
    socket.on("update:overlay", (msg) => (this.data = JSON.parse(msg)));
    receiveMessage("toggle:ingameOverlay:set", this.setVisibility);
  },

  watch: {
    "data.ingameOverlay.isAttack"(current) {
      switch (current) {
        case "A":
          this.attackA = "attack";
          this.attackB = "defense";
          break;
        case "B":
          this.attackA = "defense";
          this.attackB = "attack";
          break;
      }
    },
    "data.ingameOverlay.isPush"(current) {
      if (current) {
        [this.attackA, this.attackB] = ["", ""];
      }
    },
  },
  methods: {
    setVisibility() {
      this.showOverlay = !this.showOverlay;
    },
  },
};
</script>

<template>
  <div class="overlayContainer" v-if="showOverlay">
    <div class="left">
      <span :class="attackA" class="modeContainer"></span>
      <span class="score">{{ data.ingameOverlay.scoreA }}</span>
      <img :src="'assets/' + TEAMS[data.general.teamA]?.icon" alt="" />
      <p>{{ data.general.teamA }}</p>
    </div>
    <div class="middle">
      <span>MAP {{ data.ingameOverlay.mapCount }}</span>
      <span> - Best of {{ data.general.bestOf }}</span>
    </div>
    <div class="right">
      <span :class="attackB" class="modeContainer"></span>
      <span class="score">{{ data.ingameOverlay.scoreB }}</span>
      <img :src="'assets/' + TEAMS[data.general.teamB]?.icon" alt="" />
      <p>{{ data.general.teamB }}</p>
    </div>
  </div>
</template>

<style scoped>
.overlayContainer {
  /* background-color: lightgray; */
  font-family: "Nunito Sans";
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
    1px 1px 0 black;

  display: flex;
  gap: 49rem;
  height: 100vh;
  background-repeat: no-repeat;
  /* background-image: url("../assets/OWL_example2.png"); */
  /* background-color: yellow; */
  text-transform: uppercase;
}
.left,
.right {
  width: 45%;
  height: 2rem;
  margin-top: 1.5rem;
  display: flex;
  border: 1px solid lightgray;
  border-radius: 3px;
}
.left {
  background-color: white;
  flex-direction: row-reverse;
  margin-left: 2.5rem;
}
.right {
  margin-right: 2.5rem;
  /* OW2 original color */
  /* background-color: rgb(215, 73, 25); */
  /* Cro Orange */
  background-color: #df7100;
  /* border-color: white; */
}
.left img,
.right img {
  width: 2rem;
  margin: 0 1rem;
}
.modeContainer {
  width: calc(2rem - 0.2rem);
  background-size: 1.3rem;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0.1rem;
}
.attack {
  background-image: url("../assets/attack_token.png");
}
.defense {
  background-image: url("../assets/defense_token.png");
}
.attack,
.defense {
  border: 1px solid black;
  border-radius: 50%;
}
p {
  margin: 0;
  padding: 0 2rem 2rem;
}
.score {
  height: 100%;
  width: 2rem;
  text-align: center;
  background-color: white;
}

.middle {
  font-size: 1.2rem;

  position: absolute;
  left: 50%;
  transform: translate(-50%);
  top: 0.1rem;
  background-color: rgba(0, 0, 0, 0.8);
  border: 1px solid transparent;
  border-radius: 3px;
  /* background-color: rgba(0, 0, 0, 1); */
  padding: 0 1rem;
}
</style>
