import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  setStatus,
  setDeviceId,
  setActiveDevice,
} from "../../dataHandler/store/actions/spotify";

function WebPlayback(props) {
  const playerName = "Alltunes App";
  const playerAutoConnect = true;
  let statePollingInterval;
  let deviceSelectedInterval;
  let webPlaybackInstance;

  async function handleState(state) {
    if (state) {
      props.setStatus(state);
    } else {
      clearStatePolling();
      await waitForDeviceToBeSelected();
    }
  }

  function waitForSpotify() {
    return new Promise((resolve) => {
      if ("Spotify" in window) {
        resolve();
      } else {
        window.onSpotifyWebPlaybackSDKReady = () => {
          resolve();
        };
      }
    });
  }

  function waitForDeviceToBeSelected() {
    return new Promise((resolve) => {
      deviceSelectedInterval = setInterval(() => {
        if (webPlaybackInstance) {
          webPlaybackInstance.getCurrentState().then((state) => {
            if (state !== null) {
              clearInterval(deviceSelectedInterval);
              resolve(state);
            }
          });
        }
      });
    });
  }

  function clearStatePolling() {
    clearInterval(statePollingInterval);
  }

  async function setupWebPlaybackEvents() {
    let { Player } = window.Spotify;

    webPlaybackInstance = new Player({
      name: playerName,
      getOAuthToken: async (callback) => {
        if (typeof props.access_token !== "undefined") {
          let userAccessToken = await props.access_token;
          callback(userAccessToken);
        }
      },
    });

    webPlaybackInstance.on("initialization_error", (e) => {
      console.log(e);
    });

    webPlaybackInstance.on("authentication_error", (e) => {
      console.log(e);
    });

    webPlaybackInstance.on("account_error", (e) => {
      console.log(e);
    });

    webPlaybackInstance.on("playback_error", (e) => {
      console.log(e);
    });

    webPlaybackInstance.on("player_state_changed", async (state) => {
      await handleState(state);
    });

    webPlaybackInstance.on("ready", (data) => {
      props.setDeviceId(data.device_id);
      props.setActiveDevice(data.device_id);
    });

    if (playerAutoConnect) {
      webPlaybackInstance.connect();
    }
  }

  function setupWaitingForDevice() {
    return new Promise((resolve) => {
      webPlaybackInstance.on("ready", (data) => {
        resolve(data);
      });
    });
  }

  useEffect(() => {
    const init = async () => {
      await waitForSpotify();
      await setupWebPlaybackEvents();
      await setupWaitingForDevice();
      await waitForDeviceToBeSelected();
    };
    init()
  }, []);

  return <Fragment>{props.children}</Fragment>;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { setDeviceId, setActiveDevice, setStatus },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(WebPlayback);
