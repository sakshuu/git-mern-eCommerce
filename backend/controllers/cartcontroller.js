const asyncHandler = require("express-async-handler")
const Cart = require("../models/cartModel")
const Product = require("./../models/productModels")

exports.allHistroyRemoveCart = asyncHandler (async (req,res) => {
    await Cart.deleteMany()
   res.json({
       message: "Cart histroy deleted all Successfully"
   }) 
})

exports.addToCart = asyncHandler (async (req,res) =>{
 const {qty, productId } = req.body
 if (!qty || !productId) {
  return res.status(400).json({
     Message : "All Filed Required"
  })   
 }
const result = await Product.findById(productId)
if (result.stock < qty) {
    return res.status(400).json({
        message:'Qty is too long'
    })
}


const cartItem = await Cart.findOne({userId: req.body.userId})
if (cartItem) {
    const index = cartItem.products.findIndex(p => p.productId.toString() === req.body.productId)
    console.log(index);
    if (index >= 0) {
        cartItem.products[index].qty = req.body.qty
        // console.log(cartItem._id);
    } else {
        cartItem.products.push(req.body)
    }
    const result = await Cart.findByIdAndUpdate(cartItem._id, cartItem, { new: true})
    console.log(result);
    res.json({
        message:"Cart Updated Successfully",
        // result
    })
} else {
    // data nahi / push
    const cartItem = {
        userId: req.body.userId,
        products:[req.body]
    }
    const result = await Cart.create(cartItem)
    console.log(result);
    res.json({ 
        Message: "Product added to cart successfully",
        result
    })
}
})

exports.getCartData = asyncHandler (async (req,res) =>{
const {userId } = req.body
 const result = await Cart
.findOne({userId:userId})
.populate("products.productId", "name price brand images category desc stock")
.select(" -__v -createdAt -updatedAt -_id -userId ")
.lean()
   if (!result) {
    return res.status(200).json({
        message:"Cart is empty",
        result: []
    })
   }
    const formatedcartItem = result.products.map(p => {
       return{
           ...p.productId,
           qty: p.qty
        }})

    res.json({
        Message: "Fetch from cart successfully",
        result: formatedcartItem,        
    })
})

exports.destroyCart = asyncHandler (async (req,res) => {
     await Cart.deleteMany()
    res.json({
        message: "Cart deleted all Successfully"
    }) 
})

exports.removeSingleCartItem = asyncHandler (async (req,res) => {
//     const {productId} = req.params
//     const {userId} = req.body

//     console.log(productId);
//     const result = await Cart.findOne({userId})    
//     console.log(result.products[0].productId.toString());
//     const index = result.products.findIndex(item => item.productId.toString() === productId.result.slice(index, 1))
//   console.log(index);
// console.log(result);

//     res.json({
//         message: "remove one cart Successfully",
//         x
//     }) 

const { productId } = req.params
const { userId } = req.body
const result = await Cart.findOne({ userId })
const index = result.products.findIndex(item => item.productId.toString() === productId)
result.products.splice(index, 1)
const x = await Cart.findByIdAndUpdate(result._id, result, { new: true })
console.log(x);
res.json({
    message: "single cart item deleted successfully",
    x
})
})


exports.emptyCart = asyncHandler (async (req,res) => {
    const {userId} = req.body
   const result = await Cart.deleteOne({userId})
   res.json({
       message: "Cart user deleted all Successfully",
       result
   }) 
})

