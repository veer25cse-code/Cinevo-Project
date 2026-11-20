const express = require("express");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_DIR = path.join(__dirname, "data");
const FILES = {
  users: path.join(DATA_DIR, "users.json"),
  bookings: path.join(DATA_DIR, "bookings.json"),
  contacts: path.join(DATA_DIR, "contact-messages.json"),
  feedback: path.join(DATA_DIR, "feedback.json"),
  newsletter: path.join(DATA_DIR, "newsletter.json"),
  movies: path.join(DATA_DIR, "movies.json")
};

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
for (const file of Object.values(FILES)) {
  if (!fs.existsSync(file)) fs.writeFileSync(file, "[]", "utf8");
}

app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

function readData(key) {
  try { return JSON.parse(fs.readFileSync(FILES[key], "utf8")); }
  catch { return []; }
}
function writeData(key, data) {
  fs.writeFileSync(FILES[key], JSON.stringify(data, null, 2), "utf8");
}
function clean(value) {
  return String(value ?? "").trim();
}
function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function publicUser(user) {
  const { passwordHash, passwordSalt, ...safe } = user;
  return safe;
}
function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return { passwordSalt: salt, passwordHash: hash };
}
function makeId(prefix) {
  return `${prefix}-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`;
}

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Cinevo backend is running", storage: "Local JSON files" });
});

/* Registration and sign-in */
app.post("/api/users", (req, res) => {
  const name = clean(req.body.name);
  const email = clean(req.body.email).toLowerCase();
  const password = String(req.body.password || "");
  const age = Number(req.body.age);
  const mobile = clean(req.body.mobile);
  const address = clean(req.body.address);
  const city = clean(req.body.city);

  if (name.length < 2) return res.status(400).json({ success: false, message: "Enter your full name." });
  if (!validEmail(email)) return res.status(400).json({ success: false, message: "Enter a valid email address." });
  if (password.length < 6) return res.status(400).json({ success: false, message: "Password must contain at least 6 characters." });
  if (!Number.isInteger(age) || age < 12 || age > 99) return res.status(400).json({ success: false, message: "Age must be between 12 and 99." });
  if (mobile && !/^\d{10}$/.test(mobile)) return res.status(400).json({ success: false, message: "Mobile number must contain 10 digits." });
  if (!address || !city) return res.status(400).json({ success: false, message: "Address and city are required." });

  const users = readData("users");
  if (users.some(user => user.email === email)) {
    return res.status(409).json({ success: false, message: "An account with this email already exists." });
  }
  const credentials = hashPassword(password);
  const user = {
    id: makeId("USR"), name, email, age, mobile, address, city,
    createdAt: new Date().toISOString(), ...credentials
  };
  users.push(user);
  writeData("users", users);
  res.status(201).json({ success: true, message: "Account created successfully.", user: publicUser(user) });
});

app.post("/api/auth/login", (req, res) => {
  const email = clean(req.body.email).toLowerCase();
  const password = String(req.body.password || "");
  const user = readData("users").find(item => item.email === email);
  if (!user || !user.passwordSalt || !user.passwordHash) {
    return res.status(401).json({ success: false, message: "Invalid email or password." });
  }
  const candidate = crypto.scryptSync(password, user.passwordSalt, 64);
  const saved = Buffer.from(user.passwordHash, "hex");
  if (candidate.length !== saved.length || !crypto.timingSafeEqual(candidate, saved)) {
    return res.status(401).json({ success: false, message: "Invalid email or password." });
  }
  res.json({ success: true, message: "Login successful.", user: publicUser(user) });
});

/* Movie records are editable through the API; the front-end catalogue remains its sample dataset. */
app.get("/api/movies", (req, res) => res.json({ success: true, movies: readData("movies") }));
app.post("/api/movies", (req, res) => {
  const title = clean(req.body.title);
  const genre = clean(req.body.genre);
  if (!title || !genre) return res.status(400).json({ success: false, message: "Movie title and genre are required." });
  const movies = readData("movies");
  const movie = { id: makeId("MOV"), title, genre, language: clean(req.body.language) || "Not specified",
    description: clean(req.body.description), price: Math.max(0, Number(req.body.price) || 0),
    status: clean(req.body.status) || "now-showing", createdAt: new Date().toISOString() };
  movies.push(movie); writeData("movies", movies);
  res.status(201).json({ success: true, movie });
});

/* Ticket checkout submissions */
app.get("/api/bookings", (req, res) => res.json({ success: true, bookings: readData("bookings") }));
app.post("/api/bookings", (req, res) => {
  const b = req.body;
  const required = ["customerName", "customerEmail", "movieTitle", "cinema", "showDate", "showTime"];
  if (required.some(key => !clean(b[key]))) {
    return res.status(400).json({ success: false, message: "Please provide all booking details." });
  }
  if (!validEmail(clean(b.customerEmail))) return res.status(400).json({ success: false, message: "Booking email is invalid." });
  if (!Array.isArray(b.seats) || b.seats.length < 1 || b.seats.length > 10) {
    return res.status(400).json({ success: false, message: "Select between 1 and 10 seats." });
  }
  const totalAmount = Number(b.totalAmount);
  if (!Number.isFinite(totalAmount) || totalAmount < 0) return res.status(400).json({ success: false, message: "Booking amount is invalid." });
  const booking = {
    id: makeId("BKG"), customerName: clean(b.customerName), customerEmail: clean(b.customerEmail),
    movieTitle: clean(b.movieTitle), cinema: clean(b.cinema), showDate: clean(b.showDate),
    showTime: clean(b.showTime), seats: b.seats.map(clean), totalAmount,
    paymentMethod: clean(b.paymentMethod) || "Demo payment",
    bookingReference: clean(b.bookingReference), status: "confirmed",
    submittedAt: new Date().toISOString()
  };
  const bookings = readData("bookings");
  bookings.unshift(booking); writeData("bookings", bookings);
  res.status(201).json({ success: true, message: "Booking saved to JSON file.", booking });
});

/* Contact form */
app.get("/api/contact", (req, res) => res.json({ success: true, messages: readData("contacts") }));
app.post("/api/contact", (req, res) => {
  const name = clean(req.body.name), email = clean(req.body.email);
  const subject = clean(req.body.subject), message = clean(req.body.message);
  if (name.length < 2 || !validEmail(email) || subject.length < 3 || message.length < 10) {
    return res.status(400).json({ success: false, message: "Please complete all fields correctly. Message must be at least 10 characters." });
  }
  const item = { id: makeId("MSG"), name, email, subject, message, submittedAt: new Date().toISOString() };
  const items = readData("contacts"); items.unshift(item); writeData("contacts", items);
  res.status(201).json({ success: true, message: "Your message has been received.", submission: item });
});

/* Feedback form */
app.get("/api/feedback", (req, res) => res.json({ success: true, feedback: readData("feedback") }));
app.post("/api/feedback", (req, res) => {
  const name = clean(req.body.name), email = clean(req.body.email);
  const rating = Number(req.body.rating), comments = clean(req.body.comments);
  if (name.length < 2 || !validEmail(email) || !Number.isInteger(rating) || rating < 1 || rating > 5 || comments.length < 5) {
    return res.status(400).json({ success: false, message: "Enter your name, valid email, rating and feedback (at least 5 characters)." });
  }
  const item = { id: makeId("FDB"), name, email, rating, comments, submittedAt: new Date().toISOString() };
  const items = readData("feedback"); items.unshift(item); writeData("feedback", items);
  res.status(201).json({ success: true, message: "Thank you! Your feedback was saved.", submission: item });
});

/* Newsletter subscription */
app.post("/api/newsletter", (req, res) => {
  const email = clean(req.body.email).toLowerCase();
  if (!validEmail(email)) return res.status(400).json({ success: false, message: "Enter a valid email address." });
  const items = readData("newsletter");
  if (items.some(item => item.email === email)) return res.status(409).json({ success: false, message: "This email is already subscribed." });
  const item = { id: makeId("NEWS"), email, subscribedAt: new Date().toISOString() };
  items.unshift(item); writeData("newsletter", items);
  res.status(201).json({ success: true, message: "You are subscribed successfully." });
});

/* Assessment 3: MongoDB CRUD + external API routes */
require("./routes")(app);

app.use("/api", (req, res) => res.status(404).json({ success: false, message: "API endpoint not found." }));
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
app.listen(PORT, () => console.log(`Cinevo is running at http://localhost:${PORT}`));
