import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';


//Higher order component 'withPlayer' which returns a class component. Before these two were separate, now they're within one.
//We connect the websocket, build the contols then send these controls as a wrapped component. 
//We export the redux connect hoc, and we need to compose both withplayer and connected the wrapped componenet.
//this is then sent over to songsPlayer
function withPlayer(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);

      const wsUrl =
        process.env.NODE_ENV == 'development' ? 'ws://localhost:8888' : 'ws://' + props.roomIp;

      this.ws = new WebSocket(wsUrl);
    }

    shouldComponentUpdate(nextProps) {
      return nextProps.playing || (this.props.playing && !nextProps.playing);
    }

    componentDidUpdate(prevProps) {
      if (prevProps.currentSong.id !== this.props.currentSong.id) {
        const id = this.props.currentSong.id;
        const other = this.props.currentSong.linked_from
          ? this.props.currentSong.linked_from.id
          : null;
        this.props.containsCurrentSong(other ? `${id},${other}` : id);
      }
    }

    nextSong = (skip) => {
      this.ws.send("SkipRequest");
    };

    previousSong = (prev) => {
      this.ws.send("PreviousRequest");
    };

    pauseSong = (pause) => {
      this.ws.send("PauseRequest");
    };

    playTracks = (play) => {
      this.ws.send("PlayRequest");
    };

    seekSong = (seek) => {
      this.ws.send("SeekRequest");
    };

    render = () => (
      <WrappedComponent
        {...this.props}
        playContext={(uri, position_ms) => this.playTracks(uri, position_ms)}
        nextSong={this.nextSong}
        previousSong={this.previousSong}
        pauseSong={this.pauseSong}
        playTracks={this.playTracks}
        seekSong={this.seekSong}
      />
    );
  };
}

const mapStateToProps = (state) => {
  return {
    currentSong: state.playerReducer.status
      ? state.playerReducer.status.track_window.current_track
      : {},
    contains: state.libraryReducer.containsCurrent ? true : false,
    trackPosition: state.playerReducer.status ? state.playerReducer.status.position : 0,
    playing: state.playerReducer.status ? !state.playerReducer.status.paused : false,
  };
};

export default compose(withPlayer, connect(mapStateToProps));