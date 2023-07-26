import { BUY_NOW_FAIL, BUY_NOW_REQUEST, BUY_NOW_SUCCESS, INTITIATE_PAYMENT_FAIL, INTITIATE_PAYMENT_REQUEST, INTITIATE_PAYMENT_SUCCESS, ORDER_CANCEL_FAIL, ORDER_CANCEL_REQUEST, ORDER_CANCEL_SUCCESS, PAYMENT_FAILED_FAIL, PAYMENT_FAILED_REQUEST, PAYMENT_FAILED_SUCCESS, PAYMENT_VERIFY_FAIL, PAYMENT_VERIFY_REQUEST, PAYMENT_VERIFY_SUCCESS, PLACE_ORDER_FAIL, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS, USER_ORDER_HISTORY_FAIL, USER_ORDER_HISTORY_REQUEST, USER_ORDER_HISTORY_SUCCESS } from "../constans/orderConstants"

export  const orderReducer = (state = { 
    orders :[], 
   }, {type, payload}) => {

    switch (type) {

        case  PLACE_ORDER_REQUEST: return {
            ...state,
            paid:false,
            loading: true
        }
        case PLACE_ORDER_SUCCESS: return {
            ...state,
            loading: false,
            // orderPlaced: true,
            paid: true,
            toggle: !state.toggle
        }
        case PLACE_ORDER_FAIL: return {
            ...state,
            loading: false,
        }


case  ORDER_CANCEL_REQUEST: return {
    ...state,
    loading: true
}
case ORDER_CANCEL_SUCCESS: return {
    ...state,
    loading: false,
    orderCancel: true,
    toggle: !state.toggle
}

case ORDER_CANCEL_FAIL: return {
    ...state,
    loading: false,
    orderCnacleError: payload
}
case  USER_ORDER_HISTORY_REQUEST: return {
    ...state,
    loading: true
}
case USER_ORDER_HISTORY_SUCCESS: return {
    ...state,
    loading: false,
    //  toggle: !state.toggle,
    orders: payload,
}

case USER_ORDER_HISTORY_FAIL: return {
    ...state,
    loading: false,
    orderHistoryError: payload
}
case  INTITIATE_PAYMENT_REQUEST: return {
    ...state,
    loading: true
}
case INTITIATE_PAYMENT_SUCCESS: return {
    ...state,
    loading: false,
    orderId: payload,
}

case INTITIATE_PAYMENT_FAIL: return {
    ...state,
    loading: false,
    initiatePaymentError: payload
}
case  PAYMENT_VERIFY_REQUEST: return {
    ...state,
    loading: true
}
case PAYMENT_VERIFY_SUCCESS: return {
    ...state,
    loading: false,
    paid: true,
    orderId: null
}

case PAYMENT_VERIFY_FAIL: return {
    ...state,
    loading: false,
    verifyPaymentError: payload
}
case  PAYMENT_FAILED_REQUEST: return {
    ...state,
    loading: true
}
case PAYMENT_FAILED_SUCCESS: return {
    ...state,
    loading: false,
    orderId:null,
    paymentFailError: payload
}

case PAYMENT_FAILED_FAIL: return {
    ...state,
    loading: false,
    error: payload
}
case  BUY_NOW_REQUEST: return {
    ...state,
    loading: true
}
case BUY_NOW_SUCCESS: return {
    ...state,
    loading: false,
    orderId:null,
    paymentFailError: payload
}

case BUY_NOW_FAIL: return {
    ...state,
    loading: false,
    error: payload
}
    default : return state
}
}

export const getOrderData = state => state.allOrders