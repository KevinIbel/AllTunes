const ws = require("ws");
const { getRoom } = require("../api/Room/router");

let wsServer;

function initWebsocket(server) {
  wsServer = new ws.Server({ server });
  wsServer.on("connection", (socket) => {
    socket.on("message", (message) => {
      if (message.charAt(0) == "{") {
        // Handle messages that are JSON objects.
        try {
          const contents = JSON.parse(message);

          switch(contents.type) {
            case "addTrackToQueue":
              const updatedQueue = addToQueue(contents.data);;
              sendToClients(socket, JSON.stringify({ type: "queue", data: updatedQueue }));
              break;
            case "PauseRequest":
              clearNextSongTimer();
              const updatedSongInfo = setSongPos(contents.data);
              sendToClients(socket, JSON.stringify({ type: "pauseSong", data: updatedSongInfo }));
              break;
            default:
              sendToClients(socket, message);
          }
        } catch (e) {
          console.log("[Server] Failed to broadcast." + e);
        }
      } else {
        // Handle messages that aren't JSON objects.
        switch(message) {
          case "TracksRequest":
            const tracks = getTracks();
            socket.send(JSON.stringify({ type: "tracks", data: tracks }));
            break;
          case "LobbyRequest":
            const lobby = getLobby();
            socket.send(JSON.stringify({ type: "lobby", data: lobby }));
            break;
          case "QueueRequest":
            const queue = getQueue();
            socket.send(JSON.stringify({ type: "queue", data: queue }));
            break;
          case "QueueUpdate":
            const newestQueue = getQueue();
            console.log("got QueueUpdate"+JSON.stringify(newestQueue));
            sendToClients(socket, JSON.stringify({ type: "queue", data: newestQueue }));
            break;
          case "SkipRequest":
            const currentSong = getQueue()[0];
            const nextSong = getNextSong();
            clearNextSongTimer();
            if (nextSong) {
              sendToClients(socket, JSON.stringify({ type: "playSong", data: nextSong }));
              setNextSongTimer(nextSong.duration_ms, nextSong.positionMS);
            } else {
              sendToClients(socket, JSON.stringify({ type: "skipLastSong", data: null }));
            }
            const updatedQueue = getQueue();
            sendToClients(socket, JSON.stringify({ type: "queue", data: updatedQueue }));
            break;
          case "PreviousRequest":
            const songPosZero = setSongPos(0);
            if (songPosZero) {
              clearNextSongTimer();
              sendToClients(socket, JSON.stringify({ type: "playSong", data: songPosZero }));
              setNextSongTimer(songPosZero.duration_ms, songPosZero.positionMS);
            }
            break;
          case "PlayRequest":
            const songInfo = getSongAtPos();
            if (songInfo) {
              clearNextSongTimer();
              sendToClients(socket, JSON.stringify({ type: "playSong", data: songInfo }));
              const queue = getQueue();
              sendToClients(socket, JSON.stringify({ type: "queue", data: queue }));
              setNextSongTimer(songInfo.duration_ms, songInfo.positionMS);
            }
            break;
        }
      }
    });
  });
}

function sendToClients(socket, messageToSend) {
  wsServer.clients.forEach((client) => {
    if (client !== socket && client.readyState === ws.OPEN) {
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

function getSongAtPos() {
  return getRoom().getSongAtPos();
}

function setSongPos(progress_ms) {
  return getRoom().setSongPos(progress_ms);
}

function setNextSongTimer(duration_ms, positionMS) {
  return getRoom().setNextSongTimer(duration_ms, positionMS);
}

function clearNextSongTimer() {
  return getRoom().clearNextSongTimer();
}




module.exports = { initWebsocket };
