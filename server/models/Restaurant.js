const Mongoose =require('mongoose');

const { Schema }= Mongoose;

const RestaurantSchema = new Schema({
    name: {
      type: String,
      trim: true
    },
    description : {
      type: String
    },
    product:[Product],
  image: {
  type : String
  }
});

module.exports = Mongoose.model('Restaurant', RestaurantSchema);
