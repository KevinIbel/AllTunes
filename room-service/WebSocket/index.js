const ws = require("ws");
const { getRoom } = require("../api/Room/router");

let wsServer;

function initWebsocket(server) {
  wsServer = new ws.Server({ server });
  wsServer.on("connection", (socket) => {
    socket.on("message", (message) => {
      if (message === "TracksRequest") {
        const tracks = getTracks();
        console.log("Sending Tracks!");
        socket.send(JSON.stringify({ type: "tracks", data: tracks }));
      } else if (message === "LobbyRequest") {
        const lobby = getLobby();
        console.log("Sending Lobby!");
        socket.send(JSON.stringify({ type: "lobby", data: lobby }));
      } else {
        try {
          wsServer.clients.forEach((client) => {
            if (client !== socket && client.readyState === ws.OPEN) {
              const contents = JSON.parse(message);
              console.log("BroadCasting! ", contents.type);
              client.send(message);
            }
          });
        } catch (e) {
          console.log("[Server] Failed to broadcast." + e);
        }
      }
    });
  });
}

function getTracks() {
  return getRoom().getTracks();
}

function getLobby() {
  return getRoom().getLobby();
}

module.exports = { initWebsocket };
