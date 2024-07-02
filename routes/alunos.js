var express = require('express');
var router = express.Router();
const alunos = require("../test/mocks/alunos.json");

router.get("/", function (req, res, next) {
    const data = {
        title: "Alunos",
        alunos: alunos
    };
    res.render("list", data);
});

module.exports = router;
