const fs = require("fs")
const express = require("express")
const morgan = require("morgan")

// Set express to a variable
const app = express()

// Use global middleware - applies to each request
app.use(morgan("dev"))

app.use(express.json())

app.use((req, res, next) => {
  console.log("Hello from middleware!")
  next()
})

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  next()
})

// ************************************************************************
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)

// Route Handler functions
const getAllTours = (req, res) => {
  console.log(req.requestTime)
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  })
}

const getTour = (req, res) => {
  const id = req.params.id * 1
  const tour = tours.find((el) => el.id === id)

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    })
  }

  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tour,
    },
  })
}

const createTour = (req, res) => {
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
}

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    })
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated Tour Here>",
    },
  })
}

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    })
  }

  res.status(204).json({
    status: "success",
    data: null,
  })
}

// // GET
// app.get("/api/v1/tours", getAllTours)
// // GET parameter
// app.get("/api/v1/tours/:id", getTour)
// // POST
// app.post("/api/v1/tours", createTour)
// // PATCH (not full implementation)
// app.patch("api/v1/tours/:id", updateTour)
// // DELETE (not full implementation)
// app.delete("api/v1/tours/:id", deleteTour)

// Routes
app.route("/api/v1/tours").get(getAllTours).post(createTour)
app.route("/api/v1/tours/:id").get(getTour).patch(updateTour).delete(deleteTour)

// Serve the data
const port = 3000
app.listen(port, () => {
  console.log(`App is running on Port: ${port}!`)
})
