module.exports.isLoggedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("failure","You must be logged in to get access!");
        return res.redirect("/login");
    }
    next();
}

module.exports.redirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    return next();
}


const Listing=require("../models/listing");
const Review = require("../models/review");

module.exports.isOwner=async(req,res,next)=>{
    let {id}=await req.params;
    let listing=await Listing.findById(id);
    if(! listing.owner.equals(res.locals.currentUser._id)){
        req.flash("failure","access to this listing is forbidden");
        return res.redirect(`/listings/${id}`);
    }
    next();
}


module.exports.isReviewAuthor=async(req,res,next)=>{
    let {reviewId}=await req.params;
    let review=await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currentUser._id)){
        req.flash("failure","You are not a owner of this review");
        return res.redirect(`/listings/${req.params.id}`);
    }
    next();
}