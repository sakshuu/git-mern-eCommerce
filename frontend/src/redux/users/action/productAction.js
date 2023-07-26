import api from "../../api"
import {  PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_GET_FAIL, PRODUCT_GET_REQUEST, PRODUCT_GET_SUCCESS } from "../constans/productConstants"

export const getAllProductsAction = () => async dispatch =>  {
    try {
        dispatch({ type: PRODUCT_GET_REQUEST })
        const {data} = await api.get("/products")
        dispatch({ type: PRODUCT_GET_SUCCESS, payload: data.result.data })
    } catch (error) {
        dispatch({ type: PRODUCT_GET_FAIL })
    }
}



export const getProductsDetailAction = (productId) => async dispatch =>  {
    try {
        dispatch({ type: PRODUCT_DETAIL_REQUEST })
        const {data} = await api.get(`/products/detail/${productId}`)
        dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload:data.result})
    } catch (error) {
        dispatch({ type: PRODUCT_DETAIL_FAIL }) 
    }
}
