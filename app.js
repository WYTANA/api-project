const fs = require("fs")
const express = require("express")
const morgan = require("morgan")

// Set express to a variable
const app = express()

// Use global middleware
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

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Undefined route!",
  })
}

const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Undefined route!",
  })
}

const createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Undefined route!",
  })
}

const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Undefined route!",
  })
}

const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Undefined route!",
  })
}

// Routes
const tourRouter = express.Router()
const userRouter = express.Router()

tourRouter.route("/").get(getAllTours).post(createTour)
tourRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour)

userRouter.route("/").get(getAllUsers).post(createUser)
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser)

app.use("/api/v1/tours", tourRouter)
app.use("/api/v1/users", userRouter)

// Serve the data
const port = 3000
app.listen(port, () => {
  console.log(`App is running on Port: ${port}!`)
})
