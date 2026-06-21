const mongoose = require('mongoose');

const capturaSchema = new mongoose.Schema({
  nomePokemon: String,
  pokedexId: Number,
  dataBusca: {
    type: Date,
    default: Date.now
  },
  origem: {
    type: String,
    enum: ['pokeapi', 'manual'],
    default: 'manual'
  }
});

module.exports = mongoose.model('Captura', capturaSchema);