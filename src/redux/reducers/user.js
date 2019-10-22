import {SAVE_USER_TOKEN, REMOVE_USER_TOKEN} from '../action-types'

const _user =  JSON.parse(localStorage.getItem('user_key') || '{}')
const _token = localStorage.getItem('token_key')
const initUser = {
  user:_user,
  token:_token,
  hasLogin:_user._id && _token
}
export default function user(state=initUser,action){
  switch (action.type) {
    case SAVE_USER_TOKEN:
      console.log(1)
      const {user,token} = action.data
      return {
        user,
        token,
        hasLogin:true
      }
    case REMOVE_USER_TOKEN:
        return {
          user:{},
          token:'',
          hasLogin:false
        }
    default:return state
      break;
  }
}
