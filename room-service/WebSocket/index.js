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
      } else if (message === "QueueRequest") {
        const lobby = getQueue();
        console.log("Sending Queue!");
        socket.send(JSON.stringify({ type: "queue", data: lobby }));
      } else if (message === "PlaybackRequest") {
        const songSeek = getSongAtPos();
        if (songSeek != null) {
          socket.send(JSON.stringify({ type: "playSong", data: songSeek }));
        }
      } else if (message === "SkipRequest") {
        const nextSong = getNextSong();
        if (nextSong != null) {
          sendToClients(socket, JSON.stringify({ type: "playSong", data: nextSong }));
        }
      } else if (message === "PreviousRequest") {
        const songSeek = setSongPos(0); // setSongPos returns queue[0]
        if (songSeek != null) {
          sendToClients(socket, JSON.stringify({ type: "playSong", data: songSeek }));
        }
      //} else if (message === "PauseRequest") {
        // Spotify pause requests don't need anything.
        
      //  sendToClients(socket, JSON.stringify({ type: "pauseSong", data: null }));
      } else if (message === "PlayRequest") {
        const songSeek = getSongAtPos();
        if (songSeek != null) {
          sendToClients(socket, JSON.stringify({ type: "playSong", data: songSeek }));
        }
      } else if (message === "SeekRequest") {
        // This will probably have to be expanded into more than a simple request.
        // When the host clikcs on the SongSlider, info has to be sent about the position.
      } else {
        try {
          const contents = JSON.parse(message);
          if (contents.type === "addTrackToQueue") {
            const queue = addToQueue(contents.data);
          
            wsServer.clients.forEach((client) => {
              if (client !== socket && client.readyState === ws.OPEN) {
                console.log("BroadCasting! ", "queue");
                client.send(JSON.stringify({ type: "queue", data: queue }));
              }
            });
          } else if (contents.type === "PauseRequest") {
            console.log("WS SERVER RECEIVED: "+JSON.stringify(contents));
            const updatedSongInfo = setSongPos(contents.data);
            console.log("UPDATED SONG INFO "+JSON.stringify(updatedSongInfo));
            console.log("UPDATED SONG INFO222222 "+JSON.stringify(contents.data));
            sendToClients(socket, JSON.stringify({ type: "pauseSong", data: updatedSongInfo }));
            const lobbyQueue = getQueue();
            console.log("QUEUE AFTER UPDATE:"+JSON.stringify(lobbyQueue));
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

function sendToClients(socket, messageToSend) {
  wsServer.clients.forEach((client) => {
    if (client !== socket && client.readyState === ws.OPEN) {
      //console.log("BroadCasting! ", "queue");
      client.send(messageToSend);
    }
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

function getNextSong() {
  return getRoom().getNextSong();
}

function getSongAtStart() {
  return getRoom().getSongAtStart();
}

function getSongAtPos() {
  return getRoom().getSongAtPos();
}

function setSongPos(progress_ms) {
  return getRoom().setSongPos(progress_ms);
}

function isQueueEmpty(){
}




module.exports = { initWebsocket };
