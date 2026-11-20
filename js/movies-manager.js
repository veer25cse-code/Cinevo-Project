/* Movie Manager: external API fetch + MongoDB CRUD + JSON-file save, all through Express APIs. */
const $ = id => document.getElementById(id);
const statusBox = $("form-status");

function notify(message, ok = true) {
  statusBox.textContent = message;
  statusBox.className = ok ? "success" : "error";
}

async function api(url, options = {}) {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Request failed.");
  return data;
}

function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  Object.assign(node, props);
  children.forEach(c => node.append(c));
  return node;
}

function button(label, className, onClick) {
  const b = el("button", { type: "button", className: "mm-btn mm-small " + className, textContent: label });
  b.addEventListener("click", onClick);
  return b;
}

function card(movie, actions) {
  const info = el("div", {}, el("h3", { textContent: movie.title }),
    el("p", { textContent: [movie.genre, movie.year, movie.language].filter(Boolean).join(" · ") }));
  if (movie.description) info.append(el("p", { textContent: movie.description.slice(0, 110) + (movie.description.length > 110 ? "…" : "") }));
  info.append(el("div", { className: "mm-actions" }, ...actions));
  const parts = [];
  if (movie.poster) parts.push(el("img", { src: movie.poster, alt: movie.title + " poster", loading: "lazy" }));
  return el("article", { className: "mm-card" }, ...parts, info);
}

/* ---------- 1. External API ---------- */
$("search-form").addEventListener("submit", async event => {
  event.preventDefault();
  const box = $("external-results");
  box.replaceChildren(el("p", { className: "mm-empty", textContent: "Searching…" }));
  try {
    const data = await api("/api/external/movies?q=" + encodeURIComponent($("search-q").value));
    box.replaceChildren();
    if (!data.movies.length) box.append(el("p", { className: "mm-empty", textContent: "No movies found." }));
    data.movies.forEach(movie => box.append(card(movie, [
      button("Save to MongoDB", "", () => saveExternal(movie, "mongo")),
      button("Save to JSON", "mm-ghost", () => saveExternal(movie, "json"))
    ])));
  } catch (err) {
    box.replaceChildren(el("p", { className: "mm-empty", textContent: err.message }));
  }
});

async function saveExternal(movie, target) {
  const payload = { title: movie.title, genre: movie.genre, description: movie.description, price: Math.round(movie.price || 0) };
  try {
    if (target === "mongo") {
      await api("/api/mongo/movies", { method: "POST", body: { ...payload, year: movie.year, poster: movie.poster, source: "external-api", externalId: movie.externalId } });
      notify("Saved to MongoDB.");
      loadMongo();
    } else {
      await api("/api/movies", { method: "POST", body: payload });
      notify("Saved to data/movies.json.");
    }
  } catch (err) { notify(err.message, false); }
}

/* ---------- 2. MongoDB CRUD ---------- */
async function loadStatus() {
  const pill = $("db-status");
  try {
    const data = await api("/api/mongo/status");
    pill.textContent = "MongoDB " + data.mongodb;
    pill.className = "mm-pill " + (data.mongodb === "connected" ? "ok" : "bad");
  } catch { pill.textContent = "server offline"; pill.className = "mm-pill bad"; }
}

async function loadMongo() {
  const box = $("mongo-list");
  try {
    const data = await api("/api/mongo/movies?q=" + encodeURIComponent($("filter-q").value));
    box.replaceChildren();
    if (!data.movies.length) box.append(el("p", { className: "mm-empty", textContent: "No movies in MongoDB yet." }));
    data.movies.forEach(movie => box.append(card(movie, [
      button("Edit", "mm-ghost", () => startEdit(movie)),
      button("Delete", "mm-danger", () => removeMovie(movie))
    ])));
  } catch (err) {
    box.replaceChildren(el("p", { className: "mm-empty", textContent: err.message }));
  }
}

function resetForm() {
  $("movie-form").reset();
  $("movie-id").value = "";
  $("save-btn").textContent = "Add movie";
  $("cancel-btn").hidden = true;
}

function startEdit(movie) {
  $("movie-id").value = movie._id;
  $("f-title").value = movie.title;
  $("f-genre").value = movie.genre;
  $("f-language").value = movie.language || "";
  $("f-price").value = movie.price || 0;
  $("f-status").value = movie.status || "now-showing";
  $("f-description").value = movie.description || "";
  $("save-btn").textContent = "Update movie";
  $("cancel-btn").hidden = false;
  $("movie-form").scrollIntoView({ behavior: "smooth" });
}

async function removeMovie(movie) {
  if (!confirm('Delete "' + movie.title + '"?')) return;
  try { await api("/api/mongo/movies/" + movie._id, { method: "DELETE" }); notify("Movie deleted."); loadMongo(); }
  catch (err) { notify(err.message, false); }
}

$("movie-form").addEventListener("submit", async event => {
  event.preventDefault();
  const id = $("movie-id").value;
  const body = {
    title: $("f-title").value, genre: $("f-genre").value, language: $("f-language").value || "Not specified",
    price: Number($("f-price").value) || 0, status: $("f-status").value, description: $("f-description").value
  };
  try {
    await api(id ? "/api/mongo/movies/" + id : "/api/mongo/movies", { method: id ? "PUT" : "POST", body });
    notify(id ? "Movie updated." : "Movie added to MongoDB.");
    resetForm(); loadMongo();
  } catch (err) { notify(err.message, false); }
});

$("cancel-btn").addEventListener("click", resetForm);
$("filter-form").addEventListener("submit", event => { event.preventDefault(); loadMongo(); });

loadStatus();
loadMongo();
