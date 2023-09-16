import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { GetCurrentUser, Login, Register } from './Controllers/User.controller.js';
import { AdminMiddleware } from './Middleware/AdminMiddleware.js';
import { Add_question, All_question } from './Controllers/Admin.cotroller.js';

const app = express();
dotenv.config()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Running")
})

app.post('/register',Register)
app.post('/login',Login)
app.post('/getcurrentUser',GetCurrentUser)
app.post('/add_question',AdminMiddleware,Add_question)
app.get('/all_question',All_question)
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected To Database")
}).catch((error)=>{
    console.log("Error While Connecting DB")
})
app.listen(5005, () => {
    console.log("App Running On Port 5005")
})