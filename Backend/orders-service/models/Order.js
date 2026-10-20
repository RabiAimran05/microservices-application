import mongoose from 'mongoose'

const OrderSchema= new mongoose.Schema(
    {
        products_ids:{
            type:[String],
            required:true
        },
        names:{
            type:[String],
            required:true
        },
        total_price:{type:Number,required:true},
        user_email:{type:String,required:true}
    }
)

const Orders= mongoose.model('orders',OrderSchema)

export default Orders