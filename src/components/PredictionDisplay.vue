<script>
export default {
  props: ["headers", "userId"],
  data() {
    return {
      twitchName: "",
      leftPercent: 0,
      rightPercent: 0,
      leftPrediction: { title: "", channel_points: "" },
      rightPrediction: { title: "", channel_points: "" },
    };
  },
  computed: {
    predictionChannelPoints() {
      return [
        this.leftPrediction.channel_points,
        this.rightPrediction.channel_points,
      ];
    },
  },
  mounted() {
    this.fetchPredictionInterval();
  },
  watch: {
    predictionChannelPoints(current) {
      this.calculatePercent(...current);
    },
  },
  methods: {
    calculatePercent(left, right) {
      const gesamt = left + right;
      this.leftPercent = Math.round((left / gesamt) * 100);
      this.rightPercent = Math.round((right / gesamt) * 100);
    },
    checkNameLength(name) {
      const MAX_LENGTH = 11;
      if (name.length > MAX_LENGTH) {
        return name.slice(0, MAX_LENGTH - 3) + "...";
      }
      return name;
    },
    fetchPredictionInterval() {
      const { data: _data } = {
        data: [
          {
            id: "f6a64b42-02be-450f-9637-b22813720a57",
            broadcaster_id: "123456",
            broadcaster_name: "smartysmartmaster",
            broadcaster_login: "smartysmartmaster",
            title: "What level will I reach today?",
            winning_outcome_id: null,
            outcomes: [
              {
                id: "5cdf0e7a-fc1b-4562-aa62-16ce70173ea7",
                title: "Pandaleo102222",
                users: 1,
                channel_points: 5000,
                top_predictors: null,
                color: "BLUE",
              },
              {
                id: "5cdf0e7a-fc1b-4562-aa62-16ce70173ea7",
                title: "Level 2",
                users: 2,
                channel_points: 500,
                top_predictors: null,
                color: "BLUE",
              },
            ],
            prediction_window: 200,
            status: "ACTIVE",
            created_at: "2022-06-27T19:29:55.034259659Z",
            ended_at: null,
            locked_at: null,
          },
        ],
      };

      if (import.meta.env.DEV) {
        const activePrediction = _data.shift();
        this.leftPrediction = activePrediction.outcomes[0];
        this.rightPrediction = activePrediction.outcomes[1];
        setInterval(() => {
          this.leftPrediction.channel_points = Math.round(Math.random() * 100);
          this.rightPrediction.channel_points = Math.round(Math.random() * 100);
        }, 500);
        // FIXME: delete return if you need real prediction
        return;
      }
      setInterval(async () => {
        const { data } = await fetch(
          `https://api.twitch.tv/helix/predictions?broadcaster_id=${this.userId}`,
          { headers: this.headers }
        ).then((v) => v.json());

        if (data === null) {
          console.log("ERROR: no predictions to fetch");
          // this.leftPrediction = this.leftPrediction + 1;
          // this.rightPrediction = this.rightPrediction + 2;
          return;
        }
        const activePrediction = data.shift();
        this.leftPrediction = activePrediction.outcomes[0];
        this.rightPrediction = activePrediction.outcomes[1];
      }, 2000);
    },
  },
};
</script>

<template>
  <div class="predictionTitleContainer">
    <h3>{{ checkNameLength(leftPrediction.title) }}</h3>
    <h3>{{ checkNameLength(rightPrediction.title) }}</h3>
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
