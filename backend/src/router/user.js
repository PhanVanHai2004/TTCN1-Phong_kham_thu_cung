export default async function userRoutes(fastify, options) {
  fastify.post("/login", async (request, reply) => {
    const { email, password } = request.body;

    if (email === "admin@gmail.com" && password === "123456") {
      const token = fastify.jwt.sign({ email });
      return { message: "Đăng nhập thành công", token };
    } else {
      reply.code(401).send({ error: "Sai email hoặc mật khẩu" });
    }
  });

  // Route có bảo vệ JWT
  fastify.get("/profile", {
    preValidation: fastify.authenticate, // ✅ đảm bảo authenticate đã có
  }, async (request, reply) => {
    return { user: request.user };
  });
}
