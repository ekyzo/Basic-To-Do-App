// routes/todos.js
const express = require("express");
const router = express.Router();

let todos = [];
let nextId = 1;

// GET /api/todos - list all
router.get("/", (req, res) => {
  console.log("📥 GET /api/todos called - returning", todos.length, "items");
  res.json(todos);
});

// POST /api/todos - create { title }
router.post("/", (req, res) => {
  const { title } = req.body || {};
  if (!title) {
    console.warn("⚠️ POST /api/todos failed - no title provided");
    return res.status(400).json({ error: "Title is required" });
  }

  const todo = { id: nextId++, title, completed: false };
  todos.push(todo);

  console.log("✅ Added new todo:", todo);
  res.status(201).json(todo);
});

// PUT /api/todos/:id - update
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const t = todos.find((x) => x.id === id);

  if (!t) {
    console.warn(`⚠️ PUT /api/todos/${ id } failed - not found`);
    return res.status(404).json({ error: "Not found" });
  }

  const { title, completed } = req.body || {};
  if (title !== undefined) t.title = title;
  if (completed !== undefined) t.completed = !!completed;

  console.log("✏️ Updated todo:", t);
  res.json(t);
});

// DELETE /api/todos/:id
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = todos.findIndex((x) => x.id === id);

  if (idx === -1) {
    console.warn(`⚠️ DELETE /api/todos/${ id } failed - not found`);
    return res.status(404).json({ error: "Not found" });
  }

  const removed = todos.splice(idx, 1)[0];
  console.log("🗑️ Deleted todo:", removed);
  res.json(removed);
});

module.exports = router;
