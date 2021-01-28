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
  // When the connection is closed, the socket is not alive. Terminate the socket.
  socket.on('close', () => {
    socket.isAlive = false;
    socket.terminate();
  });
  // When sucessfully pinged, the health check is completed so set the socket to alive.
  socket.on('pong', () => {
    socket.isAlive = true;
  });
  // Handle incoming messages.
  /*The WS server only receives music manager tracks. The message is a string (JSON.stringify).
    The WS server sends the tracks to all the other WS clients (customers) connected.
    TODO: Currently the code is based on the assumptions above. Have guards to make sure only the
          tracks will be broadcast since other messages can be received. */ 
  socket.on('message', message => {
    try {
      wsServer.clients.forEach(client => {
        if (client !== socket && client.readyState === ws.OPEN) {
          client.send(message);
        }
      });
      console.log("[Server] Broadcasted message: " + message.substring(0,100));
    } catch (e) {
      console.log("[Server] Failed to broadcast. " + e);
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