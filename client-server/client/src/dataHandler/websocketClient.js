const ws = require('ws');
 
const wsClient = new ws('ws://localhost:8888');

wsClient.on('open', () => {
  console.log("WS client connected.");
});

wsClient.on('close', () => {
  console.log("WS client disconnected.");
});
 
wsClient.on('message', data => {
	console.log("Received: " + data);
	// The data being received should be the
	// updated track list (whenever a new customer joins the room).
});
