const express = require('express');
const router = express.Router();
const { gerarToken } = require('../config/auth');

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Fazer login e receber token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *                 example: "admin"
 *               senha:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Token gerado com sucesso
 */
router.post('/login', (req, res) => {
  const { usuario, senha } = req.body;

  // Validação simples (em produção, verificar no banco)
  if (usuario === 'admin' && senha === '123456') {
    const token = gerarToken(usuario);
    return res.json({
      mensagem: 'Login bem-sucedido',
      token,
      tipo: 'Bearer'
    });
  }

  res.status(401).json({ erro: 'Usuário ou senha inválidos' });
});

module.exports = router;