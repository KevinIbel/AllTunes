export const playlistReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CONTAINS_CURRENT_SUCCESS':
      return {
        ...state,
        containsCurrent: action.contains.data.includes(true)
      };
    case 'REMOVE_SONG_SUCCESS':
      return {
        ...state,
        containsCurrent: action.current ? false : state.containsCurrent
      };
    case 'ADD_SONG_SUCCESS':
      return {
        ...state,
        containsCurrent: action.current ? true : state.containsCurrent
      };
    default:
      return state;
  }
};

export default playlistReducer;
