const router = require('express').Router();
const mysql = require('mysql');
const db = require('../config/db');
var jwt = require('jsonwebtoken');
const verifyJWT = require('../config/jwt');

// senha
const bcrypt = require('bcrypt');
const salt = 10;

// show
router.get('/usuarios/:id', verifyJWT, (req, res) => {
  let sql = `SELECT id, email FROM usuarios WHERE id = ?`;
  let params = [parseInt(req.params.id)];
  sqlQuery(sql, params, res);
});

// create
router.post('/usuarios', (req, res) => {
  let sql = `INSERT INTO usuarios (email, senha) VALUES (?, ?)`;
  let params = [
    email = req.body.email.substring(0, 100),
    senha = bcrypt.hashSync(req.body.senha, salt)
  ];
  sqlQuery(sql, params, res);
});

// delete
router.delete('/usuarios/:id', verifyJWT, (req, res) => {
  let sql = `DELETE FROM usuarios WHERE id = ?`;
  let params = [parseInt(req.params.id)];
  sqlQuery(sql, params, res);
});

// auth
// login do usuario
router.post('/usuarios/login', (req, res) => {
  const connection = mysql.createConnection(db);
  let sql = `SELECT id, email, senha FROM usuarios WHERE email = ? LIMIT 1`;
  connection.query(sql, req.body.email, function(error, results){
    if(error){
      res.status(500).send({msg: 'Email incorreto'});
    }else{
      if(bcrypt.compareSync(req.body.senha, results[0].senha)){
        const id = results[0].id;
        var token = jwt.sign({ id }, process.env.SECRET, {
          expiresIn: 300
        });
        res.set('x-access-token', token);
        res.status(200).send({auth: true});
      }else{
        res.status(500).send({msg: 'Senha Incorreta'});
      }
    }    
  });
});

// logout
router.get('/usuarios/logout', (req, res) => {
  res.status(200).send({auth: false, token: null});
});

function sqlQuery(query, params, res) {
  const connection = mysql.createConnection(db);
  connection.query(query, params, function(error, results){
    if(error)
      res.json(error);
    else
      res.json(results);
    connection.end();
    console.log('executado!');
  });
}

module.exports = router;