import React from 'react';
import ReactDOM from 'react-dom';
import './room.css';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class userroom extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' }
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
    getNowPlaying(){
      spotifyApi.getMyCurrentPlaybackState()
        .then((response) => {
          this.setState({
            nowPlaying: {
                name: response.item.name, 
                albumArt: response.item.album.images[0].url
  
              }
          });
        })
    }
  
  render() {
    return (
      <section>
        <div class="container grid" ><div id="titleText" title="titleText" class="titleText">AllTunes</div></div>
        <div class = "vertical"></div>
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/>
        </div>
        <div>
          Now Playing: {  this.state.nowPlaying.name }
        </div>
        { this.state.loggedIn &&
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        }
        expect(linkElement).toBeInTheDocument();
      </section>
    );
  }
}


// ========================================

ReactDOM.render(
  <userroom />,
  document.getElementById('root')
);

