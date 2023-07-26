import React, { useEffect } from 'react'
import { useNavigate,} from "react-router-dom";
import UserNavBar from '../../components/UserNavBar'
import { getUserData } from '../../redux/users/reducer/userReducer'
import { useDispatch, useSelector  } from "react-redux";
import { userLogoutAction } from '../../redux/users/action/authAction';

const UserLayout = () => {
 const {error} = useSelector(getUserData)
 const navigate = useNavigate
 const dispatch = useDispatch()
  useEffect(() => {
    if(error && error.status === 401){
      dispatch(userLogoutAction())
    //  navigate("/login")
    }
  }, [error])
  
  return <>
  <UserNavBar/>
  </>
}

export default UserLayout