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
      error: "",
      showDisconnect: false,
      headers: {
        Authorization: "",
        "Client-Id": "",
      },
      userId: "",
    };
  },
  async mounted() {
    document.addEventListener("mouseover", () => (this.showDisconnect = true));
    document.addEventListener(
      "mouseleave",
      () => (this.showDisconnect = false)
    );
    let redirect_uri = "https://llath.github.io/cro_obs_sources/prediction";
    if (localStorage.login) {
      this.isLoggedIn = localStorage.login;
    }
    if (import.meta.env.DEV) {
      redirect_uri = "http://localhost:2833/cro_obs_sources/prediction";
    }
    this.CSRF_TOKEN = localStorage.CSRF_TOKEN;

    if (this.twitchResponse?.error) {
      console.log("ERROR:", this.twitchResponse.error);
      this.CSRF_TOKEN = this.generateRandomString(25);
      this.authUrl = `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${
        import.meta.env.VITE_TWITCH_CLIENT_ID
      }&force_verify=true&redirect_uri=${redirect_uri}&scope=${encodeURIComponent(
        "channel:read:predictions"
      )}&state=${this.CSRF_TOKEN}`;

      localStorage.CSRF_TOKEN = this.CSRF_TOKEN;
    }

    const { access_token, state, token_type } = this.twitchResponse;
    // if (state !== this.CSRF_TOKEN) {
    //   const msg = "CSRF_TOKEN is not the same";
    //   console.log(msg);
    //   this.error = msg;
    //   return;
    // }
    const twitchId = import.meta.env.VITE_TWITCH_CLIENT_ID;
    const twitchSecret = access_token;
    this.headers = {
      Authorization: `Bearer ${twitchSecret}`,
      "Client-Id": twitchId,
    };

    const user = await fetch("https://api.twitch.tv/helix/users", {
      headers: this.headers,
    }).then((response) => response.json());
    const userId = user?.data.shift().id;

    if (userId === undefined) {
      const msg = "ERROR: undefined user; access_token";
      console.log(msg);
      this.error = msg;
      return;
    }
    this.userId = userId;
  },
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
    disconnect() {
      localStorage.clear();
    },
  },
};
</script>

<template>
  <div>
    <a
      :href="authUrl"
      @click="authorize"
      class="connectButton"
      v-if="!isLoggedIn"
      >Connect</a
    >
    <a
      href="/cro_obs_sources/prediction"
      v-if="isLoggedIn && showDisconnect"
      class="disconnectButton"
      @click="disconnect"
      >Disconnect</a
    >
    <div v-if="this.error">{{ error }}</div>
    <PredictionCounter v-if="isLoggedIn" :headers="headers" :userId="userId" />
  </div>
</template>

<style>
#app {
  width: 1920px;
  height: 1080px;
  /* background-image: url("../assets/Caster_Overlay.jpg"); */
}
a {
  background-color: black;
  text-decoration: none;
  color: white;
  z-index: 2;
}
.connectButton,
.disconnectButton {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 7rem;
}
</style>
