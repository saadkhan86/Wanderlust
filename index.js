const express=require("express");
const app=express();
const path=require("path");
const main=require("./Configuration/main.config.js");main();
const methodOverride=require("method-override");
const listingsRouter=require("./Routes/listings.js");
const reviewsRouter=require("./Routes/reviews.js");
const userRouter=require("./Routes/user.js");
const ejsMate = require("ejs-mate");
const session=require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");
const User=require("./models/user.js");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const Mongo_URL=process.env.DBURL;
const options=MongoStore.create({
  mongoUrl:Mongo_URL,
  crypto:{
    secret:process.env.SECRET
  },
  touchAfter:24*60*60
})
const sessionOptions={
  store:options,
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true
  }
};
//authentications
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.failure=req.flash("failure");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user; 
  next();
});


app.engine('ejs', ejsMate);
// Setting Up For CSS
app.use(express.static(path.join(__dirname,"public")));
// methodOverride
app.use(methodOverride("_method"));
// json format
app.use(express.json());
// view engine
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));
//Listing Route
app.use("/listings",listingsRouter);
//Reviews Route
app.use("/listings/:id/reviews",reviewsRouter);
//User
app.use("/",userRouter);

//404 page not found
app.use((req, res, next) => {
  res.render("listings/pageNotFound");
});

// Error Handler
app.use((err,req,res,next)=>{
    const {statusCode=500,message="Something went wrong"}=err;
    res.status(statusCode).render("listings/errors.ejs",{message});
});

const port=3000;
app.listen(port,()=>console.log("app is listening on port 3000"));