const Pokemon = require('../models/Pokemon');
const Captura = require('../models/Captura');
const { buscarPokemonNaAPI } = require('../services/pokeApiService');

// GET /api/pokemons
exports.listarTodos = async (req, res) => {
  try {
    const { favorito, capturado, tipo } = req.query;
    let filtro = {};

    if (favorito === 'true') filtro.favorito = true;
    if (capturado === 'true') filtro.capturado = true;
    if (tipo) filtro.tipos = tipo;

    const pokemons = await Pokemon.find(filtro).sort({ pokedexId: 1 });
    res.json({
      total: pokemons.length,
      pokemons
    });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// GET /api/pokemons/:id
exports.buscarPorId = async (req, res) => {
  try {
    const pokemon = await Pokemon.findById(req.params.id);
    if (!pokemon) {
      return res.status(404).json({ erro: 'Pokémon não encontrado' });
    }
    res.json(pokemon);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// POST /api/pokemons
exports.importarDaAPI = async (req, res) => {
  try {
    const { nome } = req.body;
    
    if (!nome) {
      return res.status(400).json({ erro: 'Nome do pokémon é obrigatório' });
    }

    const dadosAPI = await buscarPokemonNaAPI(nome);

    let pokemon = await Pokemon.findOne({ pokedexId: dadosAPI.pokedexId });
    if (pokemon) {
      return res.status(409).json({
        mensagem: 'Pokémon já existe na Pokédex',
        pokemon
      });
    }

    pokemon = new Pokemon(dadosAPI);
    await pokemon.save();

    await Captura.create({
      nomePokemon: pokemon.nome,
      pokedexId: pokemon.pokedexId,
      origem: 'pokeapi'
    });

    res.status(201).json({
      mensagem: 'Pokémon importado com sucesso!',
      pokemon
    });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

// PUT /api/pokemons/:id
exports.atualizar = async (req, res) => {
  try {
    const pokemon = await Pokemon.findByIdAndUpdate(
      req.params.id,
      { ...req.body, atualizadoEm: Date.now() },
      { new: true }
    );
    if (!pokemon) {
      return res.status(404).json({ erro: 'Pokémon não encontrado' });
    }
    res.json(pokemon);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// PATCH /api/pokemons/:id
exports.atualizarParcial = async (req, res) => {
  try {
    const pokemon = await Pokemon.findByIdAndUpdate(
      req.params.id,
      { ...req.body, atualizadoEm: Date.now() },
      { new: true }
    );
    if (!pokemon) {
      return res.status(404).json({ erro: 'Pokémon não encontrado' });
    }
    res.json(pokemon);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// DELETE /api/pokemons/:id
exports.deletar = async (req, res) => {
  try {
    const pokemon = await Pokemon.findByIdAndDelete(req.params.id);
    if (!pokemon) {
      return res.status(404).json({ erro: 'Pokémon não encontrado' });
    }
    res.json({
      mensagem: 'Pokémon removido com sucesso',
      id: req.params.id
    });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// PATCH /api/pokemons/:id/capturar
exports.capturar = async (req, res) => {
  try {
    const { localizacao } = req.body;
    const pokemon = await Pokemon.findByIdAndUpdate(
      req.params.id,
      {
        capturado: true,
        localizacao: localizacao || 'Desconhecida',
        dataCaptura: Date.now(),
        atualizadoEm: Date.now()
      },
      { new: true }
    );
    if (!pokemon) {
      return res.status(404).json({ erro: 'Pokémon não encontrado' });
    }
    res.json({
      mensagem: 'Pokémon capturado com sucesso!',
      pokemon
    });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// PATCH /api/pokemons/:id/favoritar
exports.toggleFavorito = async (req, res) => {
  try {
    const pokemon = await Pokemon.findById(req.params.id);
    if (!pokemon) {
      return res.status(404).json({ erro: 'Pokémon não encontrado' });
    }
    pokemon.favorito = !pokemon.favorito;
    pokemon.atualizadoEm = Date.now();
    await pokemon.save();
    res.json({
      mensagem: pokemon.favorito ? 'Adicionado aos favoritos' : 'Removido dos favoritos',
      favorito: pokemon.favorito
    });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};