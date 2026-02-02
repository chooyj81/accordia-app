const express = require("express");
const { body, validationResult } = require("express-validator");
const db = require("../db");
const auth = require("../middleware/auth");

const router = express.Router();

/**
 * Rules:
 * - user: can only manage their own items
 * - admin: can see/manage all items
 */

// READ/GET (All Items)
router.get("/", auth, async (req, res) => {
  if (req.user.role === "admin") {
    const [rows] = await db.query("SELECT i.*, u.name AS user_name FROM items i JOIN users u ON u.id = i.user_id ORDER BY i.id DESC");
    return res.json(rows);
  }
  const [rows] = await db.query("SELECT * FROM items WHERE user_id = ? ORDER BY id DESC", [req.user.id]);
  return res.json(rows);
});

// READ/GET (Item by ID)
router.get("/:id", auth, async (req, res) => {
  const id = Number(req.params.id);
  const [rows] = await db.query("SELECT * FROM items WHERE id = ?", [id]);
  if (!rows.length) return res.status(404).json({ message: "Not found" });

  const item = rows[0];
  if (req.user.role !== "admin" && item.user_id !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }
  return res.json(item);
});

// CREATE
router.post(
  "/",
  auth,
  body("title").isLength({ min: 1 }),
  body("description").optional().isString(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { title, description, category } = req.body;

    const [result] = await db.query(
      "INSERT INTO items (user_id, title, description, category) VALUES (?, ?, ?, ?)",
      [req.user.id, title, description, category || null]
    );

    const [rows] = await db.query("SELECT * FROM items WHERE id = ?", [result.insertId]);
    return res.status(201).json(rows[0]);
  }
);

// UPDATE
router.put(
  "/:id",
  auth,
  body("title").isLength({ min: 1 }),
  body("description").optional().isString(),
  async (req, res) => {
    const id = Number(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const [rows] = await db.query("SELECT * FROM items WHERE id = ?", [id]);
    if (!rows.length) return res.status(404).json({ message: "Not found" });

    const item = rows[0];
    if (req.user.role !== "admin" && item.user_id !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { title, description, category } = req.body;
    await db.query("UPDATE items SET title = ?, description = ?, category = ? WHERE id = ?", [
      title,
      description || null,
      category || null,
      id
    ]);

    const [updated] = await db.query("SELECT * FROM items WHERE id = ?", [id]);
    return res.json(updated[0]);
  }
);

// DELETE
router.delete("/:id", auth, async (req, res) => {
  const id = Number(req.params.id);
  const [rows] = await db.query("SELECT * FROM items WHERE id = ?", [id]);
  if (!rows.length) return res.status(404).json({ message: "Not found" });

  const item = rows[0];
  if (req.user.role !== "admin" && item.user_id !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  await db.query("DELETE FROM items WHERE id = ?", [id]);
  return res.json({ message: "Deleted" });
});

module.exports = router;
