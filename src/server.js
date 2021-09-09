import Fastify from "fastify";
import { createRenderer } from "vue-server-renderer";
import { join } from "desm";
import fs from "node:fs/promises";
import createApp from "./app.js";

const renderer = createRenderer({
  template: await fs
    .readFile(join(import.meta.url, "index.template.html"))
    .then((buf) => buf.toString()),
});

const fastify = Fastify({
  logger: true,
});

fastify.get("/*", async (req, reply) => {
  const context = {
    title: "hello",
    meta: `
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
    `,
    url: req.url,
  };
  const app = createApp(context);

  try {
    const html = await renderer.renderToString(app, context);

    reply.type("text/html");
    reply.send(html);
  } catch (err) {
    fastify.log.error(err);
    throw new Error(err);
  }
});

try {
  await fastify.listen(3000);
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
