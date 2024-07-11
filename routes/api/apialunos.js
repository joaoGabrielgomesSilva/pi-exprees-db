var express = require("express");
var router = express.Router();
// const { response } = require("../../app");
const db = require("../../config/config_database");
const { json } = require("body-parser");

router.get("/", async function (req, res, next) {
    const query = "select * from alunos";
    try {
        const data = await db.any(query);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ msg: error.massage });
    }
});

router.get("/:matricula", async function (req, res, next) {
    const { matricula } = req.params;
    const query = "select * from alunos where matricula = $1";

    try {
        const data = await db.one("select * from alunos where matricula = $1", [
            matricula,
        ]);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ msg: error.massage });
    }
});

router.post("/", async function (req, res, next) {
    const matricula = req.body.matricula;
    const nome = req.body.nome;
    const email = req.body.email;
    const data_nascimento = req.body.data_nascimento;

    const query = ` insert  into alunos(nome,data_nascimento,email,matricula) values ($1,$2,$3,$4)`;

    const values = [nome, data_nascimento, email, matricula];
    try {
        const data = await db.any(query, values);
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ msg: error.massage });
    }
});

router.put("/:matricula", async function (req, res, next) {
    const  matricula  = req.params.matricula;
    const  nome  = req.body.nome;
    const  email  = req.body.email;
    const  data_nascimento  = req.body.data_nascimento;

const values = [matricula,nome,email,data_nascimento];
console.log(values);

const query = `update alunos set nome=$2,data_nascimento=$4,email =$3  where matricula = $1`;


    try {
        const alunos = await db.any(query,values);
        res.status(200).json(alunos);
    } catch (error) {
        res.status(400).json({ msg: error.massage });
    }
});

router.delete("/:matricula", async function (req, res, next) {
    const { matricula } = req.params;
    const query = `delete from   alunos  where matricula = $1`;
   


    try {
        const del=  await db.any(query,matricula)
        res.status(200).json(del)
    } catch (error) {
        res.status(400).json({ msg: error.massage });
    }
    
});

module.exports = router;
