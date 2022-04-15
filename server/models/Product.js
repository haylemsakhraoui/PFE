const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const productSchema=new Schema({
    name:String,
    category:String,
    image:String,
    price:Number
});

module.exports=mongoose.model('Product',productSchema);