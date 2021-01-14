export const playlistReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CONTAINS_CURRENT_SUCCESS':
      return {
        ...state,
        containsCurrent: action.contains.data.includes(true)
      };
    default:
      return state;
  }
};

export default playlistReducer;
