import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setToken } from './store/actions/sessionActions';
import { fetchUser } from './store/actions/userActions';

import CurrPlaying from './containers/currPlaying/currPlaying';
import MainSection from './containers/mainSection/mainSection';

import Login from './spotify/login';
import WebPlaybackReact from './spotify/webPlayback';

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
      <div>
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
