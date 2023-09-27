import {ADD_VIDEO_TO_LIST, REMOVE_VIDEO_FROM_LIST} from '../ActionTypes';

/*const initialState = {
    items: [],
    count: 0
 }*/
const initialState = [];
const VideoPBReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_VIDEO_TO_LIST: {
      let isVideoExist = state.find(item => item.id === action.payload.id);
      if (isVideoExist === undefined) {
        return [...state, action.payload];
      } else {
        //findIndex
        return state;
      }
    }

    case REMOVE_VIDEO_FROM_LIST: {
      let isVideoExist = state.find(item => item.id === action.payload);
      if (isVideoExist === undefined) {
        return state;
      } else {
        let result = state.filter(item => {
          return item.id !== action.payload;
        });
        return [...result];
      }
    }

    default:
      return state;
  }
};
export default VideoPBReducer;
