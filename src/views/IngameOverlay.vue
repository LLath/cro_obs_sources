<script>
import { socket } from "../services/socketio.service";

export default {
  data() {
    return {
      data: {},
      attackA: "attack",
      attackB: "defense",
      page: "ingame",
    };
  },
  mounted() {
    if (import.meta.env.DEV) {
      this.data = {
        teamA: "Team A",
        scoreA: 2,
        isAttack: "A",
        teamB: "Team B",
        scoreB: 0,
        firstTo: 3,
        mapCount: 1,
        isPush: false,
      };
    }
    socket.on("update:overlay", (msg) => (this.data = JSON.parse(msg)));
  },

  watch: {
    "data.isAttack"(current) {
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
    "data.isPush"(current) {
      if (current) {
        [this.attackA, this.attackB] = ["", ""];
      }
    },
  },
};
</script>

<template>
  <div class="overlayContainer">
    <div class="left">
      <span :class="attackA" class="modeContainer"></span>
      <span class="score">{{ data.scoreA }}</span>
      <p>{{ data.teamA }}</p>
    </div>
    <div class="middle">
      <span>MAP {{ data.mapCount }}</span>
      <span> - First to {{ data.firstTo }}</span>
    </div>
    <div class="right">
      <span :class="attackB" class="modeContainer"></span>
      <span class="score">{{ data.scoreB }}</span>
      <p>{{ data.teamB }}</p>
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
  border: 1px solid white;
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
.modeContainer {
  width: calc(2rem - 0.2rem);
  background-size: 1.5rem;
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
