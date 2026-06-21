const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET = process.env.JWT_SECRET || 'pokedex_ufpr';

// Criar token
const gerarToken = (userId) => {
  return jwt.sign({ userId }, SECRET, { expiresIn: '24h' });
};

// Verificar token (middleware)
const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ erro: 'Token inválido' });
  }
};

module.exports = { gerarToken, verificarToken };