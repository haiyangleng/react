import {INCREMENT,DECREMENT}from './action-types'
import {combineReducers} from 'redux'
function count(state=1,action){
    switch(action.type){
      case INCREMENT:return state + action.data;
      break;
      case DECREMENT:return state - action.data;
      break;
      default:return state;
      break;
    }
}
function number(state=1,action){
  switch(action.type){
    case INCREMENT:return state + action.data;
    break;
    case DECREMENT:return state - action.data;
    break;
    default:return state;
    break;
  }
}
export default combineReducers({
  count,number
})