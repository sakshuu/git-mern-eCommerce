const { getUserOrders, UserCancelOrders, placeOrder, orderPayment, verifyPayment, destroyOrders } = require("../controllers/OrderController")
const { protected } = require("../middleware/auth")

const router = require("express").Router()

router
.get("/order-history", protected, getUserOrders)
.put("/order-cancel/:orderId", protected, UserCancelOrders)
.post("/order-place", protected , placeOrder)
.post("/payment",  orderPayment)
.post("/payment/verify" , protected , verifyPayment)
.delete("/destroy" ,  destroyOrders)

module.exports = router