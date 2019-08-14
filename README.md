## cadastro_clientes_node
API CRUD feita com NodeJs + ExpressJs + MySql + JWT (cadastro de clientes)

## Principais dependencias
* express - `npm i express` (framework)
* mysql - `npm i mysql` (banco de dados)
* body-parser - `npm i body-parser` (requisições)
* bcrypt - `npm i bcrypt` (criptografia)
* jsonwebtoken - `npm i jsonwebtoken` (controle de acesso)
* dotenv-safe - `npm i dotenv-safe` (variaveis de ambiente)

## Siga os passos abaixo para testar<br />
(todos os comandos devem ser digitados no console dentro da pasta do projeto)
* Instale as dependencias digitando:<br />
`npm install`<br />
* Crie o banco MySql com o nome de "cadastro_clientes", rode o comando para que as tabelas sejam criadas e populadas:<br />
`node setup.js`<br />
* No console haverá uma linha chamada SECRET com um hash, insira o hash no arquivo .env que deverá ser criado na raiz do projeto, da seguinte forma:<br />
`SECRET="insira aqui o hash do console"` (existe um arquivo chamado .env.example na raiz do projeto)
* Para subir o servidor digite:<br />
`node index.js`<br />
* Foi adicionado um usuário padrão para teste: <br />
`{ "email": "user@mail.com", "senha": "123abc"  }`

## Endpoints da api
Para algumas funcionalidades é necessário o token para autenticação, que deve ser incluído no header da requisição. Ex:
`x-access-token: [insira aqui token gerado no login]` (token válido por 5 minutos, após isso é necessário logar novamente)

### Usuarios
* Login: `POST` - /api/usuarios/login `{ "email": "flavio@mail.com", "senha": "123abcd"  }`
* Inserir: `POST` - /api/usuarios `{ "email": "flavio@mail.com", "senha": "123abcd"  }`
* Deletar: `DELETE` - /api/usuarios/{id} (token necessário)
* Logout: `GET` - /api/usuarios/logout (token necessário)
### Clientes
* Listar: `GET` - /api/clientes
* Inserir: `POST` - /api/clientes `{ "nome": "Everaldo", "cpf": "12345678998", "telefone": "21998885555", "email": "beto@mail.com" }`
* Visualizar: `GET` - /api/clientes/{id}
* Editar: `PATCH` - /api/clientes/{id} `{ "nome": "Everaldo Silva", "cpf": "12345678998", "telefone": "21998885555", "email": "beto@mail.com" }`
* Deletar: `DELETE` - /api/clientes/{id}
(todos precisam do token no header das requisições)
