import {  EMPLOYEE_GET_STAT_FAIL, EMPLOYEE_GET_STAT_REQUEST, EMPLOYEE_GET_STAT_SUCCESS, EMPLOYEE_LOGIN_FAIL, EMPLOYEE_LOGIN_REQUEST, EMPLOYEE_LOGIN_SUCCESS, EMPLOYEE_LOGOUT, EMPLOYEE_REGISTER_FAIL, EMPLOYEE_REGISTER_REQUEST, EMPLOYEE_REGISTER_SUCCESS } from "../constants/employeeConstants"

export const employeeReducer = (state = {}, {type, payload}) => {

    switch (type) {
        case EMPLOYEE_REGISTER_REQUEST: return {
            ...state,
            loading: true,

        }
        case EMPLOYEE_REGISTER_SUCCESS: return {
            ...state,
            loading: false,
            employeeRgisterd: true
        }
        case EMPLOYEE_REGISTER_FAIL: return {
            ...state,
            loading: false,
            employeeRgisterdError: payload
        }
        case EMPLOYEE_LOGIN_REQUEST: return {
            ...state,
            loading: true,

        }
        case EMPLOYEE_LOGIN_SUCCESS: return {
            ...state,
            loading: false,
            employeeLogin: payload
          
        }
        case EMPLOYEE_LOGIN_FAIL: return {
            ...state,
            loading: false,
            employeeLoginError: payload
        }
        case EMPLOYEE_LOGOUT : return { }
       
        case EMPLOYEE_GET_STAT_REQUEST: return {
            ...state,
            loading: true,
        }
        case EMPLOYEE_GET_STAT_SUCCESS: return {
            ...state,
            loading: false,
            stats: payload
          
        }
        case EMPLOYEE_GET_STAT_FAIL: return {
            ...state,
            loading: false,
            statsError: payload
        }
       
         
        default: return state
            
    }
 }

export const getemployeeData = state => state.employee