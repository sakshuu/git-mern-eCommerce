import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams} from 'react-router-dom'
import { RazorPay } from '../components'
import { initiatePaymentAction, placeOrderAction } from '../redux/users/action/orderAction'
import { getproducts } from '../redux/users/reducer/productReducer'

const BuyNow = () => {
  const {singleProducts} =  useSelector(getproducts)
  const [mode, setMode] = useState("online")
  const dispatch = useDispatch()
  const {qty} = useParams()


  return <>
  <RazorPay total={singleProducts.price} type="buynow" details={{productId:singleProducts._id, qty}} />
  <Link to="/">Back</Link>
  <h1>{singleProducts.name}</h1>
  <input type="radio" onChange={e => setMode(e.target.value)} name="mode" value="pod"/> POD 

  <input type="radio" onChange={e => setMode(e.target.value)} name="mode" value="online"/> Online
  <hr />
  <button onClick={e => {
    if (mode === "online") {
        // Razor Pay Code
        dispatch(initiatePaymentAction(singleProducts.price * qty))
    } else {
        // disptach PlaceorderAction
        dispatch(placeOrderAction({productId:singleProducts._id,
           qty,
          type: "buynow"
         }))
    }
  }}>{mode === "online" ? "Pay Online" : "place Order"}</button>
  </>
}

export default BuyNow