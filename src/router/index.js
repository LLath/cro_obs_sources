import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Main",
      component: () => import("../views/MainView.vue"),
    },

    {
      path: "/crologo",
      name: "crologo",
      component: () => import("../components/CroLogo.vue"),
    },

    {
      path: "/prediction",
      name: "prediction",
      component: () => import("../views/PredictionView.vue"),
      props: (route) => {
        const hash = route.hash.replace("#", "");
        const twitchResponse = {};
        if (hash.length === 0) {
          twitchResponse.error = "No hash found";
        }
        hash.split("&").forEach((item) => {
          const [key, value] = item.split("=");
          twitchResponse[key] = value;
        });
        return { twitchResponse };
      },
    },

    {
      path: "/control",
      name: "Controller",
      component: () => import("../views/ControlView.vue"),
    },

    {
      path: "/croverwatch",
      name: "Croverwatch Overlay",
      component: () => import("../views/OverlayView.vue"),
    },
  ],
});

export default router;
