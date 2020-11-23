import { combineReducers } from 'redux';

import sessionReducer from './sessionReducer';
import userReducer from './userReducer';
import playlistReducer from './playlistReducer';
import libraryReducer from './libraryReducer';
import uiReducer from './uiReducer';
import artistReducer from './artistReducer';
import albumReducer from './albumReducer';
import playerReducer from './playerReducer';
import searchReducer from './searchReducer';

export default combineReducers({
  sessionReducer,
  userReducer,
  playlistReducer,
  libraryReducer,
  uiReducer,
  artistReducer,
  albumReducer,
  playerReducer,
  searchReducer
});
