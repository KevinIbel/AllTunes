const WebSocket = require('ws');
 
const ws = new WebSocket('ws://localhost:8000');

ws.on('open', () => {
  console.log("This WS client has connected to the WS server.");
});

ws.on('close', () => {
  console.log("This WS client's connection with the WS server has closed.");
});
 
ws.on('message', data => {
	console.log("Received: " + data);
	// The data being received should be the
	//updated track list (whenever a new customer joins the room).
});
