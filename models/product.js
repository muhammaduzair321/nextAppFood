import mongoose, { Schema , model , models } from "mongoose"

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref : 'Category'
    },
    properties:{
        type:Object
    }
})

export const Product = models.Product || model("Product", productSchema)