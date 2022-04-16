const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Merchant Schema
const RestaurantSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String
  },
  description: {
    type: String
  },
  brand: {
    type: String
  },
  business: {
    type: String,
    trim: true
  },
});

module.exports = Mongoose.model('Merchant', RestaurantSchema);
