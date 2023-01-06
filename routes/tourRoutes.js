const express = require("express")
const tourController = require("../controllers/tourController")

const router = express.Router()

// Custom defined middleware
// router.param("id", tourController.checkId)
// router.param("name", tourController.checkBody)
// router.param("price", tourController.checkBody)

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour)
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour)

module.exports = router
