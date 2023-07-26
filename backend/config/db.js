const mongoose = require("mongoose")
const connectDb = () => {
    try {
        mongoose.set('strictQuery', true)
        mongoose.connect(process.env.MONGO_URL)
        // console.log("MONGO CONNECTD");
    } catch (error) {
        console.log("MONGO ERROR" + error);
    }
}

module.exports = connectDb