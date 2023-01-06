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

const app = require("./app")

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`App is running on Port: ${port}!`)
})
