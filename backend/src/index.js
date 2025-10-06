import Fastify from 'fastify'
import cors from "@fastify/cors"
import mysql from '@fastify/mysql'
import controllerUser from './controller/controllerUser.js'

const fastify = Fastify({
    logger:true
})
fastify.register(mysql,{
    host:"localhost",
    port:"3306",
    user:"root",
    password:"3032004Haihai@",
    database:"phong_kham_thu_cung",
    promise:true

})

await fastify.register(cors, {
  origin: "http://localhost:5174", 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});
fastify.get('/',async (req,reply) => {
    return {mes:'xin chao'}
})
fastify.register(controllerUser)

try {
    await fastify.listen({port:3000})   
} catch (error) {
    fastify.log.error(error)
}