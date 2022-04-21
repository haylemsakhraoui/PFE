const mongoose = require('mongoose');
const { Schema } = mongoose;

const RestaurantSchema = new Schema({
    name: {
            type: String,
             trim: true
           },
           description : {
            type: String
         },
         image: {
            type : String
             },
           products:[
               {
                type: mongoose.Types.ObjectId,
                ref: "Prod"
               }
           ]
  
  });
  module.exports = mongoose.model('Restaurant', RestaurantSchema);