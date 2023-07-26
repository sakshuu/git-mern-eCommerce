const jwt = require("jsonwebtoken")
const Employee = require("./../models/employeeModels")
const asyncHandler = require("express-async-handler")
const User = require("./../models/userModels")


exports.adminProtected = asyncHandler( async (req,res,next) => {
   const token = req.headers.authorization
   // const token = req.cookies.token

   if(!token){
     return res.status(401).json({
        message:"Please Provide Token"
     })
   }
   const { id } = jwt.verify(token, process.env.JWT_KEY)
   const result = await Employee.findById(id)
   if (!result) {
      return res.status(401).json({
         message: "Can Not Find This User"
      })
   }
   if (result.role !== "admin") {
       return res.status(401).json({
        message:"Admin only route, please get in touch with admin"
     })
}
// req.body.employeeID = id    //maler sobat chlat nhai
next()
})

exports.protected = asyncHandler( async (req,res,next) => {
   const token = req.headers.authorization
   console.log("xxx",req.cookies);
   if(!token){
     return res.status(401).json({
        message:"Please Provide Token"
    })
   }
   const tk = token.split(" ")[1]
   const { id } = jwt.verify(tk, process.env.JWT_KEY)
   if(!id){
      return res.status(401).json({
        message: "Invalid Token"
      })
   }
   const result = await User.findById(id)
   if (!result.active) {
      return res.status(401).json({
         message:"Account Is Blocked By Admin. Get in touch with admin"
      })
   }
   req.body.userId = id
next()
})