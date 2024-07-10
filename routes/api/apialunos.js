var express = require("express");
var router = express.Router();
// const { response } = require("../../app");
const db = require("../../config/config_database");

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
        res.status(200).json(alunos);
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

router.put("/:matricula", function (req, res, next) {
    const { matricula } = req.params;
    const query = `update alunos set nome=$2,data_nacimento=$3,email =$4  where matricula = $1`;
    try {
        const alunos = alunos.content[matricula];
        res.status(200).json(alunos);
    } catch (error) {
        res.status(400).json({ msg: error.massage });
    }

    // res.send({ body, method ,msg:'altera usuario'  });
});

router.delete("/:matricula", function (req, res, next) {
    const { matricula } = req.params;
    const query = `delete from   alunos  where matricula = $1`;
    delete alunos.content[matricula];

    res.redirect(303, "/alunos");
});

module.exports = router;
