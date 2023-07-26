import api from "../../api"
import { FORGET_PASSWORD_FAIL, FORGET_PASSWORD_REQUEST, FORGET_PASSWORD_SUCCESS, LOGIN_WITH_GOOGLE_FAIL, LOGIN_WITH_GOOGLE_REQUEST, LOGIN_WITH_GOOGLE_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constans/authConstants"

export const userRegisterAction = (UserData) => async dispatch => {
try {
    dispatch({type:USER_REGISTER_REQUEST})
    const {data} = await api.post("/user/register", UserData)
    dispatch({type:USER_REGISTER_SUCCESS, payload:data})
} catch (error) {
    dispatch({type:USER_REGISTER_FAIL, payload: error.response.data.message || error.message})    
}
}

export const UserLoginAction = (loginData) => async dispatch => {
try {
    dispatch({type:USER_LOGIN_REQUEST})
    const {data: {result}} = await api.post("/auth/user/login", loginData)

    const bt = `Bearer ${result.token}`
    const data = { ...result, token: bt}

    localStorage.setItem("auth", JSON.stringify({
        userLogin :data
    }))

    dispatch({type:USER_LOGIN_SUCCESS, payload: data})
} catch (error) {
    console.log(error);
    dispatch({type:USER_LOGIN_FAIL, payload: error.response.data.message || error.message})
}
}

export const UserLoginWithGoogle = (loginData) => async dispatch => {
try {
    dispatch({type:LOGIN_WITH_GOOGLE_REQUEST})
    const {data: {result}} = await api.post("/auth/user/login-with-google", loginData)
    const bt = `Bearer ${result.token}`
    const data = { ...result, token: bt}
    localStorage.setItem("auth", JSON.stringify({
        userLogin :data
    }))
    dispatch({type:LOGIN_WITH_GOOGLE_SUCCESS, payload: data})
} catch (error) {
    console.log(error);
    dispatch({type:LOGIN_WITH_GOOGLE_FAIL, payload: error.response.data.message || error.message})
}}

export const UserforgetPassword = forgetPas => async dispatch => {
    try {
        dispatch({type:FORGET_PASSWORD_REQUEST})
        const {data} = await api.post("/auth/forget", {email:forgetPas})
    
        dispatch({type:FORGET_PASSWORD_SUCCESS , payload:data.result})
    } catch (error) {
        dispatch({type:FORGET_PASSWORD_FAIL, payload: error.response.data.message || error.message})
    }
    }

export const UserResetPassword = (id) => async dispatch => {
    try {
        dispatch({type:RESET_PASSWORD_REQUEST})
        const {data} = await api.post(`/auth/reset-password/${id}`, id)
    
        dispatch({type:RESET_PASSWORD_SUCCESS , payload:data.result})
    } catch (error) {
        dispatch({type:RESET_PASSWORD_FAIL, payload: error.response.data.message || error.message})
    }
    }


export const userLogoutAction = () => dispatch => {
    dispatch({type: USER_LOGOUT})
    localStorage.removeItem("auth")
}