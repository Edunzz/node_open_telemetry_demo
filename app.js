const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const http = require('http');

// Express app setup
const app = express();
app.use(bodyParser.json());

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Propiedad! API',
      version: '1.0.0',
      description: 'API for retrieving Propiedad! data.',
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

// Propiedad! data
const propietarios = [
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
 *     propiedad:
 *       type: object
 *       required:
 *         - name
 *         - type
 *         - level
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the Propiedad!
 *         name:
 *           type: string
 *           description: The name of the Propiedad!
 *         type:
 *           type: string
 *           description: The type of the Propiedad!
 *         level:
 *           type: integer
 *           description: The level of the Propiedad!
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
 *     summary: Retrieve a list of Propiedad!
 *     description: Retrieve a list of 5 Propiedad!.
 *     responses:
 *       200:
 *         description: A list of 5 Propiedad!.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/propiedad'
 */
app.get('/list', (req, res) => {
  const propiedadList = propietarios.slice(0, 5);
  res.json(propiedadList);
});

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get details of a specific Propiedad!
 *     description: Get details of a specific Propiedad! by its id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the Propiedad! to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The details of the specific Propiedad!.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/propiedad'
 *       404:
 *         description: The Propiedad! was not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Propiedad! not found
 */
app.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = propietarios.find(p => p.id === id);

  if (pokemon) {
    // Realizar la petición a la API externa
    http.get('http://52.226.100.9/properties', apiRes => {
      let data = '';

      // Concatenar cada fragmento de datos
      apiRes.on('data', chunk => {
        data += chunk;
      });

      // Cuando la respuesta esté completa, enviamos la respuesta final
      apiRes.on('end', () => {
        res.json({
          pokemon: pokemon,
          properties: JSON.parse(data)
        });
      });
    }).on('error', err => {
      // En caso de que haya un error en la petición a la API externa, podemos capturarlo aquí
      res.status(500).json({ error: 'Error al obtener las propiedades de la API externa' });
    });
  } else {
    res.status(404).json({ error: 'Pokémon not found' });
  }
});


app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
