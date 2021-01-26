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


