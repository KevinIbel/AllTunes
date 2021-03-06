const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./api/Room/swagger.json");
// const specs = swaggerJsdoc(swaggerOptions);
const router = require("./api/Room/router");

const app = express();
const port = 8000;

app.use(cors())
app.use(bodyParser.json());
app.use("/room", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));