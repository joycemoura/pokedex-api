const express = require('express');
const router = express.Router();
const controller = require('../controllers/pokedexController');

router.get('/resumo', controller.resumo);
router.get('/capturados', controller.capturados);
router.get('/favoritos', controller.favoritos);
router.get('/historico', controller.historico);
router.get('/lista-publica', controller.listaPublica);
router.get('/tipo/:tipo', controller.porTipo);

module.exports = router;