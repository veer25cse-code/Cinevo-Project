/* Fetches movie data from an external public API (iTunes Search API, no key needed).
   The browser calls this Express route; Express calls the external API.  Path: /api/external/movies?q=batman */
const express = require("express");
const router = express.Router();

router.get("/movies", async (req, res) => {
  const q = String(req.query.q || "").trim() || "avengers";
  const url = "https://itunes.apple.com/search?media=movie&entity=movie&limit=12&term=" + encodeURIComponent(q);
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error("External API responded with status " + response.status);
    const data = await response.json();
    const movies = (data.results || []).map(item => ({
      externalId: String(item.trackId),
      title: item.trackName,
      genre: item.primaryGenreName || "Unknown",
      year: item.releaseDate ? new Date(item.releaseDate).getFullYear() : undefined,
      director: item.artistName || "",
      description: item.longDescription || item.shortDescription || "",
      poster: (item.artworkUrl100 || "").replace("100x100", "400x400"),
      price: item.trackPrice > 0 ? item.trackPrice : 0
    }));
    res.json({ success: true, source: "iTunes Search API", query: q, count: movies.length, movies });
  } catch (err) {
    res.status(502).json({ success: false, message: "Could not fetch data from the external API: " + err.message });
  }
});

module.exports = router;
