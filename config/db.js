/* MongoDB connection (Mongoose). The server keeps running even if MongoDB is offline. */
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/cinevo";

mongoose.set("bufferCommands", false); // fail fast instead of hanging when DB is down

function connectDB() {
  mongoose.connection.on("connected", () => console.log("MongoDB connected: " + mongoose.connection.name));
  mongoose.connection.on("disconnected", () => console.log("MongoDB disconnected"));
  return mongoose
    .connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
    .catch(err => console.error("MongoDB connection failed (JSON APIs still work): " + err.message));
}

function isConnected() {
  return mongoose.connection.readyState === 1;
}

module.exports = { connectDB, isConnected };
