import {combineReducers} from 'redux';
import VideoPBReducer from './videoplayback/VideoPBReducer';
import UserLoginReducer from './userlogin/UserLoginReducer';

export default combineReducers({
  VideoPBReducer,
  UserLoginReducer,
});
