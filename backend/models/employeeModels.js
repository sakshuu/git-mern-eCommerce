const  mongoose  = require("mongoose")

const employeeSchema =  mongoose.Schema({
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    emailVeify: {
      type: Boolean,
    },

    password: {
      type: String,
      required: true
    },

    address: {
      type: String,
    },

    mobile: {
      type: String,
    },
    mobileVerify: {
      type: Boolean,
    },

    role: {
      type: String,
      enum:["intern","user", "account", "cms", "support", "admin"],
      default: "intern"
    },

    active: {
      type: Boolean,
      default: true
    },

    joiningDate: {
      type: Date,
    },

    Dob: {
      type: Date,
    },

    gender: {
      type: String,
      enum:["male", "female", "other"]
    },
    salary: {
      type: Number,
    },

}, {timestamps: true})

module.exports = mongoose.model("employee", employeeSchema)
