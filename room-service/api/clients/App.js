import React, { Component } from 'react';
import { connect } from 'react-redux';
import {setToken, fetchUser} from './store/actions/spotify';
import CurrPlaying from './containers/currPlaying/currPlaying';
import MainSection from './containers/mainSection/mainSection';
import Login from './components/spotify/login';
import WebPlaybackReact from './components/spotify/webPlayback';
import './App.css';

window.onSpotifyWebPlaybackSDKReady = () => {};

class App extends Component {
  state = {
    playerLoaded: false
  };

  componentDidMount() {
    const token = Login.getToken();
    if (!token) {
      Login.logInWithSpotify();
    } else {
      this.setState({ token: token });
      this.props.setToken(token);
      this.props.fetchUser();
    }
  }

  render() {
    let webPlaybackSdkProps = {
      playerName: 'Alltunes App',
      playerRefreshRateMs: 1000,
      playerAutoConnect: true,
      onPlayerRequestAccessToken: () => this.state.token,
      onPlayerLoading: () => {},
      onPlayerWaitingForDevice: () => {
        this.setState({ playerLoaded: true });
      },
      onPlayerError: e => {
        console.log(e);
      },
      onPlayerDeviceSelected: () => {
        this.setState({ playerLoaded: true });
      }
    };

    return (
      <div class="main">
        <WebPlaybackReact {...webPlaybackSdkProps}>
            <CurrPlaying />
            <MainSection />
        </WebPlaybackReact>
      </div>
      
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.sessionReducer.token
  };
};

const mapDispatchToProps = dispatch => ({
  setToken: token => dispatch(setToken(token)),
  fetchUser: () => dispatch(fetchUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
