import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/crologo",
      name: "crologo",
      component: () => import("../components/CroLogo.vue"),
    },
  ],
});

export default router;
