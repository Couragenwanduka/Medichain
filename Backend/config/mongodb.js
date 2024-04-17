import mongoose from "mongoose";

const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.mongodb_key)
        console.log("Connected to MongoDB")
    }
    catch(err){
        console.log(err)
    }
}

export default connectDb;