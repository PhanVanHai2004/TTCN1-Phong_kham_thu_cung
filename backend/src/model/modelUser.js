

    export const addUser = async(fastify,user)=>{
        const birth_date = user.birth_date|| new Date()
        const role = 'user'
        await fastify.mysql.execute(`INSERT INTO users (name,email,password,birth_date,address,phone,role) VALUES (?,?,?,?,?,?,?)`,
            [user.name,user.email,user.password,birth_date,user.address,user.phone,role]   
        )
    }
    export const getAllUser = async (fastify) => {
        const [row] = await  fastify.mysql.execute(`SELECT * FROM users `)
        return row
    }
    export const deleteUser = async (fastify,id) => {
        await fastify.mysql.execute(`DELETE FROM users WHERE id = ?`,[id])  
    }
    export const updateUser = async (fastify,user,id) => {
    await fastify.mysql.execute(`UPDATE users SET name = ? ,email=?,password=?,birth_date=?,address = ?,phone =? WHERE id =? `,
        [user.name,user.email,user.password,user.birth_date,user.address,user.phone,id])
    }
    export const getByidUser = async (fastify,id) => {
    const [row] = await fastify.mysql.execute(`SElECT * FROM users WHERE id = ?`,[id])
    return row
    }