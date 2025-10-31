const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const passport = require("passport");
const { isLoggedin, redirectUrl } = require("../ErrorHandling/authenticationANDauthorization.js");
const { renderSignup, signupUser, loginUser, login, logout } = require("../Controlers/Users.js");

router
.route("/signup")
.get(renderSignup) //render a signup page
.post(wrapAsync(signupUser)); //signup a user

router
.route("/login")
.get(loginUser)//render login form
.post(redirectUrl,                                     //Login a user
    passport.authenticate("local",
    {failureRedirect:"/login",failureFlash:true})
    ,login
);

router.get("/logout",isLoggedin,logout);

module.exports=router