const fs = require("fs")
const express = require("express")

// Use express
const app = express()

// Use middleware
app.use(express.json())

// app.get("/", (req, res) => {
//   res.status(200).json({ message: "Hello from the server!", dev: "Travis" })
// })

// app.post("/", (req, res) => {
//   res.send("Posting to the endpoint!")
// })

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)

// Route Handlers

// GET
app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  })
})

// POST
app.post("/api/v1/tours", (req, res) => {
  // console.log(req.body)
  const newId = tours[tours.length - 1].id + 1
  const newTour = Object.assign({ id: newId }, req.body)

  tours.push(newTour)
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "Success",
        data: {
          tour: newTour,
        },
      })
    }
  )
})

// Serve the data
const port = 3000
app.listen(port, () => {
  console.log(`App is running on Port: ${port}!`)
})
