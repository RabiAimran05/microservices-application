import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name required'],
    },
    price:{
            type:Number,
            required:[true,'price is required']
    },
    quantity:{
        type:Number,
        default:1
    },
      image: { type: String, required: true }
},
{
    timestamps:true
}
)


const Product = mongoose.model('Product',ProductSchema)

export default Product