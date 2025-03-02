const connectDB = require("../config/db");
const vehicleUsageSchema = require("../models/vehicleUsageModel");

// 🔹 Get all vehicle usage records
exports.getAllVehicleUsages = async (req, res) => {
  let connection;
  try {
    connection = await connectDB();
    const result = await connection.execute("SELECT * FROM VEHICLEUSAGE");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching vehicle usage records:", error.message);
    res.status(500).json({ error: "Error fetching vehicle usage records" });
  } finally {
    if (connection) await connection.close();
  }
};

// 🔹 Get a single vehicle usage record by ID
exports.getVehicleUsageById = async (req, res) => {
  let connection;
  try {
    const { id } = req.params;
    connection = await connectDB();
    
    const result = await connection.execute("SELECT * FROM VEHICLEUSAGE WHERE ID = :id", { id });

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching vehicle usage record:", error.message);
    res.status(500).json({ error: "Error fetching vehicle usage record" });
  } finally {
    if (connection) await connection.close();
  }
};

// 🔹 Create a new vehicle usage record
exports.createVehicleUsage = async (req, res) => {
  let connection;
  try {
    console.log("Received Data:", req.body); // Debugging Log

    const { error } = vehicleUsageSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const {
      make_model, car_type, distance_type, fuel_efficiency,
      fuel_type, fuel_cost, trip_label, trip_frequency, trip_distance
    } = req.body;

    connection = await connectDB();
    
    const result = await connection.execute(
      `INSERT INTO VEHICLEUSAGE (MAKE_MODEL, CAR_TYPE, DISTANCE_TYPE, FUEL_EFFICIENCY, FUEL_TYPE, FUEL_COST, TRIP_LABEL, TRIP_FREQUENCY, TRIP_DISTANCE) 
       VALUES (:make_model, :car_type, :distance_type, :fuel_efficiency, :fuel_type, :fuel_cost, :trip_label, :trip_frequency, :trip_distance)`,
      { make_model, car_type, distance_type, fuel_efficiency, fuel_type, fuel_cost, trip_label, trip_frequency, trip_distance }
    );

    await connection.commit();

    res.status(201).json({ message: "Vehicle usage record added successfully" });
  } catch (error) {
    console.error("Error adding vehicle usage record:", error.message);
    res.status(500).json({ error: "Error adding vehicle usage record" });
  } finally {
    if (connection) await connection.close();
  }
};

// 🔹 Update an existing vehicle usage record
exports.updateVehicleUsage = async (req, res) => {
  let connection;
  try {
    const { id } = req.params;
    const { error } = vehicleUsageSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const {
      make_model, car_type, distance_type, fuel_efficiency,
      fuel_type, fuel_cost, trip_label, trip_frequency, trip_distance
    } = req.body;

    connection = await connectDB();
    
    const result = await connection.execute(
      `UPDATE VEHICLEUSAGE 
       SET MAKE_MODEL = :make_model, CAR_TYPE = :car_type, DISTANCE_TYPE = :distance_type, 
           FUEL_EFFICIENCY = :fuel_efficiency, FUEL_TYPE = :fuel_type, FUEL_COST = :fuel_cost, 
           TRIP_LABEL = :trip_label, TRIP_FREQUENCY = :trip_frequency, TRIP_DISTANCE = :trip_distance
       WHERE ID = :id`,
      { make_model, car_type, distance_type, fuel_efficiency, fuel_type, fuel_cost, trip_label, trip_frequency, trip_distance, id }
    );

    await connection.commit();

    if (result.rowsAffected === 0) {
      return res.status(404).json({ message: "Record not found or unchanged" });
    }

    res.status(200).json({ message: "Vehicle usage record updated successfully" });
  } catch (error) {
    console.error("Error updating vehicle usage record:", error.message);
    res.status(500).json({ error: "Error updating vehicle usage record" });
  } finally {
    if (connection) await connection.close();
  }
};

// 🔹 Delete a vehicle usage record
exports.deleteVehicleUsage = async (req, res) => {
  let connection;
  try {
    const { id } = req.params;
    connection = await connectDB();

    const result = await connection.execute("DELETE FROM VEHICLEUSAGE WHERE ID = :id", { id });

    await connection.commit();

    if (result.rowsAffected === 0) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json({ message: "Vehicle usage record deleted successfully" });
  } catch (error) {
    console.error("Error deleting vehicle usage record:", error.message);
    res.status(500).json({ error: "Error deleting vehicle usage record" });
  } finally {
    if (connection) await connection.close();
  }
};
