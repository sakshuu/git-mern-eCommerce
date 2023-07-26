import { ADD_TO_CART_FAIL, ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, DELETE_SINGLE_CART_ITEM_FAIL, DELETE_SINGLE_CART_ITEM_REQUEST, DELETE_SINGLE_CART_ITEM_SUCCESS, EMPTY_CART_FAIL, EMPTY_CART_REQUEST, EMPTY_CART_SUCCESS, GET_CART_HISTORY_FAIL, GET_CART_HISTORY_REQUEST, GET_CART_HISTORY_SUCCESS } from "../constans/cartConstants"

export const cartReducer = (state = { 
    cart :[], 
   }, {type, payload}) => {

    switch (type) {

        case  ADD_TO_CART_REQUEST: return {
            ...state,
            loading: true
        }
        case ADD_TO_CART_SUCCESS: return {
            ...state,
            loading: false,
            toggle: !state.toggle
        }
        case ADD_TO_CART_FAIL: return {
            ...state,
            loading: false,
            addToCartError: payload
        }


case  GET_CART_HISTORY_REQUEST: return {
    ...state,
    loading: true
}
case GET_CART_HISTORY_SUCCESS: return {
    ...state,
    loading: false,
    cart: payload.cartItem,
    total: payload.total
}

case GET_CART_HISTORY_FAIL: return {
    ...state,
    loading: false,
    getcartError: payload
}
case DELETE_SINGLE_CART_ITEM_REQUEST: return { 
    ...state, 
    loading: true 
}
        case DELETE_SINGLE_CART_ITEM_SUCCESS: return {
             ...state,
              loading: false, 
              singleCartItemDeleted: true,
               toggle: !state.toggle
             }
             case DELETE_SINGLE_CART_ITEM_FAIL: return { ...state, loading: false, deleteSingleCartError: payload }

        case EMPTY_CART_REQUEST: return {
             ...state,
              loading: true
             }
        case EMPTY_CART_SUCCESS: return { ...state, loading: false, emptyCart: true, toggle: !state.toggle }
        case EMPTY_CART_FAIL: return { ...state, loading: false, deleteCartError: payload }
    default : return state
}
}

export const getcartData = state => state.allcart