import { GET_USER_PROFILE_FAIL, GET_USER_PROFILE_REQUEST, GET_USER_PROFILE_SUCCESS, UPDATE_USER_PROFILE_FAIL, UPDATE_USER_PROFILE_REQUEST, UPDATE_USER_PROFILE_SUCCESS } from "../constans/userConstants"

 
 export const userReducer = (state = {}, {type, payload}) => {
 switch (type) {
    case  UPDATE_USER_PROFILE_REQUEST: return {
        ...state,
        loading: true
    }
    
    case UPDATE_USER_PROFILE_SUCCESS: return {
        ...state,
        loading: false,
        toggle: !state.toggle
    }

    case  UPDATE_USER_PROFILE_FAIL: return {
        ...state,
        loading: false,
     error: payload
    }

  
    case  GET_USER_PROFILE_REQUEST: return {
        ...state,
        loading: true
    }
    
    case GET_USER_PROFILE_SUCCESS: return {
        ...state,
        loading: false,
        profile: payload
    }

    case  GET_USER_PROFILE_FAIL: return {
        ...state,
        loading: false,
     error: payload
    }

  
    default: return state
        
 }
}

export const getUserData = state => state.user