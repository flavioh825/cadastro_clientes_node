var jwt = require('jsonwebtoken');

// verifica o JWT
const verifyJWT = (req, res, next) => {
  var token = req.headers['x-access-token'];
  if(!token) return res.status(401).send({auth: false, msg: 'No token provided.'});
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if(err) return res.status(500).send({auth: false, msg: 'Failed to authenticate token.'});
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyJWT;