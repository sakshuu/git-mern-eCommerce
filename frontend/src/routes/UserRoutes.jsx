import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Account, BuyNow, Cart, Checkout, OrderHistory, PageNotFound, Protected } from '../pages'
import PaymentFail from '../pages/PaymentFail'
import UserLayout from './layout/UserLayout'

const UserRoutes = () => {
  return <>
  <Routes>

  <Route path="/user" element={<UserLayout/>}>
    <Route path="account" element={<Protected element={<Account/>}/>}/>
    <Route path="order-history" element={<Protected element={<OrderHistory/>}/>}/>
    <Route path="cart" element={<Protected element={<Cart/>}/>}/>
    <Route path="checkout" element={<Protected element={<Checkout/>}/>}/>
    <Route path="payment-fail" element={<Protected element={<PaymentFail/>}/>}/>
    <Route path="buynow/:id/:qty" element={<Protected element={<BuyNow/>}/>}/>
    </Route>
    {/* <Route path="*" element={<PageNotFound/>}/> */}
  </Routes>
  </>
}

export default UserRoutes