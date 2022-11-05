<script>
export default {
  props: ["left", "right"],
  data() {
    return {
      twitchName: "",
      leftPercent: 0,
      rightPercent: 0,
    };
  },
  mounted() {
    const [leftPercent, rightPercent] = this.calculatePercent(
      this.left.channel_points,
      this.right.channel_points
    );
    this.leftPercent = leftPercent;
    this.rightPercent = rightPercent;
  },
  watch: {},
  methods: {
    calculatePercent(left, right) {
      console.log(import.meta.env.DEV);
      if (import.meta.env.DEV) {
        let devCounter = 0;
        setInterval(() => {
          if (devCounter == 98) {
            devCounter = 0;
          }
          this.leftPercent = devCounter + 1;
          this.rightPercent = devCounter + 2;
          devCounter += 1;
          return [devCounter + 1, devCounter + 2];
        }, 500);
      }
      const gesamt = left + right;
      const leftP = Math.round((left / gesamt) * 100);
      const rightP = Math.round((right / gesamt) * 100);
      return [leftP, rightP];
    },
    checkNameLength(name) {
      const MAX_LENGTH = 11;
      if (name.length > MAX_LENGTH) {
        return name.slice(0, MAX_LENGTH - 3) + "...";
      }
      return name;
    },
  },
};
</script>

<template>
  <div class="predictionTitleContainer">
    <h3>{{ checkNameLength(left.title) }}</h3>
    <h3>Team B</h3>
  </div>
  <div class="predictionContainer">
    <div class="leftPrediction">
      <div id="predictionNumber">
        <div>{{ leftPercent }}%</div>
      </div>
    </div>
    <div class="rightPrediction">
      <div id="predictionNumber">
        <div>{{ rightPercent }}%</div>
      </div>
    </div>
  </div>
</template>

<style>
.predictionTitleContainer,
.predictionContainer {
  color: white;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
    1px 1px 0 black;
  font-weight: bold;
}
.predictionTitleContainer {
  display: flex;
  height: calc(1080px - 100px);
  justify-content: space-between;
}
.predictionTitleContainer h3 {
  /* center font */
  display: flex;
  justify-content: center;
  align-items: center;

  background-size: auto;
  background-repeat: no-repeat;
  background-position: center;
  width: 172px;
  height: 45px;
  margin: auto 13.55rem 0.5rem 13.55rem;
  font-size: 1.5rem;
}
.predictionTitleContainer h3:first-child {
  background-image: url("../assets/Prediction_A_Titel.png");
}
.predictionTitleContainer h3:last-child {
  background-image: url("../assets/Prediction_B_Titel.png");
}
.predictionContainer {
  display: flex;
  justify-content: space-between;
}
.leftPrediction,
.rightPrediction {
  margin: auto 9.2rem 0 9.2rem;
}
#predictionNumber {
  /* scale: 2; */
  background-size: contain;
  background-repeat: no-repeat;
}
.leftPrediction #predictionNumber {
  background-image: url("../assets/Prediction_A_Number.png");
}
.rightPrediction #predictionNumber {
  background-image: url("../assets/Prediction_B_Number.png");
}
#predictionNumber div {
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 3rem;

  text-align: right;

  width: 172px;
  height: 67px;
}
</style>
