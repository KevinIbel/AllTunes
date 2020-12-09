import React from "react";
import "./index.css";
import querystring from "querystring";

import SpotifyWebApi from "spotify-web-api-js";

var client_id = "aeedb64c42db49bf8413aab94c44637c"; // Your client id
var client_secret = "ffdf9085c89a4cdebb7012ebdac175b4"; // Your secret
var redirect_uri = "http://localhost:3000/landing/"; // Your redirect uri
var scope = 'user-read-private user-read-email user-read-playback-state';
const spotifyApi = new SpotifyWebApi();

class Index extends React.Component {
  
}

export default Index;
