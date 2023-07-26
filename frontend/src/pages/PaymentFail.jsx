import { Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { paymentFailAction } from '../redux/users/action/orderAction'
import { getOrderData } from '../redux/users/reducer/orderReducer'

const PaymentFail = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(paymentFailAction("fail"))
  }, [])
  
    const {paymentFailError} = useSelector(getOrderData)
  return <>
  <Typography variant='h3'>Your Payment fail</Typography>
  <Typography>{paymentFailError}</Typography>
  <Link to="/user/checkout/?redirect=fail">Retry</Link>
  </>
}

export default PaymentFail