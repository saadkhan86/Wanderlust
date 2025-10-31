const express=require("express")
const app=express();
const session=require("express-session");
const sessionOptions={secret: 'smbradpcsuos',resave:false,saveUninitialized:true};
const flash=require("connect-flash");
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(session(sessionOptions));
app.use(flash());
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.failure=req.flash("failure");
    delete req.session.success
    delete req.session.failure
    next();
})
app.get("/register",(req,res)=>{
    let {name="anynmouse"}=req.query;
    req.session.name=name;
    if(req.session.name==="anynmouse"){
        req.flash('failure', 'user not found!')
    }
    else{
        req.flash('success', 'user registered successfully!')
    }
        res.redirect("/check");
});
app.get("/check",(req,res)=>{
    res.render("flash",{name:req.session.name});
})

// app.get("/",(req,res)=>{
//     res.send(req.sessionID)
// })


const port=3000;
app.listen(port,()=>{
    console.log("server is listening");
})