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
router.get('/:matricula', function(req, res, next) {
    
    const{matricula} = req.params;

    const aluno =alunos.content[matricula] ;
    
    
    res.render('card' , {title:'Detalhe dos alunos',aluno});
});
module.exports = router;
