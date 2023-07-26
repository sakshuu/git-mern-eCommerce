import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { paymentFailAction, verifyPaymentAction } from '../redux/users/action/orderAction'
import { getOrderData } from '../redux/users/reducer/orderReducer'

const RazorPay = ({total,type, details={}}) => {
const dispatch = useDispatch()
const navigate = useNavigate()
    const { orderId, loading, paid, paymentFailError } = useSelector(getOrderData)
    
    
    React.useEffect(() => {
        if (orderId) {
          const Razor = new window.Razorpay({
            kay:"rzp_test_JaZX8PVyfNpGE6",
            amount: total * 100,
            currency:"INR",
            description:"one laptop",
            order_id:orderId,
            prefill:{
              contact:7989899988
                  // method: "card",
                  // "card[name]": "sakshi jadhav",
                  // "card[number]": 4111111111111111,
                  // "card[expiry]": "12/25",
                  // "card[cvv]": 123,
                  // "contact": "9999999999"
              },
            image:"https://skillhubitsolution.com/assets/img/900x450/img16.jpg",
            handler: async successResponse => {
              console.log(successResponse);
              dispatch(verifyPaymentAction({...successResponse, ...details, type}))
              // if (paid) setActiveStep(activeStep + 1)
              
      },
      modal:{
        ondismiss : () => {
          navigate("/user/payment-fail")
        }
      }
        })
        Razor.open()
        Razor.on('payment.failed', (err) => {
          dispatch(paymentFailAction(err.error.description))
          // console.log(err.error.description);
          // Razor.close()
        })
        }
       }, [orderId])
  return <>
  
  </>
}

export default RazorPay