const mongoose = require('mongoose');
const { Schema } = mongoose;


// Product Schema
const ProductSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  image: {
    type: String
  },
  description: {
    type: String,
    trim: true
  },
  quantity: {
    type: Number
  },
  price: {
    type: Number
  },
  isActive: {
    type: Boolean,
    default: true
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', ProductSchema);
