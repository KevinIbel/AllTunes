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
          const contents = JSON.parse(message);
          if (contents.type === "addTrackToQueue") {
            const queue = addToQueue(contents.data);
            wsServer.clients.forEach((client) => {
              if (client !== socket && client.readyState === ws.OPEN) {
                console.log("TRY TO ADD TRACK TO QUEUE:"+JSON.stringify(contents.data))
                console.log("QUEUE AFTER ADDING:"+JSON.stringify(queue))
                console.log("BroadCasting! ", "queue");
                client.send(JSON.stringify({ type: "queue", data: queue }));
              }
            });
          } else {
            wsServer.clients.forEach((client) => {
              if (client !== socket && client.readyState === ws.OPEN) {
                console.log("BroadCasting! ", contents.type);
                client.send(message);
              }
            });
          }
          
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

function addToQueue(track) {
  return getRoom().addToQueue(track);
}

function getQueue() {
  return getRoom().getQueue();
}

module.exports = { initWebsocket };
