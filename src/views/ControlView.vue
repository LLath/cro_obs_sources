<script>
import { socket, reconnectSocket } from "../services/socketio.service";
import MapsTool from "../components/MapsTool.vue";
export default {
  components: {
    MapsTool,
  },
  data() {
    return {
      controlledData: {
        teamA: "",
        scoreA: 0,
        isAttack: "A",
        teamB: "",
        scoreB: 0,
        firstTo: 3,
        mapCount: 1,
        isPush: false,
      },
      display: { message: "", overlay: "" },
      page: "ingame",
      tempReroute: "",
      socket,
    };
  },
  methods: {
    updateData() {
      const updateObject = Object.assign({}, this.controlledData);
      console.log(socket);
      this.socket.emit("update:saved", JSON.stringify(updateObject));
      this.display.overlay = "Successful send to overlay";
    },
    swapTeams() {
      [
        this.controlledData.teamA,
        this.controlledData.teamB,
        this.controlledData.scoreA,
        this.controlledData.scoreB,
      ] = [
        this.controlledData.teamB,
        this.controlledData.teamA,
        this.controlledData.scoreB,
        this.controlledData.scoreA,
      ];
      this.controlledData.isAttack = ["A", "B"][
        ["B", "A"].indexOf(this.controlledData.isAttack)
      ];
      this.display.message = "Swapped teams";
      this.updateData();
    },
    changePage({ target: { value } }) {
      if (this.page === value) {
        return;
      }
      this.socket.emit("page:change", value);
      this.page = value;
    },
    useNgrok() {
      console.log(this.tempReroute);
      this.socket = reconnectSocket(socket, this.tempReroute);
    },
  },
  watch: {
    "display.message"(current) {
      if (current !== "") {
        setTimeout(() => {
          this.display.message = "";
        }, 2500);
      }
    },
    "display.overlay"(current) {
      if (current !== "") {
        setTimeout(() => {
          this.display.overlay = "";
        }, 2500);
      }
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="controlContainer">
      <div class="left">
        <p>Left Team</p>
        <label for="team">Name</label>
        <input type="text" id="team" v-model="controlledData.teamA" />
        <label for="score">Score</label>
        <input
          type="number"
          id="score"
          v-model="controlledData.scoreA"
          min="0"
        />
        <label for="attack" id="radio">Attack</label>
        <input
          type="radio"
          name="attack"
          id="attack"
          value="A"
          :disabled="controlledData.isPush"
          v-model="controlledData.isAttack"
        />
      </div>
      <button @click="swapTeams" class="swapButton">⇄</button>
      <div class="right">
        <p>Right Team</p>
        <label for="team">Name</label>
        <input type="text" id="team" v-model="controlledData.teamB" />
        <label for="score">Score</label>
        <input
          type="number"
          id="score"
          v-model="controlledData.scoreB"
          min="0"
        />
        <label for="attack">Attack</label>
        <input
          type="radio"
          name="attack"
          id="attack"
          value="B"
          :disabled="controlledData.isPush"
          v-model="controlledData.isAttack"
        />
      </div>
    </div>
    <div class="mapContainer">
      <label for="controlledData.mapCount">Map?</label>
      <input
        type="number"
        v-model="controlledData.mapCount"
        min="1"
        id="controlledData.mapCount"
      />
      <label for="mode">First to</label>
      <input type="number" v-model="controlledData.firstTo" id="mode" />
    </div>
    <div class="lastRow">
      <button @click="updateData" class="update">Update</button>
      <div>
        <label for="controlledData.isPush">No Attack/Defense</label>
        <input
          type="checkbox"
          id="controlledData.isPush"
          v-model="controlledData.isPush"
          :value="controlledData.isPush"
        />
      </div>
      <div
        class="feedbackMessage"
        v-if="(display.message !== '') | (display.overlay !== '')"
      >
        <p>{{ this.display.message }}</p>
        <p>{{ this.display.overlay }}</p>
      </div>
    </div>
    <div class="pageSwitchContainer">
      <button
        @click="changePage"
        value="ingame"
        :class="{ active: page === 'ingame' }"
      >
        Ingame
      </button>
      <button
        @click="changePage"
        value="scoreTable"
        :class="{ active: page === 'scoreTable' }"
      >
        Score Table
      </button>
    </div>
    <div class="mapChoiceContainer">
      <MapsTool title="Team A" />
      <MapsTool title="Team B" />
    </div>
    <div>
      <h2>DEV</h2>
      <input type="text" v-model="tempReroute" />
      <button @click="useNgrok">Change temp https url</button>
    </div>
  </div>
</template>

<style>
.container {
  margin: 0 8%;
}
.left,
.right {
  width: 45%;
}
.controlContainer {
  font-size: 1.5rem;
  padding: 0;
  display: flex;
  justify-content: space-between;
}
label {
  float: left;
  width: 4rem;
}
input {
  display: block;
  padding: 0.5rem;
  background-color: lightgrey;
  margin-bottom: 1rem;
  font-size: larger;
}
#attack {
  width: 1.5rem;
  height: 1.5rem;
  margin-left: 5rem;
}
.update {
  width: 6rem;
  height: 2rem;
  font-size: 1.5rem;
  font-size: larger;
  background-color: lightgrey;
}
.swapButton {
  height: 4rem;
  font-size: 2rem;
  align-self: center;
}
.mapContainer {
  display: block;
  font-size: 1.2rem;
}
.lastRow {
  font-size: 1.2rem;
  display: flex;
  gap: 3rem;
}
.lastRow label {
  width: 5rem;
}
.feedbackMessage {
  background-color: lightgreen;
  padding: 0.2rem;
}
.pageSwitchContainer {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
}
.pageSwitchContainer button {
  background-color: lightgrey;
}
.pageSwitchContainer button.active {
  background-color: aquamarine;
}
.mapChoiceContainer {
  margin-top: 1rem;
  display: flex;
  gap: 1.5rem;
}
.teamMapContainer {
  display: flex;
  width: 50%;
}
</style>
