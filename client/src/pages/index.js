import React from "react";
import "./index.css";
import querystring from "querystring";

import SpotifyWebApi from "spotify-web-api-js";

var client_id = "aeedb64c42db49bf8413aab94c44637c"; // Your client id
var client_secret = "ffdf9085c89a4cdebb7012ebdac175b4"; // Your secret
var redirect_uri = "http://localhost:3000/userroom/"; // Your redirect uri
var scope = 'user-read-private user-read-email user-read-playback-state';
const spotifyApi = new SpotifyWebApi();

class Index extends React.Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
    };
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  login() {
    var redirect =
      "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "token",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
      });
    return redirect;
    }

  render() {
    return (
      <section>
        <div id="titleText" title="titleText" class="titleText">
          AllTunes
        </div>
        <br></br>
        <div id="bodyText" title="bodyText" class="bodyText">
          Welcome to All Tunes, this is an application which allows multiple
          users to connect to a single room where the DJ controls all the music
          going on! To start, please connect your Spotify account to All Tunes
          below!
        </div>
        <br></br>
        <a href={this.login()} >
          <img
            src="https://texpatnyc.com/images/spotifyConnect.png"
            alt="Spotify connect button"
            width="292"
            height="51"
          ></img>
        </a>
      </section>
    );
  }
}

export default Index;
