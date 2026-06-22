// contém as funções que gerenciam estatísticas e filtros da pokedex
const Pokemon = require('../models/Pokemon');
const Captura = require('../models/Captura');
const { listarPokemonsAPI, buscarPorTipo } = require('../services/pokeApiService');

// GET /api/pokedex/resumo
exports.resumo = async (req, res) => {
  try {
    //conta todos os docs na coleção pokemon
    const total = await Pokemon.countDocuments();
    //conta só os que tem capturado
    const capturados = await Pokemon.countDocuments({ capturado: true });
    //conta só os que tem favorito
    const favoritos = await Pokemon.countDocuments({ favorito: true });
    //tira os tipos unicos, eletric, fire...
    const tipos = await Pokemon.distinct('tipos');

    res.json({
      total,
      capturados,
      favoritos,
      percentualCapturas: total > 0 ? ((capturados / total) * 100).toFixed(2) + '%' : '0%',
      tiposUnicos: tipos.length
    });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

//listar capturados
// GET /api/pokedex/capturados
exports.capturados = async (req, res) => {
  try {
    const pokemons = await Pokemon.find({ capturado: true }).sort({
      dataCaptura: -1
    });
    res.json({
      total: pokemons.length,
      pokemons
    });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// listar favoritos
// GET /api/pokedex/favoritos
exports.favoritos = async (req, res) => {
  try {
    const pokemons = await Pokemon.find({ favorito: true });
    res.json({
      total: pokemons.length,
      pokemons
    });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

//historico de busca
// GET /api/pokedex/historico
exports.historico = async (req, res) => {
  try {
    const capturas = await Captura.find().sort({ dataBusca: -1 }).limit(50);
    res.json({
      total: capturas.length,
      capturas
    });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
// listar PokeAPI
// GET /api/pokedex/lista-publica
exports.listaPublica = async (req, res) => {
  try {
    const { offset = 0, limit = 20 } = req.query;
    //lista pokemons diretamente da pokeAPI
    const dados = await listarPokemonsAPI(parseInt(offset), parseInt(limit));
    
    res.json({
      total: dados.count,
      offset: dados.offset,
      resultados: dados.results.map(p => ({
        nome: p.name,
        url: p.url
      }))
    });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// filtrar por tipo
// GET /api/pokedex/tipo/:tipo
exports.porTipo = async (req, res) => {
  try {
    const { tipo } = req.params;
    const pokemons = await Pokemon.find({ tipos: tipo.toLowerCase() });
    res.json({
      tipo,
      total: pokemons.length,
      pokemons
    });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};