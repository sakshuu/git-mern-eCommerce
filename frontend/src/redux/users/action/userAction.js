import api from "../../api"
import { GET_USER_PROFILE_FAIL, GET_USER_PROFILE_REQUEST, GET_USER_PROFILE_SUCCESS, UPDATE_USER_PROFILE_FAIL, UPDATE_USER_PROFILE_REQUEST, UPDATE_USER_PROFILE_SUCCESS } from "../constans/userConstants"

export const updateUserProfileAction = user => async (dispatch, getState) => {
    try {
     dispatch({type: UPDATE_USER_PROFILE_REQUEST})
     const {data} = await api.put(`/user/profile-update`, user, {
        headers:{
            authorization: getState().auth.userLogin.token
        }
     })
     dispatch({type: UPDATE_USER_PROFILE_SUCCESS})
 } catch (error) {
   const err = {
    status: error.response.status || 400,
    message: error.response.data.message || error.message
   }
        dispatch({type: UPDATE_USER_PROFILE_FAIL, payload: err})
    }
 }

export const getUserProfileAction = () => async (dispatch, getState) => {
    try {
     dispatch({type: GET_USER_PROFILE_REQUEST})
     const {data} = await api.get(`/user/profile`, {
        headers:{
            authorization: getState().auth.userLogin.token
        }
     })
     dispatch({type: GET_USER_PROFILE_SUCCESS, payload: data.result})
 } catch (error) {
    const err = {
        status: error.response.status || 400,
        message: error.response.data.message || error.message
       }
        dispatch({type: GET_USER_PROFILE_FAIL, payload: err})
    }
 }