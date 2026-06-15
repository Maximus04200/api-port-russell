/**
 * @file config/swagger.js
 * @description Configuration de la documentation Swagger/OpenAPI.
 */

const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Port de Plaisance Russell',
      version: '1.0.0',
      description: 'API de gestion des catways et réservations du port Russell',
    },
    servers: [
      {
        url: 'https://api-port-russell-production-c821.up.railway.app',
        description: 'Serveur de production'
      },
      {
        url: 'http://localhost:3000',
        description: 'Serveur local'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./routes/*.js']
};

module.exports = swaggerJsdoc(options);