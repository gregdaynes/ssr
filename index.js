import Fastify from "fastify";
import Vue from "vue";
import { createRenderer } from "vue-server-renderer";

const renderer = createRenderer();

const fastify = Fastify({
  logger: true,
});

fastify.get("/*", async (req, reply) => {
  const app = new Vue({
    data: {
      url: req.url,
    },
    template: `<div>The visited URL is: {{ url }}</div>`,
  });

  try {
    const html = await renderer.renderToString(app);

    reply.type("text/html");
    reply.send(`
      <!doctype html>
      <html lang="en">
        <head>
          <title>Hello</title>
        </head>
        <body>${html}</body>
      </html>
    `);
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
