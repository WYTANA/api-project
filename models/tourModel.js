const mongoose = require("mongoose")

const toursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.3,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
})

// Create model/collection
const Tour = mongoose.model("Tour", toursSchema)

module.exports = Tour
