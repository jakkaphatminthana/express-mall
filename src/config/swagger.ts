const swaggerOptions = {
  info: {
    version: '1.0.0',
    title: 'API Docs',
    license: {
      name: 'MIT',
    },
  },
  security: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
  baseDir: __dirname,
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: ['../routes/*.{ts,js}', '../docs/schemas/*.{ts,js}'],
  // URL where SwaggerUI will be rendered
  swaggerUIPath: '/api/api-docs',
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
  // Expose Open API JSON Docs documentation in apiDocsPath path.
  exposeApiDocs: true,
  // Open API JSON Docs endpoint.
  apiDocsPath: '/api/api-docs2',
  // Set non-required fields as nullable by default
  notRequiredAsNullable: false,
  // You can customize your UI options.
  // you can extend swagger-ui-express config. You can checkout an example of this
  // in the example/configuration/swaggerOptions.js
  swaggerUiOptions: {},
  // multiple option in case you want more that one instance
  multiple: true,
};

console.log(__dirname);

export { swaggerOptions };
