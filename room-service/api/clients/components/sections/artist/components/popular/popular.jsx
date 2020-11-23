import React, { Component } from 'react';
import axios from '../../../../../axios';

import Song from './song';
import Artist from './artist';

import withUiActions from '../../../../../hoc/uiHoc';

class PopularTracks extends Component {
  state = {
    showAll: false
  };

  componentDidUpdate(prevProps) {
    if (prevProps.tracks !== this.props.tracks) {
      this.setState({ showAll: false });
    }
  }

  playTracks = offset => {
    const songs = this.props.tracks.map(i => i.uri);
    axios.put('/me/player/play', { uris: songs, offset: { position: offset } });
  };

  renderSongs() {
    const tracks = this.props.tracks;
    const items = this.state.showAll ? tracks : tracks.slice(0, 5);
    return items.map((i, key) => (
      <Song
        item={i}
        index={key + 1}
        key={key}
        playTrack={() => this.playTracks(key)}
      />
    ));
  }

  renderArtists() {
    const artists = this.props.artists;
    const items = this.state.showAll
      ? artists.slice(0, 8)
      : artists.slice(0, 4);
    return items.map((a, key) => (
      <Artist
        artist={a}
        key={key}
        onClick={() => this.props.onArtistClick(a.id)}
      />
    ));
  }

  toddleHandler = () => {
    this.setState(prevState => ({ showAll: !prevState.showAll }));
  };

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <div>
          <p>Popular</p>
          <div>{this.renderSongs()}</div>
          {this.props.tracks
            ? this.props.tracks.length === 10 && (
                <button onClick={this.toddleHandler}>
                  {this.state.showAll ? 'Show only 5 songs' : 'Show 5 more'}
                </button>
              )
            : null}
        </div>
      </div>
    );
  }
}

export default withUiActions(PopularTracks);
