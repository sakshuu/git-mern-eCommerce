import { ADD_TO_CART_FAIL, ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, DELETE_SINGLE_CART_ITEM_FAIL, DELETE_SINGLE_CART_ITEM_REQUEST, DELETE_SINGLE_CART_ITEM_SUCCESS, EMPTY_CART_FAIL, EMPTY_CART_REQUEST, EMPTY_CART_SUCCESS, GET_CART_HISTORY_FAIL, GET_CART_HISTORY_REQUEST, GET_CART_HISTORY_SUCCESS } from "../constans/cartConstants"
import api from "../../api"

export const addToCartAction = (product) => async (dispatch, getState) => {
try {
    // console.log(product);
    dispatch({type:ADD_TO_CART_REQUEST})
    const {data} = await api.post("/cart/add-to-cart" , product,{
        headers:{
            authorization:  getState().auth.userLogin.token
        }
    })

    dispatch({type:ADD_TO_CART_SUCCESS, payload: []})
} catch (error) {
    dispatch({type:ADD_TO_CART_FAIL, payload: error.message})
    
}
}

export const cartHistoryAction = () => async (dispatch, getState) => {
try {
    dispatch({type:GET_CART_HISTORY_REQUEST})
    const {data} = await api.get("/cart/cart-history", {
        headers:{
            authorization:getState().auth.userLogin.token
        }
    })
    // console.log(data.result);
    let total = 0
    total += data.result.reduce((t, i) => t + i.price * i.qty , 0)
   

    dispatch({type:GET_CART_HISTORY_SUCCESS, payload:{
        cartItem:data.result, total
    }})
} catch (error) {
    dispatch({type:GET_CART_HISTORY_FAIL, payload: error.message})
}
}

export const removeSingleCartItemAction = (productId) => async (dispatch, getState) => {
    try {
        dispatch({ type: DELETE_SINGLE_CART_ITEM_REQUEST })
        const { data } = await api.delete(`/cart/cart-remove-single/${productId} `, {
            headers:{
                authorization:  getState().auth.userLogin.token
            }
        })
        dispatch({ type: DELETE_SINGLE_CART_ITEM_SUCCESS, })
    } catch (error) {
        dispatch({ type: DELETE_SINGLE_CART_ITEM_FAIL, payload: error.message })
    }
}

export const emptyCartItemAction = (cartId) => async (dispatch, getState) => {
    try {
        dispatch({ type: EMPTY_CART_REQUEST })
        const { data } = await api.delete(`/cart/empty-cart`, {
            headers: {
                authorization: getState().auth.userLogin.token
            }
        })
        dispatch({ type: EMPTY_CART_SUCCESS, })
    } catch (error) {
        dispatch({ type: EMPTY_CART_FAIL, payload: error.message })
    }
}