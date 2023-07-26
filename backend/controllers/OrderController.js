const Product = require("../models/productModels")
const asyncHandler = require("express-async-handler")
const Cart = require("../models/cartModel")
const User = require("./../models/userModels")
const Order = require("../models/orderModels")
const Razorpay = require("razorpay")
const {v4:uuid} = require("uuid")
const crypto = require("crypto")
const {sendEmail} = require("../utils/email")
const { orderRecipt } = require("../utils/emailTemplates")
const { format } = require("date-fns")

exports.placeOrder = asyncHandler (async (req,res) =>{
   const {userId, type} = req.body
   if (!type) {
    return res.status(400).json({
        message:"Please Provide Type"
    })
   }
   let productArray
   if (type === "buynow") {
    const result = await Product.findById(req.body.productId)
    if (result.stock < req.body.qty) {
        return res.status(400).json({
            message:"qty is too long"
        })
    }
        productArray = [{
            productId:req.body.productId,
            qty:req.body.qty,
        }]

        await Product.findByIdAndUpdate(req.body.productId, {$inc: { stock: -req.body.qty}})

   }else{
   const cartItem = await Cart.findOne({userId})
//    console.log(cartItem);
    await Cart.deleteOne({userId})
    productArray = cartItem.products
    cartItem.products.forEach(async item => {
        await Product.findByIdAndUpdate(item.productId, {$inc: { stock: -item.qty}})
    })
}

    const result = await Order.create({
        userId,
        products:productArray,
        paymentMode:"cod"
    })

// reducer the stock


    res.json({
        Message: "Order Placed successfully",
        result
    })
})

exports.getUserOrders = asyncHandler (async (req,res) =>{

    // const result = await Order.findOne(req.body)
    const result = await Order
    .find({userId: req.body.userId})
    .populate("products.productId")
    .select(" -createAt -updatedAt -__v")
    // .populate({
    //     path:"products",
    //     populate:{
    //         path:"productId", 
    //         model: "product"
    //     }
    // })
console.log(result);
    res.json({
        Message: "user Order fetched successfully",
        count: result.length,
        result
    })
})

exports.UserCancelOrders = asyncHandler (async (req,res) =>{
    const {orderId} = req.params
    const result = await Order.findByIdAndUpdate(orderId, {
        orderStatus: "cancel"
    })
    res.json({
        Message: "Order canceled successfully",
        result
    })
})

exports.orderPayment = asyncHandler( async (req, res) => {
    const {type, cart} = req.body
    let err = []
    let result
    if (type === "cart") {
    cart.forEach(async (item, i) => {
        result = await Product.findById(item._id)
        if (result.stock < item.qty) {
            err.push({
                id: item._id,
                message : "out of stock",
            })
        }
        if (i === cart.length -1) {
            // console.log("done");
            if (err.length > 0) {
                return res.status(400).json({
                    message:"qty is toooooo long",
                    err
                })    
            } else {
              const instanse = new Razorpay({
                 key_id: process.env.RAZORPAY_KEY,
                 key_secret: process.env.RAZORPAY_SECRET
               })
                  instanse.orders.create({
                  amount:req.body.total * 100,
                  currency: "INR",
                  receipt: uuid()
              }, (err, order) => {
               if (err) {
                   return res.status(400).json({
                       message: "Order Fail" + err
                   })
               }
               res.json({
                   Message: "Your Payment initiated",
                   order
               })
          }) 
        }}     
    })
}
})

exports.verifyPayment = asyncHandler( async(req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body
    const key = `${razorpay_order_id}|${razorpay_payment_id}`

    const expectedSignature = crypto
    .createHmac("sha256",`${process.env.RAZORPAY_SECRET}`)
    .update(key.toString())
    .digest('hex')

    if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({
            message:"Invalid Payment, Signature Mismatch"
        })
    }

    const {userId, type } = req.body

    const user = await User.findOne({ _id: userId })

    let cartItem, result, productsDetails, formatedcartItem, total

    if (type === "cart") {
        cartItem  = await Cart.findOne({userId})


productsDetails = await Cart
    .findOne({userId:userId})
    .populate("products.productId", "name price brand images category desc")
    .select(" -__v -createdAt -updatedAt -_id -userId ")
    .lean()
    
formatedcartItem = productsDetails.products.map(p => {
        return{
            ...p.productId,
            qty: p.qty
         }})
         
         console.log("-------------");
         console.log(formatedcartItem);
         console.log("-------------");
    
total =  formatedcartItem.reduce((sum, i) => sum + (i.price * i.qty), 0)
         
        await Cart.deleteOne({userId})

    } else if(type === "buynow"){
        cartItem = {
             products :  [{
                productId: req.body.productId,
                qty: req.body.qty,
            }]
        }
        const p = await Product.findOne({ _id: req.body.productId})
        total = p.price * req.body.qty
formatedcartItem = [{
               name: p.name,
               price:p.price,
               qty:req.body.qty
}]  
  }


    result = await Order.create({
        userId,
        products:cartItem.products,
        paymentMode:"online",
        paymentId:razorpay_payment_id,
        orderId:razorpay_order_id,
        paymentSignature:razorpay_signature,  
        paymentStatus:"paid"  
    })

    sendEmail({
        sendTo:user.email,
        sub:"Order Palced SuccessFully",
        htmlMsg:orderRecipt({
            userName: user.name,
            date: format(Date.now(), "dd-MM-yyyy"),
           //  date: Date.now(),
            orderId:result._id,
            products:formatedcartItem,
            total 
        }) , 
        subtext:`Thank you For Your \n Order  Id : ${result._id} \n Payment Status : paid \n Payment mode : Online \n Payment Id: ${result.paymentId} \n`
    })
    
      res.json({
        message:"Payment success"
      })
})




exports.destroyOrders = asyncHandler(async(req,res) => {
    await Order.deleteMany()
    res.json({
        message:"Delete order"
    })
}) 
