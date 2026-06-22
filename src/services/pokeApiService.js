// biblioteca axios utilizada para fazer requisições HTTP para a pokeAPI
const axios = require('axios');

const BASE_URL = process.env.POKEAPI_BASE_URL || 'https://pokeapi.co/api/v2';

// Buscar pokémon por nome ou ID
const buscarPokemonNaAPI = async (nomeOuId) => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon/${nomeOuId.toLowerCase()}`);
    const data = response.data;

    return {
      nome: data.name,
      pokedexId: data.id,
      tipos: data.types.map(t => t.type.name),
      altura: data.height,
      peso: data.weight,
      imagem: data.sprites.front_default,
      imagemOficial: data.sprites.other?.['official-artwork']?.front_default,
      habilidade: data.abilities[0]?.ability.name,
      habilidadeOculta: data.abilities.find(a => a.is_hidden)?.ability.name
    };
  } catch (err) {
    throw new Error(`Pokémon não encontrado na API: ${nomeOuId}`);
  }
};

// Buscar lista de pokémons com paginação
const listarPokemonsAPI = async (offset = 0, limit = 20) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
    );
    return response.data;
  } catch (err) {
    throw new Error('Erro ao listar pokémons da API');
  }
};

// Buscar por tipo
const buscarPorTipo = async (tipo) => {
  try {
    const response = await axios.get(`${BASE_URL}/type/${tipo.toLowerCase()}`);
    return response.data.pokemon.map(p => p.pokemon.name);
  } catch (err) {
    throw new Error(`Tipo de pokémon não encontrado: ${tipo}`);
  }
};

module.exports = {
  buscarPokemonNaAPI,
  listarPokemonsAPI,
  buscarPorTipo
};