import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
  render() {
    return (
      <section>
        <div class="main">
          <div id="titleText" title="titleText" class="titleText">AllTunes</div><br></br>
          <div><img src="https://i.imgur.com/4BUimGK.png" class="spotifyArt" title="spotifyArt" alt="album art"/></div><br></br>
          <div class="spotifyTrackInfo" title="spotifyTrackInfo">Track: Pain in My Chest - Artist: Ghostface666 - Album: Just a Rapper Wid Melodies</div>
        </div>
        <div class="menu">
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

