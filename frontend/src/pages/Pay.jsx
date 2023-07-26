import { Button } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import api from '../redux/api'
import { getUserAuthData } from '../redux/users/reducer/authReducer'

const Pay = () => {
   const {userLogin} = useSelector(getUserAuthData)
    const amount = 500
    const handlePayment = async () => {
        const {data} = await api.post("order/payment", { amount})
        console.log(data);
        const Razor = new window.Razorpay({
            kay:"rzp_test_JaZX8PVyfNpGE6",
            amount: amount * 100,
            currency:"INR",
            description:"one laptop",
            order_id:data.order.id,
            prefill:{
                email:"john@gmail.com",
                contact:"7678675658"
            },
            image:"https://skillhubitsolution.com/assets/img/900x450/img16.jpg",
            handler: async response => {
                try {
                    console.log(response);
                    const {data} = await api.post("/order/payment/verify", 
                    response,{
                        headers:{
                            authorization: userLogin.token
                        }
                    })
                    console.log("payment success");
                    console.log(data);
                    // payment success
                    //   backend call
                    } catch (error) {
                    console.log("payment fail");
                    console.log(error);
                    // payment fail
}}
        })
        Razor.open()
    }
   return <>
  <Button onClick={handlePayment}>Pay</Button>
  </>
}

export default Pay