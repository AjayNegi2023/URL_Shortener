const express = require("express");
const router = express.Router();


const {handleSignup,handleSignin} = require("../Controller/userController")
router.post("/",handleSignup)
router.post("/login",handleSignin)

module.exports = router