import { App } from "./index";

(async () => {
  const app = new App(3000);
  await app.start();
})();