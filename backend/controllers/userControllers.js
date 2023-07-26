const User = require("../models/userModels")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { sendEmail } = require("../utils/email")

exports.registerUser = async (req,res) => {
    try {

        console.warn(req.body);
        const {name,email,password} = req.body
        if (!name || !email || !password) {
            throw new Error("All files required")
        }
        const found = await User.findOne({email})
        if (found) {
            throw new Error("Email Alreday exist")
        } 
        
        const hashPass = await bcrypt.hash(password,10)
        // console.log(req.body)
        const result = await User.create({
            name,
            email,
            password:hashPass
        })

        const token = jwt.sign({id: result._id}, process.env.JWT_KEY)

        sendEmail({
            sendTo:email,
            sub:"Welcome to MERN E-commerce",
            subtext:"Hello and welcome to our website! We're thrilled to have you here. Please feel free to explore and discover all that we have to offer. If you have any questions or need assistance, don't hesitate to reach out. Thank you for registring with us!"
        })

        res.json({
        message: "User Register Successfully",
        result:{
            id:result._id,
            name,
            token,
        }
       }) 
    } catch (error) {
        res.status(400).json({
            message: "Error" + error
        })
    }
}

exports.editUsers = async (req,res) => {
    try {
        // const {id} = req.params
        // if (!id) {
        //     throw new Error("Id Kon Pathvel?")
        // }
        const result = await User.findByIdAndUpdate(req.body.userId, req.body)
        res.json({
         message: "User Updated Successfully"
        }) 
    } catch (error) {
        res.status(400).json({
            message: "Error" + error
        })
    }
}

exports.deleteUsers = async (req,res) => {
    try {
        const {id} = req.params
        const result = await User.findByIdAndDelete(id)
        res.json({
         message: "User deleted Successfully"
        }) 
    } catch (error) {
        res.status(400).json({
            message: "Error" + error
        })
    }
}

exports.getAllUsers = async (req,res) => {
    try {
        const result = await User.find()
        res.json({
         message: "User Fetched Successfully",
         result
        }) 
    } catch (error) {
        res.status(400).json({
            message: "Error" + error
        })
    }
}

exports.getSingleUsers = async (req,res) => {
    try {
        const {id} = req.params
        const result = await User.findOne({ _id: id})
        if (!result) {
            throw new Error("User Not Found")
        }
        res.json({
         message: "User Single Successfully",
         result
        }) 
    } catch (error) {
        res.status(400).json({
            message: "Error" + error
        })
    }
}

exports.getUsersProfile = async (req,res) => {
    try {
        console.log(req.body.userId);
        const result = await User.findOne({ _id: req.body.userId}).select("-password -_id -__v -createdAt -updatedAt")
        if (!result) {
            throw new Error("User Not Found")
        }
        res.json({
         message: "User Profile Fetched Successfully",
         result:{
name: result.name,
email: result.email,            
mobile: result.mobile || "",
house: result.house || "",            
pincode: result.pincode || "",            
state: result.state || "",
landmark: result.landmark || "",
city: result.city || "",
      }
        }) 
    } catch (error) {
        res.status(400).json({
            message: "Error" + error
        })
    }
}


exports.destroyUsers = async (req,res) => {
    try {
        const result = await User.deleteMany()
        res.json({
         message: "User deleted all Successfully",
         result
        }) 
    } catch (error) {
        res.status(400).json({
            message: "Error" + error
        })
    }
}