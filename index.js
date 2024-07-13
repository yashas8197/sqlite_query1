const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
let db;

// Connect to SQLite database
(async () => {
  db = await open({ filename: "database.sqlite", driver: sqlite3.Database });
  if (db) console.log("Connected to the SQLite database.");
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.1 CW - SQL Queries & async/await" });
});

// YOUR ENPOINTS GO HERE

async function fetchAllMovies() {
  let query = "SELECT * FROM movies";
  let response = await db.all(query, []);
  return { movies: response };
}

app.get("/movies", async (req, res) => {
  let result = await fetchAllMovies();

  res.status(200).json(result);
});

async function fetchMoviesByGenre(genre) {
  let query = "SELECT * FROM movies WHERE genre = ?";
  let response = await db.all(query, [genre]);
  return { movies: response };
}

app.get("/movies/genre/:genre", async (req, res) => {
  let genre = req.params.genre;
  let results = await fetchMoviesByGenre(genre);
  res.status(200).json(results);
});

async function fetchMovieById(id) {
  let query = "SELECT * FROM movies WHERE id = ?";
  let response = await db.all(query, [id]);
  return { movie: response };
}

app.get("/movies/details/:id", async (req, res) => {
  let id = req.params.id;
  let result = await fetchMovieById(id);
  res.status(200).json(result);
});

async function fetchMovieByReleaseYear(releaseYear) {
  let query = "SELECT * FROM movies WHERE release_year = ?";
  let response = await db.all(query, [releaseYear]);
  return { movie: response };
}

app.get("/movies/release_year/:year", async (req, res) => {
  let releaseYear = req.params.year;
  let result = await fetchMovieByReleaseYear(releaseYear);
  res.status(200).json(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
