import api from "../../api"
import { GET_ALL_USERS_FAIL, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, UPDATE_USER_STATUS_FAIL, UPDATE_USER_STATUS_REQUEST, UPDATE_USER_STATUS_SUCCESS } from "../constants/userConstants"

export const adminUserAction = () => async (dispatch,getState) => {
    try {
        dispatch({type:GET_ALL_USERS_REQUEST})
        const {data} = await api.get("/employee/users",{
            headers:{
                authorization:  getState().employee.employeeLogin.token,
               }
        })
        dispatch({type:GET_ALL_USERS_SUCCESS,  payload: data.result })
    } catch (error) {
        dispatch({type:GET_ALL_USERS_FAIL,payload: error.message})
        
    }
}


export const updateUserStatusAction = ( user) => async (dispatch, getState) => {
    try {
        dispatch({type:UPDATE_USER_STATUS_REQUEST})
        const {data} = await api.put(`/employee/users/status/${user._id}`,
        user, {
            headers:{
                authorization:  getState().employee.employeeLogin.token,
               }
            })
            console.warn(data);
        dispatch({type:UPDATE_USER_STATUS_SUCCESS, payload:data.result})
    } catch (error) {
        console.log(error);
        dispatch({type:UPDATE_USER_STATUS_FAIL,  payload:error.response.data.message || error.message})
        
    }
}
