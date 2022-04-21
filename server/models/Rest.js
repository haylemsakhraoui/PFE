const mongoose = require('mongoose');
const { Schema } = mongoose;

const RestaurantSchema = new Schema({
    name: {
            type: String,
             trim: true
           },
           products:[
               {
                type: mongoose.Types.ObjectId,
                ref: "Prod"
               }
           ]
  
  });
  module.exports = mongoose.model('Restaurant', RestaurantSchema);