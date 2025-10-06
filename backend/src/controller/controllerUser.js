import { addUser,deleteUser,getAllUser, updateUser ,getByidUser} from "../model/modelUser.js"
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
    fastify.get('/getUser',async (req,reply) => {
        const row = await getAllUser(fastify)
        return row
    })
    fastify.delete('/deleteUser/:id',async (req,reply) => {
        const id = req.params.id
        await deleteUser(fastify,id)
        return{mes:"xoa thanh cong user"}
    })
    fastify.patch('/updateUser/:id',async (req,reply) => {
        const id = req.params.id
        const user = req.body
        await updateUser(fastify,user,id)
        return {mes:"cap nhat thanh cong user"}
    })
     fastify.get('/getByidUser/:id',async (req,reply) => {
        const id = req.params.id
        const row = await getByidUser(fastify,id)
        return row
    })
}
export default controllerUser