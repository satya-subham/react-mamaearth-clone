const mongoose = require("mongoose");

const makeupSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  reviews: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
    required: true,
  }] ,
});

const MakeupProducts = mongoose.model("MakeupProducts", makeupSchema);

module.exports = {
    MakeupProducts,
};
