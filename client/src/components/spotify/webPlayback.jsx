import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { 
  setStatus,
  setDeviceId,
  setActiveDevice 
 } from '../../dataHandler/store/actions/spotify';


class WebPlayback extends Component {
  deviceSelectedInterval = null;
  statePollingInterval = null;
  webPlaybackInstance = null;

  state = {
    playerReady: false,
    playerSelected: false
  };

  async handleState(state) {
    if (state) {
      this.props.setStatus(state);
    } else {
      this.clearStatePolling();
      await this.waitForDeviceToBeSelected();
    }
  }

  waitForSpotify() {
    return new Promise(resolve => {
      if ('Spotify' in window) {
        resolve();
      } else {
        window.onSpotifyWebPlaybackSDKReady = () => {
          resolve();
        };
      }
    });
  }

  waitForDeviceToBeSelected() {
    return new Promise(resolve => {
      this.deviceSelectedInterval = setInterval(() => {
        if (this.webPlaybackInstance) {
          this.webPlaybackInstance.getCurrentState().then(state => {
            if (state !== null) {
              this.startStatePolling();
              clearInterval(this.deviceSelectedInterval);
              resolve(state);
            }
          });
        }
      });
    });
  }

  startStatePolling() {
    this.statePollingInterval = setInterval(async () => {
      let state = await this.webPlaybackInstance.getCurrentState();
      await this.handleState(state);
    }, this.props.playerRefreshRateMs || 1000);
  }

  clearStatePolling() {
    clearInterval(this.statePollingInterval);
  }

  async setupWebPlaybackEvents() {
    let { Player } = window.Spotify;

    this.webPlaybackInstance = new Player({
      name: this.props.playerName,
      getOAuthToken: async callback => {
        if (typeof this.props.onPlayerRequestAccessToken !== 'undefined') {
          let userAccessToken = await this.props.onPlayerRequestAccessToken();
          callback(userAccessToken);
        }
      }
    });

    this.webPlaybackInstance.on('initialization_error', e => {
      this.props.onPlayerError(e.message);
    });

    this.webPlaybackInstance.on('authentication_error', e => {
      this.props.onPlayerError(e.message);
    });

    this.webPlaybackInstance.on('account_error', e => {
      this.props.onPlayerError(e.message);
    });

    this.webPlaybackInstance.on('playback_error', e => {
      this.props.onPlayerError(e.message);
    });

    this.webPlaybackInstance.on('player_state_changed', async state => {
      await this.handleState(state);
    });

    this.webPlaybackInstance.on('ready', data => {
      this.props.setDeviceId(data.device_id);
      this.props.setActiveDevice(data.device_id);
    });

    if (this.props.playerAutoConnect) {
      this.webPlaybackInstance.connect();
    }
  }

  setupWaitingForDevice() {
    return new Promise(resolve => {
      this.webPlaybackInstance.on('ready', data => {
        resolve(data);
      });
    });
  }

  async componentWillMount() {
    this.props.onPlayerLoading();
    await this.waitForSpotify();
    await this.setupWebPlaybackEvents();
    let device_data = await this.setupWaitingForDevice();
    this.props.onPlayerWaitingForDevice(device_data);
    await this.waitForDeviceToBeSelected();
    this.props.onPlayerDeviceSelected();
  }

  render() {
    return <Fragment>{this.props.children}</Fragment>;
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { setDeviceId, setActiveDevice, setStatus },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(WebPlayback);