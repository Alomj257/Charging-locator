const connectDB = require("../config/db");
const vehicleSchema = require("../models/vehicleModel");

exports.getAllVehicles = async (req, res) => {
  try {
    const connection = await connectDB();
    const result = await connection.execute("SELECT * FROM Vehicles");
    await connection.close();
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching vehicles:", error.message);
    res.status(500).json({ error: "Error fetching vehicles", details: error.message });
  }
};

exports.getVehicleById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await connectDB();
    const result = await connection.execute("SELECT * FROM Vehicles WHERE id = :id", [id]);
    await connection.close();

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error fetching vehicle:", error.message);
    res.status(500).json({ error: "Error fetching vehicle", details: error.message });
  }
};

exports.createVehicle = async (req, res) => {
  try {
    const { error } = vehicleSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { make_model, battery_range, charging_time, vehicle_cost, top_speed, vehicle_image } = req.body;
    const connection = await connectDB();
    await connection.execute(
      `INSERT INTO Vehicles (make_model, battery_range, charging_time, vehicle_cost, top_speed, vehicle_image)
      VALUES (:make_model, :battery_range, :charging_time, :vehicle_cost, :top_speed, :vehicle_image)`,
      { make_model, battery_range, charging_time, vehicle_cost, top_speed, vehicle_image }
    );
    await connection.commit();
    await connection.close();

    res.status(201).json({ message: "Vehicle added successfully" });
  } catch (error) {
    console.error("❌ Error adding vehicle:", error.message);
    res.status(500).json({ error: "Error adding vehicle", details: error.message });
  }
};

exports.updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const { make_model, battery_range, charging_time, vehicle_cost, top_speed, vehicle_image } = req.body;
    const connection = await connectDB();
    await connection.execute(
      `UPDATE Vehicles SET make_model=:make_model, battery_range=:battery_range, charging_time=:charging_time, 
       vehicle_cost=:vehicle_cost, top_speed=:top_speed, vehicle_image=:vehicle_image WHERE id=:id`,
      { make_model, battery_range, charging_time, vehicle_cost, top_speed, vehicle_image, id }
    );
    await connection.commit();
    await connection.close();

    res.status(200).json({ message: "Vehicle updated successfully" });
  } catch (error) {
    console.error("❌ Error updating vehicle:", error.message);
    res.status(500).json({ error: "Error updating vehicle", details: error.message });
  }
};


