import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const MAX_RETRY=3;
const RETRY_DELAY=3000;

export const connectDB =async (retry_count=0)=>{
try{
    await mongoose.connect(process.env.NUTRISCAN_URI, {
      serverSelectionTimeoutMS: 5000, 
      socketTimeoutMS: 45000,        
    });
    console.log("DB Connected");
}
catch(error)
{
    console.error(`DB connection failed-Retry Count ${retry_count}`);
    if(retry_count<MAX_RETRY){
        console.log(`Retry in ${RETRY_DELAY/1000} Seconds`);
    
    setTimeout(()=>{
        connectDB(retry_count+1);
    },RETRY_DELAY);
}
else{
    console.error("Error connecting DB");
    process.exit()
}
}

}