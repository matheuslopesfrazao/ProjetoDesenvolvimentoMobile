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


app.listen(process.env.port || 3000);

console.log('Running a porta 3000');
