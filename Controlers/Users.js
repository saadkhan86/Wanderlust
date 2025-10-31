const User = require("../models/user");

//render Signup Form
module.exports.renderSignup=async(req,res)=>{
res.render("./users/signup.ejs");
}
//Signup User
module.exports.signupUser=async(req,res,next)=>{
 try{
  let {username,email,password}=req.body
  const newUser=new User({email,username});
  const registeredUser=await User.register(newUser,password);
  req.login(registeredUser,(err)=>{
    if(err){
      return next(err);
    }else{  
    req.flash("success","welcome to wanderlust");
    res.redirect("/listings");
    }
})
}catch(e){
  req.flash("failure","user already exists");
  res.redirect("/signup");
 }
};


//Login form
module.exports.loginUser=async(req,res)=>{
  res.render("./users/login.ejs");
}

//Login User
module.exports.login=async(req,res)=>{
  req.flash("success","Welcome to wanderlust! You are logged in!")
  let redirectUrl=res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
}

module.exports.logout=async(req,res,next)=>{
  req.logout((err)=>{
    if(err){
      return next(err)
    }else{
      req.flash("success","you are Logged out!");
      res.redirect("/listings");
    }
  })
}