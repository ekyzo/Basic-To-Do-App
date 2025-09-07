// app.js
const express = require("express");
const path = require("path");
const morgan = require("morgan");

const todosRouter = require("./routes/todos");

const app = express();

// middleware
app.use(morgan("dev")); 
app.use(express.json());

// serve static frontend
app.use(express.static(path.join(__dirname, "public")));

// API routes 
app.use("/api/todos", todosRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;
