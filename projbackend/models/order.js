const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const productCartSchema = new mongoose.Schema({
    product:{
        type:ObjectId,
        ref:"Product"
    },
    name:{
        type:String
    },
    count:{
        type:Number,
    },
    price:{
        type:Number
    }
},{timestamps:true});


const productCart = mongoose.model("Cart",productCartSchema);

const orderSchema = new mongoose.Schema({
    products:[productCartSchema],
    transactionId:{},
    amount:{
        type:Number
    },
    address:{
        type:String
    },
    lastUpdated:{
        type:Date
    },
    user:{
        type:ObjectId,
        ref:"User"
    }
},{timestamps:true});

const order = mongoose.model("Order",orderSchema);

module.exports = {order,productCart};
