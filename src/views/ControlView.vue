<script>
import { socket, reconnectSocket } from "../services/socketio.service";

export default {
  data() {
    return {
      controlledData: {
        general: {
          bestOf: 3,
          teamA: "",
          teamB: "",
        },
        ingameOverlay: {
          scoreA: 0,
          isAttack: "A",
          scoreB: 0,
          mapCount: 1,
          isPush: false,
        },
        matchScore: { left: [], right: [] },
      },
      display: { message: "", overlay: "" },
      page: "ingame",
      tempReroute: "",
      socket,
      isShown: true,
    };
  },
  computed: {
    compoundDisplay() {
      return [this.display.message, this.display.overlay];
    },
  },
  methods: {
    updateData({ target: { value } }) {
      const updateObject = this.controlledData;
      this.socket.emit(
        "update:saved",
        JSON.stringify({ ...updateObject, update: value })
      );
      this.display.overlay = "Successful send to overlay";
    },
    swapTeams() {
      [
        this.controlledData.general.teamA,
        this.controlledData.general.teamB,
        this.controlledData.ingameOverlay.scoreA,
        this.controlledData.ingameOverlay.scoreB,
      ] = [
        this.controlledData.general.teamB,
        this.controlledData.general.teamA,
        this.controlledData.ingameOverlay.scoreB,
        this.controlledData.ingameOverlay.scoreA,
      ];
      this.controlledData.ingameOverlay.isAttack = ["A", "B"][
        ["B", "A"].indexOf(this.controlledData.ingameOverlay.isAttack)
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
    toggleOverlay() {
      this.isShown = !this.isShown;
      this.socket.emit("toggle:ingameOverlay");
    },
  },
  watch: {
    compoundDisplay(current) {
      if (current !== "") {
        setTimeout(() => {
          this.display.overlay = "";
          this.display.message = "";
        }, 2500);
      }
    },
    "controlledData.general.bestOf"(current, prev) {
      if (current !== prev) {
        this.controlledData.matchScore.left = [];
        this.controlledData.matchScore.right = [];
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
        <input type="text" id="team" v-model="controlledData.general.teamA" />
        <label for="score">Score</label>
        <input
          type="number"
          id="score"
          v-model="controlledData.ingameOverlay.scoreA"
          min="0"
        />
        <label for="attack" id="radio">Attack</label>
        <input
          type="radio"
          name="attack"
          id="attack"
          value="A"
          :disabled="controlledData.ingameOverlay.isPush"
          v-model="controlledData.ingameOverlay.isAttack"
        />
      </div>
      <button @click="swapTeams" class="swapButton">⇄</button>
      <div class="right">
        <p>Right Team</p>
        <label for="team">Name</label>
        <input type="text" id="team" v-model="controlledData.general.teamB" />
        <label for="score">Score</label>
        <input
          type="number"
          id="score"
          v-model="controlledData.ingameOverlay.scoreB"
          min="0"
        />
        <label for="attack">Attack</label>
        <input
          type="radio"
          name="attack"
          id="attack"
          value="B"
          :disabled="controlledData.ingameOverlay.isPush"
          v-model="controlledData.ingameOverlay.isAttack"
        />
      </div>
    </div>
    <div class="mapContainer">
      <label for="mapCount">Map?</label>
      <input
        type="number"
        v-model="controlledData.ingameOverlay.mapCount"
        min="1"
        id="mapCount"
      />
      <label for="mode">First to</label>
      <input type="number" v-model="controlledData.general.bestOf" id="mode" />
    </div>
    <div class="lastRow">
      <button @click="updateData" class="update" value="ingame">Update</button>
      <div>
        <label for="isPush">No Attack/Defense</label>
        <input
          type="checkbox"
          id="isPush"
          v-model="controlledData.ingameOverlay.isPush"
          :value="controlledData.ingameOverlay.isPush"
        />
      </div>
      <div>
        <button @click="toggleOverlay">toggle Overlay</button>
        {{ isShown }}
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
    <!-- <div class="mapChoiceContainer">
      <MapsTool title="Team A" />
      <MapsTool title="Team B" />
    </div> -->
    <div>
      <h2>Score</h2>
      <div>
        <div class="scoreTableRow">
          <h3>{{ controlledData.general.teamA }}</h3>
          <input
            v-for="n in controlledData.general.bestOf"
            :key="n"
            type="text"
            placeholder="-"
            v-model="controlledData.matchScore.left[n - 1]"
          />
        </div>
        <div class="scoreTableRow">
          <h3>{{ controlledData.general.teamB }}</h3>
          <input
            v-for="n in controlledData.general.bestOf"
            :key="n"
            type="text"
            placeholder="-"
            v-model="controlledData.matchScore.right[n - 1]"
          />
        </div>
        <button @click="updateData" value="score">Update score</button>
      </div>
    </div>
    <div>
      <h2>DEV</h2>
      <input type="text" v-model="tempReroute" />
      <button @click="useNgrok">Change temp https url</button>
    </div>
    <iframe
      src="https://dashboard.twitch.tv/widgets/guest-star/llath25?auth=2F0XG6BowWzNKuo1SlFD90YYrFM&display=single&slot=1"
      frameborder="0"
      height="100%"
      width="100%"
    ></iframe>
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
.scoreTableRow {
  display: flex;
  gap: 1rem;
}
.scoreTableRow input {
  width: 3rem;
}
.scoreTableRow h3 {
  width: 10rem;
}
</style>
