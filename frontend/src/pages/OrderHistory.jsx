import React, { useEffect } from 'react'
import { Alert, Avatar, Button, CircularProgress, Paper, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';
import {  useDispatch, useSelector } from 'react-redux'
import { URL } from '../redux/api';
import { cancelOrderAction, getOrderHistoryAction } from '../redux/users/action/orderAction'
import { getOrderData } from '../redux/users/reducer/orderReducer'

const OrderHistory = () => {
  const dispatch = useDispatch()
const { orders, orderHistoryError, loading, toggle} = useSelector(getOrderData)
    useEffect(() => {
    dispatch(getOrderHistoryAction())
    }, [toggle])

    if (loading) {
        return <CircularProgress/>
    }
    if (orderHistoryError) {
       return <Alert severity='error'>{orderHistoryError}</Alert>
    }
    
  return <>
  {/* {JSON.stringify(orders)} */}
  <Grid container>
    <Grid item mdOffset="2" md={8}>
{
 orders &&  orders.map(item => <Paper>
        <Typography variant='h5'>order status {item.orderStatus}</Typography>
     {
   item.products.map &&  item.products.map(single => <>
         <Avatar 
         src={`${URL}/${single.productId?.images[0]}`}/>
   <Typography variant='h6'>Name : {single.productId?.name}</Typography>
   <Typography variant='h6'>Price : {single.productId?.price}</Typography>
   <Typography variant='h6'>Qty : {single?.qty}</Typography>
        </>
     )}
   {
item.orderStatus !== "cancel" && 
<Button 
     variant="outlined" 
     color="error"
     onClick={ e => {dispatch(cancelOrderAction(item._id))}}
     >Cancel Order</Button>
    } 
      </Paper>)
}
    </Grid>
  </Grid>
  </>
}

export default OrderHistory