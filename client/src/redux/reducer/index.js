import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import locationsReducers from './locationsReducers';

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  locations: locationsReducers,
});
