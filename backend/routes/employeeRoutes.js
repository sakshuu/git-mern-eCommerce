const { deleteEmployee, getAllEmployee, destroyEmployee, registerEmployee, updateEmployee, getSingleEmployee, admingetAllUsers, adminUserStatus, adminStat, adminSearch } = require("../controllers/employeeControllers");
const { adminProtected } = require("../middleware/auth");

const router = require("express").Router()

router

.get("/",getAllEmployee) 
// .get("/detail/:employeeId",getSingleEmployee) 
.get("/profile", getSingleEmployee) 
.put("/update/:employeeId",updateEmployee)
.delete("/delete/:employeeId",deleteEmployee) 
.post("/register",registerEmployee)
.delete("/destroy",destroyEmployee)

.get("/search", adminSearch)
.get("/users", admingetAllUsers)
.get("/stat", adminStat)
.put("/users/status/:userId", adminUserStatus)

module.exports = router