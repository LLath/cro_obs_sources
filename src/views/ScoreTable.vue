<script>
export default {
  data() {
    return {
      score: {},
    };
  },
  mounted() {},
};
</script>

<template>
  <!-- hybrid https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/bltd55839866311dd1e/62fc2d8bd62b1d3a8d1e5318/Hybrid.svg -->
  <div class="content">
    <div class="tableContainer">
      <div class="tableRow tableHeader">
        <div class="header">2022 Croverwatch Fall invitational</div>
        <div class="header">
          <img
            src="https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt054b513cd6e95acf/62fd5b4a8972f93d1e325243/Push.svg"
            alt="Overwatch push mode"
            srcset=""
          />
        </div>
        <div class="header">
          <img
            src="https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt5ea0d3baf0e2d03f/62fc2d8bda42240856c14598/Control.svg"
            alt=""
          />
        </div>
        <div class="header">
          <img
            src="https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/bltba08041a1eb32c43/62fc2d8bc317e303559ab5b1/Escort.svg"
            alt=""
          />
        </div>
        <div class="header"></div>
      </div>
      <div class="tableRow tableBody">
        <div class="body teamContainer">
          <span class="teamIcon defaultIcon"> </span>
          <div class="teamName">
            <span>EU/NA</span>
            <span>Team name</span>
          </div>
        </div>
        <div class="body mapScore">3</div>
        <div class="body mapScore">-</div>
        <div class="body mapScore">-</div>
        <div class="body result mapScore">
          <span class="resultBorder">|</span> 1
        </div>
      </div>
      <div class="tableRow tableBody">
        <div class="body teamContainer isSponsor">
          <span class="teamIcon croIcon"></span>
          <div class="teamName">
            <span>NA</span>
            <span>Team name</span>
          </div>
        </div>
        <div class="body mapScore">0</div>
        <div class="body mapScore">-</div>
        <div class="body mapScore">-</div>
        <div class="body result mapScore">
          <span class="resultBorder">|</span>
          0
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
