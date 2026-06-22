const express = require('express');
const router = express.Router();
const controller = require('../controllers/pokedexController'); // funções do pokedexController.js

//retorna estatísticas gerais
router.get('/resumo', controller.resumo);
//lista pokemons capturados
router.get('/capturados', controller.capturados);
//lista pokemons favoritos
router.get('/favoritos', controller.favoritos);
//mostra historico
router.get('/historico', controller.historico);
//lista pokemons da PokeAPI 
router.get('/lista-publica', controller.listaPublica);
//filtra pokemons por tipo
router.get('/tipo/:tipo', controller.porTipo);

module.exports = router;