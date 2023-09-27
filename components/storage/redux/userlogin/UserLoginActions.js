import {USER_LOGIN_SET_INFO, USER_LOGIN_REMOVE_INFO} from '../ActionTypes';

export function setUserLoginInfo(userInfo) {
  return {
    type: USER_LOGIN_SET_INFO,
    payload: userInfo,
  };
}

export function setUserSignOut() {
  return {
    type: USER_LOGIN_REMOVE_INFO,
  };
}
