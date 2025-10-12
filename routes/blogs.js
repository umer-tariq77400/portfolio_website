var express = require("express");
var router = express.Router();
var path = require("path");

// GET blog listing data in json format from database
router.get("/", function (req, res, next) {
    const db = req.app.locals.db;

    const sql = `SELECT title, slug, description, categories, read_time, cover_image, created_at FROM blog_posts ORDER BY created_at DESC`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error("Database error:", err.message);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(rows);
    });
});

/* GET individual blog page. */
router.get('/:slug', function(req, res, next) {
    const slug = req.params.slug;
    res.render(`blogs/content/${slug}`);
});

module.exports = router;