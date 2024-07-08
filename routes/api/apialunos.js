var express = require("express");
var router = express.Router();
let alunos = require("../../test/mocks/alunos.json");


router.get("/", function (req, res, next) {
    const data = {
        alunos: alunos,
    };
    res.json( data);
});

router.get("/:matricula", function (req, res, next) {
    const { matricula } = req.params;

    const aluno = alunos.content[matricula];

    res.json(aluno );
});


router.post("/", function (req, res, next) {
    let novoAluno = req.body;
    let matricula = novoAluno.matricula;

    alunos.content[matricula] = {
        ...novoAluno,
        matricula: Number(matricula),
        extra: "e",
    };
    res.redirect("/alunos");
});

router.put("/:matricula", function (req, res, next) {
    // const { body, method } = req;
    const { matricula } = req.params;
    let novoAluno = req.body;
    const aluno = alunos.content[matricula];

    alunos.content[matricula] = {
        ...novoAluno,
        matricula: Number(matricula),
        extra: "e",
    };
    res.redirect("/alunos");

    // res.send({ body, method ,msg:'altera usuario'  });
});

router.delete("/:matricula", function (req, res, next) {
    const { matricula } = req.params;
    delete alunos.content[matricula]
    
    res.redirect( 303,'/alunos');
});


module.exports = router;
