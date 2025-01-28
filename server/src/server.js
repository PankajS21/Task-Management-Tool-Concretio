import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js"

dotenv.config();

const port=5000;

//Connect DB
connectDB();

app.listen(port,()=>{
console.log("Server running on port " + `${port}`);
})

