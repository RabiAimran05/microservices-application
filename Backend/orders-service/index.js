import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import isAuthenticated from './middleware/isAuthentificated.js'
import Orders from './models/Order.js'
import axios from 'axios'

const { MONGO_URI, PRODUCTS_SERVICE_URL, PORT = 5002 } = process.env
if (!MONGO_URI || !PRODUCTS_SERVICE_URL) {
    console.error('Missing MONGO_URI or PRODUCTS_SERVICE_URL in .env')
    process.exit(1)
}

const app = express()
app.use(cors())
app.use(express.json())


app.get('/orders/',isAuthenticated,async(req,res)=>{

    try{
        const orders = await Orders.find()
        res.status(200).json({orders})
    }catch(error){
        res.status(500).json({'message':'operation failed with error','error':error.message})
    }
})
app.post('/orders/',isAuthenticated,async (req,res)=>{

    try{
        const ids= req.body
        if(!ids || ids.length===0){
            return res.status(403).json({'message':'invalid ids'})
        }
        const response = await axios.get(`${PRODUCTS_SERVICE_URL}/products/`,{headers:{authorization:`Bearer ${req.token}`}})
        const Allproduct= response.data
        let total_price= 0
        const productsNames=[]
        Allproduct.map(product=>{
            if(ids.includes(product._id.toString())){
                productsNames.push(product.name)
                total_price+=product.price
            }
        })

        const newOrder= {
           "products_ids":ids,"names":productsNames ,"total_price":total_price,"user_email":req.user.email
        }
        const order=await Orders.create(newOrder)
        res.status(201).json({'message':'order created',order})

    }catch(error){
        res.status(500).json({'error':error.message})
    }
})

const StartServer= async(req,res)=>{
    try{
        await mongoose.connect(MONGO_URI)
        console.log('DB connected successfully!')
        app.listen(PORT,()=>{
            console.log('server started')
        })
    }catch(error){
        console.log(error.message)
    }
}
StartServer()



