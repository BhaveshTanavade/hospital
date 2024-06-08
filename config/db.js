import mongoose from "mongoose";

export const connectToDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to mongo DB....");
    }catch(err){
        console.log("Mongo DB failed to connect",err.message);
        process.exit(1);
    }
};