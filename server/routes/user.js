const {verifyToken, isAdmin} = require("../middleware/jwt");
const userRouter = require("express").Router();

const {getAllUsers, deleteUserById} = require("../controllers/UserController");


userRouter.get("/", [], getAllUsers);
userRouter.delete("/:id", deleteUserById);


module.exports = userRouter