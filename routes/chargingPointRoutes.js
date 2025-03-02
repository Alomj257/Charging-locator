const express = require("express");
const {
  getAllChargingPoints,
  getChargingPointsByPostcode,
  createChargingPoint,
  updateChargingPoint,
  deleteChargingPoint
} = require("../controllers/chargingPointController");

const router = express.Router();

router.get("/", getAllChargingPoints);
router.get("/:postcode", getChargingPointsByPostcode);
router.post("/", createChargingPoint);
router.put("/:id", updateChargingPoint);
router.delete("/:id", deleteChargingPoint);

module.exports = router;
