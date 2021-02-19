import axios from './axios';

export const setToken = token => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  localStorage.setItem('token', token);
  return {
    type: 'SET_TOKEN',
    token
  };
};

export const setActiveDevice = id => {
  axios.put('/me/player', { device_ids: [id], play: false });
  return { type: 'SET_DEVICE' };
};

export const setDeviceId = id => {
  return {
    type: 'SET_DEVICE_ID',
    id
  };
};

export const setStatus = status => {
  return {
    type: 'FETCH_STATUS_SUCCESS',
    status
  };
};

export const nextSong = (uri) => {
  axios.post('/me/player/next', {
    uri: uri,
  });
  return {
    type: 'CHANGE_SONG',
  };
};

export async function progressMS() {
 
  try {
    const response = await axios.get(`/me/player/currently-playing?market=GB`);
  console.log("LET'S GET PROGRESS_MS" + JSON.stringify(response.data.progress_ms));
  return response.data.progress_ms;
  }catch (error) {
    return error;
  }  

};
  

export const previousSong = ms => {
  axios.put(`/me/player/seek?position_ms=${ms}`);
  return {
    type: 'CHANGE_SONG',


  };
};

export const playSong = (uri, position_ms) => {
  if (uri && position_ms) {
    axios.put('/me/player/play', {
      uri: uri,
      position_ms : position_ms
    });
  } else {
    if (uri) {
      axios.put('/me/player/play', {
        uri: uri
      });
    } else {
      axios.put('/me/player/play');
    }
  }
  return {
    type: 'PLAY_STATE'
  };
};
//test gitlabbug
export const playTracks = (uri, position_ms) => {
  console.log("AXIOS SPOTIFY:" + JSON.stringify(uri) + JSON.stringify(position_ms));

  axios.put('/me/player/play', {
    uris: uri,
    position_ms: position_ms
  });
  return {
    type: 'PLAY_STATE'
  };
};

export const pauseSong = () => {
  axios.put('/me/player/pause');
  return {
    type: 'PAUSE_STATE',
  };
};

export const seekSong = ms => {
  axios.put(`/me/player/seek?position_ms=${ms}`);
  return {
    type: 'SEEK_SONG'
  };
};

const fetchUserSuccess = user => {
  return {
    type: 'FETCH_USER_SUCCESS',
    user
  };
};

const fetchUserError = () => {
  return {
    type: 'FETCH_USER_ERROR'
  };
};

export const fetchUser = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/me');
      dispatch(fetchUserSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(fetchUserError());
      return error;
    }
  };
};
