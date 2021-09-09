import Fastify from "fastify";
import Vue from "vue";
import { createRenderer } from "vue-server-renderer";

const fastify = Fastify({
  logger: true,
});

const app = new Vue({
  template: `<div>Hello World</div>`,
});
const renderer = createRenderer();

try {
  const html = await renderer.renderToString(app);
  fastify.log.info(html);
} catch (err) {
  fastify.log.error(err);
}

try {
  await fastify.listen(3000);
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
