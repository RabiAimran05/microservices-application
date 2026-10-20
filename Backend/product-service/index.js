import 'dotenv/config'
import mongoose from 'mongoose'
import Product from './models/Product.js'
import express from 'express'
import isAuthenticated from './middleware/isAuthentificated.js'
import cors from 'cors'

const { MONGO_URI, PORT = 5001 } = process.env
if (!MONGO_URI) {
    console.error('Missing MONGO_URI in .env')
    process.exit(1)
}

const app = express()
app.use(cors())
app.use(express.json())



app.post('/products/',isAuthenticated, async(req,res)=>{
    try{
        const data=req.body

        const newProduct = await Product.create(data)
        res.status(201).json({'message':'product created successfully','data':newProduct})

    }catch(error){
        res.status(500).json({'message':'operation failed wth error','error':error.message})
    }
})
app.get('/products/',isAuthenticated,async(req,res)=>{
    try{
        const products= await Product.find()
        if(!products){
            return res.status(204).json('No products founded')
        }
        res.status(200).json(products)
    }catch(error){
        res.status(500).json({'error':error.message})
    }
})

const StartServer= async(req,res)=>{

    try{
        const connection = await mongoose.connect(MONGO_URI)
        console.log('DB connected successfully')
        app.listen(PORT,()=>{
            console.log('Server Started successfully!')
        })
    }catch(error){
        console.log(error.message)
    }
}
StartServer()