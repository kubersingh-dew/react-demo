import {USER_LOGIN_SET_INFO, USER_LOGIN_REMOVE_INFO} from '../ActionTypes';

export const initialLoginState = {
  IsLogin: false,
  data: {},
};
const UserLoginReducer = (state = initialLoginState, action) => {
  switch (action.type) {
    case USER_LOGIN_SET_INFO: {
      let info = {IsLogin: true, data: action.payload};
      return info;
    }
    case USER_LOGIN_REMOVE_INFO: {
      let info = {IsLogin: false, data: {}};
      return info;
    }
    default:
      return state;
  }
};

export default UserLoginReducer;
