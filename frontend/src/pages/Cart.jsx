import { Alert, Box, Button, Card, CardActions, CardContent, CircularProgress, Divider, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch , useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { URL } from '../redux/api'
import { cartHistoryAction, emptyCartItemAction, removeSingleCartItemAction } from '../redux/users/action/cartAction'
import { getcartData } from '../redux/users/reducer/cartReducer'
import "./../style.css"
import { getOrderData } from '../redux/users/reducer/orderReducer'

const Cart = () => {
 const dispatch = useDispatch()
const {cart,  toggle, getcartError,loading}  = useSelector(getcartData)
const {initiatePaymentError}  = useSelector(getOrderData)

useEffect(() => {
dispatch(cartHistoryAction())
  }, [toggle])

  const [sum, setSum] = useState(0)
let total = 0

useEffect(() => {
       total += cart.reduce((t, i) => t + i.price * i.qty, 0)
      setSum(total)
}, [cart])

 if (loading) {
  return  <CircularProgress></CircularProgress>
 }
 
   if (getcartError) {
    return <Alert severity='error'>Unable To Fetch Cart Data</Alert>
   }
 if (cart && cart.length === 0) {
  return  <Box>
  <Typography variant='h2'>No Cart Item</Typography>
  <Link to="/" >Start shopping Now</Link>
  </Box>
 }
  return <>
    {
             <Button sx={{ marginLeft: 25, marginBottom: 1 }}
                variant="outlined"
                color="error"
                onClick={e => dispatch(emptyCartItemAction())}
            >Empty Cart</Button>
        }
  <Grid container sx={{padding:"0px 4rem"}}>
    {
cart && cart.map(item => <Grid md={6}>
   <Stack direction="row" gap={2} 
   sx={{border: item.qty > item.stock ? "5px solid red" : ""}} >
  <img  variant='square' className='img-fluid' alt="Remy Sharp" src={`${item.images && item.images[0]}`}  />
      <Box>
    <Typography variant='h6'>Price: {item.price}</Typography>
    <Typography variant='h6'>Qty: {item.qty} </Typography>
    <Button onClick={e => dispatch(removeSingleCartItemAction(item._id))}>Remove</Button>
    
    </Box>
    </Stack>
  </Grid>
  )}

  <Grid md={6}>
  <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant='h4' color="text.secondary" gutterBottom>
          Price Details
        </Typography>
        <Typography variant="h5" component="div">

        </Typography>

        <Stack direction="row" justifyContent="space-between">

        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Price (1 Item)
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        8789
        </Typography>
        </Stack>
        <Typography variant='h6' color="green">
     you have save 1200 , 1200 on this order
        </Typography>
       
<Divider/>
        <Stack direction="row" justifyContent="space-between">
        <Typography sx={{ mb: 1.5 }} variant="h5" color="text.secondary">
          Total
        </Typography>
        <Typography sx={{ mb: 1.5 }} variant="h5"  color="text.secondary">
          {sum}
        </Typography>
        </Stack>
       
      </CardContent>
      

      <CardActions>
        <Button size="small">Place Order</Button>
      </CardActions>
      {/* <Button variant='outlined'> </Button> */}
        <Link to="/user/checkout">Checkout</Link>
    </Card>
  </Grid>
  </Grid>
  </>
}

export default Cart