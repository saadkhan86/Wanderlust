const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.reviews=async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id;
    await listing.reviews.push(newReview);
    await listing.save();
    await newReview.save();
    req.flash("success","Review Added Successfully");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.deleteReview=async(req,res)=>{
    if(req.params.id.length!==24){
        throw new ErrorHandler(422,"Unprocessable Entity");
    }
    const {id,reviewId}=await req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});//$pull will removes id of review from listing
    req.flash("success","Review Deleted Successfully");
    res.redirect(`/listings/${id}`);
}