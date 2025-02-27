const express = require("express")
require("dotenv").config({path: "./.env"})
const cors = require("cors")
const connectDb = require("./config/db")
const { log, logEvent } = require("./middleware/logger")
const mongoose = require("mongoose")
const { errorHandler } = require("./middleware/error")
const { format } = require("date-fns")
const path = require("path")
const app = express()
const cookieParser = require("cookie-parser")
const { adminProtected } = require("./middleware/auth")

app.use(express.static(path.join(__dirname,"build")))
app.use(express.static(path.join(__dirname,"public")))
connectDb()

app.use(log)
app.use(cookieParser())
app.use(express.json())
app.use(cors({
        credentials: true,
        origin:(o, cb) => {
                const allowed = [
            "http://localhost:3000",
            "http://localhost:5173",
            "http://127.0.0.1:5173",
        ]
        if(allowed.indexOf(o) !== -1 || !o){
                cb(null, true)
        } else {
                cb("blocked by cors")
            }
    }
}))

app.use("/api/user", require("./routes/userRoutes"))
app.use("/api/cart", require("./routes/cartRoutes"))
app.use("/api/order", require("./routes/orderRoutes"))
app.use("/api/employee", adminProtected, require("./routes/employeeRoutes"))
// app.use("/api/employee",  require("./routes/employeeRoutes"))
app.use("/api/auth", require("./routes/authroutes"))
app.use("/api/products", require("./routes/productsroutes"))

app.use("*", (req,res) => {
    res.sendFile(path.join(__dirname,"build/index.html"))
    // res.status(404).json({
        // message: "404 :Resource You Are Looking For Is Not Available"
    // })
})
app.use(errorHandler) 


const PORT = process.env.PORT || 5000

mongoose.connection.once("open", () => {
    app.listen(PORT, console.log(`SERVER RUNNING http://localhost:${PORT}`))
    console.log("MONGO CONNECTED")
})


mongoose.connection.on("error", err => {
    const msg = `${format(new Date(), "dd-MM-yyyy \t HH:mm:ss")}\t${err.code}\t${err.name}`
    logEvent({
        fileName:"mongo.log",
        message: msg
    })
})

