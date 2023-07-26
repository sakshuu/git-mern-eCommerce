import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { PageNotFound} from '../pages'
import { Add_Products, AdminDashboard, AdminProtected, EmployeeLogin, EmployeeRegister, Products, UserList } from '../pages/admin'
import AdminLayout from './layout/AdminLayout'

const AdminRoutes = () => {
  return <>
  <Routes>
    <Route path="/admin" element={<AdminLayout/>}>
    <Route path="employee/login" element={<EmployeeLogin/>}/>
    <Route path="employee/regsiter" element={<EmployeeRegister/>}/>
    <Route path="dashboard" element={<AdminProtected element={<AdminDashboard/>} />}/>
    <Route path="employee/add-products" element={<AdminProtected element={<Add_Products/>}/>}/>
    <Route path='employee/product' element={<AdminProtected element={<Products/>}/>}/>
    <Route path='employee/users' element={<AdminProtected element={<UserList/>}/>}/>
    </Route>
    <Route path="*" element={<PageNotFound/>}/>
  </Routes>
  </>
}

export default AdminRoutes