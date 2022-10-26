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
    <h3>{{ checkNameLength(right.title) }}</h3>
  </div>
  <div class="predictionContainer">
    <div class="leftPrediction">
      <div id="predictionNumber">
        <span>{{ leftPercent }}%</span>
      </div>
    </div>
    <div class="rightPrediction">
      <div id="predictionNumber">
        <span>{{ rightPercent }}%</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* nunito-sans-regular - latin */
@font-face {
  font-family: "Nunito Sans";
  font-style: normal;
  font-weight: 400;
  src: url("../assets/fonts/nunito-sans-v12-latin-regular.eot"); /* IE9 Compat Modes */
  src: local(""),
    url("../assets/fonts/nunito-sans-v12-latin-regular.eot?#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */ url("../assets/fonts/nunito-sans-v12-latin-regular.woff2")
      format("woff2"),
    /* Super Modern Browsers */
      url("../assets/fonts/nunito-sans-v12-latin-regular.woff") format("woff"),
    /* Modern Browsers */
      url("../assets/fonts/nunito-sans-v12-latin-regular.ttf")
      format("truetype"),
    /* Safari, Android, iOS */
      url("../assets/fonts/nunito-sans-v12-latin-regular.svg#NunitoSans")
      format("svg"); /* Legacy iOS */
}

.predictionTitleContainer,
.predictionContainer {
  color: white;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
    1px 1px 0 black;
  font-weight: bold;
  text-align: center;
  font-family: "FUTURA";
}
.predictionTitleContainer {
  display: flex;
  height: calc(1080px - 100px);
  justify-content: space-between;
}
.predictionTitleContainer h3 {
  background-size: auto;
  background-repeat: no-repeat;
  background-position: center;
  text-align: center;
  width: 15rem;
  height: 3rem;
  padding-top: 1.2rem;
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
  width: 10rem;
  height: 5rem;
  scale: 1.1;
  padding-top: 0.3rem;
  font-size: 3rem;
  background-size: contain;
  background-repeat: no-repeat;
}
.leftPrediction #predictionNumber {
  background-image: url("../assets/Prediction_A_Number.png");
}
.rightPrediction #predictionNumber {
  background-image: url("../assets/Prediction_B_Number.png");
}
</style>
