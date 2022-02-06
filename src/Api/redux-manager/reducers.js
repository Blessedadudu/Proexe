import { ADD_TO_LIST, REMOVE_FROM_LIST, CLEAR_ALL_LIST, ADD_NEW_LIST } from './constants'


  const initialStateList = {
    items: [],
    reload: false
  }
  
  export const userLists = ( state = initialStateList, action) => {
    if (action.type === ADD_TO_LIST) {
      console.log("calledddd", 'action.payloadaction.payload')
      return { ...state, items: action.payload };
    }


    if (action.type === ADD_NEW_LIST) {
      console.log(action.payload, 'action.payloadaction.payload')
      return { ...state, items: [...state.items, action.payload] };
    }


    if (action.type === REMOVE_FROM_LIST) {
      return { ...state, items: action.payload };
    }

    if (action.type === CLEAR_ALL_LIST) {
      return { ...state, items: [] };
    }

    return state;
  }

  const initialLoginState = {
    login: false
  }

  export const LoginUsers = (state=initialLoginState, action={}) => {
   
    return state
  }



