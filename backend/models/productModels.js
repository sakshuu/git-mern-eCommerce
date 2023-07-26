const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
name: {
    type: String,
    required: true
},
brand: {
    type: String,
    required: true
},
images: {
    type: [String],
    required: true
},
category: {
    type: String,
    required: true,
    enum: ["cloths", "electronics","gadgets", "footware"]
},
desc: {
    type: String,
    required: true
},
price: {
    type: Number,
    required: true
},
stock: {
    type: Number,
    required: true
},
employeeID: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref:"employee"
}
,
publish:{
    type:Boolean,
    
}
},

    {timestamps: true})
    module.exports = mongoose.model('product', productSchema) 