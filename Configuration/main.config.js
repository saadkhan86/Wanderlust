const mongoose=require("mongoose");
const main=()=>{
    const Mongo_URL="mongodb+srv://saadkhan:saadkhan123@cluster0.ll5hpbw.mongodb.net/?appName=Cluster0";
    mongoose.connect(Mongo_URL).then(()=>{
        console.log("Database connected 🚀")
    }).catch((error)=>{
        console.log("something went wrong")
    })
};
module.exports=main;