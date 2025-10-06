import Fastify from 'fastify';
import cors from "@fastify/cors";
import mysql from '@fastify/mysql';
import jwtPlugin from "./plugins/jwt.js";
import userRoutes from './router/user.js';

const fastify = Fastify({ logger: true });

fastify.register(mysql, {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "3032004Haihai@",
  database: "phong_kham_thu_cung",
  promise: true
});

// ⬅️ Đăng ký JWT TRƯỚC khi các routes cần dùng nó
await fastify.register(jwtPlugin);

// ⬅️ Sau đó mới đăng ký routes
fastify.register(userRoutes);

await fastify.register(cors, {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

fastify.get('/', async () => ({ mes: 'xin chao' }));

try {
  await fastify.listen({ port: 3000 });
} catch (error) {
  fastify.log.error(error);
  process.exit(1);
}
