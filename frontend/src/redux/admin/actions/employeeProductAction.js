import api from "../../api";
import { ADD_PRODUCT_FAIL, ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DETAILS_EMPLOYE_PRODUCT_FAIL, DETAILS_EMPLOYE_PRODUCT_REQUEST, DETAILS_EMPLOYE_PRODUCT_SUCCESS, GET_EMPLOYE_PRODUCT_FAIL, GET_EMPLOYE_PRODUCT_REQUEST, GET_EMPLOYE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from "../constants/employeeProductConstants";

export const addProductAction = (product) => async (dispatch, getState) => {
    try {
        dispatch({type:ADD_PRODUCT_REQUEST})
        const {data} = await api.post("/products/add-product" , product,{
            headers:{
                authorization:  getState().employee.employeeLogin.token,
               }
           })
        dispatch({type:ADD_PRODUCT_SUCCESS})
   } catch (error) {
       dispatch({type:ADD_PRODUCT_FAIL, payload: error.message})     
    }
    }

    export const getEmployeProduct = () => async (dispatch) => {
        try {
            dispatch({type:GET_EMPLOYE_PRODUCT_REQUEST})
            const {data} = await api.get("/products")
            dispatch({type:GET_EMPLOYE_PRODUCT_SUCCESS,  payload: data.result.data })
        } catch (error) {
            dispatch({type:GET_EMPLOYE_PRODUCT_FAIL,payload: error.message})
            
        }
    }

    

    export const updateEmployeProduct = ( id,editdata) => async (dispatch, getState) => {
        try {
            dispatch({type:UPDATE_PRODUCT_REQUEST})
            const {data} = await api.put(`/products/update-data/${id}`, editdata,{
                headers:{
                    authorization:  getState().employee.employeeLogin.token,
                   }
                })
                console.warn(data);
            dispatch({type:UPDATE_PRODUCT_SUCCESS, payload:data.result})
        } catch (error) {
            console.log(error);
            dispatch({type:UPDATE_PRODUCT_FAIL,  payload:error.response.data.message || error.message})
            
        }
    }

    export const deleteEmployeProduct = (productId) => async (dispatch,getState) => {
        try {
            dispatch({type:DELETE_PRODUCT_REQUEST})
            const {data} = await api.delete(`/products/delete/${productId}`,{
                headers:{
                    authorization:  getState().employee.employeeLogin.token,
                   }
                })
                console.error(data);
            dispatch({type:DELETE_PRODUCT_SUCCESS,payload:data})
        } catch (error) {
            dispatch({type:DELETE_PRODUCT_FAIL,  payload: error.message})
            
        }
    }
