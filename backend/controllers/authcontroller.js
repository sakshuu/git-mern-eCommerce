const User = require("./../models/userModels")
const Employee = require("./../models/employeeModels")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Cart = require("./../models/cartModel")
const {OAuth2Client} = require("google-auth-library")
const { sendEmail } = require("../utils/email")

exports.loginUser = asyncHandler ( async(req, res) => {
   const {email, password} = req.body
   if(!email || ! password ){
     return res.status(400).json({
    message: "All Fleids Required"
     })
   }

   const result = await User.findOne({ email }).lean()
   if(!result) {
    return res.status(401).json({
        message: "Email is not registered with us"
         })
   }

   const verify = await bcrypt.compare(password, result.password)
   if(!verify){
    return res.status(401).json({
     message:"email or password wrong"
    })
 }

 if (!result.active) {
  return res.status(401).json({
    message:"Account Blocked By Admin"
  })
 }

//    const token = jwt.sign({id: result._id}, process.env.JWT_KEY,{expiresIn: "15m"}) 
   const token = jwt.sign({id: result._id}, process.env.JWT_KEY,{expiresIn: "1d"})
const cart = await Cart.find ({ userId: result._id})
   res.json({
  message: "Login Success",
  // result:{
    result:{
      name:result.name,
      email:result.email,
       cart,
       token
    }
  }
  //  }
   )
})

exports.loginEmployee = asyncHandler ( async(req, res) => {

   const {email, password} = req.body
   if(!email || ! password ){
     return res.status(400).json({
    message: "All Fleids Required"
     })
   }

const result = await Employee.findOne({ email }).lean()
   if(!result) {
    return res.status(401).json({
        message: "Email is not registered with us"
         })
   }

const verify = await bcrypt.compare(password, result.password)
   if(!verify) {
    return res.status(401).json({
     message:"email or password wrong"
})}

 if(!result.active){
  return res.status(401).json({
      message:"Account is Blocked. Get in touch with admin"
  })
}

   const token = jwt.sign({id: result._id}, process.env.JWT_KEY)

   res.cookie("token", token, {
    // maxAge: 1000 ,
    httpOnly: true
    // secure : true
   })

   res.json({
  message: "Login Success",
    result:{
    ...result,
       token
    }}
  //  }
   )
})

exports.continueWithGoggle = asyncHandler( async(req, res) => {
  const {tokenId} = req.body
  if(!tokenId ){
    return res.status(400).json({
   message: "Please provide Google Token"
    })
  }
  const googleClient = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID)
  const {payload : {name, email, picture}} = await googleClient.verifyIdToken({
    idToken : tokenId
  })
  const result = await User.findOne({email}).lean()
  if (result) {
    // login

    if (!result.active) {
      return res.status(401).json({
        message:"Account Blocked By Admin"
      })
    }

    const token = jwt.sign({id: result._id}, process.env.JWT_KEY,{expiresIn: "1d"})
    const cart = await Cart.find ({ userId: result._id})
  res.json({
 message: "Login Success",
   result:{
   ...result,
      cart,
      token
   }
 })
  } else {
    // register
    const password = await bcrypt.hash(Date.now().toString(), 10)
const user = {
  name,
  email,
  password
}
const result = await User.create(user).lean()
const token =  jwt.sign({id: result._id}, process.env.JWT_KEY,{expiresIn: "1d"})
res.json({
  message: "User Register Success",
  result:{
    ...result,
    cart:[],
    token,
  }
})
  }
})

exports.forgetPassword = asyncHandler ( async(req, res) => {
  const {email, password} = req.body
  const user = await User.findOne({ email})
  const result = await User.findOne({ email: req.body.email }).lean()

  if(!result) {
   return res.status(401).json({
       message: "Email is not registered with us"
        })
  }
  
  sendEmail({
    sendTo:user.email,
    sub:"Click here and Change Your Password",
    subtext:`http://localhost:3000/reset-password/${result._id}`

  })
  res.json({
    message: "Email is Registered",
    ...result
  })
})
