import { createApp } from "./app.mjs";

export default (context) => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp();

    router.push(context.url);

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();

      if (!matchedComponents.length) {
        return reject("No matched route");
      }

      resolve(app);
    }, reject);
  });
};
