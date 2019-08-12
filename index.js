const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

// Definindo BodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Iniciando Rotas a partir de "/api"
app.use('/api', require('./controller/clietesController'));

// Subindo servidor
app.listen(port, () => console.log(`Server running on port ${port}...`))
