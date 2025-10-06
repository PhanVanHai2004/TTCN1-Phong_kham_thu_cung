import fastifyJWT from "@fastify/jwt";
import fp from "fastify-plugin";

const jwtPlugin =async function (fastify, options) {
  fastify.register(fastifyJWT, {
    secret: "my-secret-key",
  });

  fastify.decorate("authenticate", async function (request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ error: "Token không hợp lệ hoặc đã hết hạn!" });
    }
  });
}

export default fp(jwtPlugin);
