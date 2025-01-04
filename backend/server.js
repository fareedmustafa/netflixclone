import express from  'express'; 
import dotenv from "dotenv";
import authroutes from "./routes/auth.route.js"; 

dotenv.config();

const app = express();
console.log("MONGO_URI:", process.env.MONGO_URI)

app.use("/api/v1/auth",authroutes);
 
app.listen(5000, () => {
    console.log("Server started at http:localhost:5000");
});