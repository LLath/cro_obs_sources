const MAPS_HYBRID = [
  "Blizzard World",
  "Eichenwalde",
  "Hollywood",
  "King's Row",
  "Midtown",
  "Numbani",
  "Parasío",
];
const MAPS_PUSH = ["Colosseo", "Esperança", "New Queen Street"];
const MAPS_CONTROL = ["Busan", "Ilios", "Lijiang Tower", "Nepal", "Oasis"];
const MAPS_ESCORT = [
  "Circuit Royal",
  "Dorado",
  "Havana",
  "Junkertown",
  "Rialto",
  "Route 66",
  "Watchpoint: Gibraltar",
];
export const MAPS = [].concat(
  MAPS_HYBRID,
  MAPS_PUSH,
  MAPS_CONTROL,
  MAPS_ESCORT
);

const MAPS_SCREENSHOT = {
  "New Queen Street":
    "https://static.wikia.nocookie.net/overwatch_gamepedia/images/9/91/Toronto.jpg/revision/latest?cb=20220926222923",
};

export const MAPS_MODE = {
  hybrid: {
    icon: "https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/bltd55839866311dd1e/62fc2d8bd62b1d3a8d1e5318/Hybrid.svg",
    maps: MAPS_HYBRID,
  },
  push: {
    icon: "https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt054b513cd6e95acf/62fd5b4a8972f93d1e325243/Push.svg",
    maps: MAPS_PUSH,
  },
  control: {
    icon: "https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt5ea0d3baf0e2d03f/62fc2d8bda42240856c14598/Control.svg",
    maps: MAPS_CONTROL,
  },
  escort: {
    icon: "https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/bltba08041a1eb32c43/62fc2d8bc317e303559ab5b1/Escort.svg",
    maps: MAPS_ESCORT,
  },
};
