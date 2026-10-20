import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import User from './model/User.js'
import cors from 'cors'
import jwt from 'jsonwebtoken'
const { JWT_SECRET, MONGO_URI, PORT = 5000 } = process.env
if (!JWT_SECRET || !MONGO_URI) {
    console.error('Missing JWT_SECRET or MONGO_URI in .env')
    process.exit(1)
}

const app= express()
app.use(cors())
app.use(express.json())



app.post('/login',async (req,res)=>{
    const data = req.body
    console.log('1. Request received')
    try{
        const user= await User.findOne({email:data.email})
        if(!user){
            return res.status(401).json({'message':'Invalid email and password!'})
        }

        const match = await bcrypt.compare(data.password,user.password)
        if(!match){
            return res.status(401).json({'message':'Invalid email or password!'})
        }
        const secret={
            "id":user.id,
            "name":user.name,
            "email":user.email,
            "role":user.role
        }

        const token = jwt.sign(secret,JWT_SECRET,{expiresIn:"1h"})

        return res.status(200).json({
  message: "loged in successfully",
  token: token,
  role: user.role,
});

    }catch(error){
       res.status(500).json({'error':error.message})
    }
})
app.post('/register',async (req,res)=>{
    let data = req.body

    try{
        const user = await User.findOne({email: data.email})

        if(user){
            return res.status(409).json({"message":'User Already exist try login' ,"email":data.email})
        }else{
            const hashedPass= await bcrypt.hash(data.password,10)
            data.password=hashedPass;
            const newUser= await User.create(data)
            return res.status(201).json({'message':'Account has created'})
        }
    }catch(error){
        res.status(500).json({'message':`operation failed with error ${error.message}`})
    }

})

const StartServer = async()=>{

    try{

        
        await mongoose.connect(MONGO_URI)

        console.log('db connected successfully')
        app.listen(PORT,()=>{
            console.log('server started')
        })
    }catch(error){
        console.log(error.message)
    }
    
}
StartServer()