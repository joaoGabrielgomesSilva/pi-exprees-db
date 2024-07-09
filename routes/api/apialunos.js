var express = require("express");
var router = express.Router();
let alunos = require("../../test/mocks/alunos.json");
const { response } = require("../../app");


router.get("/", function (req, res, next) {
    // const data = {
    //     alunos: alunos,
    // };
    // res.json( data);
    try {
        res.status(200) .json(alunos);
        
    } catch (error) {
        res.status(400).json({msg:error.massage});
    }
});

router.get("/:matricula", function (req, res, next) {
    const {matricula} = req.params
    try {
    const alunos = alunos.content[matricula]
    res.status(200).json(alunos)
        
    } catch (error) {
        res.status(400).json({msg:error.massage});
    }
});


router.post("/", function (req, res, next) {
const novoAluno=req.body
const matricula=  Number(req.matricula.matricula)

alunos.content[matricula]={...novoAluno, matricula}
const response= {
    msg:"aluno criado",
    aluno:alunos.content[matricula]
}
res.jason(200).json(response)

});

router.put("/:matricula", function (req, res, next) {
    // const { body, method } = req;
    // const { matricula } = req.params;
    // let novoAluno = req.body;
    // const aluno = alunos.content[matricula];

    // alunos.content[matricula] = {
    //     ...novoAluno,
    //     matricula: Number(matricula),
    //     extra: "e",
    // };
    // res.redirect("/alunos");

    const {matricula} = req.params
    try {
    const alunos = alunos.content[matricula]
    res.status(200).json(alunos)
        
    } catch (error) {
        res.status(400).json({msg:error.massage});
    }

    // res.send({ body, method ,msg:'altera usuario'  });
});

router.delete("/:matricula", function (req, res, next) {
    const { matricula } = req.params;
    delete alunos.content[matricula]
    
    res.redirect( 303,'/alunos');
});


module.exports = router;
