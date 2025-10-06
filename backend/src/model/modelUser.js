

    export const addUser = async(fastify,user)=>{
        const birth_date = user.birth_date|| new Date()
        const role = 'user'
        await fastify.mysql.execute(`INSERT INTO users (name,email,password,birth_date,address,role) VALUES (?,?,?,?,?,?)`,
            [user.name,user.email,user.password,birth_date,user.address,role]   
        )
    }
    export const getAllUser = async (fastify) => {
        const [row] = await  fastify.mysql.execute(`SELECT * FROM users `)
        return row
    }