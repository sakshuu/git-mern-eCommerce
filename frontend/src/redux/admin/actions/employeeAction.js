import api from "../../api"
import {  EMPLOYEE_GET_STAT_FAIL, EMPLOYEE_GET_STAT_REQUEST, EMPLOYEE_GET_STAT_SUCCESS, EMPLOYEE_LOGIN_FAIL, EMPLOYEE_LOGIN_REQUEST, EMPLOYEE_LOGIN_SUCCESS, EMPLOYEE_LOGOUT, EMPLOYEE_REGISTER_FAIL, EMPLOYEE_REGISTER_REQUEST, EMPLOYEE_REGISTER_SUCCESS } from "../constants/employeeConstants"

export const employeeRegisterAction = (employeeData) => async dispatch => {
    try {
        dispatch({type:EMPLOYEE_REGISTER_REQUEST})
         const {data} = await api.post("/admin/employee/register", employeeData)
        dispatch({type:EMPLOYEE_REGISTER_SUCCESS})
    } catch (error) {
        dispatch({type:EMPLOYEE_REGISTER_FAIL, payload: error.message})
        
    }
}

export const employeeLoginAction = (employeeLoginData) => async dispatch => {
    try {
        dispatch({type:EMPLOYEE_LOGIN_REQUEST})
         const {data} = await api.post("/auth/employee/login", employeeLoginData, {withCredentials: true})
         localStorage.setItem("employee", JSON.stringify({
            employeeLogin :data.result
        }))
        dispatch({type:EMPLOYEE_LOGIN_SUCCESS, payload: data.result})
    } catch (error) {
        dispatch({type:EMPLOYEE_LOGIN_FAIL, payload:error.message})
    }
}

export const employeeLogoutAction = e => async dispatch => {
    dispatch({type:EMPLOYEE_LOGOUT})
    localStorage.removeItem("employee")
}

export const employeeStatAction = () => async (dispatch,getState) => {
    try {
        dispatch({type:EMPLOYEE_GET_STAT_REQUEST})
         const {data} = await api.get("/employee/stat", {
             headers:{
            authorization:  getState().employee.employeeLogin.token,
           }
        })
        dispatch({type:EMPLOYEE_GET_STAT_SUCCESS, payload: data.result})
    } catch (error) {
        dispatch({type:EMPLOYEE_GET_STAT_FAIL, payload:error.message})
    }
}

