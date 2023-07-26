const Employee = require("../models/employeeModels")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const { sendEmail } = require("../utils/email")
const User = require("./../models/userModels")
const Product = require("./../models/productModels")
const Order = require("../models/orderModels")

exports.registerEmployee = asyncHandler (async (req,res) => {
    const {name,password,email} = req.body
    if (!name || !password || !email ) {
        return res.status(400).json({
            message: "All Felids Required"
        })
    }

const duplicate = await Employee.findOne({ email })
    if(duplicate){
   return res.status(400).json({
    message: "email alreday exist"
   })
    }

    const hashPass = bcrypt.hashSync(password, 10)

    const result = await Employee.create({
       ...req.body,
        password: hashPass,
        role:"intern"
    })
    sendEmail({
        sendTo:email,
        sub:"Welcome to Skillhub Team",
        subtext:"Hello and welcome to our website! We're thrilled to have you here. Please feel free to explore and discover all that we have to offer. If you have any questions or need assistance, don't hesitate to reach out. Thank you for registring with us!"
    })

    res.json({
        message: "Employee Created Successfully"
    }) 
})

exports.getAllEmployee = asyncHandler( async (req,res) => {
         const result = await Employee.find()
         res.json({
             message: "Employee Fetched Successfully",
             result :{
                count : result.length,
                data:result
             }
            }) 
        }) 

exports.getSingleEmployee = asyncHandler( async (req,res) => {

        //  const {employeeId} = req.params
        //  const result = await Employee.findById( employeeId)
        //  if (!result) {
        //      return res.status(401).json({
        //         message:"Invalid User ID"
        //      })
        //     }
        console.log(req.cookies);
            res.json({
                message: "Employee Single Successfully",
                // result
            }) 
            })
            

exports.updateEmployee = asyncHandler (async (req,res) => {
    const {employeeId} = req.params
    const result = await Employee.findById(employeeId)
    if (!result) {
        return res.status(401).json({
           message:"Invalid User ID"
        })
       }
       const {password, email} = req.body
       if(password){
    return res.status(400).json({
        message:"can not chnage password"
    })
       }
       if(email){
  const duplicate = await Employee.findOne({email})
  if(duplicate){
    return res.status(400).json({
        message:"Dublicate email"
    })
       }
       }

     await Employee.findByIdAndUpdate(employeeId, req.body)

    res.json({
        message: "Employee Updated Successfully"
    }) 
})

 exports.deleteEmployee = asyncHandler( async (req,res) => {
         const {employeeId} = req.params
         const result = await Employee.findOne({_id: employeeId})

         if(!result){
      return res.status(400).json({
        message: "Invalid Id"
      })
         }
           await Employee.findByIdAndDelete(employeeId)
         res.json({
             message: "Employee deleted  single Successfully"
            }) 
            })


 exports.destroyEmployee = asyncHandler( async (req,res) => {
         await Employee.deleteMany()
         res.json({
             message: "Employee deleted all Successfully"
            }) 
        })

        // user

 exports.admingetAllUsers = async (req,res) => {
            try {
                const result = await User.find()
                res.json({
                 message: "User Fetched Successfully",
                 result
                }) 
            } catch (error) {
                res.status(400).json({
                    message: "Error" + error
                })
            }
        }

 exports.adminUserStatus = asyncHandler(  async (req,res) => {
    const {userId} = req.params
         const result = await User.findByIdAndUpdate(userId, {
            active:req.body.active
         })
         res.json({
             message: `User ${req.body.active ? "UnBlock" : "Block"} Successfully`,
            })     
        }
        )
        
 exports.adminStat = asyncHandler(  async (req,res) => {

   const users = await User.countDocuments()
   const activeUser  = await User.countDocuments({active:true})
   const inactiveUser = await User.countDocuments({active:false})
   const products = await Product.countDocuments()
   const publishProducts = await Product.countDocuments({publish:true})
   const unPublishProducts = await Product.countDocuments({publish:false})
   const orders = await Order.countDocuments()
   const deliveredOrders = await Order.countDocuments({orderStatus:"delivered"})
   const paidOrders = await Order.countDocuments({paymentStatus:"paid"})
   const codOrders = await Order.countDocuments({paymentMode:"cod"})
   const onlineOrders = await Order.countDocuments({paymentMode:"online"})
   const cancelOrders = await Order.countDocuments({orderStatus:"cancel"})

         res.json({
             message: `Successfully`,
             result:{
users,
activeUser,
inactiveUser,
products,
publishProducts,
unPublishProducts,
orders,
deliveredOrders,
paidOrders,
codOrders,        
onlineOrders,
cancelOrders               
             }
            })     
        }
        )


 exports.adminSearch = asyncHandler(  async (req,res) => {
    const {term} = req.query
    const result = await User.find({ 
        name: {$regex: term}       })
     res.json({
        message: "ok", 
        result
     })
     })