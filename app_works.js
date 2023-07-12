const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Express app setup
const app = express();
app.use(bodyParser.json());

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pokémon API',
      version: '1.0.0',
      description: 'API for retrieving Pokémon data.',
      contact: {
        name: 'Support',
        url: 'http://example.com',
        email: 'support@example.com'
      }
    },
  },
  apis: ['./app.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Pokémon data
const pokemons = [
  { id: 1, name: 'owner1', type: 'sac', level: 25 },
  { id: 2, name: 'owner2', type: 'eirl', level: 20 },
  { id: 3, name: 'owner4', type: 'sac', level: 18 },
  { id: 4, name: 'owner5', type: 'gobierno', level: 22 },
  { id: 5, name: 'owner6', type: 'sac', level: 10 },
];

/**
 * @swagger
 * components:
 *   schemas:
 *     Pokemon:
 *       type: object
 *       required:
 *         - name
 *         - type
 *         - level
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the Pokémon
 *         name:
 *           type: string
 *           description: The name of the Pokémon
 *         type:
 *           type: string
 *           description: The type of the Pokémon
 *         level:
 *           type: integer
 *           description: The level of the Pokémon
 *       example:
 *         id: 1
 *         name: "Pikachu"
 *         type: "Electric"
 *         level: 25
 */

/**
 * @swagger
 * /list:
 *   get:
 *     summary: Retrieve a list of Pokémon
 *     description: Retrieve a list of 5 Pokémon.
 *     responses:
 *       200:
 *         description: A list of 5 Pokémon.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pokemon'
 */
app.get('/list', (req, res) => {
  const pokemonList = pokemons.slice(0, 5);
  res.json(pokemonList);
});

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get details of a specific Pokémon
 *     description: Get details of a specific Pokémon by its id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the Pokémon to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The details of the specific Pokémon.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pokemon'
 *       404:
 *         description: The Pokémon was not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Pokémon not found
 */
app.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemons.find(p => p.id === id);
  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).json({ error: 'Pokémon not found' });
  }
});

app.listen(4000, () => {
  console.log('Server is running on port 3000');
});
