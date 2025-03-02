const express = require("express");
const {
  getAllVehicleUsages,
  getVehicleUsageById,
  createVehicleUsage,
  updateVehicleUsage,
  deleteVehicleUsage
} = require("../controllers/vehicleUsageController");

const router = express.Router();

router.get("/", getAllVehicleUsages);
router.get("/:id", getVehicleUsageById);
router.post("/", createVehicleUsage);
router.put("/:id", updateVehicleUsage);
router.delete("/:id", deleteVehicleUsage);

module.exports = router;
