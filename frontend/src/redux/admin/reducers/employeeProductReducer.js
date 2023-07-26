import { ADD_PRODUCT_FAIL, ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DETAILS_EMPLOYE_PRODUCT_FAIL, DETAILS_EMPLOYE_PRODUCT_REQUEST, DETAILS_EMPLOYE_PRODUCT_SUCCESS, GET_EMPLOYE_PRODUCT_FAIL, GET_EMPLOYE_PRODUCT_REQUEST, GET_EMPLOYE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from "../constants/employeeProductConstants"

 export const employeeproductReducer = (state = {
     employeeProduct :[]
    }, {type, payload}) => {
        
 switch (type) {
    
    case  ADD_PRODUCT_REQUEST: return {
        ...state,
        loading: true
    }
    case ADD_PRODUCT_SUCCESS: return {
        ...state,
        loading: false,
       addproduct: true
    }
    case ADD_PRODUCT_FAIL: return {
        ...state,
        loading: false,
        addproductError: payload
    }

    case  GET_EMPLOYE_PRODUCT_REQUEST: return {
        ...state,
        loading: true
    }
    case GET_EMPLOYE_PRODUCT_SUCCESS: return {
        ...state,
        loading: false,
        employeeProduct: payload,
    }
    case GET_EMPLOYE_PRODUCT_FAIL: return {
        ...state,
        loading: false,
        productError: payload
    }


    case  DETAILS_EMPLOYE_PRODUCT_REQUEST: return {
        ...state,
        loading: true
    }
    case DETAILS_EMPLOYE_PRODUCT_SUCCESS: return {
        ...state,
        loading: false,
       singleEmployeProducts: payload
    }
    case DETAILS_EMPLOYE_PRODUCT_FAIL: return {
        ...state,
        loading: false,
        singleproductError: payload
    }


    case  UPDATE_PRODUCT_REQUEST: return {
        ...state,
        loading: true
    }
    case UPDATE_PRODUCT_SUCCESS: return {
        ...state,
        loading: false,
       productEdit: true
    }
    case UPDATE_PRODUCT_FAIL: return {
        ...state,
        loading: false,
        productUpdateError: payload
    }

    
    case  DELETE_PRODUCT_REQUEST: return {
        ...state,
        loading: true
    }
    case DELETE_PRODUCT_SUCCESS: return {
        ...state,
        loading: false,
       productDelete: true
    }
    case DELETE_PRODUCT_FAIL: return {
        ...state,
        loading: false,
        productDeleteError: payload
    }
    default: return state  
 }
}

export const employeeproducts = state => state.allemployeeProducts