import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AddressForm, PaymentForm, RazorPay, Review } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData } from '../redux/users/reducer/authReducer';
import { initiatePaymentAction, paymentFailAction, placeOrderAction, verifyPaymentAction } from '../redux/users/action/orderAction';
import { getcartData } from '../redux/users/reducer/cartReducer';
import { getOrderData } from '../redux/users/reducer/orderReducer';
import {  Link as Redirect, redirect, useNavigate, useSearchParams } from "react-router-dom";
import { cartHistoryAction } from '../redux/users/action/cartAction';


export default function Checkout() {
  const [mode, setMode] =  React.useState("online")
  const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm/>;
    case 1:
      return <PaymentForm setMode={setMode}/>;
    case 2:
      return <Review/>;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();


  const {userLogin} = useSelector(getUserAuthData)
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if (activeStep != 2) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
 const dispatch = useDispatch()
 const {total, cart} = useSelector(getcartData)
 const {orderId, loading, paid,paymentFailError} = useSelector(getOrderData)
const navigate = useNavigate()
const [params, setParams] = useSearchParams()
React.useEffect(() => {
  if (params.get("redirect") === "fail") {
    setActiveStep(2)
  }}, [params])


React.useEffect(() => {
  if (paid) {
    setActiveStep(activeStep + 1)
  } 
  dispatch(cartHistoryAction())
 }, [paid])

 const {initiatePaymentError}= useSelector(getOrderData)
 React.useEffect(() => {
  if (initiatePaymentError) {
    navigate("/user/cart")
  }
 }, [initiatePaymentError])

 if (cart.length === 0 && !paid ) return <Box>
<Typography variant='h2'>No Cart Item</Typography>
<Redirect to="/" >Start shopping Now</Redirect>
</Box>

  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RazorPay total ={total} type="cart"/>
      {/* <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && paid ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
              <Redirect to="/user/order-history">Order</Redirect>
              <Redirect to="/">Continue Shopping</Redirect>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
<h1>{mode}</h1>
                <Button
                  variant="contained"
                  onClick={e => {
                    handleNext()
                    if (activeStep === steps.length - 1 ) {
                      // dispatch(placeOrderAction())
                      if (mode === "online") {
                        dispatch(initiatePaymentAction({
                          cart,
                          total,
                          type:"cart"
                        }))
                      } else {
                        dispatch(placeOrderAction({type: "cart"}))
                      }
                    }
                  }}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        {/* <Copyright /> */}
      </Container>
    </ThemeProvider>

  );
}