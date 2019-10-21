import {DECREMENT,INCREMENT} from './action-types'
export default function count(state=1,action){
  switch(action.type){
    case 'INCREMENT' :return state + action.data;
    break;
    case 'DECREMENT' :return state - action.data;
    break;
    default:return state;
    break;
  }
}