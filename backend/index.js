import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
dotenv.config()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Running")
})

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected To Database")
}).catch((error)=>{
    console.log("Error While Connecting DB")
})
app.listen(5005, () => {
    console.log("App Running On Port 5005")
})