const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { swaggerOptions } = require("./constants");
const specs = swaggerJsdoc(swaggerOptions);
const { router } = require('./api/Room/router');

// WebSocket dependencies.
const ws = require('ws');
const http = require('http');

const app = express();
const port = 8888;

//room router
app.use(cors())
app.use(bodyParser.json())
app.use('/room', router);

//default get - to be removed
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.delete("/", (req, res) => {
  res.send(200);
  server.close();
});

// Create the WebSocket server.
const server = http.createServer(app);
const wsServer = new ws.Server({ server });
wsServer.on('connection', socket => {
  
  // When the connection is opened, the socket is alive.
  socket.isAlive = true;
  console.log("Connection opened.");
  // When the connection is closed, the socket is not alive. Terminate the socket.
  socket.on('close', () => {
    socket.isAlive = false;
    console.log("Connection closed.");
    socket.terminate();
  });
  // When sucessfully pinged, the health check is completed so set the socket to alive.
  socket.on('pong', () => {
    socket.isAlive = true;
    socket.send("Connection still alive.");
  });
  // Handle incoming messages.
  /*The WS server should only receive music manager tracks.
    The WS server should send the tracks to all the other WS clients (customers) connected.
    TODO: Currently the code is based on the assumptions above. Have guards to make sure only the
          tracks will be broadcast since other messages can be received. */ 
  socket.on('message', message => {
    try {
      wsServer.clients.forEach(client => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
      console.log("Broadcasted message.");
    } catch (e) {
      console.log("Failed to broadcast.");
    }
  });
});

// Regularly check if WebSocket clients are still connected to the WebSocket server.
const interval = 60000;
setInterval(() => {
  wsServer.clients.forEach(socket => {
    if (!socket.isAlive) return socket.terminate();
    socket.isAlive = false;
    socket.ping();
  });
}, interval);

server.listen(port, () => {
  console.log(`Room-service started, running on http://localhost:${port}`);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));