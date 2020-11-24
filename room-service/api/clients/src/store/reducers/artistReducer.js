export const playlistReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_ARTIST_PENDING':
      return {
        ...state,
        fetchArtistPending: true
      };

    case 'FETCH_ARTIST_SUCCESS':
      return {
        ...state,
        currentArtist: action.artist,
        fetchArtistError: false,
        fetchArtistPending: false
      };

    case 'FETCH_ARTIST_ERROR':
      return {
        ...state,
        fetchArtistError: true,
        fetchArtistPending: false
      };
    case 'FETCH_ALBUMS_SUCCESS':
      return {
        ...state,
        currentArtist: { ...state.currentArtist, ...action.albums }
      };
    case 'FETCH_POPULAR_SUCCESS':
      return {
        ...state,
        currentArtist: { ...state.currentArtist, ...action.popular }
      };


    default:
      return state;
  }
};

export default playlistReducer;
