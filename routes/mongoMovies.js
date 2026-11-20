/* CRUD operations for movies stored in MongoDB.  Base path: /api/mongo/movies */
const express = require("express");
const mongoose = require("mongoose");
const Movie = require("../models/Movie");
const { isConnected } = require("../config/db");

const router = express.Router();
const FIELDS = ["title", "genre", "language", "description", "price", "year", "poster", "status", "source", "externalId"];

function pick(body) {
  const data = {};
  for (const key of FIELDS) if (body[key] !== undefined) data[key] = body[key];
  return data;
}

function handle(fn) {
  return async (req, res) => {
    if (!isConnected()) {
      return res.status(503).json({ success: false, message: "MongoDB is not connected. Start MongoDB and restart the server." });
    }
    try { await fn(req, res); }
    catch (err) {
      if (err.name === "ValidationError") {
        return res.status(400).json({ success: false, message: Object.values(err.errors).map(e => e.message).join(", ") });
      }
      if (err.name === "CastError") return res.status(400).json({ success: false, message: "Invalid value for " + err.path + "." });
      console.error(err);
      res.status(500).json({ success: false, message: "Server error." });
    }
  };
}

function checkId(req, res, next) {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ success: false, message: "Invalid movie id." });
  next();
}

/* CREATE */
router.post("/", handle(async (req, res) => {
  const movie = await Movie.create(pick(req.body));
  res.status(201).json({ success: true, message: "Movie saved to MongoDB.", movie });
}));

/* READ (all, optional ?q=title search and ?genre=) */
router.get("/", handle(async (req, res) => {
  const filter = {};
  if (req.query.q) filter.title = { $regex: String(req.query.q).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" };
  if (req.query.genre) filter.genre = String(req.query.genre);
  const movies = await Movie.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, count: movies.length, movies });
}));

/* READ (one) */
router.get("/:id", checkId, handle(async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).json({ success: false, message: "Movie not found." });
  res.json({ success: true, movie });
}));

/* UPDATE */
router.put("/:id", checkId, handle(async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, pick(req.body), { new: true, runValidators: true });
  if (!movie) return res.status(404).json({ success: false, message: "Movie not found." });
  res.json({ success: true, message: "Movie updated.", movie });
}));

/* DELETE */
router.delete("/:id", checkId, handle(async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie) return res.status(404).json({ success: false, message: "Movie not found." });
  res.json({ success: true, message: "Movie deleted.", movie });
}));

module.exports = router;
