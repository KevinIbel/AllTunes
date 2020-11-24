import React, { Component } from 'react';
import Details from './components/details';
import SongsControl from './components/songsControl';
import Duration from './components/durationMs';
import withPlayer from '../../hoc/playerHoc';
import './playBx.css';
class playBx extends Component {
  toSeconds = ms => ms / 1000;

  render = () => {
    const position = this.toSeconds(this.props.trackPosition) || 0;
    const duration = this.props.currentSong
      ? this.toSeconds(this.props.currentSong.duration_ms)
      : 1;

    return (
      <div className="player-container">
        {this.props.currentSong.id ? (
          <Details
            ids={
              this.props.currentSong.linked_from.id
                ? `${this.props.currentSong.linked_from.id},${
                    this.props.currentSong.id
                  }`
                : this.props.currentSong.id
            }
            contains={this.props.contains}
            songName={this.props.currentSong.name || ''}
            album={this.props.currentSong.album.uri.split(':')[2]}
            artists={this.props.currentSong.artists || []}
          />
        ) : null}
        <SongsControl
          {...this.props}
        />
        <Duration
          isEnabled
          value={position / duration}
          position={position}
          duration={duration}
          onChange={value =>
            this.props.seekSong(Math.round(value * duration * 1000))
          }
        />
      </div>
    );
  };
}

export default withPlayer(playBx);
