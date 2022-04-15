const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const orderSchema=new Schema({
    user:String,
    qty:Number,
    total:Number,
    product:String
});

module.exports=mongoose.model('Order',orderSchema);