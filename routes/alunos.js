let express = require('express');
const { localApi } = require('../config/config_axios')
let router = express.Router();
let alunos = require('../test/mocks/alunos.json');
// const { route } = require('.');
router.get('/', async function (req,res, next){
    try {
        const {data:alunos} = await localApi.get('/api/v1/alunos')
        const data = {title: "Alunos",alunos}
        res.status(200).render('list',data)
    } catch (error) {
        res.status(400).json({msg: error.messagem})
    }
    // const Date = {title: "Alunos",alunos}
    // res.render('list',Date)
})
router.get('/new', function(req,res,next){
    const parametro = "create";
    res.render('form',{method: "POST",parametro, title: 'Novo Aluno', buttonText:'Adicionar'})
})
router.post('/', function (req, res, next) {
    const {body,method} = req
    res.send({body,method})
});
router.post('/create', function(req,res,next){
    const NovoAluno = req.body;
    const matricula = NovoAluno.matricula
    alunos.content[matricula] = {
        ...NovoAluno,
        matricula: Number(matricula)
    }
    res.redirect('/alunos');
})
router.get('/:matricula',function (req,res,next){
    const {matricula} = req.params
    const aluno = alunos.content[matricula]
    res.render('card',{title: 'Detalhes do aluno',aluno});
})
router.get('/edit/:matricula',function(req,res,next){
    const {matricula} = req.params
    const parametro = matricula
    const aluno = alunos.content[matricula]
    res.render('form',{method: "PUT",parametro, title: 'Editar Aluno', buttonText:'Salvar, alterações',aluno})
})
router.put('/:matricula', function (req, res, next) {
    // const {body,method} = req
    const NovoAluno = req.body
    const matricula = NovoAluno.matricula
    alunos.content[matricula] = {
        ...NovoAluno,
        matricula: Number(matricula)
    }
    // res.send({body,parametro, method,masg: "Alterar aluno"})
    res.redirect('/alunos')
});
router.delete('/:matricula', function (req, res, next) {
    // const {body,method} = req
    const matricula =req.params.matricula;
    delete alunos.content[matricula]
    res.redirect(303,'/alunos')
    // res.send({body,method,msg: "Remover aluno"})
});
module.exports = router;