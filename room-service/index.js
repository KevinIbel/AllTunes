const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { swaggerOptions } = require("./constants");
const specs = swaggerJsdoc(swaggerOptions);
const { router } = require('./api/Room/router');

const app = express();
const port = 8888;

//room router
app.use(bodyParser.json())
app.use('/room', router);

//default get - to be removed
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const server = app.listen(port, () => {
  console.log(`Room-service started, running on http://localhost:${port}`);
});

app.delete("/", (req, res) => {
  res.send(200);
  server.close();
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));