const { loginUser, loginEmployee, continueWithGoggle, forgetPassword} = require("../controllers/authcontroller")
const { loginLimiter } = require("../middleware/limiter")

const router = require("express").Router()

router
.post("/user/login", loginLimiter, loginUser)
.post("/employee/login",loginLimiter, loginEmployee)
.post("/forget",  forgetPassword)
.post("/user/login-with-google", loginLimiter, continueWithGoggle)

module.exports = router