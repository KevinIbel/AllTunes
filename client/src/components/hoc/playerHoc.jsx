import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

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
      this.ws.send(JSON.stringify({ type: 'skipSong', data: skip }));
    };

    previousSong = (prev) => {
      this.ws.send(JSON.stringify({ type: 'previousSong', data: prev }));
    };

    pauseSong = (pause) => {
      this.ws.send(JSON.stringify({ type: 'pauseSong', data: pause }));
    };

    playSong = (play) => {
      this.ws.send(JSON.stringify({ type: 'playSong', data: play }));
    };

    seekSong = (seek) => {
      this.ws.send(JSON.stringify({ type: 'seekSong', data: seek }));
    };

    render = () => (
      <WrappedComponent
        {...this.props}
        playContext={(context, offset) => this.playSong(context, offset)}
        nextSong={this.nextSong}
        previousSong={this.previousSong}
        pauseSong={this.pauseSong}
        playSong={this.playSong}
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