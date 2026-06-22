// gerencia a autenticação com JWT
const jwt = require('jsonwebtoken'); //biblioteca JWT
const bcrypt = require('bcryptjs'); //criptografia de senha

//tira do .env se tiver a chave, se não usa o pokedex
const SECRET = process.env.JWT_SECRET || 'pokedex_ufpr';

// Criar token e expiração
const gerarToken = (userId) => {
  return jwt.sign({ userId }, SECRET, { expiresIn: '24h' });
};

// Verificar token, pega o token do header authorization
const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  //se não tiver token, retorna erro 401
  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  // tenta verificar o token
  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.userId; //salva userID na requisição
    next(); //prossegue
  } catch (err) {
    res.status(401).json({ erro: 'Token inválido' });
  }
};

module.exports = { gerarToken, verificarToken };