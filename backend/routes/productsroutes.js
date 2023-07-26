const { addProduct, getAllProduct, getSingleProduct, deleteProduct, destroyProduct, updateProductData, updateproductImages } = require("../controllers/productcontrollers")
const { adminProtected } = require("../middleware/auth")

const router = require("express").Router()

router

.get("/", getAllProduct)
.get("/detail/:productId", getSingleProduct)
.post("/add-product", adminProtected, addProduct)
.delete("/delete/:productId", adminProtected, deleteProduct)
.delete("/destroy", adminProtected, destroyProduct)
.put("/update-data/:productId",adminProtected, updateProductData)
.put("/update-product-image/:productId",adminProtected, updateproductImages)



module.exports = router