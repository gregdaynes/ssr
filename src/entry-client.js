import { createApp } from "./app.mjs";

const { app, router } = createApp();

router.onReady(() => {
  app.$mount("#app");
});
