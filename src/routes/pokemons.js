// contem as rotas de pokemons com proteção JWT 
const express = require('express');
const router = express.Router();
const controller = require('../controllers/pokemonsController');
const { verificarToken } = require('../config/auth'); //middleware que valida JWT token

/**
 * @swagger
 * /api/pokemons:
 *   get:
 *     summary: Listar todos os pokémons
 *     tags: [Pokémons]
 *     responses:
 *       200:
 *         description: Lista de pokémons
 *   post:
 *     summary: Importar pokémon da PokéAPI
 *     tags: [Pokémons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "pikachu"
 *     responses:
 *       201:
 *         description: Pokémon importado com sucesso
 */
// rota pública
router.get('/', controller.listarTodos);
// rota protegida
router.post('/', verificarToken, controller.importarDaAPI);

/**
 * @swagger
 * /api/pokemons/{id}:
 *   get:
 *     summary: Buscar pokémon por ID
 *     tags: [Pokémons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados do pokémon
 *       404:
 *         description: Pokémon não encontrado
 *   put:
 *     summary: Atualizar pokémon completo
 *     tags: [Pokémons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *   patch:
 *     summary: Atualizar pokémon parcialmente
 *     tags: [Pokémons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *   delete:
 *     summary: Deletar pokémon
 *     tags: [Pokémons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
// rota publica
router.get('/:id', controller.buscarPorId);
//rota protegida
router.put('/:id', verificarToken, controller.atualizar);
router.patch('/:id', verificarToken, controller.atualizarParcial);
router.delete('/:id', verificarToken, controller.deletar);

/**
 * @swagger
 * /api/pokemons/{id}/capturar:
 *   patch:
 *     summary: Marcar pokémon como capturado
 *     tags: [Pokémons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               localizacao:
 *                 type: string
 *                 example: "Viridian Forest"
 */
// rota protegida
router.patch('/:id/capturar', verificarToken, controller.capturar);


/**
 * @swagger
 * /api/pokemons/{id}/favoritar:
 *   patch:
 *     summary: Marcar pokémon como favorito
 *     tags: [Pokémons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
// rota protegida
router.patch('/:id/favoritar', verificarToken, controller.toggleFavorito);

module.exports = router;