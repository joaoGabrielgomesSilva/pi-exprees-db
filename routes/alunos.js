let express = require('express');
const { localApi } = require('../config/config_axios')
let router = express.Router();                                                                                                                             
// let alunos = require('../test/mocks/alunos.json');
// const { route } = require('.');

router.get('/', async function (req,res, next){
    try {
        const resposta = await localApi.get('/api/v1/alunos');
        let alunos = resposta.data
        const viewData = {title: 'Alunos',alunos}
        res.status(200).render('list',viewData);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});
router.get('/new', function(req,res,next){
    const parametro = "create";
    console.log("SSADF");
    res.render('form',{method: "POST",parametro, title: 'Novo Aluno', buttonText:'Adicionar'})

})
router.post('/', function (req, res, next) {
    const {body,method} = req
    res.send({body,method})
});
router.post('/create', async function(req,res,next){
    const apiUrlcath = '/api/v1/alunos/'+ matricula
    let data = req.body
    try {
        await localApi.put(apiUrlcath, data)
        res.redirect('/alunos')
    } catch (error) {
        console.error(error.massege)
    }
    finally{
        res.redirect('/alunos/')}
});
router.get('/:matricula',async function (req,res,next){
    const {matricula} = req.params
    
    try {
        let response=await localApi.get('/api/v1/alunos/' + matricula)
        let aluno =response.data
        // console.log(aluno);
        let viewData= {aluno,title:`detales deo aluno`}
        res.status(200).render('card', viewData)
    } catch (error) {
        res.json({msg: error.message});
    }
})
router.get('/edit/:matricula', async function(req,res,next){
    const {matricula} = req.params
    const apiUrlcath = '/api/v1/alunos/'+ matricula
    let viewData={method: "PUT",parametro: matricula, title: 'Editar Aluno', buttonText:'Salvar, alterações'}
    try {
        let resposta= await localApi.get(apiUrlcath)
        let aluno=resposta.data
        viewData.aluno=aluno
        res.status(200).render('form',viewData)
    } catch (error) {
        res.json({msg: error.message})
    }
})
router.put('/:matricula', async function (req, res, next) {
    const apiUrlcath = '/api/v1/alunos/'+ matricula
    const matricula = req.params.matricula
const data= req.body 
    try {
        const response = await localApi.put(apiUrlcath, data)
        res.redirect('/alunos')
    } catch (error) {
        console.error(error.massege)
    }
    finally{
        res.redirect('/alunos/'+ matricula)}
});
router.delete('/:matricula', async function (req, res, next) {
    const {matricula} = req.params
    
    try {
        await localApi.delete('/api/v1/alunos/' + matricula)
        res.status(200).redirect(301 , '/alunos')
    } catch (error) {
        res.json({msg: error.message});
}
finally{

}
});
module.exports = router;