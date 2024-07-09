var express = require("express");
var router = express.Router();
const alunos = require("../test/mocks/alunos.json");
const { json } = require("body-parser");
const {localApi}= require('../config/config_axios');
router.get("/", async function (req, res, next) {
    // const data = {
    //     title: "Alunos",
    //     alunos: alunos,
    // };
    // res.render("list", data);
    try {
        const {data:alunos }= await localApi.get('/api/v1/alunos')
        const data = {title:'Alunos' , alunos}
        res.status(200).render('list' , data)

    } catch (error) {
        res.json({msg: error.massage});
    }
});
router.get("/new", function (req, res, next) {
  const{heads: labels} = alunos
  const parametro= "create"
  const data = {metodo: "POST" , parametro:"create" , titulo:'novo aluno' , buttonText: 'Salvar Aluno' }
    res.render("form",data);
});
router.get("/:matricula", function (req, res, next) {
    const { matricula:matricula } = 

    res.render("card", { title: "Detalhe dos alunos", aluno });
});
router.get("/edit/:matricula", function (req, res, next) {
    const { matricula } = req.params;
    const aluno = alunos.content[matricula];

    const data={
        title: "Editar aluno",
        buttontext: "Salvar Alterações",
        aluno,
        parametro:matricula,
        method: "PUT"
    }
    res.render('form',data)
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
