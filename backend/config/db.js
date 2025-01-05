import mongoose from "mongoose";
import { ENV_VARS } from './envVars.js'; // Ensure this path is correct

export const connectDB = async () => {
    // Your database connection logic here

try {
        const conn = await mongoose.connect(ENV_VARS.MONGO_URL)
            console.log("MongoDB connected: " + conn.connection.host);
        }catch (error) { 
    console.error("Error connect to MongoDB: " + error.message);
    process.exit (1); 
    
}  
    };