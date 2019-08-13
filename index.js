const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

// inicia o arquivo de variáveis
require('dotenv-safe').load();

// Definindo BodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Iniciando Rotas a partir de "/api"
app.use('/api', [
  require('./controller/clietesController'),
  require('./controller/usuariosController'),
]);

// Subindo servidor
app.listen(port, () => console.log(`Server running on port ${port}...`))
