//modelo de dados do pokemon
const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  pokedexId: {
    type: Number,
    required: true,
    unique: true
  },
  tipos: [String],
  altura: Number,
  peso: Number,
  imagem: String,
  imagemOficial: String,
  habilidade: String,
  habilidadeOculta: String,
  descricao: String,
  capturado: {
    type: Boolean,
    default: false
  },
  favorito: {
    type: Boolean,
    default: false
  },
  notaUsuario: {
    type: Number,
    min: 0,
    max: 10
  },
  dataCaptura: Date,
  localizacao: String,
  tags: [String],
  criadoEm: {
    type: Date,
    default: Date.now
  },
  atualizadoEm: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Pokemon', pokemonSchema);