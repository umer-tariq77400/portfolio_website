var express = require("express");
var router = express.Router();
var path = require("path");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("pages/content/index");
});

/* GET achievements page. */
router.get("/achievements", function (req, res, next) {
    res.render("pages/content/achievements");
});

/* GET resume page. */
router.get("/resume", function (req, res, next) {
    res.render("pages/content/resume");
});

/* GET projects page. */
router.get("/projects", function (req, res, next) {
    res.render("pages/content/projects");
});

/* GET blogs page. */
router.get("/blog", function (req, res, next) {
    res.render("pages/content/blog");
});

/* GET contact page. */
router.get("/contact", function (req, res, next) {
    res.render("pages/content/contact");
});

router.post("/contact", function (req, res, next) {
    let { firstName, lastName, phone, email, message } = req.body;
    if (!firstName || !email || !message) {
        return res
            .status(400)
            .json({
                title: "Error",
                body: "First name, email, and message are required",
            });
    }

    // Get database connection from app.locals
    const db = req.app.locals.db;

    // Insert contact form data into database
    const sql = `INSERT INTO contact (firstname, lastname, phone, email, message) VALUES (?, ?, ?, ?, ?)`;
    const params = [firstName, lastName || "", phone || "", email, message];

    db.run(sql, params, function (err) {
        if (err) {
            console.error("Database error:", err.message);
            return res.status(500).json({
                title: "Error",
                body: "Sorry, there was an error saving your message. Please try again.",
            });
        }

        console.log(`Contact message saved with ID: ${this.lastID}`);
        console.log("Form data:", {
            firstName,
            lastName,
            phone,
            email,
            message,
        });
        res.json({
            title: "Thank you!",
            body: "I'll get back to you shortly!",
        });
    });
});

module.exports = router;
