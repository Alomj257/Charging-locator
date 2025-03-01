const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const vehicleRoutes = require("./routes/vehicleRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.use("/api/vehicles", vehicleRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Start the Express Server First
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);

  // Connect to the Database After Server Starts
  connectDB()
    .then(() => console.log("✅ Database connected successfully"))
    .catch((error) => console.error("❌ Database connection failed", error));

});
