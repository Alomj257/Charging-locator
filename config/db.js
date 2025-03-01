const oracledb = require("oracledb");
require("dotenv").config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING,
};

async function connectDB() {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    console.log("✅ OracleDB Connected!");
    return connection;
  } catch (error) {
    console.error("❌ Database Connection Failed:", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
