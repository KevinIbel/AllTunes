import axios from '../../../axios';

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

export const nextSong = () => {
  axios.post('/me/player/next');
  return {
    type: 'CHANGE_SONG'
  };
};

export const previousSong = () => {
  axios.post('/me/player/previous');
  return {
    type: 'CHANGE_SONG'
  };
};

export const playSong = (context = false, offset) => {
  if (context && offset) {
    axios.put('/me/player/play', {
      context_uri: context,
      offset: { position: offset }
    });
  } else {
    if (context) {
      axios.put('/me/player/play', {
        context_uri: context
      });
    } else {
      axios.put('/me/player/play');
    }
  }
  return {
    type: 'PLAY_STATE'
  };
};

export const playTracks = (tracks, offset) => {
  axios.put('/me/player/play', {
    uris: tracks,
    offset: { position: offset }
  });
  return {
    type: 'PLAY_STATE'
  };
};

export const pauseSong = () => {
  axios.put('/me/player/pause');
  return {
    type: 'PAUSE_STATE'
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
