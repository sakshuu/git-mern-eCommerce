import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";
import { employeeproductReducer } from "./admin/reducers/employeeProductReducer";
import { employeeReducer } from "./admin/reducers/employeeReducer";
import { adminUserReducer } from "./admin/reducers/userReducer";
import { authReducer } from "./users/reducer/authReducer";
import { cartReducer } from "./users/reducer/cartReducer";
import { orderReducer } from "./users/reducer/orderReducer";
import { productReducer } from "./users/reducer/productReducer";
import { userReducer } from "./users/reducer/userReducer";

const localData = localStorage.getItem('auth')
? JSON.parse(localStorage.getItem('auth'))
: {}

 const employeeData = localStorage.getItem('employee')
 ? JSON.parse(localStorage.getItem('employee'))
 : {}

console.log(localData);

const initialState = {
 auth : localData,
 employee: employeeData
}

const rootReducer = combineReducers({
    allProducts: productReducer,
    auth:authReducer,
    allOrders:orderReducer,
    employee:employeeReducer,
    allemployeeProducts:employeeproductReducer,
    allcart:cartReducer,
    user:userReducer,
    adminUsers:adminUserReducer

})

 const reducStore = createStore(rootReducer, initialState , composeWithDevTools(applyMiddleware(thunk)))

export default reducStore