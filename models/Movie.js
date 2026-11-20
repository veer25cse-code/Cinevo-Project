const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true, minlength: 1, maxlength: 150 },
    genre: { type: String, required: [true, "Genre is required"], trim: true, maxlength: 60 },
    language: { type: String, trim: true, default: "Not specified", maxlength: 40 },
    description: { type: String, trim: true, default: "", maxlength: 2000 },
    price: { type: Number, min: 0, default: 0 },
    year: { type: Number, min: 1888, max: 2100 },
    poster: { type: String, trim: true, default: "" },
    status: { type: String, enum: ["now-showing", "upcoming"], default: "now-showing" },
    source: { type: String, enum: ["manual", "external-api"], default: "manual" },
    externalId: { type: String, trim: true, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
