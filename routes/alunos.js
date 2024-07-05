var express = require("express");
var router = express.Router();
const alunos = require("../test/mocks/alunos.json");

router.get("/", function (req, res, next) {
    const data = {
        title: "Alunos",
        alunos: alunos,
    };
    res.render("list", data);
});
router.get("/new", function (req, res, next) {
    res.render("form", { title: "Novo aluno", buttontext: "Adicionar" });
});
router.get("/:matricula", function (req, res, next) {
    const { matricula } = req.params;

    const aluno = alunos.content[matricula];

    res.render("card", { title: "Detalhe dos alunos", aluno });
});
router.get("/edit/:matricula", function (req, res, next) {
    const { matricula } = req.params;

    const aluno = alunos.content[matricula];

    res.render("form", {
        title: "Editar aluno",
        buttontext: "Salvar Alterações",
        aluno,
    });
});
router.post("/", function (req, res, next) {
    const { body, method } = req;

    res.send({ body, method });
});

router.post("/create", function (req, res, next) {
    let novoAluno = req.body;
    let matricula = novoAluno.matricula;

    alunos.content[matricula] = {
        ...novoAluno,
        matricula: Number(matricula),
        extra: "e",
    };
    res.redirect("/alunos");
});

router.put("/", function (req, res, next) {
    const { body, method } = req;

    res.send({ body, method ,msg:'altera usuario'  });
});

router.delete("/", function (req, res, next) {
    const { body, method } = req;

    res.send({ body, method ,msg:'remover' });
});


router.post("/", function (req, res, next) {
    const { body, metohod } = req;

    res.send({body, metohod });
});

module.exports = router;
