import React from 'react'
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import { getemployeeData } from '../../redux/admin/reducers/employeeReducer';

const AdminProtected = ({element}) => {
    const {employeeLogin} =useSelector(getemployeeData)

  return  employeeLogin ? element : <Navigate to="/admin/employee/login/?redirected=401"/>
}

export default AdminProtected