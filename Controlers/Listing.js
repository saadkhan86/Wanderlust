const ErrorHandler = require("../ErrorHandling/ErrorHandler");
const Listing = require("../models/listing");

module.exports.index=async (req,res,next)=>{
    const storedListings=await Listing.find({})
    if(!storedListings){
        throw new ErrorHandler(500,"Server Error");
    }
    res.status(200).render("listings/index.ejs",{storedListings});
};
//for create route
module.exports.create=async(req,res,next)=>{
    if(req.body.listing.description.length > 500 || req.body.listing.description.length<10){
        throw new ErrorHandler(400,"Description length must betwenn 10-500 characters")
    }
    let url=await req.file.path;
    filename=await req.file.filename;
    // console.log(`${path}.....${filename}`)
    const newListing=req.body.listing;
    const db=new Listing(newListing);
    db.image={url,filename};
    db.owner=await req.user._id; 
    const save=await db.save();
    if(!save){
        throw new ErrorHandler(400,"Something went wrong");
    }else{
        req.flash("success","Listing Created Successfully");
        res.status(200).redirect("/listings");
    }
};
//new Route
module.exports.createNew=(req,res)=>{
    res.status(200).render("listings/new");
}


// show listing
module.exports.show=async(req,res,next)=>{
    const {id}= req.params;
    if(id.length!==24){
        throw new ErrorHandler(422,"Unprocessable Entity")
    }
    let listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listing){
        req.flash("failure","Listing  Not  Found");
        res.redirect("/listings");
    }else{
        res.status(200).render("listings/show.ejs",{listing});
    }
};

// edit listing
module.exports.edit=async(req,res,next)=>{ 
    const {id}=req.params;
    if(!id){
      throw new ErrorHandler(400,"Bad Request: Id Missing");
    }
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("failure","Listing Not Found");
        res.redirect("/listings");
    }else{
        res.status(200).render("listings/edit",{listing});
    }
}

// Update
module.exports.update=async (req, res, next) => {
    const {id}=await req.params;
    const updatedListing = await Listing.findByIdAndUpdate(id,{ ...req.body.listing },{ new: true, runValidators: true })
    if(typeof req.file!=="undefined"){
        const url=await req.file.path;
        const filename=await req.file.filename;
        updatedListing.image={url,filename};
        await updatedListing.save();
    }
    if(updatedListing){
        req.flash("success","Listing Updated Successfully");
        res.status(200).redirect(`/listings/${id}`);
    }else{
        req.flash("failure","something went wrong while updating");
    }
}

// Delete
module.exports.deleteListing=async(req,res)=>{
    const {id}=req.params;
    if(!req.params.id){
        throw new ErrorHandler(400,"Bad Request:Missing User's id");
    }
    const db=await Listing.findByIdAndDelete(id);
    if(db){
        req.flash("success","Listing Deleted Successfully");
        res.status(200).redirect("/listings");
    }else{
        throw new ErrorHandler(500,"Something went wrong");
     }
};