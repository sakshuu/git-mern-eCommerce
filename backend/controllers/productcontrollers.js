const asyncHandler = require("express-async-handler")
const { productUpload } = require("../utils/uplode")
const Product = require("./../models/productModels")
const jwt = require("jsonwebtoken")
const path = require("path")
const URL = require("../utils/config")
const fs = require("fs").promises


exports.addProduct = asyncHandler(async (req, res) => {
    console.log(req.files)

    productUpload(req,res,async err => { 
        const {id} = jwt.verify(req.headers.authorization, process.env.JWT_KEY)
        req.body.employeeID = id
        console.log(req.body)
        const {name,brand,category,desc,price,stock,employeeID} = req.body
        if( !name || !brand || !category || !desc || !price || !stock || !employeeID  ){
            return res.status(400).json({
                message:"All Felids Required"
            })
              }
        if (err) {
            return res.status(400).json({
                message: "Multer err" + err
            })
        }

        console.log(URL);
        const filenames = []
        for(let i = 0; i < req.files.length; i++ ){
            filenames.push(`${URL}/assets/image/producs/${req.files[i].filename}`)
        }

     const result = await Product.create({
        ...req.body,
        images: filenames
     })
res.json({
    message: "product added successfully",
    result
    
})
    })
})

exports.getAllProduct = asyncHandler( async (req,res) => {
    const result = await Product.find().select(" -employeeId -createdAt -updatedAt -__v")
    res.json({
        message: "Product Fetched Successfully",
        result :{
            data:result,
           count : result.length
        }
       }) 
   }) 

   exports.getSingleProduct = asyncHandler( async (req,res) => {
    const {productId} = req.params
    const result = await Product.findById(productId).select("-employeeId -createdAt -updatedAt -__v")
    console.log(result);
    if (!result) {
        return res.status(401).json({
           message:"Invalid productId"
        })
       }
       res.json({
           message: `Product with id ${productId} fetched Successfully`,
           result
       }) 
       })

exports.deleteProduct = asyncHandler( async (req,res) => {
    const {productId} = req.params
    const result = await Product.findOne({_id:productId})

    if(!result){
 return res.status(400).json({
   message: "Invalid Id"
 })
    }
      await Product.findByIdAndDelete(productId)
    res.json({
        message: "product  deleted  single Successfully"
       }) 
       })


exports.destroyProduct = asyncHandler( async (req,res) => {
   const result = await Product.deleteMany()
    // await fs.unlink(path.join(__dirname,"..","public"))
    res.json({
        message: "product deleted all Successfully"
       }) 
   })


exports.updateProductData = asyncHandler(async (req, res) => {
const {productId} = req.params
const singleProduct = await Product.findById(productId)
if (!singleProduct) {
    return res.status(400).json({
       message:"Invalid user ID"
    })
}
productUpload(req,res, async err => {
    if (err) {
        res.status(400).json({
            message: "Multer Error" + err
        })
    }
    
    let filenames = []
    
    for(let i = 0; i < req.files.length; i++ ){
        filenames.push(`${URL}/assets/image/producs/${req.files[i].filename}`)
    }
    
    if (filenames.length > 0) {
        for (let i = 0; i < singleProduct.images.length; i++) {
     await fs.unlink(path.join(__dirname, "..", "public", singleProduct.images[i]))      
         }
    } else {
        filenames = singleProduct.images
    }
const result = await Product.findByIdAndUpdate(productId,{
    ...req.body,
    images:filenames
}, {new: true} )
res.json({
    message:"product image updated success",
    result
})
})
})

exports.updateproductImages = asyncHandler(async (req,res) => {
    const {productId} = req.params
    const singleProduct = await Product.findById(productId)
    if (!singleProduct) {
        return res.status(401).json({
           message:"Invalid productId"
        })
    }

    console.log(singleProduct.images)
    productUpload(req,res,async err => {
        if (err) {
            res.status(400).json({
                message: "Multer Error" + err
            })
        }
           

        for (let i = 0; i < singleProduct.images.length; i++) {
     await fs.unlink(path.join(__dirname, "..", "public", singleProduct.images[i]))      
         }
    const filenames = []
    for(let i = 0; i < req.files.length; i++ ){
        filenames.push(`assets/image/producs/${req.files[i].filename}`)
    }

    const result = await Product.findByIdAndUpdate(productId,{
        images:filenames
    }, {new: true} )

    res.json({
        message:"Product updated image success",
    result
    })
})
}) 