const express = require ('express');
const app = express();
const path = require('path');
const router = express.Router();
__dirname = path.resolve();

const mysql = require('mysql'); //tem de instalar no package.json
var sha1 = require('sha1'); //tem de instalar no package.json
const connection = mysql.createConnection({
host : 'remotemysql.com'
,
user : 'j2jRxU1xXK'
,
password : 'Y5wNDkqJX2'
,
database : 'j2jRxU1xXK'
,
port: '3306'
});


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname + '/public')) /* Faz com que o css funcione*/ 


/* Abre rota Home */
app.get('/', (req, res) => {
  res.render(__dirname+'/views/home.html');
});
/* fecha rota Home */


/* Abre rota Listar */
app.get('/listar', (req, resposta) => { 
connection.query('SELECT * FROM `usuario`', function(err, rows, fields) {
    if (err){
      console.log ('error', err.message, err.stack)
    }
    else{
      resposta.render(__dirname+'/views/listar.html', {usuarios:rows});
    }
  });
});
/* fecha rota Listar */


/* Abre rota Cadastrar */
app.get('/cadastrar', (req, resposta) => {
  resposta.render(__dirname+'/views/cadastrar.html', {msg:"Cadastro de novos usuarios"});
});

app.post('/cadastrar',function(request,res){

  var nome=request.body.nome;
  var endereco=request.body.endereco;
  var cpf=request.body.cpf;
  var senha=sha1(request.body.senha);

  const usuario = {'nome': nome, 'endereco': endereco, 'cpf': cpf , 'senha': senha };
  
  connection.query('INSERT INTO usuario SET ?', usuario, (err, resp) => {
    if (err){
      console.log ('error', err.message, err.stack)
    }
    else
      console.log('ID do ultimo inserido:', resp.insertId);
    });
  res.render(__dirname+'/views/cadastrar.html', {msg: nome+" Cadastrado com Sucesso"});
  });
/* fecha rota Cadastrar */


/* Abre rota Login */
app.get('/login', (req, resposta) => {
  var user_name="Visitante";
  resposta.render(__dirname+'/views/login.html', {user:user_name});
});

app.post('/login',function(request,res){
  var user_name=request.body.usuario;
  var password=request.body.senha;
  
  console.log("Nome do usuário = "+user_name+", senha é "+password);
  //res.sendFile(path.join(__dirname+'/views/login.html'));
  res.render(__dirname+'/views/login.html', {user:user_name});
});
/* fecha rota Login */

/* Abre rota Atualizar*/ 
app.get('/editar/:id', (req, resposta) => {
  var id = req.params.id;
  connection.query('SELECT * FROM `usuario`Where id = ?',[id], function(err, rows, fields) {
    if (err){
      console.log ('error', err.message, err.stack)
    }
    else{
      console.log(rows[0]);
      resposta.render(__dirname+'/views/editar.html', {usuario:rows[0]});
    }
  });
});

app.post('/editar',function(request,res){
  var nome=request.body.nome;
  var endereco=request.body.endereco;
  var cpf=request.body.cpf;
  var id = request.body.id;
  connection.query(
  'UPDATE usuario SET nome = ?, endereco = ?, cpf = ? Where id = ?', [nome, endereco, cpf, id],
  (err, result) => {
    if (err) throw err;
      console.log(`Atualizado ${result.changedRows} row(s)`);
  });
  res.redirect('/listar');
  });
/* fecha rota Atualizar*/


/* Abre rota Deletar */
app.get('/deletar/:id', (req, res) => {

  var id = req.params.id;

  connection.query('DELETE FROM `usuario` Where id = ?',[id], function(err, result) {
    console.log("Registro Deletado!!");
    console.log(result);
  });
  res.redirect('/listar');
});
/* fecha rota Deletar*/ 

app.listen(process.env.port || 3000);

console.log('Running a porta 3000');
