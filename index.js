import Fastify from "fastify";

const fastify = Fastify({
  logger: true,
});

try {
  await fastify.listen(3000);
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
