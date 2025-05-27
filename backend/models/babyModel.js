const mongoose = require("mongoose");

const babyProductSchema = new mongoose.Schema({
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

const BabyProducts = mongoose.model("BabyProducts", babyProductSchema);

module.exports = {
    BabyProducts,
};
