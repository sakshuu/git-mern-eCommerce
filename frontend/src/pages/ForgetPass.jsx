import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { UserforgetPassword } from '../redux/users/action/authAction'

const ForgetPass = () => {
    const dispatch = useDispatch()
    const [forgetPas, setForgetPas] = useState("sakshisjadhav.120@gmail.com")
  return <>
<div >
    <br />

  <input 
  type="text"
  placeholder='Enter Your Gmail'
  value={forgetPas}
onChange={e => setForgetPas(e.target.value)}
/>
  <br />
  <br />

  <button onClick={e => dispatch(UserforgetPassword(forgetPas))}>Click To Forget Password</button>
</div>
  </>
}

export default ForgetPass