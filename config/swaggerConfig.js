const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Product Mannger API',
            version: '1.0.0',
            description: 'An product mannger REST Api',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local server',
            },
        ],
        components: {
            securitySchemes: {
              BearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
              },
            },
        },
        security: [{
            BearerAuth: []
        }],
    },
    apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
