const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "API documentation for the booking application",
  },
  servers: [
    {
      url: "http://localhost:8080",
      description: "Development Server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routers/**/*.js"],
};

module.exports = options;
