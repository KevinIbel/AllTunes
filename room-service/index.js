const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { swaggerOptions } = require("./constants");
const specs = swaggerJsdoc(swaggerOptions);
const router = require('./api/routes/index')
const Room = require('./Room/room');

const app = express();
const port = 8888;


app.use('/room', router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`New room has been created, running on http://localhost:${port}`);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

module.exports = room;