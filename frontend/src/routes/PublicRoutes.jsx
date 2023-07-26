import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Cart, ForgetPass, Home, PageNotFound, ProductDetails, ResetPass, SignIn, SignUp } from '../pages'
import PublicLayout from './layout/PublicLayout'

const PublicRoutes = () => {
  return <>
    <Routes>
    <Route path="/" element={<PublicLayout/>}>
        <Route  index element={<Home/>}/>
        <Route path="register" element={<SignUp/>}/>
        <Route path="login" element={<SignIn/>}/>
        <Route path="forget" element={<ForgetPass/>}/>
        <Route path="reset-password/:id" element={<ResetPass/>}/>
        <Route path="product-detail/:id" element={<ProductDetails/>}/>
    </Route>
    {/* <Route path="*" element={<PageNotFound/>}/> */}
  </Routes>
  </>
}

export default PublicRoutes