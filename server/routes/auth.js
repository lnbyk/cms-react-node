const router = require("express").Router();
const User = require("../model/User");
const {
  registerValidation,
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
  loginValidation
} = require("../middleware/validation");
const authController = require("../controllers/AuthController");

router.post(
  "/signup",
  [registerValidation, checkDuplicateUsernameOrEmail, checkRolesExisted],
  authController.signup
);

router.post(
    "/signin",
    [loginValidation],
    authController.signin
)


module.exports = router;
