<script>
import PredictionCounter from "../components/PredictionDisplay.vue";
export default {
  components: { PredictionCounter },
  props: ["twitchResponse"],
  data() {
    return {
      twitchName: "",
      isLoggedIn: false,
      CSRF_TOKEN: "",
      authUrl: "",
      leftPrediction: "",
      rightPrediction: "",
    };
  },
  async created() {
    let redirect_uri = "https://llath.github.io/cro_obs_sources/prediction";
    if (localStorage.login) {
      this.isLoggedIn = localStorage.login;
    }
    if (import.meta.env.DEV) {
      redirect_uri = "http://localhost:3000/cro_obs_sources/prediction";
    }
    this.CSRF_TOKEN = localStorage.CSRF_TOKEN;

    if (this.twitchResponse?.error) {
      console.log("ERROR:", this.twitchResponse.error);
      this.CSRF_TOKEN = this.generateRandomString(25);
      this.authUrl = `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${
        import.meta.env.VITE_TWITCH_CLIENT_ID
      }&redirect_uri=${redirect_uri}&scope=${encodeURIComponent(
        "channel:read:predictions"
      )}&state=${this.CSRF_TOKEN}`;

      localStorage.CSRF_TOKEN = this.CSRF_TOKEN;
    }

    const { access_token, state, token_type } = this.twitchResponse;
    // TODO: CSRF_TOKEN does not work 100%
    // if (state !== this.CSRF_TOKEN) {
    //   console.log("Not the same");
    //   return;
    // }
    const twitchId = import.meta.env.VITE_TWITCH_CLIENT_ID;
    const twitchSecret = access_token;
    const headers = {
      Authorization: `Bearer ${twitchSecret}`,
      "Client-Id": twitchId,
    };

    const user = await fetch("https://api.twitch.tv/helix/users", {
      headers,
    }).then((response) => response.json());
    const userId = user?.data.shift().id;

    if (userId === undefined) {
      console.log("ERROR: undefined user; access_token");
      return;
    }
    const { data } = await fetch(
      `https://api.twitch.tv/helix/predictions?broadcaster_id=${userId}`,
      { headers }
    ).then((v) => v.json());

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

    if (data === null && import.meta.env.PROD) {
      console.log("ERROR: no predictions to fetch");
      return;
    }
    const activePrediction = data.shift();
    this.leftPrediction = activePrediction.outcomes[0];
    this.rightPrediction = activePrediction.outcomes[1];
    // console.log({ activePrediction });
  },
  async mounted() {},
  watch: {},
  methods: {
    generateRandomString(length) {
      return Math.random()
        .toString(36)
        .substring(2, length + 2);
    },
    authorize() {
      localStorage.login = "true";
    },
  },
};
</script>

<template>
  <a :href="authUrl" @click="authorize" class="connectButton" v-if="!isLoggedIn"
    >Connect</a
  >
  <PredictionCounter
    v-if="isLoggedIn && leftPrediction && rightPrediction"
    :left="leftPrediction"
    :right="rightPrediction"
  />
</template>

<style>
#app {
  width: 1920px;
  height: 1080px;
  /* background-image: url("../assets/Caster_Overlay.jpg"); */
}
.connectButton {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  font-size: 7rem;
  background-color: black;
  color: white;
  text-decoration: none;
}
</style>
