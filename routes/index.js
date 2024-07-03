var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", {
        title: "Express",
        name: "joao gbriel",
    });
});
router.get('/sobre', function(req, res, next) {
    res.render('sobre');
});

module.exports = router;
