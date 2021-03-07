import axios from './axios';

const containsSongSuccess = contains => {
  return {
    type: 'CONTAINS_CURRENT_SUCCESS',
    contains: contains
  };
};


export const containsCurrentSong = id => {
  return async dispatch => {
    try {
      const response = await axios.get(`/me/tracks/contains?ids=${id}`);
      dispatch(containsSongSuccess(response, true));
      return response.data;
    } catch (error) {
      return error;
    }
  };
};


      // Make an API call to Spotify here
      const songProgressSuccess = progress_ms => {
        return {
          type: 'current_progress_ms',
          progress_ms: progress_ms
        };
      };
      
      export const progressMS = progress_ms => {
    
       
        axios.get(`/me/player/currently-playing`);
        return {
          progress_ms: progress_ms
        
          };
      };