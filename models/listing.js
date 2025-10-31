const mongoose=require("mongoose");
const  Review  = require("./review");
const User=require("./user")
const defaultImage="https://images.unsplash.com/photo-1758797849614-aea4f74fb056?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8";
const Schema=mongoose.Schema;
const listingSchema=new Schema({
    title:{
        type:String,
        maxLength:200,
        required:true
    },
    description:{
        type:String,
        require:true,
        maxLength:500
    },
    image:{
        url:String,
        filename:String
    },
    price:{
        type:Number,
        default:0
    },
    location:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true,
        maxLength:40
    },
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review"
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});

listingSchema.post('findOneAndDelete',async function(listing){
 if(listing){
    await Review.deleteMany({_id:{$in:listing.reviews}});
  }
});

const Listing=mongoose.model("Listing",listingSchema);

module.exports=Listing;