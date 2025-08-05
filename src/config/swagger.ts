import swaggerJSDoc from 'swagger-jsdoc';
import config from '@/config';

const swaggerOptions: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Express docs',
    },
    servers: [
      {
        url: `http://localhost:${config.PORT}`,
        description: 'API server',
      },
    ],
  },
  apis: ['src/routes/**/*.ts', 'src/docs/schemas/*.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
