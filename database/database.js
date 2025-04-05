import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        const DB_URI = process.env.MONGODB_URL;
        
        mongoose.connect(DB_URI);
        
        mongoose.connection.on("connected", () => {
          console.log("mongodb connect successfully..");
        });
        
        mongoose.connection.on("error", (err) => {
          console.log(err);
        });
        
    } catch (error) {
        console.log(error);
    }
}
