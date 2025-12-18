const express=require("express");
const { signupValidation, loginValidation } = require("../middlewares/AuthValidation");
const { signup,login } = require("../controlers/authControler");
const router=express.Router();

router.post('/signup',signupValidation,signup)

router.post('/login',loginValidation,login);

module.exports=router;