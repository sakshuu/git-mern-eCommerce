import {  PRODUCT_GET_REQUEST, PRODUCT_GET_SUCCESS, PRODUCT_GET_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL} from "../constans/productConstants";
 
 export const productReducer = (state = { products :[], singleProducts:{}}, {type, payload}) => {
 switch (type) {
    case PRODUCT_GET_REQUEST: return {
        ...state,
        loading: true
    }
    
    case PRODUCT_GET_SUCCESS: return {
        ...state,
        products: payload,
        loading: false
    }

    case PRODUCT_GET_FAIL: return {
        ...state,
        loading: false,
     productsError: payload
    }

    case PRODUCT_DETAIL_REQUEST: return {
        ...state,
        loading: true
    }

    case PRODUCT_DETAIL_SUCCESS: return {
        ...state,
        loading: false,
        singleProducts: payload
    }

    case PRODUCT_DETAIL_FAIL: return {
        ...state,
        loading: false,
        singleProductsError: payload
    }

    default: return state
        
 }
}

export const getproducts = state => state.allProducts