import { combineReducers } from 'redux';

import sessionReducer from './sessionReducer';
import userReducer from './userReducer';
import libraryReducer from './libraryReducer';
import uiReducer from './uiReducer';
import playerReducer from './playerReducer';

export default combineReducers({
  sessionReducer,
  userReducer,
  libraryReducer,
  uiReducer,
  playerReducer
});
