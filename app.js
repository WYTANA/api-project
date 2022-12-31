const express = require("express")

const app = express()

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from the server!", dev: "Travis" })
})

app.post("/", (req, res) => {
  res.send("Posting to the endpoint!")
})

const port = 3000
app.listen(port, () => {
  console.log(`App is running on Port: ${port}!`)
})
