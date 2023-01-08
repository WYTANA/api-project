const Tour = require("../models/tourModel")

// READ
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find()
    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
      },
    })
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error,
    })
  }
}

// READ
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id)
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    })
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error,
    })
  }
}

// CREATE
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body)
    res.status(201).json({
      status: "Success",
      data: {
        tour: newTour,
      },
    })
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Invalid data sent",
    })
  }
}

// UPDATE
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    })
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error,
    })
  }
}

// DELETE
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id)
    res.status(204).json({
      status: "success",
      data: null,
    })
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error,
    })
  }
}
