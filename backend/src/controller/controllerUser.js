import { addUser } from "../model/modelUser.js"
import { UserSchema } from "../schema/schemaUser.js"


const controllerUser = async (fastify,options)=>{
    fastify.post('/addUser',{schema:UserSchema}, async(req,reply)=>{
        try {
        const user = req.body
        await addUser(fastify,user)
        return {mes:'them thanh cong'}
        } catch (err) {
            fastify.log.error('Lỗi khi thêm người dùng:', err)
            return reply.code(500).send({
        success: false,
        message: 'Lỗi máy chủ khi thêm người dùng',
        error: err.message
      });
            
        }
    })
}
export default controllerUser