import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {nextSong, previousSong, pauseSong, playSong, seekSong} from '../../dataHandler/store/actions/spotify';
import { containsCurrentSong } from '../../dataHandler/store/actions/libraryActions';

export default function(ComposedComponent) {
  class PlayerHoc extends Component {
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

    /*
     useEffect(() => {
    const wsUrl =
   process.env.NODE_ENV == "development"
      ? "ws://localhost:8888"
       : "ws://" + props.roomIp;
  //  setWs(new WebSocket(wsUrl));
  //}, [props.roomIp]);

    mountRoomSockets = () => {
  
      // Listen if other users click play/pause/next
      socket.on('player action', ({ action, message }) => {
        if (action === 'play' || action === 'pause') {
          this.handlePlayPauseClick(action);
          this.displayStatusMessage(message);
        } else if (action === 'next') {
          this.displayStatusMessage(message);
        }
      });
  
      // Listen for the room's current song
      socket.on('room song', song => {
        this.setState({ roomSong: song });
      });
    };
  
    // Set statusMsg to display, then remove message after timeout
    displayStatusMessage = message => {
      this.setState({ statusMsg: message }, () => {
        setTimeout(() => {
          this.setState({ statusMsg: '' });
        }, 2000);
      });
    };
    */

    render = () => (
      <ComposedComponent
        {...this.props}
        playContext={(context, offset) => this.props.playSong(context, offset)}
        playSong={() => this.props.playSong()}
      />
    );
  }
//testbug
  const mapStateToProps = state => {
    return {
      currentSong: state.playerReducer.status
        ? state.playerReducer.status.track_window.current_track
        : {},
      contains: state.libraryReducer.containsCurrent ? true : false,
      trackPosition: state.playerReducer.status
        ? state.playerReducer.status.position
        : 0,
      playing: state.playerReducer.status
        ? !state.playerReducer.status.paused
        : false
    };
  };


  function nextSong(skip) {
    props.ws.send(JSON.stringify({ type: "skipSong", data: skip }))
  }
  function previousSong(prev) {
    props.ws.send(JSON.stringify({ type: "previousSong", data: prev }))
  }
  function pauseSong(pause) {
    props.ws.send(JSON.stringify({ type: "pauseSong", data: pause }))
  }
  function playSong(play) {
    props.ws.send(JSON.stringify({ type: "playSong", data: play }))
  }
  function seekSong(seek) {
    props.ws.send(JSON.stringify({ type: "seekSong", data: seek }))
  }

  const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        nextSong,
        previousSong,
        pauseSong,
        playSong,
        seekSong,
        containsCurrentSong
      },
      dispatch
    );
  };

  return connect(mapStateToProps,mapDispatchToProps)(PlayerHoc);
}
