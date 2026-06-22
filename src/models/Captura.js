const mongoose = require('mongoose');

//cria um novo schema com campos definidos
const capturaSchema = new mongoose.Schema({
  nomePokemon: String,
  pokedexId: Number,
  dataBusca: {
    type: Date,
    default: Date.now
  },
  origem: {
    type: String,
    enum: ['pokeapi', 'manual'], //importado da API ou add manualmente
    default: 'manual'
  }
});

module.exports = mongoose.model('Captura', capturaSchema);