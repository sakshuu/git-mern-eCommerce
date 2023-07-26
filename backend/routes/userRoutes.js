const { registerUser, editUsers, deleteUsers, getAllUsers, getSingleUsers, destroyUsers, getUsersProfile } = require("../controllers/userControllers")
const { protected} = require("../middleware/auth")

const router = require("express").Router()

router

.get("/", getAllUsers)
.get("/profile", protected, getUsersProfile)
.post("/register", registerUser)
// .put("/update/:id",adminProtected, editUsers)
// .put("/profile-update/:id",protected, editUsers)
.put("/profile-update",protected , editUsers)
.delete("/destroy", destroyUsers)
.delete("/delete/:id", deleteUsers)
.get("/:id", getSingleUsers)

module.exports = router