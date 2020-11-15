import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
<<<<<<< HEAD

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class Index extends React.Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }
  
  render() {
    return (
      <section>
		    <div id="titleText" title="titleText" class="titleText">AllTunes</div>
		    <div id="bodyText" title="bodyText" class="bodyText">Welcome to All Tunes, this is an application which allows multiple users to connect to a single room where the DJ controls all the music going on! To start, please connect your Spotify account to All Tunes below!</div>
		    <a href="http://localhost:8888/login"><img src="https://texpatnyc.com/images/spotifyConnect.png" alt="Spotify connect button" width="292" height="51"></img></a>
	    </section>
    );
  }
}


// ========================================
=======
import App from './components/App';
import * as serviceWorker from './serviceWorker';
>>>>>>> 5f8b1801a0e20f6392afcd4230a00b811f99edeb

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);

