import axios from '../../axios';

const fetchArtistPending = () => {
  return {
    type: 'FETCH_ARTIST_PENDING'
  };
};

const fetchArtistSuccess = artist => {
  return {
    type: 'FETCH_ARTIST_SUCCESS',
    artist
  };
};

const fetchArtistError = () => {
  return {
    type: 'FETCH_ARTIST_ERROR'
  };
};


export const fetchArtist = id => {
  return async dispatch => {
    dispatch(fetchArtistPending());
    try {
      const artist = await axios.get(`/artists/${id}`);
      const result = {
        ...artist.data   
         };
      dispatch(fetchArtistPopular(id));
      dispatch(fetchArtistAlbums(id));
      dispatch(fetchArtistSuccess(result));
    } catch (error) {
      dispatch(fetchArtistError());
      return error;
    }
  };
};

export const fetchArtistAlbums = id => {
  return async dispatch => {
    try {
      const albums = await axios.get(`/artists/${id}/albums`);
      const result = {
        albums: albums.data.items.filter(i => i.album_type === 'album'),
        singles: albums.data.items.filter(i => i.album_type === 'single')
      };
      dispatch(fetchAlbumsSuccess(result));
    } catch (error) {
      return error;
    }
  };
};

const fetchAlbumsSuccess = albums => {
  return {
    type: 'FETCH_ALBUMS_SUCCESS',
    albums
  };
};

export const fetchArtistPopular = id => {
  return async (dispatch, getState) => {
    try {
      const country = getState().userReducer.user.country;
      const popular = await axios.get(
        `/artists/${id}/top-tracks?country=${country}`
      );
      const relatedArtist = await axios.get(`/artists/${id}/related-artists`);
      dispatch(
        fetchPopularSuccess({
          popularTracks: popular.data.tracks,
          relatedArtists: relatedArtist.data.artists
        })
      );
    } catch (error) {
      return error;
    }
  };
};

const fetchPopularSuccess = popular => {
  return {
    type: 'FETCH_POPULAR_SUCCESS',
    popular
  };
};
