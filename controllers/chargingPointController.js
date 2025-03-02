const connectDB = require("../config/db");
const chargingPointSchema = require("../models/chargingPointModel");

// 🔹 Get all charging points
exports.getAllChargingPoints = async (req, res) => {
  try {
    const connection = await connectDB();
    const result = await connection.execute("SELECT * FROM ChargingPoints");
    await connection.close();
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error fetching charging points" });
  }
};

// 🔹 Get charging points near a postcode
exports.getChargingPointsByPostcode = async (req, res) => {
  try {
    const { postcode } = req.params;
    const connection = await connectDB();
    const result = await connection.execute(
      "SELECT * FROM ChargingPoints WHERE postcode = :postcode",
      { postcode }
    );
    await connection.close();

    if (result.rows.length === 0) return res.status(404).json({ message: "No charging points found" });

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error fetching charging points" });
  }
};

// 🔹 Add a new charging point
exports.createChargingPoint = async (req, res) => {
  try {
    const { error } = chargingPointSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { postcode, power_level, latitude, longitude, address } = req.body;

    const connection = await connectDB();
    await connection.execute(
      `INSERT INTO ChargingPoints (postcode, power_level, latitude, longitude, address) 
       VALUES (:postcode, :power_level, :latitude, :longitude, :address)`,
      { postcode, power_level, latitude, longitude, address }
    );

    await connection.commit();
    await connection.close();
    res.status(201).json({ message: "Charging point added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error adding charging point" });
  }
};

// 🔹 Update a charging point
exports.updateChargingPoint = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = chargingPointSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { postcode, power_level, latitude, longitude, address } = req.body;

    const connection = await connectDB();
    const result = await connection.execute(
      `UPDATE ChargingPoints 
       SET postcode=:postcode, power_level=:power_level, latitude=:latitude, 
           longitude=:longitude, address=:address 
       WHERE id=:id`,
      { postcode, power_level, latitude, longitude, address, id }
    );

    await connection.commit();
    await connection.close();

    if (result.rowsAffected === 0) return res.status(404).json({ message: "Charging point not found" });

    res.status(200).json({ message: "Charging point updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating charging point" });
  }
};

// 🔹 Delete a charging point
exports.deleteChargingPoint = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await connectDB();
    const result = await connection.execute("DELETE FROM ChargingPoints WHERE id = :id", { id });

    await connection.commit();
    await connection.close();

    if (result.rowsAffected === 0) return res.status(404).json({ message: "Charging point not found" });

    res.status(200).json({ message: "Charging point deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting charging point" });
  }
};
