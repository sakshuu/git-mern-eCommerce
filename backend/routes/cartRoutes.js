const {  addToCart, getCartData, destroyCart, removeSingleCartItem, emptyCart, allHistroyRemoveCart } = require("../controllers/cartcontroller")
const { protected } = require("../middleware/auth")

const router = require("express").Router()


router

.post("/add-to-cart", protected, addToCart)
.get("/cart-history", protected, getCartData)
.delete("/cart-remove-single/:productId",protected, removeSingleCartItem)
.delete("/cart-destroy", destroyCart)
.delete("/empty-cart", protected, emptyCart)
.delete("/remove",protected, allHistroyRemoveCart)


module.exports = router