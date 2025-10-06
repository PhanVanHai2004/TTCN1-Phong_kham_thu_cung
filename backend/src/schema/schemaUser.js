export const UserSchema = {
    body:{
        type:'object',
        required:['name','email','password','address'],
        properties:{
            name:{type:'string',minLength:2,maxLength:20},
            email:{type:'string',format:'email'},
            password:{type:'string',minLength:8,maxLength:20},
            address:{type:'string'},
            role:{type:'string',enum:['user','admin']}
            
        }
    }
}