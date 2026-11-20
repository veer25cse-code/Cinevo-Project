/* Mounts the MongoDB CRUD routes and the external-API routes, and connects to MongoDB. */
const { connectDB, isConnected } = require("../config/db");

module.exports = function mountExtraRoutes(app) {
  connectDB();
  app.get("/api/mongo/status", (req, res) => res.json({ success: true, mongodb: isConnected() ? "connected" : "disconnected" }));
  app.use("/api/mongo/movies", require("./mongoMovies"));
  app.use("/api/external", require("./external"));
};
