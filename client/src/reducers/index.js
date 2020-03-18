import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import navbar from './navbar';
import tickets from './tickets';

export default combineReducers({
  alert,
  auth,
  navbar,
  tickets
});
