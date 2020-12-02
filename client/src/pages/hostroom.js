import React from 'react';
import ReactDOM from 'react-dom';
import './room.css';

class App extends React.Component {
  render() {
    return (
      <section>
        <div class="main">
          <div id="titleText" title="titleText" class="titleText">AllTunes</div><br></br>
          <div><img src="https://i.imgur.com/4BUimGK.png" class="spotifyArt" title="spotifyArt" alt="album art"/></div><br></br>
          <div class="spotifyTrackInfo" title="spotifyTrackInfo">Track: Pain in My Chest - Artist: Ghostface666 - Album: Just a Rapper Wid Melodies</div><br></br>
          <div class="divider"></div><br></br>
          <button class='button'></button>
          <div class="queue">Queue
            <ul>
              <li>Track: Goat - Artist: Lil Tjay - Album: Goat (Single)</li><br></br>
              <li>Track: Moonwalking in Calabasas Remix - Artist: DDG, Blueface - Album: Moonwalking in Calabasas Remix (Single)</li><br></br>
              <li>...</li><br></br>
              <li>...</li><br></br>
              <li>...</li>
            </ul>
          </div>
        </div>
        <div class="menu">
          <div id="hostedBy" title="hostedBy" class="hostedBy">Hosted by: lowaaa</div><br></br>
          <div id="totalUsers" title="totalUsers" class="totalUsers">Total users: 0</div>
        </div>
        
      </section>
    );
  }
}


// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

