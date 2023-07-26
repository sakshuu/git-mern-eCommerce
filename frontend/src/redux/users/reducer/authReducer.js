import { FORGET_PASSWORD_FAIL, FORGET_PASSWORD_REQUEST, FORGET_PASSWORD_SUCCESS, LOGIN_WITH_GOOGLE_FAIL, LOGIN_WITH_GOOGLE_REQUEST, LOGIN_WITH_GOOGLE_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constans/authConstants"

 export const authReducer = (state = {}, {type, payload}) => {

    switch (type) {

        case  USER_REGISTER_REQUEST: return {
            loading: true
        }
        case USER_REGISTER_SUCCESS: return {
            
    loading: false,
    userRegister: true
}
case USER_REGISTER_FAIL: return {
    
    loading: false,
    userRegisterError: payload
}

case  USER_LOGIN_REQUEST: return {
    
    loading: true
}
case USER_LOGIN_SUCCESS: return {
    
    loading: false,
    userLogin: payload
}

case USER_LOGIN_FAIL: return {
    
    loading: false,
    userLoginError: payload
}
case  LOGIN_WITH_GOOGLE_REQUEST: return {
    
    loading: true
}
case LOGIN_WITH_GOOGLE_SUCCESS: return {
    
    loading: false,
    userLogin: payload
}

case LOGIN_WITH_GOOGLE_FAIL: return {
    
    loading: false,
    userLoginError: payload
}
case  FORGET_PASSWORD_REQUEST: return {
    
    loading: true
}
case FORGET_PASSWORD_SUCCESS: return {
    
    loading: false,
    userLogin: payload
}

case FORGET_PASSWORD_FAIL: return {
    
    loading: false,
    userLoginError: payload
}
case  RESET_PASSWORD_REQUEST: return {
    
    loading: true
}
case RESET_PASSWORD_SUCCESS: return {
    
    loading: false,
    userLogin: payload
}

case RESET_PASSWORD_FAIL: return {
    
    loading: false,
    userLoginError: payload
}

case USER_LOGOUT: return {}

default: return state 
}}

export const getUserAuthData = state => state.auth