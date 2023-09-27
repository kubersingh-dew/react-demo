import {ADD_VIDEO_TO_LIST, REMOVE_VIDEO_FROM_LIST} from '../ActionTypes';

export function addVideoPBAction(item) {
  return {
    type: ADD_VIDEO_TO_LIST,
    payload: item,
  };
}

export function removeVideoPBAction(id) {
  return {
    type: REMOVE_VIDEO_FROM_LIST,
    payload: id,
  };
}
