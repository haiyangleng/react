import {
  DECREMENT,
  INCREMENT
} from '../action-types'
const initCount = 1;
export default function count(state = initCount,action){
  switch(action.type){
    case INCREMENT:
      return state + action.data;
      break;
    case DECREMENT:
        return state - action.data;
        break;
    default:
      return state;
      break;
  }
}