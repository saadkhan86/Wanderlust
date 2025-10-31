const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ErrorHandler = require("../ErrorHandling/ErrorHandler.js");
const newListingSchema=require("../models/newListingSchema.js");
const { isLoggedin } = require("../ErrorHandling/authenticationANDauthorization.js");
const { isOwner } = require("../ErrorHandling/authenticationANDauthorization.js");
const { index, createNew, create, show, edit, update, deleteListing } = require("../Controlers/Listing.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js")
let upload=multer({storage});
//Middleware
const validateListing=(req,res,next)=>{
  const { error } = newListingSchema.validate({ listing: req.body.listing });
  if(error){
    let errorMsg=error.details.map(el=>el.message).join(",");
    throw new ErrorHandler(400,errorMsg);
  }else{
  next();
}
}

router
.route("/")
.get(wrapAsync(index))//get all listings
.post(isLoggedin,upload.single("listing[image]"),validateListing,wrapAsync(create)); //create listings

router.get("/new",isLoggedin,createNew);

router.get("/:id/edit",isLoggedin,isOwner,wrapAsync(edit));

router
.route("/:id")
.get(wrapAsync(show)) //view listing
.put(isLoggedin,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(update)) //update listing
.delete(isLoggedin,isOwner,wrapAsync(deleteListing)); //delete listing

module.exports=router
