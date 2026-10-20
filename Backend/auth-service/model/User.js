import mongoose from 'mongoose'

const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:[true,'this email already exist']
    },
    password:{
        type:String,
        required:[true ,'password is required']
    },
    role:{
        type:String,
        default:'user'
    }

},
{
    timestamps:true
}
)

const User = mongoose.model('user',UserSchema)
export default User