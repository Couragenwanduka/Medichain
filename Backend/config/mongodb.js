import mongoose from "mongoose";

const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.mongodb_key)
        console.log("Connected to MongoDB")
    }
    catch(error){
        console.log(error.message)
    }
}

export default connectDb;