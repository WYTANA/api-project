const mongoose = require("mongoose")

const dotenv = require("dotenv")

dotenv.config({ path: "./config.env" })

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
)

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected!")
  })

// Create schema
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

// Create document (instance of Tour model)
const testTour = new Tour({
  name: "The Park Camper",
  // rating: 4.7,
  price: 997,
})

testTour
  .save()
  .then((doc) => {
    console.log(doc)
  })
  .catch((err) => {
    console.log("ERROR:", err)
  })

const app = require("./app")

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`App is running on Port: ${port}!`)
})
