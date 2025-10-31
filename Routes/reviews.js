const express=require("express");
const router=express.Router({mergeParams:true});
const reviewSchema=require("../models/reviewSchema.js");
const wrapAsync=require("../utils/wrapAsync.js");
const ErrorHandler = require("../ErrorHandling/ErrorHandler.js");
const { isLoggedin, isReviewAuthor } = require("../ErrorHandling/authenticationANDauthorization.js");
const { deleteReview, reviews } = require("../Controlers/Reviews.js");

const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate({review: req.body.review});
    if(error){
        let errorMsg=error.details.map(el=>el.message).join(",");
        throw new ErrorHandler(400,errorMsg);
    }else{
        next();
    }
}
//Review
router.post("/",isLoggedin,validateReview,wrapAsync(reviews))

//delete review
router.delete("/:reviewId",isLoggedin,isReviewAuthor,wrapAsync(deleteReview));

module.exports=router




