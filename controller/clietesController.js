const router = require('express').Router();
const mysql = require('mysql');
const db = require('../config/db');

// index
router.get('/clientes', (req, res) => {
  let sql = `SELECT id, nome, cpf, telefone, email FROM Clientes`;
  sqlQuery(sql, null, res);
});

// show
router.get('/clientes/:id?', (req, res) => {
  let params = [parseInt(req.params.id)];
  let sql = `SELECT id, nome, cpf, telefone, email FROM Clientes WHERE id = ?`;
  sqlQuery(sql, params, res);
});

// delete
router.delete('/clientes/:id?', (req, res) => {
  let params = [parseInt(req.params.id)];
  let sql = `DELETE FROM Clientes WHERE id = ?`;
  sqlQuery(sql, params, res);
});

// create
router.post('/clientes', (req, res) => {
  let data = [
    nome = req.body.nome.substring(0, 200),
    cpf = req.body.cpf.substring(0, 11),
    telefone = req.body.telefone.substring(0, 11),
    email = req.body.email.substring(0, 100)
  ];
  let sql = `INSERT INTO Clientes (nome, cpf, telefone, email) 
                  values (?, ?, ?, ?)`;
  sqlQuery(sql, data, res);
});

// update
router.patch('/clientes/:id', (req, res) => {
  let data = [
    id = parseInt(req.params.id),
    nome = req.body.nome.substring(0, 200),
    cpf = req.body.cpf.substring(0, 11),
    telefone = req.body.telefone.substring(0, 11),
    email = req.body.email.substring(0, 100)
  ];
  let sql = `UPDATE Clientes SET nome = ?, cpf = ?, telefone = ?, email = ? WHERE id = ?`;
  sqlQuery(sql, data, res)
});

// executa as querys abrindo e fechando conexão.
function sqlQuery(query, params, res){
  const connection = mysql.createConnection(db);
  connection.query(query, params, function(error, results){
      if(error) 
        res.json(error);
      else
        res.json(results);
      connection.end();
      console.log('executou!');
  });
}

module.exports = router;