const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const connectDB = require('./config/database');
const swaggerSpec = require('./config/swagger');
const authRoutes = require('./routes/auth');
const pokemonsRoutes = require('./routes/pokemons');
const pokedexRoutes = require('./routes/pokedex');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Conectar ao banco
connectDB();

// Rota raiz
app.get('/', (req, res) => {
  res.json({ 
    mensagem: 'Bem-vindo à Pokédex API',
    saude: 'http://localhost:3000/health',
    api: 'http://localhost:3000/api/pokemons',
    docs: 'http://localhost:3000/api-docs',
    login: 'http://localhost:3000/api/auth/login'
  });
});

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/pokemons', pokemonsRoutes);
app.use('/api/pokedex', pokedexRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Pokédex API rodando!' });
});

// Erro 404
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Swagger em http://localhost:${PORT}/api-docs`);
  console.log(`Login em http://localhost:${PORT}/api/auth/login`);
});

module.exports = app;