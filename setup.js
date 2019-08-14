const mysql = require('mysql');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const db = require('./config/db');

// gerando o SECRET para a .ENV
function generateSecretKey() {
  crypto.randomBytes(48, function(err, buffer) { 
    var secret = buffer.toString('hex'); 
    console.log(`SECRET: ${secret}`);
  });
}

// criando conexão
const connection = mysql.createConnection(db);

// criando a tabela clientes
function createTable(conn) {
  const sql = `CREATE TABLE IF NOT EXISTS Clientes (
              id int NOT NULL AUTO_INCREMENT,
              nome varchar(200) NOT NULL, 
              cpf varchar(11) NOT NULL,
              telefone varchar(11) NOT NULL,
              email varchar(100),
              PRIMARY KEY (ID));`;
  conn.query(sql, function(error, results, fields) {
    if(error) return console.log(error);
    console.log('Table "clientes" is created!');
    populateTable(conn);
  });
}

// criando a tabela Usuarios
function createUserTable(conn) {
  const sql = `CREATE TABLE IF NOT EXISTS Usuarios (
              id int NOT NULL AUTO_INCREMENT,
              email varchar(100) NOT NULL, 
              senha varchar(255) NOT NULL,
              PRIMARY KEY (ID));`;
  conn.query(sql, function(error, results, fields) {
    if(error) return console.log(error);
    console.log('Table "usuarios" is created!');
    populateUserTable(conn);
  });
}

// populando a tabela clientes
function populateTable(conn) {
  const sql = `INSERT INTO clientes(nome, cpf, telefone, email) VALUES ?`;
  const values = [
    ['Cleberson', '14525415177', '21952644488', 'cleberson@gmail.com'],
    ['Adalberto', '98558965896', '41965888221', 'adalberto@gmail.com'],
    ['Vitoriano', '31458765431', '11987755442', 'vitoriano@gmail.com']
  ];
  conn.query(sql, [values], function(err, results, fields){
    if(err) return console.log(err);
    console.log('Clientes adicionados!');
  });
}

// populando a tabela Usuários
const salt = 10;
var senhaUsuarioPadrao = '123abc';
var senhaCriptografada = bcrypt.hashSync(senhaUsuarioPadrao, salt); // gerando senha para o usuário padrão

function populateUserTable(conn) {
  const sql = `INSERT INTO usuarios(email, senha) VALUES ?`;
  const values = [
    ['user@mail.com', senhaCriptografada]
  ];
  conn.query(sql, [values], function(err, results, fields){
    if(err) return console.log(err);
    console.log('Usuário default adicionado!');
  });
}

// conectando com o banco e executando as funções
connection.connect(function(err) {
  if(err) return console.log(err);
  console.log('connected!');
  createTable(connection);
  createUserTable(connection);
  generateSecretKey();
});