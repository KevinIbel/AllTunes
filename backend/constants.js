const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "AllTunes Express API with Swagger",
      version: "0.0.1",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    },
    host: "localhost:8000",
    basePath: "/",
  },
  apis: ["./api/Room/routes/index.js"],
};

module.exports = {
  swaggerOptions,
};
